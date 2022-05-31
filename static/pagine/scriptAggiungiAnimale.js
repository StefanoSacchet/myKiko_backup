var email = sessionStorage.getItem("email");

function conferma(){

    //Get values from the user's inputs
    let nome = document.getElementById("nome").value;
    let razza = document.getElementById("razza").value;
    let eta = document.getElementById("eta").value;
    let peso = document.getElementById("peso").value;
    let codiceChip = document.getElementById("codiceChip").value;

    fetch('../api/v1/animali/aggiungiAnimale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, nomeNew: nome, razzaNew: razza.toLowerCase(), etaNew: eta, pesoNew: peso, codiceChipNew: codiceChip } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){

        if(data.success){

            document.getElementById("paraMessage").innerHTML = "Animale aggiunto";
            annulla();

        }else if(data.message == "Empty inputs"){

            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";

        }else{

            document.getElementById("paraDanger").innerHTML = "Effettuare di nuovo il login";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function annulla(){
    document.location.href = 'infoAnimale.html';
}