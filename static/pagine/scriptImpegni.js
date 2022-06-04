var email = sessionStorage.getItem("email");

var count = 0;
var impegni = {};

fetch('../api/v1/impegniAnimali/impegni?email=' + email)
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
        //console.log(impegno);
        creaCard(impegno);
    });  
}

function creaCard(impegno){

    impegni[count] = impegno;

    var p = document.createElement("p");
    p.setAttribute("class","card-text");
    formatData(p, impegno);
    //p.innerHTML = "Impegno: " + impegno.impegno + "<br>Luogo: " + impegno.luogo + " <br>Data: " + impegno.data;

    var h5 = document.createElement("h5");
    h5.setAttribute("class","card-title");
    h5.innerHTML = impegno.animale;

    var btnElimina = document.createElement("button");
    btnElimina.setAttribute("class","btn btn-danger");
    btnElimina.setAttribute("id",count);
    btnElimina.onclick = () => {
        eliminaImpegno(impegni, btnElimina.id);
    };
    btnElimina.innerHTML = "Elimina impegno";

    var btnModifica = document.createElement("button");
    btnModifica.setAttribute("class","btn btn-primary");
    btnModifica.setAttribute("id",count);
    btnModifica.onclick = () => {
        modificaImpegno(impegni, btnModifica.id);
    };
    btnModifica.innerHTML = "Modifica impegno";

    var div = document.createElement("div");
    div.setAttribute("class","card-body");

    div.appendChild(h5);
    div.appendChild(p);
    div.appendChild(btnModifica);
    div.appendChild(btnElimina);

    var divCard = document.createElement("div");
    divCard.setAttribute("class","card");
    divCard.setAttribute("style","width: 21rem;");

    divCard.appendChild(div);

    document.getElementById("card").appendChild(divCard);
    
    var br = document.createElement("br");
    document.getElementById("card").appendChild(br);

    count++;
}

function eliminaImpegno(impegni, btnId){
    //console.log(impegni[btnId]._id);

    fetch('../api/v1/impegniAnimali/deleteImpegno', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, idImpegno: impegni[btnId]._id } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        
        if(data.success){
            window.location.reload();
        }else{
            document.getElementById("paraDanger").innerHTML = "Elimina impegno fallito";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function modificaImpegno(impegni, btnId){
    console.log(impegni[btnId]._id);
    sessionStorage.setItem("idImpegno",impegni[btnId]._id);
    document.location.href = 'modificaImpegno.html';
}

function aggiungiImpegno(){
    document.location.href = 'aggiungiImpegno.html'
}

//Go back to home screen
function goBack(){
    document.location.href = '/home.html';
}

function formatData(p, impegno){
    //console.log(impegno);
    /*let year;
    let month;
    let day;
    let hour;
    let minutes;

    for(i=0; i<16; i++){
        if(i == 0){
            year = impegno.data[i];
        }else if(i < 4){
            year += impegno.data[i];
        }
        if(i == 5){
            month = impegno.data[i];
        }else if(i < 7){
            month += impegno.data[i];
        }
        if(i == 8){
            day = impegno.data[i];
        }else if(i < 10){
            day += impegno.data[i];
        }
        if(i == 11){
            hour = impegno.data[i];
        }else if(i < 13){
            hour += impegno.data[i];
        }
        if(i == 14){
            minutes = impegno.data[i];
        }else if(i < 16){
            minutes += impegno.data[i];
        }
    }

    let tmp = hour
    hour = parseInt(tmp) + 1;

    if(hour < 10){
        hour = "0" + hour;
    }

    if(hour != "01" || minutes != "00"){*/
        p.innerHTML = "Impegno: " + impegno.impegno + "<br>Luogo: " + impegno.luogo + " <br>Data: " + day + "/" + month + "/" + year + "<br>Ora: " + hour + ":" + minutes;
    //}else{
   //     p.innerHTML = "Impegno: " + impegno.impegno + "<br>Luogo: " + impegno.luogo + " <br>Data: " + day + "/" + month + "/" + year;
    //}
}