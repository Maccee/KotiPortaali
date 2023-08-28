

// Tämä koodinpätkä kuuntelee "DOMContentLoaded" -tapahtumaa,
// joka laukeaa kun sivun sisältö on ladattu. Tämän jälkeen koodi
// tarkistaa, onko käyttäjä kirjautunut sisään (perustuen evästeeseen),
// ja päivittää käyttöliittymän sen mukaan.

// Kuuntelee, kun sivun sisältö on täysin ladattu
document.addEventListener("DOMContentLoaded", function() {
    // Haetaan 'username' evästeen arvo
    let username = getCookie("username");
    
    // Etsitään HTML-elementtejä, joihin käyttöliittymäpäivitykset tehdään
    let loginStatus = document.querySelector(".login-status");  // Elementti, joka näyttää kirjautumistilan (esim. "Logged in as XYZ")
    let loginButton = document.querySelector(".login-button");  // Kirjautumispainike
    let usernameText = document.querySelector(".username-text");  // Elementti, johon käyttäjänimi asetetaan
    
    // Jos 'username' eväste on olemassa ja siinä on arvo (käyttäjä on kirjautunut sisään)...
    if (username) {
        // Asetetaan käyttäjänimi tekstiksi
        usernameText.textContent = "Logged in as " + username;
        
        // Näytä kirjautumistilan elementti ja piilota kirjautumispainike
        loginStatus.classList.remove('hidden');
        loginButton.classList.add('hidden');
    } else {
        // Jos käyttäjä ei ole kirjautunut sisään, piilota kirjautumistilan elementti ja näytä kirjautumispainike
        loginStatus.classList.add('hidden');
        loginButton.classList.remove('hidden');
    }
});

