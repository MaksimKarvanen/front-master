import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Open.css';

function OpenPage() {
    const navigate = useNavigate();
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [nextClassText, setNextClassText] = useState('');

    const handleClick = () => {
        navigate('/main');
    };
    useEffect(() => {
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            const months = [
                "января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря"
            ];
            const day = now.getDate();
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            setTime(formattedTime);
            setDate(formattedDate);
        }

        function updateText() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const classesTimes = ["09:00", "10:45", "13:15", "15:00", "16:45", "18:30", "20:15"];
            const currentTimeInMinutes = hours * 60 + minutes;
            let nextClass = null;
            for (let classTime of classesTimes) {
                const [classHours, classMinutes] = classTime.split(':').map(Number);
                const classTimeInMinutes = classHours * 60 + classMinutes;
                if (classTimeInMinutes > currentTimeInMinutes) {
                    nextClass = { time: classTime, timeInMinutes: classTimeInMinutes };
                    break;
                }
            }

            if (nextClass) {
                const timeDifference = nextClass.timeInMinutes - currentTimeInMinutes;
                setNextClassText(`До следующей пары осталось ${timeDifference} минут`);
            } else {
                setNextClassText("Все пары на сегодня закончены!");
            }
        }

        updateTime();
        updateText();

        const timeInterval = setInterval(updateTime, 1000);
        const textInterval = setInterval(updateText, 60000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div onClick={handleClick}>
            <div className="your_css_selector_here"></div>
            <p id="text">{nextClassText}</p>
            <div className="clock-container">
                <div id="time">{time}</div>
                <div id="date">{date}</div>
            </div>
            <h1 id="continue"> Нажмите на экран, чтобы продолжить </h1>
            <button className="translate"></button>
        </div>
    );
}

export default OpenPage;
