const Schemas = require('../Schemas');
const codechef = require('../codechef');
const codeforces = require('../codeforces');
const leetcode = require('../leetcode');


const getuserdata = async () => {
  try {
    const leaderboarddata = [];
    const result = await Schemas.User.find();
    await Promise.all(result.map(async (user) => {
      const resultcodechef = await codechef.getNoproblemcodehef(user.codechef);
      const resultcodeforces = await codeforces.NumberofProblemCodeforces(user.codeforces);
      const resultleetcode = await leetcode.getLeetCodeData(user.leetocde);
      const username = user.Email.substring(0, 7);
      var codeforcessolved = parseInt(resultcodeforces.message);
      var codechefsolved = parseInt(resultcodechef.message);
      var leetcodesolved = parseInt(resultleetcode.data.totalSolved);
      var totalsolved = codechefsolved + codeforcessolved + leetcodesolved;
      leaderboarddata.push({
        codeforces: resultcodeforces.status === 500 ? resultcodeforces.error : resultcodeforces.message,
        codechef: resultcodechef.message,
        leetcode: resultleetcode.data.totalSolved,
        total: totalsolved,
        codechefuser: user.codechef,
        codeforcesuser: user.codeforces,
        leetcodeuser: user.leetocde,
        username: username,
        id: user._id,
      });
    }));
    return leaderboarddata;
  } catch (error) {
    console.error("Error in getuserdata:", error);
    throw error;
  }
};
const GetParticularUserData = async (codechefuser, codeforcesuser, leetcodeuser) => {
  try {
    const ParticularUserData = [];
    const resultcodechef = await codechef.GetCodehefUserDetail(codechefuser);
    const resultcodeforces = await codeforces.GetCodeforcesUserDetail(codeforcesuser);
    const resultleetcode = await leetcode.getLeetCodeData(leetcodeuser);
    ParticularUserData.push({
      status: 200,
      codeforces: resultcodeforces.message.status !== 'OK' ? 'Temporialy Not Available' : resultcodeforces.message,
      codeforcesSolved: resultcodeforces.message.status !== 'OK' ? 'Temporialy Not Available' : resultcodeforces.NumberOfProblem,
      codeforcesColor: resultcodeforces.message.status !== 'OK' ? 'Temporialy Not Available' : resultcodeforces.Color,
      codeforcesmaxColor: resultcodeforces.message.status !== 'OK' ? 'Temporialy Not Available' : resultcodeforces.Maxcolor,
      codechef: resultcodechef.Data,
      leetcode: resultleetcode.data,
    });

    return (ParticularUserData);
  } catch (error) {
    console.error("Error in getuserdata:", error);
    throw error;
  }
};
const GetUserSubmittedProblem = async (ContestName, email) => {
  try {
    if (ContestName === 'All') {
      const result = await Schemas.User.find({ Email: email });
      const submited = [...result[0].submissions];
      return ({ status: 200, Data: submited });
    }
    else {
      const result = await Schemas.User.find({ Email: email });
      var particularSubmission = result[0].submissions.filter((submission) => {
        return submission.ContestName === ContestName;
      });
      particularSubmission.sort((a, b) => {
        return b.date - a.date;
      })
      SubmissionData = particularSubmission.map((Element) => {
        const dateTime = new Date(Element.date);
        var dateStr = dateTime.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
        const timeStr = dateTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
        dateStr +=' '+ timeStr; 
        return {
          ProblemName: Element.ProblemName, ContestName: Element.ContestName, Time: Element.Time, date: dateStr, result: Element.result, Code: Element.Code,
          CompilationError: Element.CompilationError
        };
      })

      return ({ status: 200, Data: SubmissionData });
    }
  }
  catch (error) {
    console.log(error);
  }
}


module.exports = { getuserdata, GetParticularUserData, GetUserSubmittedProblem };
