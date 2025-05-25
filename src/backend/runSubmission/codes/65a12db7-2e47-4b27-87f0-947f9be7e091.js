import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];

rl.on('line', line => {
    inputLines.push(line.trim());
    if (inputLines.length === 3) {
        rl.close();
    }
});

rl.on('close', () => {
    const n = parseInt(inputLines[0]);
    const target = parseInt(inputLines[1]);
    const arr = inputLines[2].split(' ').map(Number);

    // Create a list of [value, index] pairs
    let arrWithIndex = arr.map((val, idx) => [val, idx]);

    // Sort based on values
    arrWithIndex.sort((a, b) => a[0] - b[0]);

    let l = 0, r = n - 1;

    while (l < r) {
        const sum = arrWithIndex[l][0] + arrWithIndex[r][0];
        if (sum === target) {
            console.log(`${arrWithIndex[l][1]} ${arrWithIndex[r][1]}`);
            break;
        } else if (sum > target) {
            r--;
        } else {
            l++;
        }
    }
});
