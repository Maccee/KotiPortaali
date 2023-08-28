// Uusi tiedote nappi näkyviin jos admin
function checkAdminAndDisplayButton() {
    let isAdmin = getCookie("isAdmin") === "true";  // Assuming cookie value is a string representation of boolean
    let announcementButton = document.getElementById("newAnnouncementButton");
  
    if (announcementButton) {  // Check if button exists
      if (isAdmin) {
        announcementButton.style.display = "block";
      } else {
        announcementButton.style.display = "none";
      }
    }
  }