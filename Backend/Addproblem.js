const Schema = require('./Schemas');
const fs = require('fs');
const Problemadd = async (data, TestCaseInput, TestCaseOutput, problemdecription, sampleTestInput, sampleTestOutput, Constraints, TimeLimit, res) => {
    try {
        const existingContest = await Schema.Contest.findOne({ contestname: data.contestname });

        if (!existingContest) {
            const newProblem = new Schema.Problem({
                ProblemName: data.problemname,
                ProblemDescrption: problemdecription,
                SampleInput: sampleTestInput,
                SampleOutput: sampleTestOutput,
                TestcasesInput: TestCaseInput,
                TestcasesOutput: TestCaseOutput,
                Constraints: Constraints,
                TimeLimit: parseFloat(TimeLimit),
            });

            const newContest = new Schema.Contest({
                contestname: data.contestname,
                ProblemList: [newProblem],
            });

            const result = await newContest.save();

            if (result != null) {
                return ({ status: 200, message: "Data added successfully" });
            } else {
                return ({ status: 422, message: "Some error occurred" });
            }
        } else {
            const newProblem = new Schema.Problem({
                ProblemName: data.problemname,
                ProblemDescrption: problemdecription,
                SampleInput: sampleTestInput,
                SampleOutput: sampleTestOutput,
                TestcasesInput: TestCaseInput,
                TestcasesOutput: TestCaseOutput,
                Constraints: Constraints,
                TimeLimit: parseFloat(TimeLimit),
            });

            const updatedData = await Schema.Contest.findOneAndUpdate(
                { contestname: data.contestname },
                { $push: { ProblemList: newProblem } },
                { new: true }
            );
            console.log(updatedData);
            if (updatedData !== null) {
                return ({ status: 200, message: "Submitted successfully" });
            } else {
                return ({ status: 422, message: "Some error occurred" });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return ({ status: 500, message: 'Internal server error' });
    }
}
async function handleFileUpload(req, res) {
    try {
        const data = req.body;

        const problemdecriptionContent = fs.readFileSync(req.files['problemdecription'][0].path, 'utf8');
        const sampleTestInputContent = fs.readFileSync(req.files['sampleTestInput'][0].path, 'utf8');
        const sampleTestOutputContent = fs.readFileSync(req.files['sampleTestOutput'][0].path, 'utf8');
        const ConstraintsContent = fs.readFileSync(req.files['Constraints'][0].path);
        const base64String = Buffer.from(ConstraintsContent).toString('base64');
        const TestCaseInput = [];
        const TestCaseOutput = [];
        const Constraints = base64String;
        const INPUT = req.files['TestCaseInput'];
        for (let i = 0; i < INPUT.length; i++) {
            console.log(req.files['TestCaseInput'][i].path);
            const inputContent = fs.readFileSync(req.files['TestCaseInput'][i].path, 'utf8');
            const outputContent = fs.readFileSync(req.files['TestCaseOutput'][i].path, 'utf8');
            TestCaseInput.push(inputContent);
            TestCaseOutput.push(outputContent);
        }
        Object.values(req.files).forEach((fileArray) => {
            fileArray.forEach((file) => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        });
        console.log(Constraints);
        const result = await Problemadd(data, TestCaseInput, TestCaseOutput, problemdecriptionContent, sampleTestInputContent, sampleTestOutputContent, Constraints, data.TimeLimit);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { handleFileUpload };