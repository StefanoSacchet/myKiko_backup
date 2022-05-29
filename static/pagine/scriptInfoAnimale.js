let email = sessionStorage.getItem("email"); //Get user email

//let imgRazza;
let id;

//Enable and disable button
let btnModificaInfoAnimale = document.getElementById("gestisciAnimale");
let btnCancellaAnimale = document.getElementById("eliminaAnimale");
let accordion = document.getElementById("btnAccordion");

let btnConfermaDelete = document.getElementById("confermaDelete");
let btnAnnullaDelete = document.getElementById("annullaDelete");

btnAnnullaDelete.hidden = true;
btnConfermaDelete.hidden = true;

btnModificaInfoAnimale.disabled = true; //Disable button
btnCancellaAnimale.disabled = true;
accordion.disabled = true; //disable accordion

//Get pet's info
fetch('../api/v1/animali/infoAnimale?email=' + email)
.then((resp) => resp.json()) // Transform the data into json
.then(function (data) {
    //console.log(data.animale);
    dropdownDinamic(data.animale);
})
.catch(error => console.error(error)); // If there is any error you will catch them here

function dropdownDinamic(data){
    //console.log(data[0].nome);

    data.forEach(animale => {
        let dropdowndElement = document.createElement('button');
        dropdowndElement.setAttribute("class","dropdown-item");

        dropdowndElement.onclick = () => {
            //console.log(animale);
            id = animale._id;
            writeInfo(animale);
        };

        dropdowndElement.textContent = animale.nome;

        let lu = document.getElementById("listaAnimali");
        lu.appendChild(dropdowndElement);
    });
}

function writeInfo(data){

    btnModificaInfoAnimale.disabled = false; //Enable button
    btnCancellaAnimale.disabled = false;
    accordion.disabled = false; //Enable accordion

    //console.log(data._id);
    sessionStorage.setItem("idAnimale",data._id); //Save pet's id

    let imgRazza;

    //Cerca info razza
    fetch('../api/v1/animali/infoRazza?razza=' + data.razza)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (dataRazza) {

        if(dataRazza.success){
            imgRazza = dataRazza.imgRazza;
            document.getElementById("datiSpecie").innerHTML = dataRazza.infoRazza;
        }else{
            document.getElementById("datiSpecie").innerHTML = "informazioni non trovate";
        }

        /*Add card*/
        initCard(data, imgRazza);

    })
    .catch(error => console.error(error)); // If there is any error you will catch them here
}

function initCard(data, imgRazza){

    let divCard = document.getElementById("card");
    divCard.setAttribute("class","card");
    divCard.setAttribute("style","width: 18rem;");

    let img = document.getElementById("imgCard");
    if(data.immagine){ //if user has img
        img.setAttribute("src",data.immagine);
    }else if(imgRazza != undefined){ //If user hasn't img use razza img
        img.setAttribute("src",imgRazza);
    }else{
        img.setAttribute("src","/images/info.png"); //If razza not exists use default
    }
    
    let h5 = document.getElementById("h5Card");    
    h5.textContent = data.nome;

    if(imgRazza != undefined){ //If razza exists
        document.getElementById("pCard").innerHTML = "Razza: " + data.razza + "<br>Età: " + data.eta 
        + " anni<br>Peso: " + data.peso + " Kg<br>CodiceChip: " + data.codiceChip;
    }else{
        document.getElementById("pCard").innerHTML = "Razza: " + data.razza + " (Non riconosciuta)<br>Età: " + data.eta 
        + " anni<br>Peso: " + data.peso + " Kg<br>CodiceChip: " + data.codiceChip;
    }
}

function modificaInfoAnimale(){
    document.location.href = 'modificaInfoAnimale.html';
}

function aggiungiAnimale(){
    document.location.href = 'aggiungiAnimale.html'
}

function eliminaAnimale(){
    //console.log("Elimina animale");
    btnCancellaAnimale.disabled = true;
    btnAnnullaDelete.hidden = false;
    btnConfermaDelete.hidden = false;
}

function deleteAnimale(){

    fetch('../api/v1/animali/deleteAnimale', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, idAnimale: id} ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        
        if(data.success){
            window.location.reload();
        }else{
            document.getElementById("paraDanger").innerHTML = "Elimina animale fallito";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function annulla(){
    btnCancellaAnimale.disabled = false;
    btnConfermaDelete.hidden = true;
    btnAnnullaDelete.hidden = true;
}



//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}