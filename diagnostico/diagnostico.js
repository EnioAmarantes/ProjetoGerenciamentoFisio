var editMode = false;
var indexRow = 0;

function registra(){
    if(editMode)
        updateDiagnostico("diagnosticosTab");
    else
        addDiagnostico("diagnosticosTab");
}

function addDiagnostico(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];

    var linha = tabela.insertRow();

    var celCod = linha.insertCell(0);
    var celDataDiag = linha.insertCell(1);   
    var celPaciente = linha.insertCell(2);
    var celDiagnostico = linha.insertCell(3);

    var celOpcao = linha.insertCell(4);
    celOpcao.className = "text-center";

    celCod.innerHTML = document.getElementById("codDiagnostico").value;
    celDataDiag.innerHTML = document.getElementById("dataDiagnostico").value;
    celPaciente.innerHTML = document.getElementById("nomePaciente").value;
    celDiagnostico.innerHTML = document.getElementById("diagnostico").value;

    celOpcao.innerHTML =  editButton + " " + delButton;

    limpaForm();

    if(editMode){
        indexRow = 0;
        editMode = false;
        changeButton();
    }
}

function updateDiagnostico(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    
    var linha = tabela.getElementsByTagName("td");

    var celCod = linha.item(0);
    var celDataDiag = linha.item(1);
    var celPaciente = linha.item(2);
    var celDiagnostico = linha.item(3);

    celCod.innerHTML = document.getElementById("codDiagnostico").value;
    celDataDiag.innerHTML = document.getElementById("dataDiagnostico").value;
    celPaciente.innerHTML = document.getElementById("nomePaciente").value;
    celDiagnostico.innerHTML = document.getElementById("diagnostico").value;

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
    editMode = true;
    indexRow = diagnostico.parentNode.parentNode.rowIndex;
    changeButton();
    var items = diagnostico.parentNode.parentNode.cells;
    document.getElementById("codDiagnostico").value = items.item(0).innerHTML;
    document.getElementById("dataDiagnostico").value = items.item(1).innerHTML;
    document.getElementById("nomePaciente").value = items.item(2).innerHTML;
    document.getElementById("diagnostico").value = items.item(3).innerHTML;
}

function delDiagnostico(diagnostico){
    if(editMode)
        return;

    var i = diagnostico.parentNode.parentNode.rowIndex;
    document.getElementById("diagnosticosTab").deleteRow(i);
}

function changeButton(){
    if(editMode)
        document.getElementById("btnDiagnostico").innerHTML = "Editar";
    else
        document.getElementById("btnDiagnostico").innerHTML = "Cadastrar";
}

function limpaForm(){
    document.getElementById("codDiagnostico").value = "";
    document.getElementById("dataDiagnostico").value = "";
    document.getElementById("nomePaciente").value = "";
    document.getElementById("diagnostico").value = "";
}

function voltaForm(){
    indexRow = 0;
    editMode = false;
    changeButton();
}
