// setCookie -asettaa evästeen halutulla nimellä, arvolla ja vanhenemispäivällä.
// Tätä kutsutaan onnistuneen kirjautumisen jälkeen login.js/Kirjaudu() -funktiossa.
// setCookie("username", data.username, 1);
// setCookie("isAdmin", data.isAdmin, 1);

// getCookie -hakee evästeen arvon sen nimellä.
// Esim. globalEventListeners.js, jossa tuodaan etusivulle "logged in as username"

// logout -poistaa username ja isAdmin evästeet laittamalla voimassaolopäivän menneisyyteen
// ja ohjaa käyttäjän etusivulle.

// Funktio ottaa kolme parametria: evästeen nimen, arvon ja päivien määrän (kuinka monta päivää evästeen tulisi olla voimassa).
function setCookie(name, value, days) {
  var expires = "";
  // Jos päivien määrä on määritelty...
  if (days) {
      var date = new Date(); // Luo uusi päivämäärä-objekti
      // Aseta päivämäärälle uusi aika, joka on nykyhetki + määritellyt päivät.
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      // Luo vanhentumisaika merkkijonona
      expires = "; expires=" + date.toUTCString();
  }
  // Aseta eväste dokumenttiin. Jos arvoa ei ole määritelty, käytetään tyhjää merkkijonoa.
  // Lisäksi asetetaan evästeen polku (path), SameSite-attribuutti ja Secure-attribuutti
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
}

// Funktion avulla voit hakea evästeen arvon sen nimellä.
function getCookie(name) {
  // Lisää evästeet merkkijonoon alussa olevan puolipisteen kanssa
  let value = "; " + document.cookie;
  // Jaa merkkijono kahteen osaan evästeen nimen perusteella
  let parts = value.split("; " + name + "=");
  // Jos eväste löytyy (merkkijonon pituus on 2)...
  if (parts.length == 2) 
      // Palauta evästeen arvo
      return parts.pop().split(";").shift();
}

// Kirjautumisen ulos funktio
function logout() {
  // Poista 'username' eväste asettamalla sen vanhenemispäivämäärä menneisyyteen
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // Poista 'isAdmin' eväste samalla tavalla
  document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // Ohjaa käyttäjä etusivulle
  window.location.href = "/";
}