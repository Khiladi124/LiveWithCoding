import fs from 'fs';
import path from 'path';
import { spawn, exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

export const runCode = async ({ filePath, inputPath }) => {
  try {
    const jobId = path.basename(filePath).split('.')[0];
    const lang = path.extname(filePath).split('.')[1];
    const exePath = path.join(outputPath, jobId); // Remove .exe extension

    // Determine compile and run commands
    const compileCommands = {
      cpp: `g++ "${filePath}" -o "${exePath}"`,
      c: `gcc "${filePath}" -o "${exePath}"`,
      java: `javac "${filePath}" -d "${outputPath}"`,
    };

    const runCommands = {
      cpp: [exePath],
      c: [exePath],
      java: ['java', '-cp', outputPath, jobId],
      py: ['python3', filePath], // Use python3 on Linux
      js: ['node', filePath],
    };

    if (!runCommands[lang]) {
      throw new Error(`Unsupported language: ${lang}`);
    }

    // Compile if needed
    if (compileCommands[lang]) {
      await new Promise((resolve, reject) => {
        exec(compileCommands[lang], (error, stdout, stderr) => {
          if (error) return reject(stderr || error.message);
          resolve(stdout);
        });
      });
    }

    // Spawn the process
    return await new Promise((resolve, reject) => {
      const child = spawn(runCommands[lang][0], runCommands[lang].slice(1));

      let output = '';
      let errorOutput = '';

      // Set timeout manually
      const timeoutId = setTimeout(() => {
        child.kill();
        reject('Execution timeout');
      }, 10000);

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        clearTimeout(timeoutId);
        if (code !== 0) {
          return reject(errorOutput || 'Execution failed');
        }
        resolve(output.trim());
      });

      child.on('error', (err) => {
        clearTimeout(timeoutId);
        reject(`Execution error: ${err.message}`);
      });

      // Handle input safely
      if (inputPath && fs.existsSync(inputPath)) {
        const input = fs.createReadStream(inputPath);
        input.pipe(child.stdin);
        input.on('end', () => {
          child.stdin.end();
        });
        input.on('error', (err) => {
          clearTimeout(timeoutId);
          child.kill();
          reject(`Input file error: ${err.message}`);
        });
      } else {
        child.stdin.end();
      }
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.message || 'Internal server error');
  }
};
