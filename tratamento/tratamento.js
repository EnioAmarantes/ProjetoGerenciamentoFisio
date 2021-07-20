var editMode = false;
var indexRow = 0;

var tratamentos = [];

function carrega(){
    document.getElementById("container").style.marginLeft = "240px";

    if(localStorage.getItem("tratamentos") != null)
        carregaTratamentos();
}

function carregaTratamentos(){
    tratamentos = JSON.parse(localStorage.getItem("tratamentos"));
    var tabela = document.getElementById("tratamentosTab").getElementsByTagName('tbody')[0];

    for(x = 0; x < tratamentos.length; x++){
        var linha = tabela.insertRow();
    
        var celTratamento = linha.insertCell(0);
        var celIndicacao = linha.insertCell(1);   
        var celDescricao = linha.insertCell(2);
    
        var celOpcao = linha.insertCell(3);
        celOpcao.className = "text-center"
    
        celTratamento.innerHTML = tratamentos[x]["nome"];
        celIndicacao.innerHTML = tratamentos[x]["indicacao"];
        celDescricao.innerHTML = tratamentos[x]["descricao"];
    
        celOpcao.innerHTML =  editButton + " " + delButton;
    }
}

function registra(){
    if(editMode)
        updateTratamento("tratamentosTab");
    else
        addTratamento("tratamentosTab");
}

function edit(tratamento){
    editTratamento(tratamento);
}

function del(tratamento){
    delTratamento(tratamento);
}

function addTratamento(idTabela){
    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];

    var linha = tabela.insertRow();

    var celTratamento = linha.insertCell(0);
    var celIndicacao = linha.insertCell(1);   
    var celDescricao = linha.insertCell(2);

    var celOpcao = linha.insertCell(3);
    celOpcao.className = "text-center";

    var tratamento = new Tratamento(
        document.getElementById("nomeTratamento").value,
        document.getElementById("indicacao").value,
        document.getElementById("descTratamento").value
    )

    celTratamento.innerHTML = tratamento.nome;
    celIndicacao.innerHTML = tratamento.indicacao;
    celDescricao.innerHTML = tratamento.descricao;

    tratamentos[tratamentos.length] = tratamento;

    window.localStorage.setItem("tratamentos", JSON.stringify(tratamentos));

    celOpcao.innerHTML =  editButton + " " + delButton;

    limpaForm();
    voltaForm();
}

function updateTratamento(idTabela){
    var tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    
    var linha = tabela.getElementsByTagName("tr")[indexRow -1].getElementsByTagName("td");
    var celTratamento = linha.item(0);
    var celIndicacao = linha.item(1);
    var celDescricao = linha.item(2);

    let tratamento = new Tratamento(
        document.getElementById("nomeTratamento").value,
        document.getElementById("indicacao").value,
        document.getElementById("descTratamento").value
    )

    celTratamento.innerHTML = tratamento.nome;
    celIndicacao.innerHTML = tratamento.indicacao;
    celDescricao.innerHTML = tratamento.descricao;

    tratamentos[indexRow - 1] = tratamento;

    window.localStorage.setItem("tratamentos", JSON.stringify(tratamentos));

    limpaForm();
    voltaForm();
}

function editTratamento(tratamento){
    editMode = true;
    indexRow = tratamento.parentNode.parentNode.rowIndex;
    changeButton();
    var items = tratamento.parentNode.parentNode.cells;

    document.getElementById("nomeTratamento").value = items.item(0).innerHTML;
    document.getElementById("indicacao").value = items.item(1).innerHTML;
    document.getElementById("descTratamento").value = items.item(2).innerHTML;
}

function delTratamento(tratamento){
    if(editMode)
        return;

    var i = tratamento.parentNode.parentNode.rowIndex;

    if(i == tratamentos.length)
        tratamentos.pop();
    if(i == 0)
        tratamentos.shift();
    else
        tratamentos.splice(i, 1);

    localStorage.setItem("tratamentos", JSON.stringify(diagnosticos));
    location.reload();
}

function changeButton(){
    if(editMode)
        document.getElementById("btnTratamento").innerHTML = "Editar";
    else
        document.getElementById("btnTratamento").innerHTML = "Cadastrar";
}

function limpaForm(){
    document.getElementById("nomeTratamento").value = "";
    document.getElementById("indicacao").value = "";
    document.getElementById("descTratamento").value = "";
}

function voltaForm(){
    indexRow = 0;
    editMode = false;
    changeButton();
}

class Tratamento{
    constructor(nome, indicacao, descricao){
        this.nome = nome;
        this.indicacao = indicacao;
        this.descricao = descricao;
    }
}