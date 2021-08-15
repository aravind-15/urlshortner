draw();
function show() {

    var text=document.getElementById("todo").value;
    console.log(text);
    if(text!="")
    {$.ajax({
        type: "POST",
        url: "/api/course/add",
        data: {
            name: text,
            isactive:true,
            isdeleted:false
        },
        success: function(response) {
            response=JSON.parse(JSON.stringify(response));
            //console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });}
} //End of show function

function draw()
{   $.ajax({
        type: "GET",
        url: "/api/course/",
        success: function(res) {
            let l=res.length;
            console.log(res);
            var h="";
            for(let i=0; i<l;i++)
            {   if(res[i].isdeleted==false)
                {let s=res[i].name;
                 console.log(res[i].isactive);
                 if(res[i].isactive==false)
                 h+=`<div class="todo" style="background-color:#90EE90">`;
                 else h+=`<div class="todo">`;
                 h+=`<div class="badge badge-secondary" >${s}</div>`;
                 if(res[i].isactive==false);
                 else h+=`<button class="btnc" onclick=mark(${i},"${res[i]._id}")>Completed</button>`;
                 h+=`<button class="btnr" onclick=remove(${i},"${res[i]._id}")>Remove</button></div>`;
                 }   
            }
    console.log(h);
    document.getElementById("insert").innerHTML=h;
        }, //sucess
        error: function(error) { } //error
    });
    
}

function mark(index,id)
{
    $.ajax({
        type: "PATCH",
        url: "/api/course/mark",
        data: {
            index: index,
            _id: id
        },
        success: function(response) {
            //response=JSON.parse(JSON.stringify(response));
            //console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });
}

function remove(index,id)
{
    $.ajax({
        type: "PATCH",
        url: "/api/course/remove",
        data: {
            index: index,
            _id:id
        },
        success: function(response) {
            //response=JSON.parse(JSON.stringify(response));
            console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });
}