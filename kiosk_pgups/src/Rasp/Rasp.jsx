import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rasp.css';
import RealTimeClock from '../RealTimeClock.jsx';

function Rasp() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedSubgroup, setSelectedSubgroup] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://dev-info-board.ru/api/v1/schedule/faculties/')
            .then(response => response.json())
            .then(data => {
                setFaculties(data);
                setIsLoading(false); // Отключаем загрузку
            })
            .catch(error => {
                console.error('Ошибка загрузки данных факультетов:', error);
                setIsLoading(false); // Даже в случае ошибки скрываем загрузку
            });
    }, []);

    const loadCoursesForFaculty = (facultyId) => {
        fetch(`https://dev-info-board.ru/api/v1/schedule/faculties-groups/`)
            .then(response => response.json())
            .then(data => {
                const facultyData = data.find(f => f.id === facultyId);
                if (facultyData && facultyData.students_groups) {
                    const uniqueCourses = [...new Set(facultyData.students_groups.map(group => group.course_number))]
                        .sort((a, b) => a - b); // Сортируем по возрастанию
                    setCourses(uniqueCourses);
                } else {
                    setCourses([]);
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки курсов для факультета:', error);
                setCourses([]);
            });
    };

    const handleSearch = (facultyId, courseNumber) => {
        const url = `https://dev-info-board.ru/api/v1/schedule/faculties-groups/${facultyId}/?course=${courseNumber}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.students_groups) {
                    const sortedGroups = data.students_groups.sort((a, b) => a.name.localeCompare(b.name));
                    setFilteredGroups(sortedGroups);
                } else {
                    setFilteredGroups([]);
                }
            })
            .catch(error => console.error('Ошибка загрузки групп:', error));
    };

    const handleClick1 = () => navigate('/main');
    const handleClick2 = () => navigate('/map');
    const handleClick3 = () => navigate('/info');
    const handleFacultyClick = (faculty) => {
        setSelectedFaculty(faculty);
        setStep(2);
        const facultyId = faculties.find(f => f.short_name === faculty)?.id;
        loadCoursesForFaculty(facultyId);
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        const facultyId = faculties.find(faculty => faculty.short_name === selectedFaculty)?.id;
        handleSearch(facultyId, course);
        setStep(3);
    };

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setStep(4);
    };

    const handleSubgroupClick = (subgroup) => {
        setSelectedSubgroup(subgroup);
        setStep(5);
    };

    return (
        <>
            <div className="your_css_selector">
            <div className="frame">
                <RealTimeClock />
                <div className="menu">
                    <button className="menubutton" onClick={handleClick1}>Новости</button>
                    <button className="selectButton">Расписание</button>
                    <button className="menubutton" onClick={handleClick2}>Карта</button>
                    <button className="menubutton" onClick={handleClick3}>Инфо</button>
                </div>
                <div className="toggle-container">
                    <p>A</p>
                    <button className="toggle-button">文</button>
                </div>
                <div className="search-container">
                    <input type="text" id="search" placeholder="Поиск..." />
                    <div className="divider"></div>
                    <button className="Search" onClick="searchFunction()"></button>
                </div>
            </div>
            </div>

            {/* Выбор факультета */}
            <div className='choice-faculty' style={{ display: step === 1 ? 'block' : 'none' }}>
                <div className="rasp-choice-container">
                    <div className="text-container">
                        {faculties.length > 0 && <h1>Выберите факультет</h1>}
                    </div>
                    <div className="rasp-buttons-container">
                        {faculties.map((faculty, index) => (
                            <button key={index} className="rasp-choice-button" onClick={() => handleFacultyClick(faculty.short_name)}>
                                {faculty.short_name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Выбор курса */}
            <div className='choice-course' style={{ display: step === 2 ? 'block' : 'none' }}>
                <div className="rasp-choice-container">
                    <div className="text-container">
                        {courses.length > 0 && <h1>Выберите курс</h1>}
                    </div>
                    <div className="rasp-buttons-container">
                        {courses.map((course, index) => (
                            <button key={index} className="rasp-choice-button" onClick={() => handleCourseClick(course)}>
                                {course}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Выбор группы */}
            <div className='choice-group' style={{ display: step === 3 ? 'block' : 'none' }}>
                <div className="rasp-choice-container">
                    <div className="text-container">
                        {filteredGroups.length > 0 && <h1>Выберите группу</h1>}
                    </div>
                    <div className="rasp-buttons-container">
                        {filteredGroups.map((group, index) => (
                            <button key={index} className="rasp-choice-button" onClick={() => handleGroupClick(group.name)}>
                                {group.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Выбор подгруппы */}
            <div className='choice-subgroup' style={{ display: step === 4 ? 'block' : 'none' }}>
                <div className="rasp-choice-container">
                    <div className="text-container">
                        <h1>Выберите подгруппу</h1>
                    </div>
                    <div className="rasp-buttons-container">
                        {['1', '2'].map((subgroup, index) => (
                            <button key={index} className="rasp-choice-button" onClick={() => handleSubgroupClick(subgroup)}>{subgroup}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Расписание */}
            <div className='schedule-container' style={{ display: step === 5 ? 'block' : 'none' }}>
                {/* <p className="test">Факультет {selectedFaculty}</p> 
                <p className="test">Группа {selectedGroup}</p>
                <p className="test">Курс {selectedCourse}</p>
                <p className="test">Подгруппа {selectedSubgroup}</p> */}

                {/* Header расписания */}
                <div className="schedule-header">
                    {/* подгруппа */}
                    <div className="header-block subgroup-block">
                        <p>подгруппа</p>
                        <div className="subgroup-selector">
                            <button className={`subgroup-btn right-btn ${selectedSubgroup === '1' ? 'active-subgroup-1' : ''}`} onClick={() => handleSubgroupClick('1')}>
                                1
                            </button>
                            <button className={`subgroup-btn left-btn ${selectedSubgroup === '2' ? 'active-subgroup-2' : ''}`} onClick={() => handleSubgroupClick('2')}>
                                2
                            </button>
                        </div>
                    </div>
        
                    {/* дни недели */}
                    {['понедельник', 'вторник', 'среда', 'четверг', 'пятница'].map((day, index) => (
                        <div key={index} className="header-block">
                            {day}
                        </div>
                    ))}
                </div>


                {/* Сетка расписания */}
                
                
            </div>
        </>
    );
}

export default Rasp;
