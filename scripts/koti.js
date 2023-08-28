// Funktio tarkistaa, onko käyttäjä admin (perustuen evästeeseen) ja näyttää tai piilottaa "Uusi tiedote" -napin sen mukaan.

function checkAdminAndDisplayButton() {
  // Haetaan 'isAdmin' evästeen arvo ja tarkistetaan, onko se merkkijonona "true". 
  // Oletetaan, että evästeen arvo on merkkijonon muodossa oleva boolean-arvo.
  let isAdmin = getCookie("isAdmin") === "true";
  
  // Haetaan "Uusi tiedote" -nappi sen id:n perusteella.
  let announcementButton = document.getElementById("newAnnouncementButton");

  // Tarkistetaan, että nappi löytyy (on olemassa sivulla).
  if (announcementButton) {
    // Jos käyttäjä on admin...
    if (isAdmin) {
      // Näytä nappi
      announcementButton.style.display = "block";
    } else {
      // Muuten piilota nappi
      announcementButton.style.display = "none";
    }
  }
}
