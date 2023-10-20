
const Userschema = require("./Schemas");
const Adduser = async (email, password, Codechef, Codeforces, Leetcode) => {
    const result = await Userschema.User.find({ Email: email });
    if (result.length !== 0) {
        return ({ status: 422, message: "User Already Exists" });
    }
    else {
        try {
            const newuser = new Userschema.User({
                Email: email,
                Password: password,
                codechef: Codechef,
                codeforces: Codeforces,
                leetocde: Leetcode,
            });
            const result = await newuser.save();
            if (result != null) {
                return ({ status: 200, message: "data added sucessfully" });
            }
            else {
                return ({ status: 422, message: "Some Error ocuured" });
            }
        }
        catch (err) {
            console.log(err);
            return ({ status: 422, message: err });
        }
    }
}
module.exports = { Adduser };