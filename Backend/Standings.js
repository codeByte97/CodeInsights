const Schema = require('./Schemas');
const UpdateStandings = async (data, email) => {
    try {
        const current = new Date();
        const result = await Schema.Contest.findOne({ contestname: data.ContestName });
        if (current >= result.constesttime && current <= result.ConstestEndTime) {
            const exist = await Schema.RankList.findOne({ ContestName: data.ContestName });
            const Standingexist = exist.findOne({ id: email });
            if (Standingexist !== null) {

            }
            else {
                 
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = { UpdateStandings };