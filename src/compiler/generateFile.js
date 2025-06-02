import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobID = uuid();
    const validFormats = {
        'cpp': 'cpp',
        'java': 'java',
        'python': 'py',
        'javascript': 'js',
        'typescript': 'ts',
        'txt': 'txt',
        'c': 'c',
    }
    const filename = `${jobID}.${validFormats[format]}`;
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    return filePath;
};

export default generateFile;