function toggleRegister() {
  var title = document.querySelector("h1");
  var confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");
  if (title.innerText === "Kirjaudu sisään") {
    title.innerText = "Rekisteröidy";
    confirmPasswordDiv.style.display = "block";
    loginBtn.innerText = "Takaisin";
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

// Kirjautumis -funktio!
function Kirjaudu() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (!username || !password) {
    alert("Katsothan, että kummatkin kentät ovat täytetty!");
    return false;
  }

  let spinner = document.querySelector(".spinner");
  spinner.style.display = "inline-block";

  var payload = {
    reg: 0,
    username: username,
    password: password,
  };

  fetch("https://kopofunction.azurewebsites.net/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      spinner.style.display = "none";
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Store the token
      localStorage.setItem("token", data.token);
      loadContent("./koti.html");
      displayUserInfo();
      console.log(isAdmin());
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
      spinner.style.display = "none";
    });
  return false;
}

// uuden käyttäjän rekisteröinti!
function Rekisteroidu() {
  var usernameElem = document.getElementById("username");
  var passwordElem = document.getElementById("password");
  var confirmPasswordElem = document.getElementById("confirmPassword");

  var username = usernameElem.value;
  var password = passwordElem.value;
  var confirmPassword = confirmPasswordElem.value;

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
    password: password,
  };

  fetch("https://kopofunction.azurewebsites.net/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
