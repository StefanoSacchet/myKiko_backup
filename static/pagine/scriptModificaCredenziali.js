function confermaCredenziali(){

    let emailOld = sessionStorage.getItem("email"); //Get user's email

    //Get user's inputs
    let emailNew = document.getElementById("email").value;
    let passwordNew = document.getElementById("password").value;

    document.getElementById("paraMessage").innerHTML = ""; //Reset paragraph

    fetch('/api/v1/userAccount/modificaCredenziali', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { emailOld: emailOld, emailNew: emailNew, passwordNew: passwordNew } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        
        //console.log(data);

        if(data.success){

            document.getElementById("paraMessage").innerHTML = "Modifiche applicate";
            sessionStorage.clear(); //Clear user data
            //sleep(2);
            document.location.href = '/index.html'; //Go back to login

        }else if(data.message == "Empty inputs"){
            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";
        }else{
            document.getElementById("paraDanger").innerHTML = "Effettuare di nuovo il login";
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

//Go back to home screen
function annullaCredenziali(){
    document.location.href='/home.html';
}

/*function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){} //non faccio niente 
}*/