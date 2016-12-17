$(document).ready(function() {
    
    $("#donate").click(function(){
        $("#click").text("donate to")
    });

    $("#volunteer").click(function(){
        $("#click").text("volunteer for")
    });

    $("#adopt").click(function(){
        $("#click").text("adopt")
    });

    $("#helpBuild").click(function(){
        $("#click").text("help build")
    });    
    
    $('searchBox').keydown(function( e ) {
        
        if( e.which === 13 ) {
            $.getJSON('https://www.kickstarter.com/projects/search.json?search=&term=' + data , function( resp ) {
                console.log( resp );
            });
        }
    });
    
});