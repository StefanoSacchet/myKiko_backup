var loggedUser = {};

//Per disabilitare e riabilitare i bottoni
let buttonLogin = document.getElementById("login");
let buttonIscriviti = document.getElementById("iscriviti");

//This function is called when login button is pressed
function login() {

    //Disable buttons
    buttonLogin.disabled = true;
    buttonIscriviti.disabled = true;

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    //alert(email + " " + password);
    //console.log(email + " " + password);
    //document.getElementById("loginform").style.display = 'none';
    //document.location.href='/pagine/home.html';
    //document.getElementById("sottoTitolo").innerHTML = "ciao"; //"email: " + email + " , password: " + password;
    
    fetch('../api/v1/userAccount/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data);
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;

        if(data.success){
            sessionStorage.setItem("email",email);
            document.location.href='home.html';
        }else if(data.message == "Authentication failed. User not found."){
            document.getElementById("paraDanger").innerHTML = "Username o password sbagliati";
            //console.log(data.message);
        }else if (data.message == "Authentication failed. Wrong password."){
            //console.log(data.message);
            document.getElementById("paraDanger").innerHTML = "Password errata";
        }else{
            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";
        }

        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        //document.getElementById("loggedUser").innerHTML = loggedUser.email;
        return;
    })
    .then(function(){ //Enable buttons
        buttonLogin.disabled = false;
        buttonIscriviti.disabled = false;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function signUp(){

    //Disable buttons
    buttonLogin.disabled = true;
    buttonIscriviti.disabled = true;

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    //console.log(email + " " + password);

    fetch('../api/v1/userAccount/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data); /*problema: id = undefinfed*/

        if(data.success){
            document.getElementById("paraInfo").innerHTML = "Credenziali registrate, effetuare il login";
        }else if(data.message == "Registration failed. User already subscribed."){
            document.getElementById("paraDanger").innerHTML = "Utente già iscritto";
        }else if(data.message == "Registration failed. input empty"){
            document.getElementById("paraDanger").innerHTML = "Compilare tutti i campi";
        }else{
            document.getElementById("paraDanger").innerHTML = "Errore, ricaricare la pagina";
        }

        return;
    })
    .then(function(){ //Enable buttons
        buttonLogin.disabled = false;
        buttonIscriviti.disabled = false;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}