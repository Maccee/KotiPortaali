function deleteInput() {
  document.getElementById("viesti").value = "";
}

function printInput() {
  let token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found in localStorage. Exiting.");
    return;
  }

  let message = document.getElementById("viesti").value;
  if (message.trim() === "") {
    console.log("Tyhjä viestikenttä. Exiting.");
    return;
  }

  let apiUrl = "https://kopofunction.azurewebsites.net/api/heippalappu";

  // Use the Fetch API to send the request
  fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the request headers
    },
    body: JSON.stringify({ text: message }) // Send the message as JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Refresh
      hae();
    })
    .catch((error) => {
      console.log(
        "There was a problem with the fetch operation:",
        error.message
      );
    });

  // Clear the input field after sending
  document.getElementById("viesti").value = "";
  updateCounter();
}


function hae() {
  // 1. Retrieve the token from localStorage
  let token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found in localStorage. Exiting.");
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
      Authorization: `Bearer ${token}`, // Include the token in the request headers
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

  // Trim content if it's too long
  if (textarea.value.length > 250) {
    textarea.value = textarea.value.substring(0, 250);
  }

  // Update the counter
  counter.innerText = `${textarea.value.length}/250`;
}

function checkLogin() {
  const seina = document.getElementById("heippalappuseina");
  let token = localStorage.getItem("token");

  if (!token) {
      loadContent("./login.html");
  } else {
      hae();
  }
}