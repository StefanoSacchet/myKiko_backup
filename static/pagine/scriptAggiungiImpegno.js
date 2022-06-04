var email = sessionStorage.getItem("email");

let check = false;

function conferma(){

    //Get values from the user's inputs
    let impegno = document.getElementById("impegno").value;
    let animale = document.getElementById("animale").value;
    let luogo = document.getElementById("luogo").value;
    let data = document.getElementById("data").value;
    //console.log(data);

    //Check if data format is correct
    if(data.length <= 10){

        if(data[4] != "-" || data[7] != "-" || (parseInt(data[5] + data[6]) > 12) || (parseInt(data[8] + data[9]) > 31)){
            check = false;
        }else{
            check = true;
        }

    }else{ //11,12 14,15

        if(data[4] != "-" || data[7] != "-" || data[10] != " " || (parseInt(data[11] + data[12]) > 23) || (parseInt(data[14] + data[15]) > 59)){
            check = false;
        }else{
            check = true;
        }

    }

    if(check){

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

    }else{
        document.getElementById("paraDanger").innerHTML = "Formato data errato";
    }
}

function annulla(){
    document.location.href = 'impegni.html';
}