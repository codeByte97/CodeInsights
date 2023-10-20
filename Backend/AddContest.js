const Schema = require('./Schemas');

const AddContest = async (data) => {
    const CDate = data.ContestDate;
    const CTime = data.ContestTime;
    const dateParts = CDate.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1] - 1, 10);
    const year = parseInt(dateParts[2], 10);
    const timeParts = CTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    const dateTime = new Date(year, month, day, hours, minutes, seconds);
    try {
        const resultquery = await Schema.Contest.find({ contestname: data.ContestName });
        if (resultquery.length !== 0) {
            return ({ Status: 422, message: "Contest Name Already Exist,Try Another" });
        }
        const newContest = new Schema.Contest({
            contestname: data.ContestName,
            constesttime: dateTime,
        });
        const result = await newContest.save();
        if (result !== null) {
            return ({ Status: 200, message: "Contest Added Sucessfully" });
        }
        else {
            return ({ Status: 422, message: "Some Error Ocuured,Try again!" });
        }
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = { AddContest };