var email = sessionStorage.getItem("email"); //Get user email

//Enable and disable button
let btnModificaInfoAnimale = document.getElementById("gestisciAnimale");
let accordion = document.getElementById("btnAccordion");

btnModificaInfoAnimale.disabled = true; //Disable button
accordion.disabled = true; //disable accordion

//Get pet's info
fetch('../api/v1/infoAnimale?email=' + email)
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
            writeInfo(animale);
        };

        dropdowndElement.textContent = animale.nome;

        let lu = document.getElementById("listaAnimali");
        lu.appendChild(dropdowndElement);
    });
}

function writeInfo(data){

    btnModificaInfoAnimale.disabled = false; //Enable button
    accordion.disabled = false; //Enable accordion

    //console.log(data._id);
    sessionStorage.setItem("idAnimale",data._id); //Save pet's id

    /*Add card*/
    initCard(data);

    document.getElementById("datiSpecie").innerHTML = data.infoSpecie;
}

function initCard(data){

    let divCard = document.getElementById("card");
    divCard.setAttribute("class","card");
    divCard.setAttribute("style","width: 18rem;");

    let img = document.getElementById("imgCard");
    img.setAttribute("src",data.immagine);
    
    let h5 = document.getElementById("h5Card");    
    h5.textContent = data.nome;

    document.getElementById("pCard").innerHTML = "Razza: " + data.razza + "<br>Età: " + data.eta 
    + " anni<br>Peso: " + data.peso + " Kg<br>CodiceChip: " + data.codiceChip;
}

//Go to page "modificaInfoAnimale.html"
function modificaInfoAnimale(){
    document.location.href = 'modificaInfoAnimale.html';
}

function aggiungiAnimale(){
    document.location.href = 'aggiungiAnimale.html'
}

//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}