function loadContent(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;

      // Call a function to initialize event listeners for the dynamically added content
      initializeEventListeners(url);

      if (url === "./seina.html") {
        hae();
      }
    })
    .catch((error) => {
      console.error("Virhe:", error);
    });
}

function initializeEventListeners(url) {
  // Check if the URL is for the login page
  if (url === "./login.html") {
    // Attach event listeners for the username and password fields
    var usernameField = document.getElementById("username");
    var passwordField = document.getElementById("password");
    var confirmPasswordField = document.getElementById("confirmPassword");

    if (usernameField && passwordField) {
      usernameField.addEventListener("input", clearErrorState);
      passwordField.addEventListener("input", clearErrorState);
    }
    if (usernameField && passwordField && confirmPasswordField) {
      usernameField.addEventListener("input", clearErrorState);
      passwordField.addEventListener("input", clearErrorState);
      confirmPasswordField.addEventListener("input", clearErrorState);
    }
  }
}

window.onload = function () {
  loadContent("./koti.html");
};
