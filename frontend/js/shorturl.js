function IsURL(url) {
    var regex= /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
     if (!regex.test(url)) return false;
    else return true;
}
function short() {

    var text=document.getElementById("url").value;
    //console.log(text);
    if(IsURL(text))
    {$.ajax({
        type: "POST",
        url: "/api/shorturl/add",
        data: {
            url: text,  
        },
        success: function(response) {
            response=JSON.parse(JSON.stringify(response));
             response=response.result;
             //console.log(response);
             document.getElementById("insert").innerHTML=response[0].shortid;
        }, //sucess
        error: function(error) { } //error
    });}
} //End of show function
