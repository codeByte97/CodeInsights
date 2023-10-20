const Schema = require('../Schemas');

const GetProblemList = async (ContestName) => {
    let ProblemList = [];
    const currentDate = new Date();
    try {
        const result = await Schema.Contest.find({ contestname: ContestName });
        if (result[0].constesttime > currentDate) {
            return ({ status: 422, Data: "Contest Has Not Started", ContestTime: result[0].constesttime });
        }
        else {
            const problems = result[0].ProblemList;
            problems.map((Element) => {
                ProblemList.push({ ProblemName: Element.ProblemName });
            });
            return ({ status: 200, Data: ProblemList });
        }
    }
    catch (error) {
        console.log(error)
    }

}
const GetProblem = async (ContestName, ProblemName) => {
    let Problem = [];
    try {
        const result = await Schema.Contest.find({ contestname: ContestName });
        const problems = result[0].ProblemList.find(Problem => Problem.ProblemName === ProblemName);
        Problem.push({ ProblemName: problems.ProblemName, ProblemDescrption: problems.ProblemDescrption, TimeLimit: problems.TimeLimit, Constraints: problems.Constraints, SampleInput: problems.SampleInput, SampleOutput: problems.SampleOutput });
        return ({ status: 200, Data: Problem });

    }
    catch (error) {
        console.log(error)
    }

}
module.exports = { GetProblem, GetProblemList };