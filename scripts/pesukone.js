const FIRST_HOUR = 8;
const LAST_HOUR = 21;
let isCurrentMonthSelected;
const today = new Date();
const monthNow = today.toLocaleString('fi', { month: 'long' });
const nextMonth = new Date()
const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
const nextMonthName = firstDayOfNextMonth.toLocaleString('fi', { month: 'long' });
let monthIndex = today.getMonth();


const initPesukone = () => {
    getWeeks(8);
    initMonthChangers();
    const th = document.querySelector(".month");  // add name of month to the table
    th.textContent = monthNow.toUpperCase();
}

const getWeeks = (monthIndex) => {
    const today = new Date();
    const yearToday = today.getFullYear();
    const firstDayOfMonth = new Date(yearToday, monthIndex, 1);
    const firstMonday = getMonday(firstDayOfMonth);
    const lastDayOfMonth = new Date(yearToday, firstDayOfMonth.getMonth() + 1, 0);
    const lastSunday = getSunday(lastDayOfMonth);
    const dayDifference = getDayDifference(firstMonday, lastSunday);
    const weeksCount = Math.round((dayDifference + 1) / 7);
    const weeks = Array(weeksCount).fill('w').map((_, weekIndex) => {
        const days = Array(7).fill('d').map((_, dayIndex) => {
            const day = new Date(firstMonday);
            day.setDate(7 * weekIndex + dayIndex + day.getDate());
            return {
                id: `${weekIndex}-${dayIndex}`,
                date: day.getDate(),
                day: day,
            }
        })
        return days;
    });

    const tableBodyElement = document.querySelector('.calendar .table-body')
    for (const week of weeks) {
        const tr = document.createElement('tr');
        for (const day of week) {
            const td = document.createElement('td');
            td.textContent = day.date;
            td.classList.add('day');
            if (new Date(day.day.toDateString()) < new Date(today.toDateString())) { // check if day is in the past and add the styles for this case
                td.classList.add('pastDay');
            }
            if (day.day.toDateString() === today.toDateString()) { // check if day is today and add styles
                td.classList.add('selected');
            }
            if (day.day >= today || day.day.toDateString() === today.toDateString()) {
                td.addEventListener("click", handleDaySelect); // add event listeners for today and future days
                td.dataset.day = day.day;                   // add data attribute with correspondent date
            }
            tr.appendChild(td);
        }
        tableBodyElement.appendChild(tr);
    }
    getDayTimeSlots(new Date());
}

const initWeekDays = () => {
    const monday = getMonday(today);
    const daysOfWeek = Array(7).fill('d').map((_, index) => {
        const dayOfWeek = new Date(monday);
        dayOfWeek.setDate(dayOfWeek.getDate() + index);
        return dayOfWeek.toLocaleDateString('fi', { weekday: 'short' });
    })
    const tableHeadRowElement = document.querySelector('.calendar .days-of-week')
    for (const dayOfWeek of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = dayOfWeek;
        th.setAttribute("style", "letter-spacing: 0.1rem;");
        tableHeadRowElement.appendChild(th);
    }
}

const initMonthChangers = () => {
    const iconBack = document.querySelector(".calendar > thead > tr > th > i");
    const iconForvard = document.querySelector(".calendar > thead > tr > th:nth-child(3) > i");
    iconBack.addEventListener("click", handlePreviousMonthSelect);
    iconBack.classList.add('hidden');
    iconForvard.addEventListener("click", handleNextMonthSelect);
}

const handlePreviousMonthSelect = () => {
    const iconBack = document.querySelector(".calendar > thead > tr > th > i");
    const iconForvard = document.querySelector(".calendar > thead > tr > th:nth-child(3) > i");
    iconBack.classList.add('hidden');
    iconForvard.classList.remove('hidden');
    const tableBodyElement = document.querySelector(".calendar > tbody")
    tableBodyElement.innerHTML = '';
    const previousMonth = monthIndex - 1;
    getWeeks(previousMonth);
    monthIndex = previousMonth;
    const th = document.querySelector(".month");  // add name of month to the table
    th.textContent = monthNow.toUpperCase();
}

const handleNextMonthSelect = () => {
    const iconBack = document.querySelector(".calendar > thead > tr > th > i");
    const iconForvard = document.querySelector(".calendar > thead > tr > th:nth-child(3) > i");
    iconForvard.classList.add('hidden');
    iconBack.classList.remove('hidden');

    const previouslySelected = document.querySelector('td.day.selected');
    previouslySelected.classList.remove('selected');

    const tableBodyElement = document.querySelector(".calendar > tbody")
    tableBodyElement.innerHTML = '';

    const nextMonth = monthIndex + 1;
    getWeeks(nextMonth);
    monthIndex = nextMonth;   
    const th = document.querySelector(".month");  // add name of month to the table
    th.textContent = nextMonthName.toUpperCase();
    const nextMonthDays = document.querySelectorAll('.calendar > tbody > tr > *');
    console.log('nextMonthDays',nextMonthDays );

    for (const day of nextMonthDays) {
        day.addEventListener("click", handleDaySelect);
    }
}

const handleDaySelect = (event) => {
    if (document.querySelector('td.day.selected')) {
        const previouslySelected = document.querySelector('td.day.selected');
        previouslySelected.classList.remove('selected');
    }
    event.target.classList.add('selected');
    getDayTimeSlots(event.target.dataset.day);
}

const getDayTimeSlots = (date) => {
    const dateCopy = new Date(date);
    const selectedDayMonth = dateCopy.toLocaleString('fi', { month: 'long' });
    const selectedDate = dateCopy.getDate();
    const th = document.querySelector('.selectedDay');
    th.textContent = `${selectedDate + ' ' + selectedDayMonth.toUpperCase() + 'TA'}`;
    const table2BodyElement = document.querySelector(".time > tbody");
    table2BodyElement.innerHTML = '';
    for (let i = FIRST_HOUR; i <= LAST_HOUR; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = `${i}:00 - ${i + 1}:00`;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        const btn = document.createElement('button');
        btn.textContent = "Varaa";
        td2.appendChild(btn);
        tr.appendChild(td2);
        table2BodyElement.appendChild(tr);  
    } 
}

const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6:1);
    return new Date(date.setDate(diff));
}
const getSunday = (d) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() + 7 - day;
    return new Date(d.setDate(diff));
}

const getDayDifference = (date1, date2) => {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}