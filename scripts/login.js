function toggleRegister() {
  var title = document.querySelector("h1");
  var confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");

  // Clear error messages
  clearAllErrorMessages();

  if (title.innerText === "Kirjaudu sisään") {
    title.innerText = "Rekisteröidy";
    confirmPasswordDiv.style.display = "block";
    loginBtn.innerText = "Back to Login";
    registerBtn.innerText = "Valmis";

    // Update button functionalities
    loginBtn.onclick = toggleRegister; // set login button to revert back to login mode
    registerBtn.onclick = Rekisteroidu; // set register button to invoke Rekisteroidu()
  } else {
    title.innerText = "Kirjaudu sisään";
    confirmPasswordDiv.style.display = "none";
    loginBtn.innerText = "Kirjaudu";
    registerBtn.innerText = "Rekisteröidy";

    // Restore button functionalities
    loginBtn.onclick = Kirjaudu;
    registerBtn.onclick = toggleRegister;
  }
}

function clearAllErrorMessages() {
  var usernameError = document.getElementById("usernameError");
  var passwordError = document.getElementById("passwordError");

  var username = document.getElementById("username");
  var password = document.getElementById("password");

  username.classList.remove("input-error");
  password.classList.remove("input-error");

  usernameError.textContent = "";
  passwordError.textContent = "";
}

function clearErrorState(event) {
  var inputField = event.target;
  var errorField;

  if (inputField.id === "username") {
    errorField = document.getElementById("usernameError");
  } else if (inputField.id === "password") {
    errorField = document.getElementById("passwordError");
  } else if (inputField.id === "confirmPassword") {
    errorField = document.getElementById("confirmPasswordError");
  }

  if (errorField) {
    errorField.textContent = ""; // Clear the error message
    inputField.classList.remove("input-error"); // Remove the error style
  }
}

function Kirjaudu() {
  var username = document.getElementById("username");
  var password = document.getElementById("password");

  var usernameError = document.getElementById("usernameError");
  var passwordError = document.getElementById("passwordError");

  // Reset styles and error messages
  username.classList.remove("input-error");
  password.classList.remove("input-error");
  usernameError.textContent = "";
  passwordError.textContent = "";

  // Validation
  if (!username.value) {
    username.classList.add("input-error");
    usernameError.textContent = "Käyttäjänimi is required.";
  }

  if (!password.value) {
    password.classList.add("input-error");
    passwordError.textContent = "Salasana is required.";
  }

  if (!username.value || !password.value) {
    return false;
  }

  // Proceed with the request if validation passed
  var hashedPassword = CryptoJS.SHA256(password.value).toString();
  var url = `https://kopofunction.azurewebsites.net/api/login?reg=0&username=${username.value}&password=${hashedPassword}`;

  // Send a request to the server
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // Check if the response is not okay (like 400, 500, etc.)
      if (!response.ok) {
        return response.text().then((errorMsg) => {
          throw new Error(errorMsg);
        });
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message); // Alert the user or display it in some other way
    });
  return false;
}

function Rekisteroidu() {
  var usernameElem = document.getElementById("username");
  var passwordElem = document.getElementById("password");
  var confirmPasswordElem = document.getElementById("confirmPassword");

  var username = usernameElem.value;
  var password = passwordElem.value;
  var confirmPassword = confirmPasswordElem.value;

  var usernameError = document.getElementById("usernameError");
  var passwordError = document.getElementById("passwordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");

  // Validation
  if (!username) {
    usernameElem.classList.add("input-error");
    usernameError.textContent = "Käyttäjänimi is required.";
  }

  if (!password) {
    passwordElem.classList.add("input-error");
    passwordError.textContent = "Salasana is required.";
  }

  if (!confirmPassword) {
    confirmPasswordElem.classList.add("input-error");
    confirmPasswordError.textContent = "Vahvista salasana.";
  }

  if (password !== confirmPassword) {
    confirmPasswordElem.classList.add("input-error");
    confirmPasswordError.textContent = "Salasana doesn't match.";
  }

  if (
    !username ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  ) {
    return false;
  }

  // Hash the password using SHA-256 (as an example)
  var hashedPassword = CryptoJS.SHA256(password).toString();

  var url = `https://kopofunction.azurewebsites.net/api/login?reg=1&username=${username}&password=${hashedPassword}`;

  // Send a request to the server (e.g., using fetch API)
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorMsg) => {
          throw new Error(errorMsg);
        });
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
  username.value = "";
  password.value = "";
  confirmPassword.value = "";
  return false;
}
