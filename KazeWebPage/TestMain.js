//La funzione vien eseguita quando la pagina html e completamente caricata, in questo modo
// si evitano errori adi elementi mancanti con i js che potrebbero essere caricati prima della index.html

import GetterJson from './Models/GetterJson.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexManager from './Models/IndexManager.js';
import Post from './ViewModel/Post.js';

async function Main() {
    //Creazione dei componenti necessari
    AOS.init();
    var getterJson = new GetterJson("https://localhost:5001", null);
    var htmlBuilder = new HtmlBuilder("./KazeWebPage/View");
    let posts = null;
    let html = "";
    let ObjPostList = []; //Lista di oggetti
    let isAdultContent = true; // Asecconda se true o false mostra i mpost per adulti o pure no sulle cbhiamate normali
    let isSoloAdultContent = false; //Asseconda se isSoloAdultContent e true o false avvia usa le apposite chiamate.

    if(isSoloAdultContent) {
        //#region GetNewPostsAdult
        html = "";
        posts = await getterJson.GetNewPostsAdult();
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
            }
            IndexManager.InjecHtmlElement("PostsContainer", html);
        }
        //#endregion GetNewPostsAdult
        
        //#region GetOldPostsAdult
        html = "";
        posts = await getterJson.GetOldPostsAdult(ObjPostList[ObjPostList.length-1].id-1);
        if(posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
            }
        }
        IndexManager.InjecHtmlElement("PostsContainer", html);
        //#endregion GetOldPostsAdult

    } else {
        //#region GetNewPosts
        html = "";
        ObjPostList = [];
        posts = await getterJson.GetNewPosts(isAdultContent);
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[i])
            }
        }
        IndexManager.ReplaceHtmlContent("PostsContainer", html);
        //#endregion GetNewPosts

        //#region GetOldPosts
        html = "";
        posts = await getterJson.GetOldPosts(ObjPostList[ObjPostList.length-1].id-1, isAdultContent);
        if(posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
            }
        }
        IndexManager.InjecHtmlElement("PostsContainer", html);
        //#endregion GetOldPosts
    }
}
//Il metodo Main() simula la StartUp di tutta la logica della webpage
Main();

object.addEventListener("click", Home());
function Home() {
    if(isSoloAdultContent) {
        //#region GetNewPostsAdult
        html = "";
        posts = await getterJson.GetNewPostsAdult();
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
            }
            IndexManager.InjecHtmlElement("PostsContainer", html);
        }
        //#endregion GetNewPostsAdult
    } else {
        //#region GetNewPosts
        html = "";
        ObjPostList = [];
        posts = await getterJson.GetNewPosts(isAdultContent);
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[i])
            }
        }
        IndexManager.ReplaceHtmlContent("PostsContainer", html);
        //#endregion GetNewPosts
    }
}

    // //CHIAMATA GETOLDPOST X I POST PIU VECCHI
    // $(window).scroll(function() {
    //     if($(window).scrollTop() == $(document).height() - $(window).height()) {
    //         var x = async function getold()  {
    //             posts = await getterJson.GetOldPosts(6);
    //             for (let i = 0; i < 3; i++) {
    //                 html += await htmlBuilder.CreatePostView(posts[i]);
    //             }
    //             IndexManager.InjecHtmlElement("PostsContainer", html);
    //         } 
    //         x;
    //     };
    // });

