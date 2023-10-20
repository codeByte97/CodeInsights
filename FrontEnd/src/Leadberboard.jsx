import React, { useEffect, useState } from 'react';
import './Leadber.css';
import { BiSolidDashboard } from 'react-icons/bi';
import FadeLoader from "react-spinners/FadeLoader";
import { Link, useNavigate } from 'react-router-dom';
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");

  useEffect(() => {
    setColor("black");
    fetch('/leaderboard')
    .then((response) => response.json())
    .then((data) => {
      setLeaderboardData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
    console.log('HIII');
  }, []);
  return (
    <>
    <br/>
    <br/>
    <div className="leaderboard" >
      <center>
        <div className='Heading'>
          LeaderBoard
        </div>
      </center>
      {loading === true ?
        <div className='loading'>
          <FadeLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader" />
        </div>
        :
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Codeforces Solved</th>
              <th>LeetCode Solved</th>
              <th>Codechef Solved</th>
              <th>Total Solved</th>
              <th>View Profile</th>
            </tr>
          </thead>
          <div className='sapce'>
          </div>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <>
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                >
                  <td >{index + 1}</td>
                  <td>{entry.username}</td>
                  <td >{entry.codeforces}</td>
                  <td>{entry.leetcode}</td>
                  <td>{entry.codechef}</td>
                  <td>{entry.total}</td>
                  <td>
                    <Link to={`/dashboard/${entry.codechefuser}/${entry.codeforcesuser}/${entry.leetcodeuser}/${entry.username}`} ><BiSolidDashboard  color='white'/></Link>
                  </td>
                </tr>
                <div className='space'>

                </div>
              </>
            ))}
          </tbody>
        </table>}
    </div>
    </>
  );
};
export default Leaderboard;