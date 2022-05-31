let email = sessionStorage.getItem("email"); //Get user email

let count = 0;

//Enable and disable button
//let btnGestisciCibbo = document.getElementById("gestisciCibo");
let accordion = document.getElementById("btnAccordion");

//btnGestisciCibbo.disabled = true; //Disable button
accordion.disabled = true; //disable accordion

//Get pet's info
fetch('../api/v1/animali/infoAnimale?email=' + email)
.then((resp) => resp.json()) // Transform the data into json
.then(function (data) {
    //console.log(data.animale);
    dropdownDinamic(data.animale);
})
.catch(error => console.error(error)); // If there is any error you will catch them here

//Get types of cibo
fetch('../api/v1/cibo/tipiCibo?email=' + email)
.then((resp) => resp.json()) // Transform the data into json
.then(function (data) {
    //console.log(data.animale);
    initSliders(data.cibo);
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

function initSliders(data){

    //console.log(data);

    data.forEach(cibo => {
        
        let label = document.createElement("h5");
        label.setAttribute("for","customRange3");
        label.setAttribute("class","form-label");
        label.setAttribute("style","color: #644847;");
        label.innerHTML = cibo.nomeProdotto;

        let input = document.createElement("input");
        input.setAttribute("type","range");
        input.setAttribute("class","form-range");
        input.setAttribute("min","0");
        input.setAttribute("max","100");
        input.setAttribute("step","5");
        input.setAttribute("id","livelloCibo" + count);
        input.value = cibo.quantita;
        input.onclick = () => {
            p.innerHTML = input.value + "%";
        }

        let p = document.createElement("p");
        p.setAttribute("id","p" + count);
        p.innerHTML = cibo.quantita + "% <br>";

        let button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-primary");
        button.setAttribute("id",count);
        button.innerHTML = "Applica modifiche";
        button.onclick = () => {
            appllicaModifiche(cibo.nomeProdotto, button.id); 
        };

        var btnElimina = document.createElement("button");
        btnElimina.setAttribute("class","btn btn-danger");
        btnElimina.setAttribute("id",count);
        btnElimina.innerHTML = "Elimina cibo";
        btnElimina.onclick = () => {
        eliminaCibo(cibo, btnElimina.id);
        };

        let br = document.createElement("br");
        let br1 = document.createElement("br");
        
        let div = document.getElementById("divSlider");
        div.setAttribute("class","col-sm-5");
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(p);
        div.append(button);
        div.appendChild(btnElimina);
        div.appendChild(br1);
        div.appendChild(br);

        count++;
    });
}

function writeInfo(data){

    //btnGestisciCibbo.disabled = false; //Enable button
    accordion.disabled = false; //Enable accordion

    let imgRazza;

    //Cerca info alimentari
    fetch('../api/v1/cibo/infoAlimentazione?razza=' + data.razza)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (dataCibo) {

        if(dataCibo.success){
            imgRazza = dataCibo.imgRazza;
            document.getElementById("datiCibo").innerHTML = dataCibo.infoAlimentazione;
        }else{
            document.getElementById("datiCibo").innerHTML = "informazioni non trovate";
        }

        //Add card
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

    document.getElementById("pCard").innerHTML = "Razza: " + data.razza;
}

function appllicaModifiche(nomeProdotto, count){
    //let tmp = document.getElementById("livelloCibo" + idBottone).value;
    //console.log(nomeProdotto);
    //console.log(count);

    fetch('/api/v1/cibo/modificaValoreCibo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, nomeProdotto: nomeProdotto, valoreNew: document.getElementById("livelloCibo" + count).value} ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        
    
    })
    .catch(error => console.error(error)); // If there is any error you will catch them here

}


function eliminaCibo(cibo, btnEliminaId){
    //console.log(cibo[btnEliminaId]._id);
    console.log(cibo._id);


    fetch('../api/v1/cibo/deleteCibo', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, idCibo: cibo._id } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        
        if(data.success){
            window.location.reload();
        }else{
            document.getElementById("paraDanger").innerHTML = "Elimina cibo fallito";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

}



function aggiungiProdotto(){
    sessionStorage.setItem("email", email);
    document.location.href = 'aggiungiCibo.html';
}




//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}