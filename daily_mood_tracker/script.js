let moodData = JSON.parse(localStorage.getItem('moodData')) || {};
let selectedDay = null;
let currentDate = new Date();
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function updateHeader() {
    const header = document.getElementById('monthYear');
    header.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day';
        calendar.appendChild(emptyDay);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
        if (moodData[dateKey]) {
            day.classList.add(`mood-${moodData[dateKey]}`);
        }
        
        day.onclick = () => {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            selectedDay = dateKey;
            day.classList.add('selected');
        };
        
        calendar.appendChild(day);
    }
    updateHeader();
}

function setMood(mood) {
    if (!selectedDay) {
        alert('Please select a day first!');
        return;
    }
    
    moodData[selectedDay] = mood;
    localStorage.setItem('moodData', JSON.stringify(moodData));
    generateCalendar();
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        document.querySelector('.theme-toggle').textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
}

// Initialize
generateCalendar();