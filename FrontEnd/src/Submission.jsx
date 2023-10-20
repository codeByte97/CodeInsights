import React, { useEffect,  useState } from "react";
import App from './dummy';
import './Leadber.css';
import { useParams } from "react-router-dom";
function Submission() {
  const [Submision, setSubmission] = useState([]);
  const [params, setparams] = useState(useParams());
  
  useEffect(() => {
    async function FetchData() {
      try {
        const res = await fetch(`/userSubmission/${params.ContestName}`);
        const result = await res.json();
        console.log(result);
        if (result.status === 200) {
          console.log(result.Data);
          setSubmission(result.Data);
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    FetchData();
  }, [])
  return (
    <>
      <center>
        <h1>Submisions</h1>
      </center>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>ProblemName</th>
            <th>Verdict</th>
            <th>Time</th>
            <th>View Code</th>
          </tr>
        </thead>
        <div className='sapce'>
        </div>
        <tbody>
          {Submision.map((entry, index) => (
            <>
              <tr
                key={index}
                className={index % 2 === 0 ? 'even-row' : 'odd-row'}
              >
                <td style={{ color: 'white' }}>{index + 1}</td>
                <td style={{ color: 'white' }}>{entry.date}</td>
                <td style={{ color: 'white' }}>{entry.ProblemName}</td>
                <td style={{ color: `${entry.result==='AC'?'#90EE90':'white'}` }}>{entry.result}</td>
                <td style={{ color: 'white' }}>{entry.Time*1000} ms</td>
                <td><App result={entry.result} CompError={entry.CompilationError} ContestName={entry.ContestName} ProblemName={entry.ProblemName} Code={entry.Code} /></td>
              </tr>
              <div className='space'>
              </div>
            </>
          ))}
        </tbody>
      </table>
    </>)
}
export default Submission;