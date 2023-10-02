const initPesukone = () => {
    getWeeks(monthIndex);
    initWeekDays();
    initMonthChangers();
    const th = document.querySelector(".month");  // add name of month to the table
    th.textContent = monthNow.toUpperCase();
}