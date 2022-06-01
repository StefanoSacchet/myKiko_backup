let email = sessionStorage.getItem("email"); //Get user email

//Enable and disable button
let btnDelete = document.getElementById("deleteAccount");
let btnConfermaDelete = document.getElementById("confermaDelete");
let btnAnnullaDelete = document.getElementById("annullaDelete");

//Make buttons hidden
btnConfermaDelete.hidden = true;
btnAnnullaDelete.hidden = true;

function modificaCredenziali(){
    document.location.href = '/pagine/modificaCredenziali.html';
}

function logout(){
    sessionStorage.clear(); //Clear user data
    document.location.href = 'index.html'; //Go back to login
}

function deleteAccount(){ 
    btnDelete.disabled = true;
    btnConfermaDelete.hidden = false;
    btnAnnullaDelete.hidden = false;
}

function confermaDelete(){

    fetch('../api/v1/userAccount/deleteAccount', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        
        if(data.success){
            document.getElementById("paraDanger").innerHTML = "Account eliminato";
            logout();
        }else{
            document.getElementById("paraDanger").innerHTML = "Operazione fallita";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function annullaDelete(){
    btnDelete.disabled = false;
    btnConfermaDelete.hidden = true;
    btnAnnullaDelete.hidden = true;
}

function infoAnimale(){
    document.location.href = '/pagine/infoAnimale.html';
}

function impegni(){
    document.location.href = '/pagine/impegni.html';
}

function cibo(){
    document.location.href = '/pagine/cibo.html';
}

function smarThings(){
    document.location.href = '/pagine/smarThings.html';
}