function loadContent(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;
      if (url === "./seina.html") {
        hae();
      }
    })
    .catch((error) => {
      console.error("Virhe:", error);
    });
}
window.onload = function () {
  loadContent("./koti.html");
};
