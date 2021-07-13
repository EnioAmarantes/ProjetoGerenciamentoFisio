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
        window.location = ("./pacientes/paciente.html")
    else
        alert("Não funcionou o login");
}

function artigo(id){

    switch(id){
        case 1:
            window.open('https://www.rbmt.org.br/details/1583/pt-BR/covid-19--a-importancia-da-fisioterapia-na-recuperacao-da-saude-do-trabalhador');
            break;
        case 2:
            window.open('https://wwww.google.com.br');
            break;
        case 3:
            window.open('https://www.google.com.br');
            break;
        default:
            alert("link para o artigo não encontrado.");
    }
}