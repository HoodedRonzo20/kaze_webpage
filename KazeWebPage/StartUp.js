import GetterJson from './Models/GetterJson.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexInjector from './Models/IndexInjector.js';
import Post from './ViewModel/Post.js';
//Creazione dei componenti necessari
AOS.init();
var getterJson = new GetterJson("https://localhost:5001", null);
var htmlBuilder = new HtmlBuilder("./KazeWebPage/View");
var html = "";
var ObjPostList = []; //Lista di oggetti Post
var ObjCommentList = []; //Lista di oggetti Post
//GetIsAdultContent() Asecconda se true o false mostra i mpost per adulti o pure no sulle cbhiamate normali
function GetIsAdultContent() {return document.getElementById("isSoloAdultContentCheck").checked == false;}

//Asseconda se isSoloAdultContent e true o false avvia usa le apposite chiamate.
function GetIsSoloAdultContent() {return document.getElementById("isSoloAdultContentCheck").checked;}

AOS.init();

//EventList
document.getElementById("btnHome").addEventListener("click", Home);
document.getElementById("PostsContainer").addEventListener("scroll", LoadMorePost);

async function Home() {
    if(GetIsSoloAdultContent()) {
        //#region GetNewPostsAdult
        html = "";
        let posts = await getterJson.GetNewPostsAdult();
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
            }
            IndexInjector.InjecHtmlElement("PostsContainer", html);
        }
        //#endregion GetNewPostsAdult
    } else {
        //#region GetNewPosts
        html = "";
        ObjPostList = [];
        let posts = await getterJson.GetNewPosts(GetIsAdultContent());
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[i])
            }
        }
        IndexInjector.ReplaceHtmlElement("PostsContainer", html);
        //#endregion GetNewPosts
    }
}

async function LoadMorePost() {
    if(ObjPostList.length > 0){
        if(GetIsSoloAdultContent()) {
            //#region GetOldPostsAdult
            html = "";
            let posts = await getterJson.GetOldPostsAdult(ObjPostList[ObjPostList.length-1].id-1);
            if(posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
                }
            }
            IndexInjector.InjecHtmlElement("PostsContainer", html);
            //#endregion GetOldPostsAdult
        } else {
            //#region GetOldPosts
            html = "";
            let posts = await getterJson.GetOldPosts(ObjPostList[ObjPostList.length-1].id-1, GetIsAdultContent());
            if(posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
                }
            }
            IndexInjector.InjecHtmlElement("PostsContainer", html);
            //#endregion GetOldPosts
        }
    } else { console.log(`La lista di ObjPostList contiene ${ObjPostList.length} post. Per tanto non puo caricare post precendenti`); }
}