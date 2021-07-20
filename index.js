var hided = false;

function hide(){
    let spans = document.getElementsByClassName("links_name");
    if(hided){
        document.getElementById("sidebar").style.width = "240px";
        document.getElementById("container").style.marginLeft = document.getElementById("sidebar").style.width;
        document.getElementById("logo_name").style.visibility = "visible";
        for(x = 0; x < spans.length; x++){
            spans[x].style.visibility = "visible";
        }
    }
    else{
        document.getElementById("sidebar").style.width = "60px";
        document.getElementById("container").style.marginLeft = document.getElementById("sidebar").style.width;
        document.getElementById("logo_name").style.visibility = "hidden";
        for(x = 0; x < spans.length; x++){
            spans[x].style.visibility = "hidden";
        }
    }

    document.getElementById("container").style.left = (document.getElementById("sidebar").style.width * 2);
    hided = !hided;
}