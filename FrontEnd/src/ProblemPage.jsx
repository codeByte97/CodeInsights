import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { MdContentCopy } from 'react-icons/md';
import { IoMdCheckmarkCircle } from "react-icons/io";
import './ProblemPage.css';
function ProblemPage() {
    const [Problem, setProblem] = useState({});
    const [Parmas] = useState(useParams());
    const history = useNavigate();
    const [CopiedInput, setCopiedInput] = useState(false);
    const [CopiedOutput, setCopiedOutput] = useState(false);
    const outputRef = useRef(null);
    const inputRef = useRef(null);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await fetch(`/${Parmas.contestname}/${Parmas.ProblemName}`);
                const response = await result.json();
                if (response.status === 200) {
                    setProblem(response.Data[0]);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);



    const handleCopy = (data) => {

        if (data === 'input') {
            if (inputRef.current) {
                // Select the text inside the <pre> element
                const textToCopy = inputRef.current.textContent;
                console.log(textToCopy);
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();

                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopiedInput(true);
            setTimeout(function () {
                setCopiedInput(false);
            }, 500);
        } else {
            if (outputRef.current) {
                // Select the text inside the <pre> element
                const textToCopy = outputRef.current.textContent;
                console.log(textToCopy);
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();

                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopiedOutput(true);
            setTimeout(function () {
                setCopiedOutput(false);
            }, 500);
        }
    }
    return (
        <>
            {
                <div>
                    <div className="leaderboard">
                        <center>
                            <div className={`headconpro ${Parmas.contestname.length > 15 ? "long-name" : 'short-name'}`}>
                                {Parmas.ProblemName}
                            </div>
                        </center>
                        <div className="Subpro">
                            <center className="List-link-problem">
                                <div id="Problem"><Link to={`/Contest/${Parmas.contestname}`} style={{ textDecoration: 'none', color: 'blue' }}>Problem</Link></div>
                                <div id="Submission"><Link to={`/Submission/${Parmas.contestname}`} style={{ textDecoration: 'none', color: 'blue' }}>Submission</Link></div>
                                <div id="Standing"> <Link to='' style={{ textDecoration: 'none', color: 'blue' }}>Standing</Link></div>
                                <div id="submit"><Link to={`/submit/${Parmas.contestname}`} style={{ textDecoration: 'none', color: 'blue' }} >Submit</Link></div>
                            </center>
                        </div>
                        <br />
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

                                <pre className="pre-wrap">{Problem.ProblemDescrption}</pre>
                                <h1>Constraints</h1>
                                <img src={`data:image/png;base64,${Problem.Constraints}`} alt="Constraiants" />
                                <h1 >Sample TestCases</h1>
                                <div className="Input">
                                    {CopiedInput === true ? <IoMdCheckmarkCircle color="#3FFF00" className="copy-icon" /> : <MdContentCopy onClick={() => handleCopy('input')} className="copy-icon" />}
                                    <pre className="pre-wrap" ref={inputRef} id='input' >{Problem.SampleInput}</pre>
                                </div>
                                <br />
                                <div className="Output">
                                    {CopiedOutput === true ? <IoMdCheckmarkCircle color="#3FFF00" className="copy-icon" /> : <MdContentCopy onClick={() => handleCopy('output')} className="copy-icon" />}
                                    <pre className="pre-wrap" ref={outputRef} id="output">{Problem.SampleOutput}</pre>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default ProblemPage;
