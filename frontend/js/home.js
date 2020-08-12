$(function(){
    $.ajax({
        type:"get",
        url:"/api/users",
        success:function(data){
                display(data);
        },
        error: (err)=>{
            console.log("ERROR");
        }
    })
})


function display(data){
    var txt="<table><tr><th>ID</th><th>NAME</th><th>AGE</th><th>MOBILE</th></tr>";
     for(var i=0;i<data.length;i++){
         txt+="<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].age+"</td><td>"+data[i].mobile+"</td"+"</tr>";
     }
     txt+="</table>";
     $("#table").html(txt);
}