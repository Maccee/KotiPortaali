function toggleRegister() {
  var title = document.querySelector("h1");
  var confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");

  if (title.innerText === "Kirjaudu sisään") {
    title.innerText = "Rekisteröidy";
    confirmPasswordDiv.style.display = "block";
    loginBtn.innerText = "Back to Login";
    registerBtn.innerText = "Valmis";

    loginBtn.onclick = toggleRegister;
    registerBtn.onclick = Rekisteroidu;
  } else {
    title.innerText = "Kirjaudu sisään";
    confirmPasswordDiv.style.display = "none";
    loginBtn.innerText = "Kirjaudu";
    registerBtn.innerText = "Rekisteröidy";

    loginBtn.onclick = Kirjaudu;
    registerBtn.onclick = toggleRegister;
  }
}



function Kirjaudu() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (!username || !password) {
      alert("Katsothan, että kummatkin kentät ovat täytetty!");
      return false;
  }

  var payload = {
      reg: 0,
      username: username,
      password: password
  };

  fetch("https://kopofunction.azurewebsites.net/api/login", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  })
  .then((response) => {
      // Check if the response is not okay (like 400, 500, etc.)
      if (!response.ok) {
          return response.json().then((errorData) => {
              throw new Error(errorData.message);
          });
      }
      return response.json();
  })
  .then((data) => {
      console.log(data.message);
      

      // Set cookies
      setCookie("username", data.username, 1);
      setCookie("isAdmin", data.isAdmin, 1);
      window.location.href = "/";
  })
  .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
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

  // Validation
  if (
    !username ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  ) {
    alert("Täytä kaikki kentät ja varmista, että salasanat täsmää!");
    return false;
  }

  var payload = {
    reg: 1,
    username: username,
    password: password
  };
  // Send a request to the server (e.g., using fetch API)
  fetch("https://kopofunction.azurewebsites.net/api/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
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
      console.log(data)
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });

  usernameElem.value = "";
  passwordElem.value = "";
  confirmPasswordElem.value = "";
  toggleRegister();

  return false;
}




