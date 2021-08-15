setInterval(function(){ show(); }, 500);

function show()
{
    var red=document.getElementsByClassName("slider")[0].value;
    var green=document.getElementsByClassName("slider")[1].value;
    var blue=document.getElementsByClassName("slider")[2].value;
   
    var col= "rgb("+red+","+blue+","+green+")";

    console.log(col);
    var me= document.getElementById("me");
    me.style.color=col;
}

