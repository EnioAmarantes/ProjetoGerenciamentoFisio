var editMode = false;
var indexRow = 0;

var foto = document.getElementById("avatar");
const avatarUrl = "../compartilhado/images/avatares/avatar-002.jpg";

var pacientes = [];
var tratamentos = [];

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

    if(localStorage.getItem("tratamentos") != null)
        carregaTratamentos();
}

function carregaPacientes(){
    pacientes = JSON.parse(localStorage.getItem("pacientes"));

    for(x = 0; x < pacientes.length; x++){
        var tabela = document.getElementById("pacientesTab").getElementsByTagName('tbody')[0];
        var linha = tabela.insertRow();

        var celNome = linha.insertCell(0);
        var celIdade = linha.insertCell(1);   
        var celTratamento = linha.insertCell(2);
        var celProxConsulta = linha.insertCell(3);
        var celOpcao = linha.insertCell(4);
        celOpcao.className = "text-center"

        celNome.innerHTML = pacientes[x]["nome"];
        celIdade.innerHTML = pacientes[x]["idade"];
        celTratamento.innerHTML = pacientes[x]["tratamento"];
        celProxConsulta.innerHTML = pacientes[x]["proxConsulta"];

        celOpcao.innerHTML =  editButton + " " + delButton;
    }
}

function carregaTratamentos(){
    tratamentos = JSON.parse(localStorage.getItem("tratamentos"));
    var tratamentoOptions = document.getElementById("tratamentos");

    for(x = 0; x < tratamentos.length; x++){
        let option = document.createElement("option");
        option.text = tratamentos[x]["nome"];
        option.value = tratamentos[x]["nome"];

        tratamentoOptions.add(option);
    }
}

function registra(){
    if(editMode)
        updatePaciente("pacientesTab");
    else
        addPaciente("pacientesTab");
}

function edit(paciente){
    editPaciente(paciente);
}

function del(paciente){
    delPaciente(paciente);
}

async function tireFoto(){
    let file = await window.showOpenFilePicker(imgOpt);

    let newFoto = await file[0].getFile();

    let reader = new FileReader();
    reader.readAsDataURL(newFoto);
    reader.onload = function(event) {
        foto.src = event.target.result;
    }
}

function addPaciente(idTabela){

    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];

    var linha = tabela.insertRow();

    var celNome = linha.insertCell(0);
    var celIdade = linha.insertCell(1);   
    var celTratamento = linha.insertCell(2);
    var celProxConsulta = linha.insertCell(3);

    var celOpcao = linha.insertCell(4);
    celOpcao.className = "text-center"
    
    var paciente = new Paciente(
        foto.src,
        document.getElementById("nomePaciente").value,
        document.getElementById("idadePaciente").value,
        document.getElementById("tratamento").value,
        document.getElementById("prox_consulta").value
    );

    celNome.innerHTML = paciente.nome;
    celIdade.innerHTML = paciente.idade;
    celTratamento.innerHTML = paciente.tratamento;
    celProxConsulta.innerHTML = paciente.proxConsulta;

    pacientes[pacientes.length] = paciente;

    window.localStorage.setItem("pacientes", JSON.stringify(pacientes));

    celOpcao.innerHTML =  editButton + " " + delButton;

    limpaForm();
    voltaForm();
}

function updatePaciente(idTabela){
    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    
    var linha = tabela.getElementsByTagName("tr")[indexRow -1].getElementsByTagName("td");

    var celNome = linha.item(0);
    var celIdade = linha.item(1);   
    var celTratamento = linha.item(2);
    var celProxConsulta = linha.item(3);

    paciente = new Paciente(
        foto.src,
        document.getElementById("nomePaciente").value,
        document.getElementById("idadePaciente").value,
        document.getElementById("tratamento").value,
        document.getElementById("prox_consulta").value
    );

    celNome.innerHTML = paciente.nome;
    celIdade.innerHTML = paciente.idade;
    celTratamento.innerHTML = paciente.tratamento;
    celProxConsulta.innerHTML = paciente.proxConsulta;

    pacientes[indexRow -1] = paciente;

    window.localStorage.setItem("pacientes", JSON.stringify(pacientes));

    limpaForm();
    voltaForm();
}

function editPaciente(paciente){
    if(editMode)
        return;

    editMode = true;
    indexRow = paciente.parentNode.parentNode.rowIndex;
    changeButton();
    var items = paciente.parentNode.parentNode.cells;

    foto.src = pacientes[indexRow - 1].imagem;

    document.getElementById("nomePaciente").value = items.item(0).innerHTML;
    document.getElementById("idadePaciente").value = items.item(1).innerHTML;
    document.getElementById("tratamento").value = items.item(2).innerHTML;
    document.getElementById("prox_consulta").value = items.item(3).innerHTML;
}

function delPaciente(paciente){
    if(editMode)
        return;

    var i = paciente.parentNode.parentNode.rowIndex;
    if(i == pacientes.length)
        pacientes.pop();
    if(i == 0)
        pacientes.shift();
    else
        pacientes.splice(i, 1);

    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    location.reload();
}

function changeButton(){
    if(editMode)
        document.getElementById("btnPaciente").innerHTML = "Editar";
    else
        document.getElementById("btnPaciente").innerHTML = "Cadastrar";
}

function limpaForm(){
    foto.src = avatarUrl;
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

class Paciente{
    constructor(imagem, nome, idade, tratamento, proxConsulta){
        this.imagem = imagem;
        this.nome = nome;
        this.idade = idade;
        this.tratamento = tratamento;
        this.proxConsulta = proxConsulta;
    }
}