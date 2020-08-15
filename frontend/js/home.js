$(function(){
    $("#submit").on("click",()=>{
        var jsondata={
            id:$("#_id").val(),
            name:$("#name").val(),
            age:$("#age").val(),
            mobile:$("#mobile").val()
          }
          $.ajax({
              type:"post",
              url:"/api/users/create",
              data: jsondata,
              success: function(){
                 $("h5").html("SUCCESSFULLY ADDED!!!").hide().fadeIn("slow");
                 setTimeout(() => {
                    location.reload();
                 }, 2000);
                     
              } ,
              error:(err)=>{
                $("h5").html("FAILED TO ADD!!!").hide().fadeIn(slow);
                setTimeout(() => {
                   location.reload();
                }, 2000);
              }
          })
    })
  
   
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



function display(data){
    var txt="<table><tr><th>ID</th><th>NAME</th><th>AGE</th><th>MOBILE</th></tr>";
     for(var i=0;i<data.length;i++){
         txt+="<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].age+"</td><td>"+data[i].mobile+"</td"+"</tr>";
     }
     txt+="</table>";
     $("#table").html(txt);
}

})