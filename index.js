var hided = true;

function hide(){
    if(hided){
        document.getElementById("sidebar").className = document.getElementById("sidebar").className.replace("col-3", "col-1");
        document.getElementById("container").className = document.getElementById("container").className.replace("col-9", "col-11");
    }
    else{
        document.getElementById("sidebar").className = document.getElementById("sidebar").className.replace("col-1", "col-3");
        document.getElementById("container").className = document.getElementById("container").className.replace("col-11", "col-9");
    }
    hided = !hided;
}