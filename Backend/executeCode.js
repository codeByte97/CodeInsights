const fs = require('fs');
const { spawn } = require('child_process');
const { resolve } = require('path');
function executeCPPCode(testCases, TimeLimit) {

    let results = [];
    return new Promise((resolve, reject) => {
        testCases.forEach(testCase => {
            // Create a writable stream for the output
            fs.writeFileSync('input.txt', testCase.input);
            fs.writeFileSync('output.txt', testCase.output);
            const outputFile = fs.createWriteStream('Problemout.txt');

            // Run the code with the input from the input file
            const process = spawn('./test');
            const inputFile = fs.createReadStream('input.txt');
            inputFile.pipe(process.stdin);
            process.stdin.on('error', (err) => {
                if (err.code === 'EPIPE') {
                    resolve([{ verdict: 'TLE', error: err }]);
                }
                console.error('stdin error:', err);
            });
            process.stdout.pipe(outputFile);

            let error = '';
            process.stderr.on('data', (data) => {
                error += data.toString();
            });
            const startTime = Date.now();

            process.on('close', (code) => {
                if (code !== 0) {
                    results.push({ verdict: 'RE', error });
                    resolve(results);
                }
                const executionTime = (Date.now() - startTime) / 1000;
                if (executionTime > (parseFloat(TimeLimit) / 1000)) {
                    results.push({ verdict: 'TLE', maxtime: executionTime });
                    resolve(results);
                }
                const expectedOutput = fs.readFileSync('output.txt', 'utf8');
                const output = fs.readFileSync('Problemout.txt', 'utf8');
                const lines1 = expectedOutput.split('\n');
                const lines2 = output.split('\n');
                let flag = 1;
                for (let i = 0; i < lines1.length; i++) {
                    if (lines1[i].trim() !== lines2[i].trim()) {
                        flag = 0;
                        results.push({ verdict: 'WA', maxtime: executionTime });
                        break;
                    }
                }
                if (flag) {
                    results.push({ verdict: 'AC', maxtime: executionTime });
                }

                // If all test cases have been processed, resolve the promise with the results
                if (results.length === testCases.length) {
                    resolve(results);
                }
            });
        });
    });
}
function executeJAVACode(testCases, TimeLimit) {
    let results = [];
    return new Promise((resolve, reject) => {
        testCases.forEach(testCase => {
            // Create a writable stream for the output
            const outputFile = fs.createWriteStream('RequiredOutput.txt');
            fs.writeFileSync('input.txt', testCase.input);
            fs.writeFileSync('output.txt', testCase.output);
            // Run the code with the input from the input file
            const process = spawn('java', ['test']);
            const inputFile = fs.createReadStream('input.txt');
            inputFile.pipe(process.stdin);
            process.stdin.on('error', (err) => {
                if (err.code === 'EPIPE') {
                    resolve([{ verdict: 'TLE', error: err }]);
                }
                // Handle other 'error' events gracefully  
                console.error('stdin error:', err);
            });
            // Pipe the program's stdout to the output file
            process.stdout.pipe(outputFile);

            let error = '';
            process.stderr.on('data', (data) => {
                error += data.toString();
            });
            const startTime = Date.now();

            process.on('close', (code) => {
                if (code !== 0) {
                    results.push({ verdict: 'RE', error });
                    resolve(results);
                }
                const executionTime = (Date.now() - startTime) / 1000;
                // Compare the output with the expected output file
                if (executionTime > (parseFloat(TimeLimit) / 1000)) {
                    results.push({ verdict: 'TLE', maxtime: executionTime });
                    resolve(results);
                }
                const expectedOutput = fs.readFileSync('output.txt', 'utf8');
                const output = fs.readFileSync('RequiredOutput.txt', 'utf8');
                const lines1 = expectedOutput.split('\n');
                const lines2 = output.split('\n');
                let flag = 1;
                for (let i = 0; i < lines1.length; i++) {
                    if (lines1[i].trim() !== lines2[i].trim()) {
                        flag = 0;
                        results.push({ verdict: 'WA', maxtime: executionTime });
                        break;
                    }
                }
                if (flag) {

                    results.push({ verdict: 'AC', maxtime: executionTime });
                }

                // If all test cases have been processed, resolve the promise with the results
                if (results.length === testCases.length) {
                    resolve(results);
                }
            });
        });
    });
}
module.exports = { executeCPPCode, executeJAVACode };