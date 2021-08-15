draw();
function show() {

    var text=document.getElementById("todo").value;
    console.log(text);
    if(text!="")
    {$.ajax({
        type: "POST",
        url: "/api/todo/todos",
        data: {
            description: text,
            isactive:true,
            isdeleted:false
        },
        success: function(response) {
            response=JSON.parse(JSON.stringify(response));
            console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });}
} //End of show function

function draw()
{   $.ajax({
        type: "GET",
        url: "/api/todo/",
        success: function(res) {
            console.log(res);
            let l=res.length;
            var h="";
            for(let i=0; i<l;i++)
            {   if(res[i].isdeleted=="false")
                {let s=res[i].description;
                 console.log(res[i].isactive);
                 if(res[i].isactive==false)
                 h+=`<div class="todo" style="background-color:#90EE90">`;
                 else h+=`<div class="todo">`;
                 h+=`<div class="badge badge-secondary" >${s}</div>`;
                 if(res[i].isactive==false);
                 else h+=`<button class="btnc" onclick=mark(${i})>Completed</button>`;
                 h+=`<button class="btnr" onclick=remove(${i})>Remove</button></div>`;
                 }   
            }
    console.log(h);
    document.getElementById("insert").innerHTML=h;
        }, //sucess
        error: function(error) { } //error
    });
    
}

function mark(index)
{
    $.ajax({
        type: "PATCH",
        url: "/api/todo/mark",
        data: {
            index: index,
        },
        success: function(response) {
            //response=JSON.parse(JSON.stringify(response));
            //console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });
}

function remove(index)
{
    $.ajax({
        type: "PATCH",
        url: "/api/todo/remove",
        data: {
            index: index,
        },
        success: function(response) {
            //response=JSON.parse(JSON.stringify(response));
            //console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });
}