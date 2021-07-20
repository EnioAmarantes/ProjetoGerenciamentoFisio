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
    document.getElementById("container").style.marginLeft = document.getElementById("sidebar").style.width;
    
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

    celTipoExame.innerHTML = exame.tipoExame;
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

function look(exame){
    let i = exame.parentNode.parentNode.rowIndex;
    document.getElementById("zoomExame").src = exames[i - 1].imagem;
    document.getElementById("btnModal").click();

    imageZoom("zoomExame", "exameDetalhe");
}

function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + (x * (result.offsetWidth / lens.offsetWidth / 3)) + "px -" + (y * (result.offsetHeight / lens.offsetHeight / 3)) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

class Exame{
    constructor(imagem, tipoExame, paciente, dataExame){
        this.imagem = imagem;
        this.paciente = paciente;
        this.dataExame = dataExame;
        this.tipoExame = tipoExame;
    }
}