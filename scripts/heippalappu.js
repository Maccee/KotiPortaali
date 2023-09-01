function deleteInput() {
  document.getElementById("viesti").value = "";
  updateCounter();
}

function printInput() {
  let token = localStorage.getItem("token");

  if (!token) {
    console.log("No token. Exiting.");
    return;
  }

  let message = document.getElementById("viesti").value;
  if (message.trim() === "") {
    console.log("Tyhjä viestikenttä. Exiting.");
    return;
  }

  let apiUrl = "https://kopofunction.azurewebsites.net/api/heippalappu";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text: message }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Refresh
      hae();
    })
    .catch((error) => {
      console.log("There was a problem with fetch", error.message);
    });

  document.getElementById("viesti").value = "";
  updateCounter();
}

function hae() {
  let token = localStorage.getItem("token");

  if (!token) {
    console.log("No token. Exiting.");
    return;
  }

  const seina = document.getElementById("heippalappuseina");

  if (!seina) {
    console.log("Seina is null. Exiting.");
    return;
  }

  console.log("Token is good!");
  console.log("Seina is not null");

  fetch("https://kopofunction.azurewebsites.net/api/heippalappu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const seina = document.getElementById("heippalappuseina");
      seina.innerHTML = "";
      data.reverse().forEach((message) => {
        let messageElement = `
          <p class="seinaPvm">${message.date}</p>
          <p class="seinaViesti">${message.text}</p>
          <hr>
        `;
        heippalappuseina.innerHTML += messageElement;
      });
    })
    .catch((error) => {
      console.log("Error fetching messages:", error);
    });
}

function updateCounter() {
  const textarea = document.getElementById("viesti");
  const counter = document.getElementById("counter");

  if (textarea.value.length > 250) {
    textarea.value = textarea.value.substring(0, 250);
  }

  counter.innerText = `${textarea.value.length}/250`;
}

function checkLogin() {
  
  let token = localStorage.getItem("token");

  if (!token) {
    loadContent("./modules/login.html");
  } else {
    hae();
  }
}
