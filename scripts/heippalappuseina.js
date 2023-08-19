// Tämä scripti tekee heippalappuseinälle viestejä päivämäärän ja käyttäjän antaman viestin mukaan, ja tulostaa
// sen seina.html:n <section>, jonka id on heippalappuseina, sisään.
// Esimerkki:
//<section class="heippaviesti">
//    <p id="paivamaara">{paivamaara}</p>
//    <p id="viesti">{viesti}</p>
//</section>


function printInput() {
    
    // Haetaan heippalappuseinän <textarea> -osasta id viestin arvo, joka on käyttäjän kirjoittama teksti
    let viesti = document.getElementById("viesti").value;
    // Jos viestikenttä <textarea> on tyhjä, eli mitään ei ole kirjoitettu, nappia painamalla ei tapahdu mitään.
    if (!viesti) {
        return;
    }

    // Generoidaan tämän hetken aika, new Date(), ja muokataan se haluttuun muotoon getFormattedDate -funktiolla.
    // Sijoitetaan se paivamaara -muuttujaan.
    let paivamaara = getFormattedDate(new Date());

    // Tehdään uudelle viestille <section> ja annetaan sille class heippaviesti, jotta voidaan muotoilla sitä.
    // Sijoitetaan se viestiContainer -muuttujaan.
    let viestiContainer = document.createElement("section");
    viestiContainer.className = "heippaviesti";

    // Tehdään päivämäärälle oma <p>, ja annetaan sen id paivamaara. Laitetaan sen <p>:n sisään paivamaara -muuttuja,
    // jossa on päivämäärä. Laitetaan kaikki viestiContainerin sisään.
    let paivamaaraP = document.createElement("p");
    paivamaaraP.className = "paivamaara";
    paivamaaraP.textContent = paivamaara;
    viestiContainer.appendChild(paivamaaraP);

    // Tehdään sama käyttäjän kirjoittamalle viestille, kuin mitä tehtiin päivämäärälle.
    let viestiP = document.createElement("p");
    viestiP.className = "viesti";
    viestiP.textContent = viesti;
    viestiContainer.appendChild(viestiP);

    // Tulostetaan meijän tekekemä viestiContainer seina.html:n <section> -kohtaan, jonka id on heippalappuseina.
    // Viesti näkyy aina ylimmäisenä prependin takia. Jos käytetään appendChild(viestiContainer);, tulisi uusi
    // viesti aina heippalappuseinan alimmaiseksi.
    let heippalappuseina = document.getElementById("heippalappuseina");
    heippalappuseina.prepend(viestiContainer);

    // Tyhjennetään tekstikenttä <textarea> kun painetaan lähetä -mappia.
    document.getElementById("viesti").value = "";
}
// Tämä funktio muokkaa päivämäärän näkymän muotoon 19.08.2023 14:47.
// Ilman tätä, päivämäärä näyttäisi tältä: Sat Aug 19 2023 14:49:25 GMT+0300 (Eastern European Summer Time)
function getFormattedDate(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
function deleteInput() {
    document.getElementById("viesti").value = "";
}