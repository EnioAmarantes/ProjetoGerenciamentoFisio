var editMode = false;
var indexRow = 0;

const imgOpt = {
    types: [
        {
            description: 'Images',
            accept: {
                'image/*': ['.png', '.gif', '.jpeg', '.jpg']
            }
        }
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

async function tireFoto(){
    var foto = document.getElementById("avatar");

    var file = await window.showOpenFilePicker(imgOpt);

    var newFoto = await file[0].getFile();

    foto.src = "D:\\Imagens\\Photo\\" + newFoto.name;
}

function registra(){
    if(editMode)
        updatePaciente("pacientesTab");
    else
        addPaciente("pacientesTab");
}

function addPaciente(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];

    var linha = tabela.insertRow();

    var celNome = linha.insertCell(0);
    var celIdade = linha.insertCell(1);   
    var celTratamento = linha.insertCell(2);
    var celProxConsulta = linha.insertCell(3);

    var celOpcao = linha.insertCell(4);

    celNome.innerHTML = document.getElementById("nomePaciente").value;
    celIdade.innerHTML = document.getElementById("idadePaciente").value;
    celTratamento.innerHTML = document.getElementById("tratamento").value;
    celProxConsulta.innerHTML = document.getElementById("prox_consulta").value;

    celOpcao.innerHTML =  editButton + " " + delButton;

    limpaForm();

    if(editMode){
        indexRow = 0;
        editMode = false;
        changeButton();
    }
}

function updatePaciente(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    
    var linha = tabela.getElementsByTagName("td");

    var celNome = linha.item(0);
    var celIdade = linha.item(1);   
    var celTratamento = linha.item(2);
    var celProxConsulta = linha.item(3);

    celNome.innerHTML = document.getElementById("nomePaciente").value;
    celIdade.innerHTML = document.getElementById("idadePaciente").value;
    celTratamento.innerHTML = document.getElementById("tratamento").value;
    celProxConsulta.innerHTML = document.getElementById("prox_consulta").value;

    limpaForm();
    voltaForm();
}

function editPaciente(paciente){
    editMode = true;
    indexRow = paciente.parentNode.parentNode.rowIndex;
    changeButton();
    var items = paciente.parentNode.parentNode.cells;
    document.getElementById("nomePaciente").value = items.item(0).innerHTML;
    document.getElementById("idadePaciente").value = items.item(1).innerHTML;
    document.getElementById("tratamento").value = items.item(2).innerHTML;
    document.getElementById("prox_consulta").value = items.item(3).innerHTML;
}

function delPaciente(paciente){
    var i = paciente.parentNode.parentNode.rowIndex;
    document.getElementById("pacientesTab").deleteRow(i);
}

function changeButton(){
    if(editMode)
        document.getElementById("btnPaciente").innerHTML = "Editar";
    else
        document.getElementById("btnPaciente").innerHTML = "Cadastrar";
}

function limpaForm(){
    document.getElementById("nomePaciente").value = "";
    document.getElementById("idadePaciente").value = "";
    document.getElementById("tratamento").value = "";
    document.getElementById("prox_consulta").value = "";
}

function voltaForm(){
    indexRow = 0;
    editMode = false;
    changeButton();
}