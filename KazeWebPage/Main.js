//La funzione vien eseguita quando la pagina html e completamente caricata, in questo modo
// si evitano errori adi elementi mancanti con i js che potrebbero essere caricati prima della index.html
$( document ).ready(function() 
{
    //la pagina index è pronta
    console.log("Document is ready!");

    //Fase di aggiunta degli script
    console.log("Start to load libeis!");
    $('<script/>',{type:'text/javascript', src:'/KazeWebPage/Models/HttpGetterJson.js'}).appendTo('head');

    console.log("Inizialize component..!");
    //Start
    var getterJson = new HttpGetterJson("https://localhost:5001");

    //test
    getterJson.PrintDomain();
    console.log(getterJson.GetNewPosts());
    //Post.CreatePostFromJson(getterJson.ge);

    console.log("Finish!");
    
    //Evento di caricamento post successivi
    // $(window).scroll(function() {
    //     if($(window).scrollTop() == $(document).height() - $(window).height()) {
    //         $.ajax({
    //             url: "/loadmore/",
    //             type: "POST",
    //             success: function(resp){
    //                 $('div#response').append(resp);
    //             }
    //         });
    //     };
    // });
});

