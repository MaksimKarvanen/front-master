import { useNavigate } from 'react-router-dom';
import './Info.css'
import RealTimeClock from '../RealTimeClock.jsx';
function InfoPage() {
    const navigate = useNavigate();
    const handleClick1 = () => {
        navigate('/main');
    };
    const handleClick2 = () => {
        navigate('/rasp');
    };
    const handleClick3 = () => {
        navigate('/map');
    };
    return (
        <>
            <div className="your_css"></div>
            <div className="frame">
                <RealTimeClock/>
                <div className="menu">
                    <button className="menubutton" onClick={handleClick1}>Новости</button>
                    <button className="menubutton" onClick={handleClick2}>Расписание</button>
                    <button className="menubutton" onClick={handleClick3}>Карта</button>
                    <button className="selectButton">Инфо</button>
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

export default InfoPage;
