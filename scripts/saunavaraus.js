const initSauna = () => {
    getWeeks(monthIndex);
    initWeekDays();
    initMonthChangers();
    const th = document.querySelector(".month");
    th.textContent = monthNow.toUpperCase();
}