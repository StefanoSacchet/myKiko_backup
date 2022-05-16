var loggedUser = {};

//Per disabilitare e riabilitare i bottoni
let buttonLogin = document.querySelector(".button");
let buttonIscriviti = document.querySelector(".input");

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
    
    fetch('../api/v1/authentications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        loggedUser.animale = data.animale;

        if(!data.success){
            var para = document.createElement("p");
            var nodo = document.createTextNode("Username o password sbagliati");
            para.appendChild(nodo);
            var element = document.getElementById("loginform");
            element.appendChild(para);
        }else{
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("password",password);
            //sessionStorage.setItem("animale",JSON.stringify(data.animale));
            //console.log(data.animale[0]);

            document.location.href='home.html';
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

    console.log(email + " " + password);

    fetch('../api/v1/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data); /*problema: id = undefinfed*/

        if(data.success){
            var para = document.createElement("p");
            var nodo = document.createTextNode("Credenziali registrate, effetuare il login");
            para.appendChild(nodo);
            var element = document.getElementById("loginform");
            element.appendChild(para);
        }

        return;
    })
    .then(function(){ //Enable buttons
        buttonLogin.disabled = false;
        buttonIscriviti.disabled = false;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}