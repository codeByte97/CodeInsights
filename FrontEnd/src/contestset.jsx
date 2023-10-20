import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './problemset.css';
import { Link } from "react-router-dom";
function ContestSet() {
    const [Contest, setContest] = useState({
        contestname: "",
        date: "",
    });
    const [time, setTime] = useState("");
    const NotifyError = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const Notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const handleTimeChange = (e) => {
        const inputValue = e.target.value;

        // Use a regular expression to sanitize the input and keep only digits and colons
        const sanitizedInput = inputValue.replace(/[^\d:]/g, "");

        // Format the input as HH:MM:SS
        if (sanitizedInput.length <= 2) {
            // HH format: e.g., "23"
            if (sanitizedInput <= 23) {
                setTime(sanitizedInput);
            } else {
                Notify("Hours (HH) should be less than 24.");
            }
        } else if (sanitizedInput.length <= 5) {
            // HH:MM format: e.g., "23:45"
            const hhPart = sanitizedInput.slice(0, 2);
            const mmPart = sanitizedInput.slice(3);

            if (hhPart <= 23 && mmPart <= 59) {
                setTime(hhPart + ":" + mmPart);
            } else {
                Notify("Hours (HH) should be less than 24, and minutes (MM) should be less than 60.");
            }
        } else if (sanitizedInput.length <= 8) {
            // HH:MM:SS format: e.g., "23:45:59"
            const hhPart = sanitizedInput.slice(0, 2);
            const mmPart = sanitizedInput.slice(3, 5);
            const ssPart = sanitizedInput.slice(6);

            if (hhPart <= 23 && mmPart <= 59 && ssPart <= 59) {
                setTime(hhPart + ":" + mmPart + ":" + ssPart);
            } else {
                Notify(
                    "Hours (HH) should be less than 24, minutes (MM) and seconds (SS) should be less than 60."
                );
            }
        }
    };
    const handletextchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContest({ ...Contest, [name]: value });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ContestName = Contest.contestname;
            const ContestDate = Contest.date;
            const ContestTime = time;
            const result = await fetch("/CreateContest", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    ContestName, ContestDate, ContestTime
                })
            });
            const res = await result.json();
            if (res.status === 200) {
                Notify(res.message);
                setContest({
                    contestname: "",
                    date: "",
                });
                setTime("");
            }
            else {
                NotifyError(res.message);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="SignupContainer">
                <div className="SignupBox">
                    <form onSubmit={handleSubmit}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Your Contest</h2>
                        <label style={{ fontWeight: 'bold' }}>Contest Name:</label>
                        <input
                            type="text"
                            name='contestname'
                            onChange={handletextchange}
                        />
                        <label style={{ fontWeight: 'bold' }}>Date for contest:</label>
                        <input
                            type="date"
                            name='date'
                            onChange={handletextchange}
                        />
                        <label style={{ fontWeight: 'bold' }}>Time for contest:</label>
                        <input
                            type="text"
                            placeholder="HH:MM:SS"
                            value={time}
                            maxLength={8}
                            onChange={handleTimeChange}
                        />
                        <center>
                            <button type="submit" id="Signup-btn">
                                Submit
                            </button>
                            <br />
                            <p>Already Created Contest?<Link to='/addcontest' style={{ textDecoration: "none" }}>Add Problem</Link></p>
                        </center>
                    </form>
                    <ToastContainer/>
                </div>
            </div>

        </>);
}
export default ContestSet;