function loadContent(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;
      if (url === "./seina.html") {
        hae();
        updateCounter();
      }
      // After content of koti.html is loaded
      if (url === "./koti.html") {
        checkAdminAndDisplayButton();
      }
      if (url === './pesukone.html') {
        initPesukone();
    }
    })
    .catch((error) => {
      console.error("Virhe:", error);
    });
}

window.onload = function () {
  loadContent("./koti.html");
};
