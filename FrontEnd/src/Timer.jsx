import React, { useEffect, useState } from "react";
import "./Timer.css";
function Timer(props) {
    const targetDate = new Date(props.Time);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    function calculateTimeRemaining() {
        const now = new Date();
        const timeDifference = targetDate - now;
        if (timeDifference <= 0) {
            // Target date has passed
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Contest Starts In</h1>
            <div style={{ fontSize: '4rem', color: 'black' }}>
                <span id="Timer1" className="Timer"> {timeRemaining.days !== 0 && timeRemaining.days}  </span>
                <span  id="Timer2" className="Timer">{timeRemaining.hours !== 0 && timeRemaining.hours} </span>
                <span id="Timer3" className="Timer">{timeRemaining.minutes !== 0 && timeRemaining.minutes} </span>
                <span  id="Timer4" className="Timer">{timeRemaining.seconds !== 0 && timeRemaining.seconds}</span>
            </div>
        </div>
    );
}

export default Timer;
