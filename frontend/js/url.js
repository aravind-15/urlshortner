
    var arr=window.location.href;
    arr=arr.split("/");
    var id=arr[arr.length-1];

    console.log(id);
    $.ajax({
        type: "GET",
        url: "/api/shorturl/"+id,
        data: {
            shortid : id,
        },
        success: function(response) {
            response=JSON.parse(JSON.stringify(response));
            response= response.result;
            window.location.replace(response[0].url);
        }, //sucess
        error: function(error) { } //error
    });
