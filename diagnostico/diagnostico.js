var editMode = false;
var indexRow = 0;

var diagnosticos = [];
var pacientes = [];

function carrega(){
    document.getElementById("container").style.marginLeft = document.getElementById("sidebar").style.width;
    
    if(localStorage.getItem("diagnosticos") != null)
        carregaDiagnosticos();

    if(localStorage.getItem("pacientes") != null)
        carregaPacientes();
}

function carregaDiagnosticos(){
    diagnosticos = JSON.parse(localStorage.getItem("diagnosticos"));

    for(x = 0; x < diagnosticos.length; x++){
        var tabela = document.getElementById("diagnosticosTab").getElementsByTagName('tbody')[0];
        var linha = tabela.insertRow();

        var celPaciente = linha.insertCell(0);
        var celReclamacao = linha.insertCell(1);  
        var celDataDiag = linha.insertCell(2);
        var celDiagnostico = linha.insertCell(3);
        var celOpcao = linha.insertCell(4);
        celOpcao.className = "text-center"

        celPaciente.innerHTML = diagnosticos[x]["paciente"];
        celReclamacao.innerHTML = diagnosticos[x]["reclamacao"];
        celDataDiag.innerHTML = diagnosticos[x]["dataDiag"];
        celDiagnostico.innerHTML = diagnosticos[x]["diagnostico"];

        celOpcao.innerHTML =  editButton + " " + delButton;
    }
}

function carregaPacientes(){
    pacientes = JSON.parse(localStorage.getItem("pacientes"));
    var pacientesOptions = document.getElementById("pacientes");

    for(x = 0; x < pacientes.length; x++){
        let option = document.createElement("option");
        option.text = pacientes[x]["nome"];
        option.value = pacientes[x]["nome"];

        pacientesOptions.add(option);
    }
}

function registra(){
    if(editMode)
        updateDiagnostico("diagnosticosTab");
    else
        addDiagnostico("diagnosticosTab");
}

function addDiagnostico(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];

    var linha = tabela.insertRow();

    var celPaciente = linha.insertCell(0);
    var celReclamacao = linha.insertCell(1);   
    var celDataDiag = linha.insertCell(2);
    var celDiagnostico = linha.insertCell(3);

    var celOpcao = linha.insertCell(4);
    celOpcao.className = "text-center";

    console.log(document.getElementById("reclamacao").value)
    var diagnostico = new Diagnostico(
        document.getElementById("pacientes").value,
        document.getElementById('dataDiagnostico').value,
        document.getElementById("reclamacao").value,
        document.getElementById("testes").value,
        document.getElementById("diagnostico").value
    )

    console.log(diagnostico);


    celPaciente.innerHTML = diagnostico.paciente;
    celReclamacao.innerHTML = diagnostico.reclamacao;
    celDataDiag.innerHTML = diagnostico.dataDiag;
    celDiagnostico.innerHTML = diagnostico.diagnostico;

    diagnosticos[diagnosticos.length] = diagnostico;

    localStorage.setItem("diagnosticos", JSON.stringify(diagnosticos));

    celOpcao.innerHTML =  editButton + " " + delButton;

    limpaForm();
    voltaForm();
}

function updateDiagnostico(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    
    var linha = tabela.getElementsByTagName("tr")[indexRow -1].getElementsByTagName("td");

    var celPaciente = linha.item(0);
    var celReclamacao = linha.item(1);   
    var celDataDiag = linha.item(2);
    var celDiagnostico = linha.item(3);

    let diagnostico = new Diagnostico(
        document.getElementById("pacientes").value,
        document.getElementById('dataDiagnostico').value,
        document.getElementById("reclamacao").value,
        document.getElementById("testes").value,
        document.getElementById("diagnostico").value
    )

    celPaciente.innerHTML = diagnostico.paciente;
    celReclamacao.innerHTML = diagnostico.reclamacao;
    celDataDiag.innerHTML = diagnostico.dataDiag;
    celDiagnostico.innerHTML = diagnostico.diagnostico;

    diagnosticos[indexRow - 1] = diagnostico;

    localStorage.setItem("diagnosticos", JSON.stringify(diagnosticos));

    limpaForm();
    voltaForm();
}

function edit(diagnostico){
    editDiagnostico(diagnostico);
}

function del(diagnostico){
    delDiagnostico(diagnostico);
}

function editDiagnostico(diagnostico){
    if(editMode)
        return;

    editMode = true;
    indexRow = diagnostico.parentNode.parentNode.rowIndex;
    changeButton();
    let diag = diagnosticos[indexRow -1];
    document.getElementById("dataDiagnostico").value = diag.dataDiag;
    document.getElementById("pacientes").value = diag.paciente;
    document.getElementById("reclamacao").value = diag.reclamacao;
    document.getElementById("testes").value = diag.testes;
    document.getElementById("diagnostico").value = diag.diagnostico;
}

function delDiagnostico(diagnostico){
    if(editMode)
        return;

    var i = diagnostico.parentNode.parentNode.rowIndex;

    if(i == diagnosticos.length)
        diagnosticos.pop();
    if(i == 0)
        diagnosticos.shift();
    else
        diagnosticos.splice(i, 1);

    localStorage.setItem("diagnosticos", JSON.stringify(diagnosticos));
    location.reload();
}

function changeButton(){
    if(editMode)
        document.getElementById("btnDiagnostico").innerHTML = "Editar";
    else
        document.getElementById("btnDiagnostico").innerHTML = "Cadastrar";
}

function limpaForm(){
    document.getElementById("dataDiagnostico").value = "";
    document.getElementById("pacientes").value = "";
    document.getElementById("reclamacao").value = "";
    document.getElementById("testes").value = "";
    document.getElementById("diagnostico").value = "";
}

function voltaForm(){
    indexRow = 0;
    editMode = false;
    changeButton();
}

class Diagnostico{
    constructor(paciente, dataDiag, reclamacao, testes, diagnostico){
        this.paciente = paciente;
        this.dataDiag = dataDiag;
        this.testes = testes;
        this.reclamacao = reclamacao;
        this.diagnostico = diagnostico;
    }
}