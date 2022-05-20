function infoAnimale(){
    var email = sessionStorage.getItem("email");

    //Recupera info animale
    fetch('../api/v1/infoAnimale?email=' + email)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        //console.log(data.animale);
        document.getElementById("infoAnimale").innerHTML = "nome: " + data.animale[0].nome + "<br />razza: " + data.animale[0].razza + "<br />eta: " + data.animale[0].eta + "<br />peso: " + data.animale[0].peso + "<br />codiceChip: " + data.animale[0].codiceChip;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function modificaInfoAnimale(){
    document.location.href = 'modificaInfoAnimale.html';
}

function goBack(){
    document.location.href = '/home.html';
}