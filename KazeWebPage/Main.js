//La funzione vien eseguita quando la pagina html e completamente caricata, in questo modo
// si evitano errori adi elementi mancanti con i js che potrebbero essere caricati prima della index.html

import GetterJson from './Models/GetterJson.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexInjector from './Models/IndexInjector.js';

async function Main() 
{
    //Creazione dei componenti necessari
    var getterJson = new GetterJson("https://localhost:5001", null);
    var htmlBuilder = new HtmlBuilder("./KazeWebPage/View/");
    
    console.log("DOMAIN: " + getterJson.domain);

    let posts = await getterJson.GetNewPosts();
    let html = "";
    for (let i = 0; i < 3; i++) {
        html += await htmlBuilder.CreatePostView(posts[i]);
    }
    console.log(html);
    IndexInjector.InjecHtmlElement("PostsContainer", html);
    // .then(responseResult => {
    //     return responseResult;
    // }));

}
Main();

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