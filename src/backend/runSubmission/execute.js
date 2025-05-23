import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import {exec} from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const execute = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const lang = path.extname(filepath).split(".")[1];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const outputCommands={
        "cpp": `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
        "java": `javac ${filepath} && java ${path.join(outputPath, jobId)}`,
        "py": `python ${filepath}`,
        "js": `node ${filepath}`,
        "ts": `ts-node ${filepath}`,
    }
    return new Promise((resolve, reject) => {
        exec(
           outputCommands[lang],
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};
export const runCode = async (req) => {
    try {
        const {filePath, inputPath} = req;

        const jobId = path.basename(filePath).split(".")[0];
        const lang = path.extname(filePath).split(".")[1];
        const outPath = path.join(outputPath, `${jobId}.exe`);
       
        const outputCommands = {
            cpp: `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${inputPath}`,
            java: `javac ${filePath} && cd ${outputPath} && java ${jobId} < ${inputPath}`,
            py: `python ${filePath} < ${inputPath}`,
            js: `node ${filePath} < ${inputPath}`,
            ts: `ts-node ${filePath} < ${inputPath}`,
            c: `gcc ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${inputPath}`,
          };
          
        return new Promise((resolve, reject) => {
            exec(
               outputCommands[lang],
                (error, stdout, stderr) => {
                    if (error) {
                        reject({ error, stderr });
                    }
                    if (stderr) {
                        reject(stderr);
                    }
                    resolve(stdout);
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export default execute;