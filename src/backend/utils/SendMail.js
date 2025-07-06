import nodemailer from 'nodemailer';

const sendEmail = async (to, url, otp, txt) => {
   const message= otp?"Email Verification":"Reset Password";
  try {
    console.log(process.env.SENDER_EMAIL_ADDRESS, process.env.GMAIL_APP_PASSWORD); // DEBUGGING
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL_ADDRESS, 
        pass: process.env.GMAIL_APP_PASSWORD,    
      }
    });
   
    const mailOptions = {
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: to,
      subject: message,
      html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: #4d23af;">Welcome to JioCoding.</h2>
         <p>Congratulations! You're almost set to start using <b>JioCoding</b>.</p>
          <p> Just click the button below to ${txt}.</p>
          ${otp&&<h1 style="text-align: center; color: blue;"> ${otp}</h1>}
          <a href="${url}" style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: auto; display: inline-block;">${txt}</a>
          <p>If the button doesn't work, you can also use this link:</p>
          <div>${url}</div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;

  } catch (err) {
    console.error('Failed to send email:', err);
    throw err;
  }
};

export default sendEmail;
