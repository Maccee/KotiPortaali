
function loadContent(url) {
  
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;
      if (url === "./seina.html") {
        checkLogin();
        updateCounter();
      }
      
      if (url === "./koti.html") {
        
      }
      if (url === './pesukone.html') {
        //checkLogin();
        //initPesukone();
        
      }

    })
    .catch((error) => {
      console.error("Virhe:", error);
    });

}

window.onload = function () {
  loadContent("./koti.html");
  displayUserInfo();
};
