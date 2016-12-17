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
        
        // for ( var i in key_phrases ) {
            $.getJSON('http://hackathon-team2016-kevinhui98.c9users.io/send_data?d=andre' , function( resp ) {
                console.log( resp );
            });   
        // }
        
    });
    
    
    $.getJSON('https://hackathon-team2016-kevinhui98.c9users.io/GETdata?d=andre' , function( resp ) {
        console.log( resp );
    });
    
});

