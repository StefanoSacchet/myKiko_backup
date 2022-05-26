var email = sessionStorage.getItem("email");

fetch('../api/v1/impegni?email=' + email)
.then((resp) => resp.json()) // Transform the data into json
.then(function (data) {
    //console.log(data.impegno);

    if(data.success){
        initCard(data.impegno);
    }else{
        document.getElementById("paraDanger").innerHTML = "Errore, rifare il login";
    } 
})
.catch(error => console.error(error)); // If there is any error you will catch them here

function initCard(data){

    data.forEach(impegno => {
        creaCard(impegno);
    });  
}

function creaCard(impegno){

    var p = document.createElement("p");
    p.setAttribute("class","card-text");
    p.innerHTML = "Impegno: " + impegno.impegno + "<br>Luogo: " + impegno.luogo + " <br>Data: " + impegno.data;

    var h5 = document.createElement("h5");
    h5.setAttribute("class","card-title");
    h5.innerHTML = impegno.animale;

    var div = document.createElement("div");
    div.setAttribute("class","card-body");

    div.appendChild(h5);
    div.appendChild(p);

    var divCard = document.createElement("div");
    div.setAttribute("class","card");
    div.setAttribute("style","width: 18rem;");

    divCard.appendChild(div);

    document.getElementById("card").appendChild(divCard);
    
    var br = document.createElement("br");
    document.getElementById("card").appendChild(br);
}

function aggiungiImpegno(){
    document.location.href = 'aggiungiImpegno.html'
}

function eliminaImpegno(){
    
}

//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}