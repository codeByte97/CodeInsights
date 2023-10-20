import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './problemset.css';
import { Link } from "react-router-dom";
function TestCaseForm() {
    const [Error, setError] = useState('');
    const [problem, setProblem] = useState({
        contestname: "",
        problemname: "",
        problemdecription: "",
        Constraints: "",
        TimeLimit: "",
        SampleTestInput: "",
        SampleTestOutput: "",
    });
    const Notify = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const NotifySucess = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const [TestCaseInput, setTestCaseInput] = useState([]);
    const [TestCaseOutput, setTestCaseOutput] = useState([]);
    const handletextchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProblem({ ...problem, [name]: value });
    }
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (event.target.name === 'sample_input') {
            setProblem({ ...problem, 'SampleTestInput': selectedFiles[0] })
        }
        else if (event.target.name === 'sample_output') {
            setProblem({ ...problem, 'SampleTestOutput': selectedFiles[0] });
        }
        else if (event.target.name === 'test_input') {
            let TestcaseInput = [...TestCaseInput];
            TestcaseInput.push(selectedFiles[0]);
            setTestCaseInput(TestcaseInput);
        }
        else if (event.target.name === 'test_output') {
            let TestcaseOutput = [...TestCaseOutput];
            TestcaseOutput.push(selectedFiles[0]);
            setTestCaseOutput(TestcaseOutput);
        }
        else if (event.target.name === 'problemdecription') {
            setProblem({ ...problem, 'problemdecription': selectedFiles[0] });
        }
        else if (event.target.name === 'Constraints') {
            setProblem({ ...problem, 'Constraints': selectedFiles[0] });
        }
    };

    const handleAddSample = () => {
        const sampleInputFile = document.querySelector(".sample-input");
        const sampleOutputFile = document.querySelector(".sample-output");

        if (sampleInputFile && sampleInputFile.files.length > 0 && sampleOutputFile && sampleOutputFile.files.length > 0) {
            // Both Sample Input and Sample Output are filled, so add a new set of fields
            const newSampleInput = document.createElement("input");
            newSampleInput.type = "file";
            newSampleInput.accept = ".txt";
            newSampleInput.name = 'test_input';
            newSampleInput.required = true;
            newSampleInput.className = "sample-input";
            newSampleInput.addEventListener("change", handleFileChange);

            const newSampleOutput = document.createElement("input");
            newSampleOutput.type = "file";
            newSampleOutput.accept = ".txt";
            newSampleOutput.name = 'test_output';
            newSampleOutput.required = true;
            newSampleOutput.className = "sample-output";
            newSampleOutput.addEventListener("change", handleFileChange);
            const sampleInputLabel = document.querySelector(".sample-input-label");
            const sampleOutputLabel = document.querySelector(".sample-output-label");

            sampleInputLabel.appendChild(newSampleInput);
            sampleOutputLabel.appendChild(newSampleOutput);
        } else {
            Notify('Please fill both Sample Input and Sample Output before adding more.');
        }
    };
    const handleDeleteSample = () => {
        // Remove the last added sample input and output fields
        const sampleInputs = document.querySelectorAll(".sample-input");
        const sampleOutputs = document.querySelectorAll(".sample-output");

        if (sampleInputs.length > 1 && sampleOutputs.length > 1) {
            // Remove the last added input and output fields
            sampleInputs[sampleInputs.length - 1].remove();
            sampleOutputs[sampleOutputs.length - 1].remove();
        } else {
            Notify('You cannot delete the initial sample input and output fields.');
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const contestname = problem.contestname;
        const problemname = problem.problemname;
        const TimeLimit = problem.TimeLimit;

        formData.append('contestname', contestname);
        formData.append('problemname', problemname);
        formData.append('TimeLimit', TimeLimit);
        const problemdecriptionFile = document.querySelector('input[name="problemdecription"]').files[0];
        const sampleTestInputFile = document.querySelector('input[name="sample_input"]').files[0];
        const sampleTestOutputFile = document.querySelector('input[name="sample_output"]').files[0];
        const ConstraintsFile = document.querySelector('input[name="Constraints"]').files[0];
        if (problemdecriptionFile && sampleTestInputFile && sampleTestOutputFile) {
            formData.append('problemdecription', problemdecriptionFile, problemdecriptionFile.name);
            formData.append('sampleTestInput', sampleTestInputFile, sampleTestInputFile.name);
            formData.append('sampleTestOutput', sampleTestOutputFile, sampleTestOutputFile.name);
            formData.append('Constraints', ConstraintsFile, ConstraintsFile.name);
        }

        // Append TestCaseInput and TestCaseOutput files together
        for (let i = 0; i < TestCaseInput.length; i++) {

            formData.append('TestCaseInput', TestCaseInput[i], TestCaseInput[i].name);
            formData.append('TestCaseOutput', TestCaseOutput[i], TestCaseOutput[i].name);
        }
        const result = await fetch('/addproblem', {
            method: "POST",
            body: formData,
        });
        const res = await result.json();
        if (res.status === 200) {
             NotifySucess(res.message);
            setProblem({
                contestname: `${contestname}`,
                problemname: "",
                problemdecription: "",
                SampleTestInput: "",
                SampleTestOutput: "",
            });
            setTestCaseInput([]);
            setTestCaseOutput([]);
        }
        else {
            Notify(res.message);
            setError(res.error);
        }
    };

    return (
        <>
            <div className="SignupContainer">
                <div className="SignupBox">
                    <form onSubmit={handleSubmit}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Problem Description</h2>
                        <label style={{ fontWeight: 'bold' }}>Contest Name:</label>
                        <input
                            type="text"
                            name='contestname'
                            required
                            onChange={handletextchange}
                        />
                        <label style={{ fontWeight: 'bold' }}>Problem Name:</label>
                        <input
                            type="text"
                            id="fileInput"
                            accept=".txt"
                            required
                            name='problemname'
                            onChange={handletextchange}
                        />
                        <div className="form-group">
                            <label htmlFor="problemDescription" className="form-label" style={{ fontWeight: 'bold' }}>
                                Problem Description:
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".txt"
                                name='problemdecription'
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="labels">
                            <div className="form-group">
                                <label style={{ fontWeight: 'bold', marginLeft: '0rem' }}>Constraints</label>
                                <input name="Constraints" style={{ marginLeft: '1rem' }} type="file" accept=".png" />
                            </div>
                            <div className="form-group">
                                <label style={{ fontWeight: 'bold', marginLeft: '6rem' }}>Time Limit in s</label>
                                <input style={{ marginLeft: '6rem' }} type="text" placeholder="Time in s" />
                            </div>
                        </div>
                        <div className="labels">
                            <label htmlFor="testCases" className="form-label" style={{ fontWeight: 'bold' }}>
                                Upload Test Cases:
                            </label>
                            <div className="sample-input-label" style={{ marginTop: '-10px' }}>
                                <div style={{ marginLeft: '10px' }}>
                                    <label htmlFor="sampleInput" className="form-label" style={{ fontWeight: 'bold' }}>
                                        Sample Input:
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    accept=".txt"
                                    name="test_input"
                                    className="sample-input"
                                    required
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="sample-output-label" style={{ marginLeft: '10px', marginTop: '-10px' }}>
                                <div style={{ marginLeft: '10px' }}>
                                    <label htmlFor="sampleOutput" className="form-label" style={{ fontWeight: 'bold' }}>
                                        Sample Output:
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    accept=".txt"
                                    name="test_output"
                                    required
                                    className="sample-output"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <br />
                        <center>
                            <div style={{ display: 'flex' }}>
                                <button type="button" style={{ marginLeft: '20rem' }} onClick={handleAddSample} id="Sagnup-btn">
                                    Add Sample
                                </button>
                                <button type="button" style={{ marginLeft: '5rem' }} onClick={handleDeleteSample} id="Sagnup-btn">
                                    delete
                                </button>
                            </div>
                        </center>
                        <div className="form-group" style={{ fontWeight: 'bold' }}>
                            Sample Input:
                            <input
                                type="file"
                                id="testCases"
                                name="sample_input"
                                accept=".txt"
                                required
                                onChange={handleFileChange}
                            />
                            Sample Output:
                            <input
                                type="file"
                                id="testCases"
                                name="sample_output"
                                accept=".txt"
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                        <center>
                            <br />
                            <p>{Error}</p>
                            <button type="submit" id="Signup-btn">
                                Submit
                            </button>
                            <br />
                            <p style={{ fontSize: '1.2rem' }}>Don't Have Contest?<Link to='/setcontest' style={{ textDecoration: 'none' }}>Create Contest</Link></p>
                        </center>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </>
    );
}
export default TestCaseForm;