import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';
import RealTimeClock from '../RealTimeClock.jsx';
function MainPage() {
    const navigate = useNavigate();

    const handleClick1 = () => {
        navigate('/rasp');
    };
    const handleClick2 = () => {
        navigate('/map');
    };
    const handleClick4 = () => {
        navigate('/info');
    };
    return (
        <>
            <div className="your_css"></div>
            <div className="frame">
                <RealTimeClock/>
                <div className="menu">
                    <button className="selectButton">Новости</button>
                    <button className="menubutton" onClick={handleClick1}>Расписание</button>
                    <button className="menubutton" onClick={handleClick2}>Карта</button>
                    <button className="menubutton" onClick={handleClick4}>Инфо</button>
                </div>
                <div className="toggle-container">
                    <p>A</p>
                    <button className="toggle-button">文</button>
                </div>
                <div className="search-container">
                    <input type="text" id="search" placeholder="Поиск..."/>
                    <div className="divider"></div>
                    <button className="Search" onClick="searchFunction()"></button>
                </div>
            </div>
        </>
    );
}

export default MainPage;