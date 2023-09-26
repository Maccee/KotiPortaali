const initSauna = () => {
    getWeeks(8);
    initWeekDays();
    initMonthChangers();
    const th = document.querySelector(".month");
    th.textContent = monthNow.toUpperCase();
}