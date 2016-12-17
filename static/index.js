$(document).ready(function() {
    var data;
        
    $("#donate").click(function(){
        $("#click").text("donate to");
        data = 'donate to';
    });

    $("#volunteer").click(function(){
        $("#click").text("volunteer for");
        data = 'help build';
    });

    $("#adopt").click(function(){
        $("#click").text("adopt");
        data = 'help build';
    });

    $("#helpBuild").click(function(){
        $("#click").text("help build");
        data = 'help build';
    }); 
    
    
    $("#goButton").click(function(){
        $("canvas").show();
    })
    
    $('#goButton').click(function() {
        
            $.getJSON('http://hackathon-team2016-kevinhui98.c9users.io/GETdata?d=' + data + $('.searchBox').val() , function( resp ) {
                console.log( resp );
            });
        
    });
    
});

