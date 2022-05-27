var email = sessionStorage.getItem("email");

function conferma(){

    //Get values from the user's inputs
    let impegno = document.getElementById("impegno").value;
    let animale = document.getElementById("animale").value;
    let luogo = document.getElementById("luogo").value;
    let data = document.getElementById("data").value;

    fetch('../api/v1/impegniAnimali/aggiungiImpegno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, impegnoNew: impegno, animaleNew: animale, luogoNew: luogo, dataNew: data} ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){

        if(data.success){

            document.getElementById("paraMessage").innerHTML = "Impegno aggiunto";
            annulla();

        }else if(data.message == "Empty inputs"){

            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";

        }else{
            document.getElementById("paraDanger").innerHTML = "Effettuare di nuovo il login";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function annulla(){
    document.location.href = 'impegni.html';
}



