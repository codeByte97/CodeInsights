import LeetCodeCard from "./leetcode";
import CodeForceCard from "./codeforcescard";
import FadeLoader from "react-spinners/FadeLoader";
import CodeChefCard from "./codechefcard";
import './dashboard.css';
import { Chart } from "./DashboardChart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const { codechef, codeforces, leetcode,username } = useParams();
    let [color, setColor] = useState("");
    useEffect(() => {
        setColor("black");
        async function fetchData() {
            try {
                const response = await fetch(`/DashBoard/${codechef}/${codeforces}/${leetcode}`);
                const JsonData = await response.json();
                setData(JsonData[0]);
                setloading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();

    }, []);
    return (
        <center>
            {loading === true ?
                <div style={{ marginTop: '20rem' }}>
                    <FadeLoader
                        color={color}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader" /></div> :
                <>
                <h1 style={{width:'10px',height:''}}>{username}</h1>
                    <div className="card-con">

                        <CodeForceCard
                            username={codeforces}
                            handle={data.codeforces.result[0].handle}
                            rank={data.codeforces.result[0].rank}
                            maxrank={data.codeforces.result[0].maxRank}
                            rating={data.codeforces.result[0].rating}
                            maxrating={data.codeforces.result[0].maxRating}
                            color={data.codeforcesColor}
                            maxcolor={data.codeforcesmaxColor}
                        />

                        <LeetCodeCard
                            username={leetcode}
                            totalSolved={data.leetcode.totalSolved}
                            hardSolved={data.leetcode.hardSolved}
                            mediumSolved={data.leetcode.mediumSolved}
                            easySolved={data.leetcode.easySolved}
                            rank={data.leetcode.ranking}
                        />
                        <CodeChefCard
                            username={codechef}
                            currentrating={data.codechef.currentRating}
                            highestrating={data.codechef.highestRating}
                            globalrank={data.codechef.globalRank}
                            countryrank={data.codechef.countryRank}
                            stars={data.codechef.stars}
                            color={data.codechef.color}

                        />
                    </div>
                    <div className="Chart">
                        <Chart codeforces={data.codeforcesSolved} codechef={data.codechef.numberofproblem} leetcode={data.leetcode.totalSolved} />
                    </div>
                </>
            }
        </center>
    )
}
export default Dashboard;