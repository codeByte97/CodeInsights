import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import useUser from './userData';
import { useNavigate, useParams } from 'react-router-dom';

function CodeEditor() {
    const [code, setCode] = useState('');
    const [Error, setError] = useState('');
    const [Compilation, setCompilation] = useState([]);
    const [time, settime] = useState();
    const [ContestName, setcontestname] = useState('black');
    const [selectedProblem, setSelectedProblem] = useState('');
    const [Problems, setProblems] = useState([]);
    const [user, setusername] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('java'); // Default language
    const [params, setparams] = useState(useParams());
    const history = useNavigate();
    useEffect(() => {
        async function FetchData() {
            try {
                console.log(params.ContestName);
                const res = await fetch(`/${params.ContestName}/Problem`)
                const result = await res.json();
                if (result.status === 200) {
                    console.log(result.Data);
                    setProblems(result.Data);
                }
            } catch (error) {
                console.log(error);
            }
            try {
                const res = await fetch(`/GetUser`)
                const result = await res.json();
                if (result.status === 200) {
                    console.log(result.Data);
                    setusername(result.Data.username);
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchData();
    }, []);
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    // Define a function to handle problem selection
    const handleProblemSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedProblem(selectedValue);
    };

    // Define a function to handle language selection
    const handleLanguageSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedLanguage(selectedValue);
    };

    const SubmitCode = async (event) => {
        event.preventDefault();
        var language = "";
        if (selectedLanguage === 'c_cpp') {
            language = 'cpp';
        }
        if (selectedLanguage === 'java') {
            language = 'java';
        }
        const result = await fetch("/compiler", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                code, language, user, selectedProblem, ContestName
            })
        });
        history(`/submission/${ContestName}`);
    }


    return (
        <div>
            <center>
                <h1>{params.ContestName}</h1>
                <form >
                    <div style={{ display: 'flex', fontSize: '1.5rem', marginLeft: '30rem' }}>
                        <label htmlFor="problemSelect">Select a Problem:</label>
                        <select
                            id="problemSelect"
                            name="problem"
                            onChange={handleProblemSelect}
                            value={selectedProblem}
                        >
                            <option key={0} value={'Select Problem'} >Select Problem</option>
                            {Problems.map((Element, index) => {
                                return <option key={index + 1} value={Element.ProblemName} >{Element.ProblemName}</option>;
                            })}
                        </select>
                    </div>
                    <br />
                    <div style={{ display: 'flex', fontSize: '1.5rem', marginLeft: '30rem' }}>
                        <label htmlFor="languageSelect">Select a Language:</label>
                        <select
                            id="languageSelect"
                            name="language"
                            onChange={handleLanguageSelect}
                            value={selectedLanguage}
                        >
                            <option value="java">Java</option>
                            <option value="c_cpp">C++</option>
                            {/* Add more language options here */}
                        </select>
                    </div>
                    <br />
                    {/* Ace Editor for code input */}
                    <center>
                        <AceEditor
                            mode={selectedLanguage}
                            theme="monokai"
                            onChange={handleCodeChange}
                            name="code-editor"
                            style={{ width: '37%' }}
                            editorProps={{ $blockScrolling: true }}
                        />
                    </center>
                    <br />
                    {/* Submit button */}
                    <button onClick={SubmitCode} style={{ width: '10rem', height: '2rem' }}>Submit</button>
                    <p style={{ color: "red" }}>{Error}</p>
                    <p style={{ color: "red" }}>{time}</p>
                    <p style={{ color: "red" }}>{Compilation}</p>
                </form>
            </center>
        </div>
    );
}

export default CodeEditor;
