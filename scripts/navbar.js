function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('contentArea').innerHTML = data;
        })
        .catch(error => {
            console.error('Virhe:', error);
        });
}

window.onload = function () {
    loadContent('./koti.html');
};