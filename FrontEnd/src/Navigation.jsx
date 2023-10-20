import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Singin";
import Leaderboard from "./Leadberboard";
import Signup from "./singup";
import CodeEditor from "./compiler";
import TestCaseForm from "./problemset";
import Dashboard from "./Dashboard";
import ContestList from "./contestlist";
import HomePage from "./HomePage";
import ContestProblemList from "./ContestProblemList";
import ProblemPage from "./ProblemPage";
import ContestSet from "./contestset";
import Proctected from "./Proctected";
import Submission from "./Submission";
import Avatar from "./avatar";
function Navbar() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage />}></Route>
                    <Route exact path="/Avatar" element={<Avatar/>}></Route>
                    <Route exact path="/submission/:ContestName" element={<Submission/>}></Route>
                    <Route exact path="/Signup" element={<Signup />}></Route>
                    <Route exact path="/setcontest" element={<Proctected><ContestSet /></Proctected>}></Route>
                    <Route exact path="/addcontest" element={<Proctected><TestCaseForm /></Proctected>}></Route>
                    <Route exact path="/Signin" element={<Signin />}></Route>
                    <Route exact path="/leaderboard" element={<Leaderboard />}></Route>
                    <Route exact path="/dashboard/:codechef/:codeforces/:leetcode/:username" element={<Dashboard />}></Route>
                    <Route exact path="/submit/:ContestName" element={<CodeEditor />}></Route>
                    <Route exact path="/Contest/:contestname" element={<ContestProblemList />}></Route>
                    <Route exact path="/Problem/:contestname/:ProblemName" element={<ProblemPage />}></Route>
                    <Route exact path="/contestlist" element={<ContestList />}></Route>
                    <Route exact path="*" element={<div style={{ color: "white", fontSize: "10rem" }}>Page Not Found</div>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Navbar;