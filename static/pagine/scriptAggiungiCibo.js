let email = sessionStorage.getItem("email"); //Get user email

function  conferma(){
     //Get values from the user's inputs
     let prodotto = document.getElementById("prodotto").value;
     let quantita = document.getElementById("quantita").value;
     
 
     fetch('../api/v1/cibo/aggiungiCibo', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify( { email: email, prodottoNew: prodotto, quantitaNew: quantita} ),
     })
     .then((resp) => resp.json()) // Transform the data into json
     .then(function(data){
 
         if(data.success){
 
             document.getElementById("paraMessage").innerHTML = "cibo aggiunto";
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
    document.location.href = 'cibo.html';
}