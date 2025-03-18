import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './Main/Mainpage.jsx';
import Rasp from './Rasp/Rasp.jsx';
import OpenPage from './Open/Open.jsx';
import Map from './Map/Map.jsx';
import InfoPage from './Info/Info.jsx';

function App() {
    const [inactiveTime, setInactiveTime] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const handleUserActivity = () => {
            setInactiveTime(0);
        };
        const events = ['mousemove', 'keydown', 'click', 'scroll'];
        events.forEach(event => window.addEventListener(event, handleUserActivity));

        const timer = setInterval(() => {
            setInactiveTime(prev => prev + 1);
        }, 1000);
        if (inactiveTime >= 600) {
            navigate('/');
        }
        return () => {
            clearInterval(timer);
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
        };
    }, [inactiveTime, navigate]);

    return (
        <Routes>
            <Route path="/" element={<OpenPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/rasp" element={<Rasp />} />
            <Route path="/map" element={<Map />} />
            <Route path="/info" element={<InfoPage />} />
        </Routes>
    );
}

export default App;
