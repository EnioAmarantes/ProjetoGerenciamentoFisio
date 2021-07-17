var editMode = false;
var indexRow = 0;

var foto = document.getElementById("imgExame");
const exameURl = "../compartilhado/images/exames/exame-001.jpg";

var pacientes = [];
var exames = [];

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

function carrega(){
    if(localStorage.getItem("pacientes") != null)
        carregaPacientes();

    if(localStorage.getItem("exames") != null)
        carregaExames();
}

function carregaPacientes(){
    pacientes = JSON.parse(localStorage.getItem("pacientes"));
    var pacientesOptions = document.getElementById("pacientesList");

    for(x = 0; x < pacientes.length; x++){
        let option = document.createElement("option");
        option.text = pacientes[x]["nome"];
        option.value = pacientes[x]["nome"];

        pacientesOptions.add(option);
    }
}

function carregaExames(){
    exames = JSON.parse(localStorage.getItem("exames"));

    for(x = 0; x < exames.length; x++){
        var tabela = document.getElementById("examesTab").getElementsByTagName('tbody')[0];
        var linha = tabela.insertRow();

        var celTipoExame = linha.insertCell(0);
        var celPaciente = linha.insertCell(1);   
        var celDataExame = linha.insertCell(2);
        var celOpcao = linha.insertCell(3);
        celOpcao.className = "text-center"

        celTipoExame.innerHTML = exames[x]["tipoExame"];
        celPaciente.innerHTML = exames[x]["paciente"];
        celDataExame.innerHTML = exames[x]["dataExame"];

        celOpcao.innerHTML =  lookButton + " " + editButton + " " + delButton;
    }
}

function registra(){
    if(editMode)
        updateExame("examesTab");
    else
        addExame("examesTab");
}

function edit(exame){
    editExame(exame);
}

function del(exame){
    delExame(exame);
}

async function registraExame(){
    let file = await window.showOpenFilePicker(imgOpt);

    let newFoto = await file[0].getFile();

    let reader = new FileReader();
    reader.readAsDataURL(newFoto);
    reader.onload = function(event) {
        foto.src = event.target.result;
    }
}

function addExame(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];

    var linha = tabela.insertRow();

    var celTipoExame = linha.insertCell(0);
    var celPaciente = linha.insertCell(1);   
    var celDataExame = linha.insertCell(2);
    var celOpcao = linha.insertCell(3);
    celOpcao.className = "text-center"
    
    var exame = new Exame(
        foto.src,
        document.getElementById("tipoExame").value,
        document.getElementById("pacientesList").value,
        document.getElementById("dataExame").value,
    );

    celTipoExame.innerHTML = exame.tipoExame;
    celPaciente.innerHTML = exame.paciente;
    celDataExame.innerHTML = exame.dataExame;

    exames[exames.length] = exame;

    window.localStorage.setItem("exames", JSON.stringify(exames));

    celOpcao.innerHTML =  lookButton + " " + editButton + " " + delButton;

    limpaForm();
    voltaForm();
}

function updateExame(idTabela){
    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    
    var linha = tabela.getElementsByTagName("tr")[indexRow -1].getElementsByTagName("td");

    var celTipoExame = linha.item(0);
    var celPaciente = linha.item(1);   
    var celDataExame = linha.item(2);
    
    var exame = new Exame(
        foto.src,
        document.getElementById("tipoExame").value,
        document.getElementById("pacientesList").value,
        document.getElementById("dataExame").value,
    );

    celTipoExame.innerHTML = exame.tipoexame;
    celPaciente.innerHTML = exame.paciente;
    celDataExame.innerHTML = exame.dataExame;

    exames[indexRow - 1] = exame;

    window.localStorage.setItem("exames", JSON.stringify(exames));

    limpaForm();
    voltaForm();
}

function editExame(exame){
    if(editMode)
        return;

    editMode = true;
    indexRow = exame.parentNode.parentNode.rowIndex;
    changeButton();
    var items = exame.parentNode.parentNode.cells;

    foto.src = exames[indexRow - 1].imagem;

    document.getElementById("tipoExame").value = items.item(0).innerHTML;
    document.getElementById("pacientesList").value = items.item(1).innerHTML;
    document.getElementById("dataExame").value = items.item(2).innerHTML;
}

function delExame(exame){
    if(editMode)
        return;

    var i = exame.parentNode.parentNode.rowIndex;
    if(i == exames.length)
        exames.pop();
    if(i == 0)
        exames.shift();
    else
        exames.splice(i, 1);

    localStorage.setItem("exames", JSON.stringify(exames));
    location.reload();
}

function changeButton(){
    if(editMode)
        document.getElementById("btnExame").innerHTML = "Editar";
    else
        document.getElementById("btnExame").innerHTML = "Cadastrar";
}

function limpaForm(){
    foto.src = exameURl;
    document.getElementById("tipoExame").value = "";
    document.getElementById("pacientesList").value = "";
    document.getElementById("dataExame").value = "";
}

function voltaForm(){
    indexRow = 0;
    editMode = false;
    changeButton();
}

function look(){
    document.getElementById("btnModal").click();
    console.log(document.getElementById("btnModal"))
}

class Exame{
    constructor(imagem, tipoExame, paciente, dataExame){
        this.imagem = imagem;
        this.tipoExame = tipoExame;
        this.paciente = paciente;
        this.dataExame = dataExame;
    }
}