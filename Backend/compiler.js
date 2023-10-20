
const executeCode = require('./executeCode');
const Schema = require('./Schemas');
const { spawn,exec } = require('child_process');
const fs = require('fs');
async function runCode(code, language, testCases,TimeLimit) {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(`test.${language}`, code);

    if (language === 'cpp') {
      exec(`g++ test.${language} -o test`, (err, stdout, stderr) => {
        if (err) {
          resolve([{ verdict: 'CE', error: stderr }]);
          return;
        }
        const results = executeCode.executeCPPCode(testCases,TimeLimit);
        resolve(results);
      });
    }
    else if (language === 'java') {
      fs.writeFileSync(`test.${language}`, code);
      const compileProcess = spawn('javac', [`test.java`]);
      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });
      compileProcess.on('close', (code, stderr, stdout, stdin) => {
        if (code === 0) {
          const results = executeCode.executeJAVACode(testCases,TimeLimit);
          console.log(results);
          resolve(results);

         
        } else {
          console.error('Java compilation failed.');
          resolve([{ verdict: "CE", error: compileError }]);
        }
      });

    }

  });
}
SubmitProblem = async (data) => {
  const code = data.code.toString();
  const language = data.language;
  const currentdate = new Date();
  const updatedUser = await Schema.User.findOneAndUpdate(
    { Email: data.user },
    {
      $push: {
        submissions: {
          ContestName: data.ContestName,
          ProblemName: data.selectedProblem,
          Code: data.code.toString(),
          result: 'In queue',
          Time: 'In queue',
          date: currentdate,
        },
      },
    },
    { new: true }
  );
  try {
    const contest = await Schema.Contest.findOne({ contestname: data.ContestName });

    if (contest) {
      const problem = contest.ProblemList.find(
        (problem) => problem.ProblemName === data.selectedProblem
      );

      if (problem) {
        const testCases = problem.TestcasesInput.map((input, index) => ({
          input: input,
          output: problem.TestcasesOutput[index],
        }));
        const result = await runCode(code, language, testCases,data.TimeLimit);

        if (result != null) {
          let CompError = '';
          let verdict = 'AC';
          var Time = 0;
          for (let i = 0; i < result.length; i++) {
            if (result[i].verdict === 'TLE') {
              verdict = result[i].verdict;
              break;
            }
            else if (result[i].verdict === 'WA') {
              verdict = result[i].verdict;
              break;
            }
            else if (result[i].verdict === 'CE') {
              verdict = result[i].verdict;
              CompError = result[i].error;
              break;
            }
            else if (result[i].verdict === 'RE') {
              verdict = result[i].verdict;
              break;
            }
            Time = Math.max(Time, parseFloat(result[i].maxtime));
          }
          const updatedUser = await Schema.User.findOneAndUpdate(
            { Email: data.user, 'submissions.ContestName': data.ContestName, 'submissions.ProblemName': data.selectedProblem, 'submissions.date': currentdate },
            {
              $set: {
                'submissions.$.result': verdict,
                'submissions.$.Time': Time,
                'submissions.$.CompilationError': CompError,
              },
            },
            { new: true }
          );
          if (updatedUser) {
            var maxtime = 0;
            result.map((Element) => {
              maxtime = Math.max(maxtime, Element.maxtime);
            });
            return { status: 200, message: "Submitted Successfully", verdict: result[0].verdict, maxtime: maxtime };
          } else {
            return { status: 422, message: "Login Required" };
          }
        }
      } else {
        console.log('Problem not found in contest.');
      }
    } else {
      console.log('Contest not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { SubmitProblem };

