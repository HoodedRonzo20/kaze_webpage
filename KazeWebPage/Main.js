//La funzione vien eseguita quando la pagina html e completamente caricata, in questo modo
// si evitano errori adi elementi mancanti con i js che potrebbero essere caricati prima della index.html

import GetterJson from './Models/GetterJson.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexInjector from './Models/IndexInjector.js';
import Post from './ViewModel/Post.js';

async function Main() 
{
    //Creazione dei componenti necessari
    AOS.init();
    var getterJson = new GetterJson("https://localhost:5001", null);
    var htmlBuilder = new HtmlBuilder("./KazeWebPage/View/");
    let posts = null;
    let html = "";
    let ObjPostList = [];
    let isAdultContent = true;

    posts = await getterJson.GetNewPosts(isAdultContent);
    await getNew();

    // posts = await getterJson.GetNewPostsAdult();
    // await getNew();

    posts = await getterJson.GetOldPosts(6, isAdultContent);
    await getOld();

    //#region GetOldPost
    // html = "";
    // posts = await getterJson.GetOldPosts(6, isAdultContent);

    // if(posts.length > 0) {

    //     for (let i = 0; i < posts.length; i++) {
    //         ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
    //         html += await htmlBuilder.CreatePostView(ObjPostList[i]);
    //     }
    // }
    // IndexInjector.InjecHtmlElement("PostsContainer", html);
    //#endregion

    //#region GetOldPostAdult
    // html = "";
    // posts = await getterJson.GetOldPostsAdult(ObjPostList[ObjPostList.length-1].id-1, isAdultContent);

    // if(posts.length > 0) {

    //     for (let i = 0; i < posts.length; i++) {
    //         ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
    //         html += await htmlBuilder.CreatePostView(ObjPostList[i]);
    //     }
    // }
    // IndexInjector.InjecHtmlElement("PostsContainer", html);
    //#endregion
    
    
    async function getNew() {
        html = "";
        ObjPostList = [];
        for (let i = 0; i < posts.length; i++) {
            ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
            html += await htmlBuilder.CreatePostView(ObjPostList[i])
        }
        IndexInjector.ReplaceHtmlElement("PostsContainer", html);
    }

    async function getOld() {
        html = "";
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[(ObjPostList.length-1)+i]);
            }
            IndexInjector.InjecHtmlElement("PostsContainer", html);
        }
    }
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

