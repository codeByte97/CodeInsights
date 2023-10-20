const Schema = require('../Schemas');
const GetContestList = async () => {
    const currentDate = new Date();
    let ContestList = [];
    try {
        const result = await Schema.Contest.find({ constesttime: { $lte: currentDate } });
        result.map((Element) => {
            const dateTime = new Date(Element.constesttime);
            const dateStr = dateTime.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
            const timeStr = dateTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            ContestList.push({ ContestName: Element.contestname, ContestTime: Element.constesttime, ContestTime: timeStr, ContestDate: dateStr });
        });
        return ({ status: 200, Data: ContestList });

    }
    catch (error) {
        console.log(error)
    }

}
const GetUpcomingContestList = async () => {
    const currentDate = new Date();
    let ContestList = [];
    try {
        const result = await Schema.Contest.find({ constesttime: { $gte: currentDate } }).limit(4);
        result.map((Element) => {
            const dateTime = new Date(Element.constesttime);
            const dateStr = dateTime.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
            const timeStr = dateTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            ContestList.push({ ContestName: Element.contestname, ContestTime: timeStr, ContestDate: dateStr });
        });
        return ({ status: 200, Data: ContestList });

    }
    catch (error) {
        console.log(error)
    }

}
module.exports = { GetContestList, GetUpcomingContestList };