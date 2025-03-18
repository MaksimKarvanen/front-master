import React, { useState, useEffect } from 'react';

const RealTimeClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const formatTime = (date) => {
        return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    };
    return <p className="time2">{formatTime(time)}</p>;
};
export default RealTimeClock;