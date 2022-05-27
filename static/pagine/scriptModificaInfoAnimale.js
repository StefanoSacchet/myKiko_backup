function conferma(){
    let email = sessionStorage.getItem("email"); //Get user's email
    let idAnimale = sessionStorage.getItem("idAnimale"); //Get pet's id
    sessionStorage.removeItem("idAnimale");

    //console.log(idAnimale);

    //Get values from the user's inputs
    let nome = document.getElementById("nome").value;
    let razza = document.getElementById("razza").value;
    let eta = document.getElementById("eta").value;
    let peso = document.getElementById("peso").value;
    let codiceChip = document.getElementById("codiceChip").value;

    document.getElementById("paraMessage").value = "";

    fetch('/api/v1/animali/modificaInfoAnimale', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, id: idAnimale, nomeNew: nome, razzaNew: razza, etaNew: eta, pesoNew: peso, codiceChipNew: codiceChip } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        if(data.success){

            document.getElementById("paraMessage").innerHTML = "Modifiche applicate";
            document.location.href = 'infoAnimale.html';

        }else if(data.message == "Empty inputs"){

            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";
        }else{
            document.getElementById("paraDanger").innerHTML = "Effettuare di nuovo il login";
        }
    })
}

function annulla(){
    document.location.href = 'infoAnimale.html';
}