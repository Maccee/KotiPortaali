updateCounter();
function deleteInput() {
  document.getElementById("viesti").value = "";
}

function printInput() {
  let message = document.getElementById("viesti").value;
  if (message.trim() === "") {
    return;
  }

  // Encode the message to be URL-safe
  let encodedMessage = encodeURIComponent(message);

  // Create the full URL to send the request to
  let apiUrl =
    "https://kopofunction.azurewebsites.net/api/query?name=" + encodedMessage;

  // Use the Fetch API to send the request
  fetch(apiUrl, {
    method: "GET",
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
  document.getElementById("viesti").value = "";
}
function hae() {
  fetch("https://kopofunction.azurewebsites.net/api/query")
    .then((response) => response.json())
    .then((data) => {
      // Clear out any existing content in heippalappuseina
      const seina = document.getElementById("heippalappuseina");
      seina.innerHTML = "";

      // Reverse the data to put the last message on top
      data.reverse().forEach((message) => {
        let adjustedDate = addThreeHours(message.date);

        let messageElement = `
                    <p class="seinaPvm">${adjustedDate}</p>
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
function addThreeHours(dateString) {
  // Extract date and time parts
  const [day, month, yearTime] = dateString.split(".");
  const [year, time] = yearTime.split(" ");
  const [hours, minutes] = time.split(":");

  // Construct a new Date object using the parts
  let date = new Date(year, month - 1, day, hours, minutes); // months are 0-indexed in JS

  // Add 3 hours
  date.setHours(date.getHours() + 3);

  // Format date back to desired format
  let formattedDate =
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    date.getFullYear();
  let formattedTime =
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");

  return formattedDate + " " + formattedTime;
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
