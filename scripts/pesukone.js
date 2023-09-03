const FIRST_HOUR = 8;
const LAST_HOUR = 21;
let isCurrentMonthSelected;
const getMonths = () => {
    // getting next 2 month dynamically
    // generate month strings Month - Year:  August 2023
    // append options to the select on the page
    const monthSelectElement = document.getElementById("kuukaudet");
    const textMonth = document.createElement('option');
    textMonth.innerText = "--kuukaudet--";
    monthSelectElement.appendChild(textMonth);

    const today = new Date();
    const months = ["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"];

    let monthNow = months[today.getMonth()];
    let nextMonth = months[today.getMonth() + 1];
    let yearNow = today.getFullYear();
    const dateToStrOne = `${monthNow} ${yearNow}`;
    const dateToStrTwo = `${nextMonth} ${yearNow}`;

    const optionOne = document.createElement('option');
    optionOne.innerText = `${dateToStrOne}`;
    optionOne.value = `${yearNow}-${today.getMonth()}`;
    monthSelectElement.appendChild(optionOne);

    const optionTwo = document.createElement('option');
    optionTwo.innerText = `${dateToStrTwo}`;
    optionTwo.value = `${yearNow}-${today.getMonth() + 1}`;
    monthSelectElement.appendChild(optionTwo);

    const parentDayElement = document.getElementById("päivät");
    const textDay = document.createElement('option');
    textDay.innerText = "--päivät--";
    parentDayElement.appendChild(textDay);

    const parentTimeElement = document.getElementById("ajat");
    const textTime = document.createElement('option');
    textTime.innerText = "--ajat--";
    parentTimeElement.appendChild(textTime);

    monthSelectElement.addEventListener('change', handleSelectMonth, false);
}

const handleSelectMonth = (event) => {
    const selectedOptionValue = event.target.value;
    const [year, month] = selectedOptionValue.split('-');
    const monthParsed = parseInt(month, 10);   // string to integer

    let date  = new Date();
    var monthToday = date.getMonth();
    if (monthParsed == monthToday) {
        isCurrentMonthSelected = true;
    } else {
        isCurrentMonthSelected = false;
    }
    const daySelectElement = document.getElementById("päivät");
    daySelectElement.removeAttribute('disabled');
    getDays();
}

const getDays = () => {
    const today = new Date();
    const dayToday = today.getDate();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastDay = lastDayOfMonth.getDate();
    const daySelectElement = document.getElementById("päivät");
    if (isCurrentMonthSelected) {
        for (let i = dayToday; i <= lastDay; i++) {
            let day = document.createElement('option');
            day.innerText = `${i}`;
            daySelectElement.appendChild(day); 
        }
    }
    else {
        for (let i = 1; i <= lastDay; i++) {
            let day = document.createElement('option');
            day.innerText = `${i}`;
            daySelectElement.appendChild(day); 
        }
    }
    daySelectElement.addEventListener('change', handleSelectDays, false);        
}

const handleSelectDays = (event) => {
    const selectedOptionValue = event.target.value;

    const timeSelectElement = document.getElementById("ajat");
    timeSelectElement.removeAttribute('disabled');
    getTime(); 
}

const getTime = () => {
    const timeSelectElement = document.getElementById("ajat");
    for (let i = FIRST_HOUR; i <= LAST_HOUR; i++) {
        let option= document.createElement('option');
        let periodOfTime = document.createElement('span');
        periodOfTime.textContent = `${i}:00 - ${i + 1}:00`;
        option.appendChild(periodOfTime);
        if (i == 19 || i == 18) {
            option.setAttribute('disabled', true);
        }
        timeSelectElement.appendChild(option);
    }
}

const initPesukone = () => {
    getMonths();
}
