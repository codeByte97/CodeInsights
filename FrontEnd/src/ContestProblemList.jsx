import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import './contestlist.css';
import Timer from "./Timer";
function ContestProblemList() {
    const [ProblemList, setProblemList] = useState([]);
    const [Parmas] = useState(useParams());
    const history = useNavigate();
    const [Loading, setLoading] = useState(true);
    const [Time, setTime] = useState('');
    const [NotStarted, setNotstarted] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await fetch(`/${Parmas.contestname}/Problem`);
                const response = await result.json();
                if (response.status === 200) {
                    console.log(response.Data);
                    setProblemList(response.Data);
                    setLoading(false);
                }
                else if (response.status === 422) {
                    setTime(response.ContestTime);
                    setNotstarted(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [Parmas.contestname]);
    const handleProblemClick = async (data) => {
        history(`/Problem/${Parmas.contestname}/${data}`);
    }

    return (
        <>
            {
                <div>
                    <div className="leaderboard">
                        <center>
                            <div className={`headconpro ${Parmas.contestname.length > 15 ? "long-name" : 'short-name'}`}>
                                {Parmas.contestname}
                            </div>
                        </center>
                        {Loading === true ? (
                            <div className='loading'>
                                <FadeLoader
                                    color='black'
                                    loading={Loading}
                                    size={150}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                        ) : (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>Problem</th>
                                            <th>Submission</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {ProblemList.map((entry, index) => (
                                            <>
                                                <br />
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                                                >
                                                    <td className='td-contest'>{index + 1}</td>
                                                    <td className='td-contest' onClick={() => handleProblemClick(entry.ProblemName)}  >{entry.ProblemName}</td>
                                                    <td className='td-contest'>1</td>
                                                </tr>
                                                <div className='sapce'>
                                                </div>
                                            </>
                                        ))}

                                    </tbody>
                                </table>
                                <center>
                                {NotStarted && <Timer Time={Time} />}
                                </center>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default ContestProblemList;
