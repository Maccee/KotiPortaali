function toggleRegister() {
  var title = document.querySelector("h1");
  var confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
  var loginBtn = document.getElementById("loginBtn");
  var registerNowBtn = document.getElementById("registerNowBtn");

  if (title.innerText === "Kirjaudu sisään") {
    title.innerText = "Rekisteröidy";
    confirmPasswordDiv.style.display = "block";
    loginBtn.style.display = "none";
    registerNowBtn.style.display = "block"; // Show the 'Register Now' button
  } else {
    title.innerText = "Kirjaudu sisään";
    confirmPasswordDiv.style.display = "none";
    loginBtn.style.display = "block";
    registerNowBtn.style.display = "none"; // Hide the 'Register Now' button
  }
}

function Rekisteroidu() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Salasanat eivät täsmää!");
    return false;
  }

  // Hash the password using SHA-256 (as an example)
  var hashedPassword = CryptoJS.SHA256(password).toString();

  var url = `https://kopoquery.azurewebsites.net/api/login?reg=1&username=${username}&password=${hashedPassword}`;

  // Send a request to the server (e.g., using fetch API)
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.text()) // Get the response as plain text
    .then((data) => {
      console.log(data); // Log the raw response to the console
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  toggleRegister();
  return false; // Prevent the form from submitting in the traditional way
}
