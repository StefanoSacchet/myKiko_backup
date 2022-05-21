var email = sessionStorage.getItem("email"); //Get user email

//Enable and disable button
let btnMdificaInfoAnimale = document.querySelector(".button");

btnMdificaInfoAnimale.disabled = true; //Disable button

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
        let dropdowndElement = document. createElement('button');
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
    btnMdificaInfoAnimale.disabled = false; //Enable button
    //console.log(data._id);
    sessionStorage.setItem("idAnimale",data._id); //Save pet's id
    //Print pet's info
    document.getElementById("infoAnimale").innerHTML = "Info animale:<br />nome: " + data.nome + "<br />razza: " + data.razza + "<br />eta: " + data.eta 
                                                       + "<br />peso: " + data.peso + "<br />codiceChip: " + data.codiceChip;
}

//Go to page "modificaInfoAnimale.html"
function modificaInfoAnimale(){
    document.location.href = 'modificaInfoAnimale.html';
}

//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}