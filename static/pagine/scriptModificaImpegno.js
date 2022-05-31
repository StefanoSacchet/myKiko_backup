function conferma(){
   
    let email = sessionStorage.getItem("email"); //Get user's email
    let idImpegno = sessionStorage.getItem("idImpegno"); //Get impegno's id
    sessionStorage.removeItem("idImpegno");

    //console.log(email);
    //console.log(idImpegno);

    //Get values from the user's inputs
    let impegno = document.getElementById("impegno").value;
    let animale = document.getElementById("animale").value;
    let luogo = document.getElementById("luogo").value;
    let data = document.getElementById("data").value;
    
    document.getElementById("paraMessage").value = "";

    fetch('/api/v1/impegniAnimali/modificaImpegno', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, id: idImpegno, impegnoNew: impegno, animaleNew: animale, luogoNew: luogo, dataNew: data} ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        if(data.success){

            document.getElementById("paraMessage").innerHTML = "Modifiche applicate";
            document.location.href = 'impegni.html';

        }else if(data.message == "Empty inputs"){

            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";
        }else{
            document.getElementById("paraDanger").innerHTML = "Effettuare di nuovo il login";
        }
    })
}

function annulla(){
    document.location.href = 'impegni.html';
}
