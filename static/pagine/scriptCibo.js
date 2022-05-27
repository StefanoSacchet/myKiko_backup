let email = sessionStorage.getItem("email"); //Get user email

let imgRazza;

//Enable and disable button
let btnGestisciCibbo = document.getElementById("gestisciCibo");
let accordion = document.getElementById("btnAccordion");

btnGestisciCibbo.disabled = true; //Disable button
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

    btnGestisciCibbo.disabled = false; //Enable button
    accordion.disabled = false; //Enable accordion

    //Cerca info alimetari
    fetch('../api/v1/infoAlimentazione?razza=' + data.razza)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (dataCibo) {

        if(dataCibo.success){
            imgRazza = dataCibo.imgRazza;
            document.getElementById("datiCibo").innerHTML = dataCibo.infoAlimentazione;
        }else{
            document.getElementById("datiCibo").innerHTML = "informazioni non trovate";
        }

        /*Add card*/
        initCard(data);

    })
    .catch(error => console.error(error)); // If there is any error you will catch them here
}

function initCard(data){

    let divCard = document.getElementById("card");
    divCard.setAttribute("class","card");
    divCard.setAttribute("style","width: 18rem;");

    let img = document.getElementById("imgCard");
    if(data.immagine){ //if user has img
        img.setAttribute("src",data.immagine);
    }else{ //If user hasn't img use default
        img.setAttribute("src",imgRazza);
    }
    
    let h5 = document.getElementById("h5Card");    
    h5.textContent = data.nome;

    document.getElementById("pCard").innerHTML = "Razza: " + data.razza;
}


//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}