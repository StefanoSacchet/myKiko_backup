function infoAnimale(){
    
    var email = sessionStorage.getItem("email");

    //Recupera info animale
    fetch('../api/v1/infoAnimale?email=' + email)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        console.log(data.animale);
        document.getElementById("infoAnimale").innerHTML = "nome: " + data.animale[0].nome + "<br />razza: " + data.animale[0].razza + "<br />eta: " + data.animale[0].eta + "<br />peso: " + data.animale[0].peso + "<br />codiceChip: " + data.animale[0].codiceChip;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

/*TASTO MODIFICA CREDENZIALI*/
/*
var par = [];

function pulisciPagina(){
    
    par[0] = document.getElementById('immagine');
    par[0].parentNode.removeChild(par[0]);

    par[1] = document.getElementById('gestisciAnimale');
    par[1].parentNode.removeChild(par[1]);

    par[2] = document.getElementById('impegni');
    par[2].parentNode.removeChild(par[2]);

    par[3] = document.getElementById('cibo');
    par[3].parentNode.removeChild(par[3]);

    par[4] = document.getElementById('smarThings');
    par[4].parentNode.removeChild(par[4]);

    par[5] = document.getElementById('modificaCredenziali');
    par[5].parentNode.removeChild(par[5]);

    par[6] = document.getElementById('logout');
    par[6].parentNode.removeChild(par[6]);
}

function modificaCredenziali(){

    pulisciPagina();

    //Aggiunge campi input credenziali
    let divElement = document. createElement('div');
    let attrDiv = document.createAttribute("id");
    attrDiv.value = "divModificaCredenziali";
    divElement.setAttributeNode(attrDiv);

    //Input Username
    let inputUsername = document.createElement("input");
    let attrUsername = document.createAttribute("placeHolder");
    attrUsername.value = "Username";
    inputUsername.setAttributeNode(attrUsername);

    //Input password
    let inputPassword = document.createElement("input");
    let attrPassword = document.createAttribute("placeHolder");
    attrPassword.value = "Password";
    inputPassword.setAttributeNode(attrPassword);

    //Paragraph
    let para = document.createElement("p");
    var nodo = document.createTextNode("Inserire nuove credenziali:");
    para.appendChild(nodo);

    //A capo
    let aCapo = document.createElement("br");

    //Bottone conferma
    let btnConferma = document.createElement("button");
    let attrBtnConferma = document.createAttribute("onclick");
    attrBtnConferma.value = "modificaCredenzialiConferma()";
    btnConferma.setAttributeNode(attrBtnConferma);
    var btnTextConferma = document.createTextNode("Conferma");
    btnConferma.appendChild(btnTextConferma);

    //Bottone annulla
    let btnAnnulla = document.createElement("button");
    let attrBtnAnnulla = document.createAttribute("onclick");
    attrBtnAnnulla.value = "modificaCredenzialiAnnulla()";
    btnAnnulla.setAttributeNode(attrBtnAnnulla);
    var btnTextAnnulla = document.createTextNode("Annulla");
    btnAnnulla.appendChild(btnTextAnnulla);


    //Add elements to the div
    divElement.appendChild(para);
    divElement.appendChild(aCapo);
    divElement.appendChild(inputUsername);
    divElement.appendChild(aCapo);
    divElement.appendChild(inputPassword);
    divElement.appendChild(aCapo);
    divElement.appendChild(aCapo);
    divElement.appendChild(btnConferma);
    divElement.appendChild(btnAnnulla);
    
    //Add the div to the document
    document.body.appendChild(divElement);
}

function modificaCredenzialiConferma(){

}

function modificaCredenzialiAnnulla(){
    
    var par1 = document.getElementById('divModificaCredenziali');
    par1.parentNode.removeChild(par1);

    for(var i=0; i<par.length; i++){
        document.body.appendChild(par[i]);

    }
}
*/