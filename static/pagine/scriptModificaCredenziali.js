function confermaCredenziali(){

    var emailOld = sessionStorage.getItem("email");
    var emailNew = document.getElementById("email").value;
    var passwordNew = document.getElementById("password").value;

    fetch('/api/v1/modificaCredenziali', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { emailOld: emailOld, emailNew: emailNew, passwordNew: passwordNew } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data){
        //console.log(data);

        if(data.success){
            var para = document.createElement("p");
            var nodo = document.createTextNode("Modifiche applicate");
            para.appendChild(nodo);
            document.body.appendChild(para);
            //sleep(2);
            annullaCredenziali();
        }else{
            var para = document.createElement("p");
            var nodo = document.createTextNode("Errore");
            para.appendChild(nodo);
            document.body.appendChild(para);
        }
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function annullaCredenziali(){
    document.location.href='/home.html';
}

/*function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){} //non faccio niente 
}*/