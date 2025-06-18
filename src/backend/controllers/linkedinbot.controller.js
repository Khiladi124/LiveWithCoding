import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const COOKIES_PATH = path.join(process.cwd(), 'linkedin_cookies.json');

const saveCookies = async (page) => {
  const cookies = await page.cookies();
  fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
  console.log('Cookies saved successfully');
};

const loadCookies = async (page) => {
  if (fs.existsSync(COOKIES_PATH)) {
    const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf8'));
    await page.setCookie(...cookies);
    console.log('Cookies loaded successfully');
    return true;
  }
  return false;
};

const getEasyApplyJobs = async (req, res) => {
  console.log("Easy Apply Jobs request received with body:", req.body);
  const { email, password, jobTitle = 'software developer', location = 'United States' } = req.body;
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  try {
    // Try to load saved cookies first, then fresh login if needed
    const cookiesLoaded = await loadCookies(page);
    if (cookiesLoaded) {
      console.log('✅ Cookies loaded, proceeding with job search...');
      await page.goto('https://www.linkedin.com/jobs');
    } else {
      await freshLogin(page, email, password);
      await page.goto('https://www.linkedin.com/jobs');
    }

    console.log(`🔍 Searching for Easy Apply jobs: ${jobTitle} in ${location}...`);
    
    // Search for jobs
    await page.waitForSelector('input[aria-label*="Search by title"]', { timeout: 10000 });
    await page.click('input[aria-label*="Search by title"]');
    await page.type('input[aria-label*="Search by title"]', jobTitle);
    
    // Enter location
    await page.waitForSelector('input[aria-label*="City"]', { timeout: 5000 });
    await page.click('input[aria-label*="City"]');
    await page.keyboard.press('Control+A');
    await page.type('input[aria-label*="City"]', location);
    
    // Click search button
    await page.click('button[aria-label*="Search"]');
    await page.waitForTimeout(3000);
    
    // Apply Easy Apply filter
    console.log('🔧 Applying Easy Apply filter...');
    await page.waitForSelector('button[aria-label*="Easy Apply filter"]', { timeout: 10000 });
    await page.click('button[aria-label*="Easy Apply filter"]');
    await page.waitForTimeout(3000);
    
    const easyApplyJobs = [];
    let currentPage = 1;
    const maxPages = 5; // Adjust based on how many pages you want to scrape
    
    while (easyApplyJobs.length < 50 && currentPage <= maxPages) {
      console.log(`📄 Scraping page ${currentPage}...`);
      
      // Wait for job listings to load
      await page.waitForSelector('.job-search-card', { timeout: 10000 });
      await page.waitForTimeout(2000);
      
      // Extract job information from current page
      const pageJobs = await page.evaluate(() => {
        const jobCards = document.querySelectorAll('.job-search-card');
        const jobs = [];
        
        jobCards.forEach(card => {
          const titleElement = card.querySelector('.base-search-card__title a');
          const companyElement = card.querySelector('.base-search-card__subtitle a');
          const locationElement = card.querySelector('.job-search-card__location');
          const easyApplyButton = card.querySelector('.job-search-card__easy-apply-button');
          
          if (titleElement && companyElement && easyApplyButton) {
            jobs.push({
              title: titleElement.innerText.trim(),
              company: companyElement.innerText.trim(),
              location: locationElement ? locationElement.innerText.trim() : 'Not specified',
              link: titleElement.href,
              easyApply: true
            });
          }
        });
        
        return jobs;
      });
      
      easyApplyJobs.push(...pageJobs);
      console.log(`✅ Found ${pageJobs.length} Easy Apply jobs on page ${currentPage}`);
      console.log(`📊 Total jobs collected: ${easyApplyJobs.length}`);
      
      // Break if we have enough jobs
      if (easyApplyJobs.length >= 50) {
        break;
      }
      
      // Navigate to next page
      try {
        const nextButton = await page.$('button[aria-label="View next page"]');
        if (nextButton) {
          await nextButton.click();
          await page.waitForTimeout(3000);
          currentPage++;
        } else {
          console.log('📝 No more pages available');
          break;
        }
      } catch (error) {
        console.log('📝 Reached end of pagination');
        break;
      }
    }
    
    // Limit to exactly 50 jobs
    const finalJobs = easyApplyJobs.slice(0, 50);
    
    console.log(`🎉 Successfully collected ${finalJobs.length} Easy Apply job links!`);
    
    res.status(200).json({
      message: 'Easy Apply jobs collected successfully',
      totalJobs: finalJobs.length,
      jobs: finalJobs
    });

  } catch (error) {
    console.error('Job scraping failed:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await browser.close();
  }
};

const freshLogin = async (page, email, password) => {
  const LOGIN_URL = 'https://www.linkedin.com/login';
  
  console.log('🔄 Starting LinkedIn login process...');
  await page.goto(LOGIN_URL);
  
  // Wait for login form to be available
  await page.waitForSelector('#username', { timeout: 10000 });
  await page.waitForSelector('#password', { timeout: 10000 });
  
  await page.type('#username', email);
  await page.type('#password', password);
  
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const currentUrl = page.url();
  console.log('Current URL after login:', currentUrl);
  
  if (currentUrl.includes('challenge') || 
      currentUrl.includes('verification') || 
      currentUrl.includes('checkpoint') ||
      await page.$('input[name="pin"]') ||
      await page.$('input[id*="verification"]')) {
    
    console.log('⚠️ LinkedIn requires verification/confirmation.');
    console.log('📧 Please check your email or phone for confirmation code.');
    console.log('⏱️ You have 60 seconds to complete verification...');
    
    try {
      await page.waitForFunction(
        () => {
          const url = window.location.href;
          return url.includes('linkedin.com/feed') || 
                 url.includes('linkedin.com/in/') ||
                 url.includes('linkedin.com/mynetwork') ||
                 document.querySelector('nav.global-nav') !== null;
        },
        { timeout: 60000 }
      );
      
      console.log('✅ Verification completed successfully!');
      await saveCookies(page);
      
    } catch (timeoutError) {
      throw new Error('⌛ Verification timeout (60 seconds). Please try again and complete verification faster.');
    }
  } else if (currentUrl.includes('feed') || currentUrl.includes('mynetwork') || await page.$('nav.global-nav')) {
    console.log('✅ Login successful without verification');
    await saveCookies(page);
  } else {
    const errorElement = await page.$('.alert--error, .form__error, [data-js-module-id="guest-input-validation"]');
    if (errorElement) {
      const errorText = await page.evaluate(el => el.textContent, errorElement);
      throw new Error(`Login failed: ${errorText}`);
    } else {
      throw new Error('Login failed: Unknown error or incorrect credentials');
    }
  }
  
  console.log('🎉 LinkedIn login process completed successfully!');
};

export default getEasyApplyJobs;
