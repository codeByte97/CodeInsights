const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const Auth = require('./auth');
const GetData = require('./GetData/GetUserData');
const Contest = require('./GetData/GetContestData');
const Problem = require('./GetData/GetProblemData');
const session = require('express-session');
const AddContest = require('./AddContest');
const multer = require('multer');
const Problemsubmit = require('./compiler');
const AddProblem = require('./Addproblem');
var MongoDBStore = require('connect-mongodb-session')(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/CodeInsights", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connection sucessfull.....')).catch((err) => console.log(err));
const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/session-store',
    collection: 'sessions',
    ttl:24*60*60*1000,
});

store.on('error', (error) => {
    console.error('Session store error:', error);
});


app.use(session({
    secret: '5722AD289C6A7C68FE7D4EF22D683',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:24*60*60*1000,
    },
    store: store,
}));
app.get('/', (req, res) => {
    res.send('Send Sucessfully');
});
app.get('/userSubmission/:ContestName', async (req, res) => {
    const ContestName = req.params.ContestName;
    const username = req.session.user;
    console.log(username);
    const result = await GetData.GetUserSubmittedProblem(ContestName, username.username);
    res.send(result);
});
app.get('/leaderboard', async (req, res) => {
    const result = await GetData.getuserdata();
    result.sort((a, b) => b.total - a.total);
    res.json(result);

});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Change 'uploads/' to your desired directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
app.get('/date', (req, res) => {
    const date = new Date();
    res.send(date);
});

const upload = multer({ storage });
app.post('/addproblem', upload.fields([
    { name: 'problemdecription' },
    { name: 'sampleTestInput' },
    { name: 'sampleTestOutput' },
    { name: 'TestCaseInput' },
    { name: 'TestCaseOutput' },
    { name: 'Constraints' },]), async (req, res) => {

        const result = await AddProblem.handleFileUpload(req, res);
        console.log(result);
        res.json(result);
    });
app.post('/CreateContest', async (req, res) => {
    const data = req.body;
    const result = await AddContest.AddContest(data);
    res.send(result);
});
app.get('/contests', async (req, res) => {
    const result = await Contest.GetContestList();
    res.send(result);
});
app.get('/UpcomingContests', async (req, res) => {
    const result = await Contest.GetUpcomingContestList();
    res.send(result);
});
app.get('/:contest/Problem', async (req, res) => {
    const ContestName = req.params.contest;
    const result = await Problem.GetProblemList(ContestName);
    res.send(result);
});
app.get('/:contest/:ProblemName', async (req, res) => {
    const ContestName = req.params.contest;
    const ProblemName = req.params.ProblemName;
    const result = await Problem.GetProblem(ContestName, ProblemName);
    res.send(result);
});
app.post('/register', async (req, res) => {
    const data = req.body;
    const result = await Auth.register(data);
    res.send(result);
});
app.get('/DashBoard/:codechef/:codeforces/:leetcode', async (req, res) => {
    const codechef = req.params.codechef;
    const codeforces = req.params.codeforces;
    const leetcode = req.params.leetcode;
    const result = await GetData.GetParticularUserData(codechef, codeforces, leetcode);
    res.json(result);

});
app.post('/compiler', async (req, res) => {
    const data = req.body;
    const result = await Problemsubmit.SubmitProblem(data);
    res.send(result);
});
app.post('/login', async (req, res) => {
    const data = req.body;
    const result = await Auth.login(data);
    req.session.user = { username: data.email, usertype: result.usertype };
    res.json(result);
});
app.get('/GetUser', async (req, res) => {
    res.send({ status: 200, Data: req.session.user });
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        else {
            res.send({ status: 200, message: "Logout Sucessfully" });
        }
    });
});
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});




