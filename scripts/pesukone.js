const getMonths = () => {
    // getting next 2 month dynamically
    // generate month strings Month - Year:  August 2023
    // append options to the select on the page

    const monthSelectElement = document.getElementById("kuukaudet");
    const textMonth = document.createElement('option');
    textMonth.innerText = "--kuukaudet--";
    monthSelectElement.appendChild(textMonth);

    const today = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // TODO: next year to handle
    let monthNow = months[today.getMonth()];
    let nextMonth = months[today.getMonth() + 1];
    let yearNow = today.getFullYear();
    const dateToStrOne = `${monthNow} ${yearNow}`;
    const dateToStrTwo = `${nextMonth} ${yearNow}`;

    const optionOne = document.createElement('option');
    optionOne.innerText = `${dateToStrOne}`;
    optionOne.value = monthNow;
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

    monthSelectElement.addEventListener('change', handleSelectMonth, false);


}



const handleSelectMonth = (event) => {
    const selectedOptionValue = event.target.value;
    const [year, month] = selectedOptionValue.split('-');
    const yearParsed = parseInt(year, 10);
    const monthParsed = parseInt(month, 10);
    console.log('month selected type of: ', typeof month);
    const dayInMonthCount = new Date(yearParsed, monthParsed + 1, 0).getDate();
    console.log('dayInMonthCount: ', dayInMonthCount);
    const isCurrentMonthSelected = true;

    const daySelectElement = document.getElementById("päivät");
    const textDay = document.createElement('option');
    textDay.innerText = "--päivät--";
    daySelectElement.appendChild(textDay);

    daySelectElement.setAttribute('disabled', false);


}

const getDays = () => {
    let day = today.getDate();
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
}


const initPesukone = () => {
    getMonths();
}


// develop the functions to be used as month select listener
// it will generate days and append to the day listener


// develop a function to be used as day select listener
// it will get the booking for the day
// and show the table with day slots and if some of them available

