const User = require('./Schemas');
const leetcode = require('./leetcode');
const codechef = require('./codechef');
const codeforces = require('./codeforces');
const AddData = require('./AddData');
const Schemas = require('./Schemas');
const register = async (data) => {
    const resultleetcode = await leetcode.getLeetCodeData(data.leetcode);
    const resultcodechef = await codechef.getCodechefData(data.codechef);
    const resultcodeforces = await codeforces.ValidationCodeforces(data.codeforces);
    if (resultleetcode.status != 200) {
        return ({ status: 422, message: "leetcode" + resultleetcode.message });
    }
    if (resultcodechef.status != 200) {
        return ({ status: 422, message: "codechef" + resultcodechef.message });
    }
    if (resultcodeforces.status != 200) {
        return ({ status: 422, message: "codeforces" + resultcodeforces.message });
    }
    else {
        const result = await AddData.Adduser(data.Email, data.password, data.codechef, data.codeforces, data.leetcode);
        if (result.status === 200) {

            return ({ status: 200, message: "registered Sucessfully" });
        }
        else {
            return ({ status: 422, message: result.message });
        }
    }
}
const login = async (data) => {
    const currentuser = await Schemas.User.find({ Email: data.email }).exec();
    if (currentuser.length === 0) {
        return ({ status: 422, message: "Account does not exist" });
    }
    else if (currentuser[0].Password === data.password) {
        return ({ status: 200, message: "registered Sucessfully",usertype:currentuser[0].usertype });
    }
    else if (currentuser[0].Password !== data.password) {
        return ({ status: 422, message: "Incorrect password" });
    }
}
module.exports = { register, login }