function loadContent(url) {

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;
      if (url === "./modules/heippalappu.html") {
        checkLogin();
        updateCounter();
      }

      if (url === "./modules/tiedotteet.html") {

      }
      if (url === './modules/pesukone.html') {
        // checkLogin();
        initPesukone();  
      }

      if (url === './modules/saunavaraus.html') {
        // checkLogin();
        initSauna();
      }

      if (url === "./modules/resurssit.html") {
        fetchDataFromAPI();
      }  

    })
    .catch((error) => {
      console.error("Virhe:", error);
    });

}

window.onload = function () {
  loadContent("./modules/tiedotteet.html");
  displayUserInfo();
};