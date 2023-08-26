// Tämä on meidän navigointi-scripti.

// Funktio, joka lataa sisällön annetusta URL:sta. URL on tässä tapauksessa parametri,
// joka on määritelty tätä funktiota kutsuttaessa. Tätä funktiota kutsutaan linkeistä,
// joita meillä on index.html sivulla, navbarissa ja headerissa. Parametrit ovat muodossa
// esim. "./koti.html", jolloin saadaan loadContent('./koti.html').
function loadContent(url) {
    if (url === "./seina.html") {
        
        hae();
    }
    // Käytetään fetch-funktiota hakeaksemme sisältöä annetusta URL:sta. Vaikka fetch voidaan usein yhdistää API-kutsuihin,
    // tässä tapauksessa käytämme sitä paikallisen HTML-tiedoston lataamiseen.
    fetch(url)

        // Kun vastaus saadaan (esim. koti.html), se tallentuu response-muuttujaan, joka on HTTP-vastausobjekti.
        // Muunnetaan tämän jälkeen vastauksen sisältö tekstiksi.
        .then(response => response.text())
        // Tämän jälkeen tekstiksi muutettu vastaus laitetaan data -muuttujaan ja asetetaan saatu data
        // 'contentArea' id:llä varustettuun <div> -elementtiin, joka löytyy meidän index.html sivulta headerin ja
        // navbarin välistä.
        .then(data => {
            document.getElementById('contentArea').innerHTML = data;
            if (url === './pesukone.html') {
                initPesukone();
            }
        })
        // Tulostetaan virheilmoitus konsoliin, jos sisällön hakemisessa tulee ongelmia.
        .catch(error => {
            console.error('Virhe:', error);
        });
}

// Kun sivu ladataan, suoritetaan seuraava funktio
window.onload = function () {
    // Kutsutaan loadContent-funktiota ja annetaan sille osoite './koti.html' 
    // josta sisältö haetaan sivun latautuessa. Tällöin koti.html tulee etusivulle.
    loadContent('./koti.html');
};


// Tässä erittäin yksinkertaistettu rakenne samasta funktiosta.
// async tekee funktiosta asynkronisen ja antaa sille mahdollisuuden palauttaa Promise.
// await mahdollistaa asynkronisten operaatioiden "odottamisen" ilman koko sovelluksen estämistä,
// ja se voi olla käytössä vain async-funktiossa.

// async function loadContent(url) {
//     let response = await fetch(url);
//     let data = await response.text();
//     document.getElementById('contentArea').innerHTML = data;
// }