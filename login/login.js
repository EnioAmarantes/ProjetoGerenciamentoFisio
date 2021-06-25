var input = document.getElementById("password");

input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        login();
    }
});

function login(){
    var pass = btoa(document.forms["login"]["password"].value);

    if(document.forms["login"]["email"].value === "teste" && pass === "MTIz")
        window.location = ("../pacientes/paciente.html")
    else
        alert("Não funcionou o login");
}