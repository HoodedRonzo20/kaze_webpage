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
    let posts = null;
    let html = "";
    //CHIAMATA GETNEWPOST X I POST PIU' RECENTI
    posts = await getterJson.GetNewPosts();
    for (let i = 0; i < 3; i++) {
        html += await htmlBuilder.CreatePostView(posts[i]);
    }
    IndexInjector.InjecHtmlElement("PostsContainer", html);

    //CHIAMATA VECCHI POST
    html = "";
    posts = await getterJson.GetOldPosts(6);
        for (let i = 0; i < 3; i++) {
            html += await htmlBuilder.CreatePostView(posts[i]);
        }
    IndexInjector.InjecHtmlElement("PostsContainer", html);
}
Main();

    // //CHIAMATA GETOLDPOST X I POST PIU VECCHI
    // $(window).scroll(function() {
    //     if($(window).scrollTop() == $(document).height() - $(window).height()) {
    //         var x = async function getold()  {
    //             posts = await getterJson.GetOldPosts(6);
    //             for (let i = 0; i < 3; i++) {
    //                 html += await htmlBuilder.CreatePostView(posts[i]);
    //             }
    //             IndexInjector.InjecHtmlElement("PostsContainer", html);
    //         } 
    //         x;
    //     };
    // });

