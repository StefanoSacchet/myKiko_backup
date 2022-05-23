var email = sessionStorage.getItem("email");

function conferma(){

    //Get values from the user's inputs
    let nome = document.getElementById("nome").value;
    let razza = document.getElementById("razza").value;
    let eta = document.getElementById("eta").value;
    let peso = document.getElementById("peso").value;
    let codiceChip = document.getElementById("codiceChip").value;
    let caratteristicheSpecie = document.getElementById("caratteristicheSpecie").value;

    fetch('../api/v1/aggiungiAnimale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, nomeNew: nome, razzaNew: razza, etaNew: eta, pesoNew: peso, codiceChipNew: codiceChip, infoSpecie: caratteristicheSpecie } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){

    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function annulla(){
    document.location.href = 'infoAnimale.html';
}