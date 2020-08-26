import GetterJson from './Models/GetterJson.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexManager from './Models/IndexManager.js';
import Post from './ViewModel/Post.js';
//Creazione dei componenti necessari
AOS.init();
var getterJson = new GetterJson("https://192.168.1.3:25565", null); //"https://localhost:5001", null);
var htmlBuilder = new HtmlBuilder("./KazeWebPage/View");
var html = "";
var ObjPostList = []; //Lista di oggetti Post
var ObjCommentList = []; //Lista di oggetti Post
//GetIsAdultContent() Asecconda se true o false mostra i mpost per adulti o pure no sulle cbhiamate normali
function GetIsAdultContent() {return false;}

//Asseconda se isSoloAdultContent e true o false avvia usa le apposite chiamate.
function GetIsSoloAdultContent() {return document.getElementById("isSoloAdultContentCheck").checked;}

//EventList LoadPost
document.getElementById("btnHome").addEventListener("click", Home);
document.getElementById("isSoloAdultContentCheck").addEventListener("click", Home);
//Event Load form to add new Post
document.getElementById("btnAddPostDetail").addEventListener("click", function() {
    let eleAddPost = document.getElementById("SectionAddPost");
    let elePosts = document.getElementById("SectionPosts");
    
    if(eleAddPost.getAttribute('visibility') == "hidden") {
        elePosts.setAttribute("visibility", "hidden");
        elePosts.setAttribute("display", "none");
        
        eleAddPost.setAttribute("display", "inline");
        eleAddPost.setAttribute("visibility", "visible");
    } else {
        eleAddPost.setAttribute("visibility", "hidden");
        eleAddPost.setAttribute("display", "none");

        elePosts.setAttribute("display", "inline");
        elePosts.setAttribute("visibility", "visible");
    }
});


//CHIAMATA GETOLDPOST X I POST PIU VECCHI
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        if(GetIsSoloAdultContent() && ObjPostList[ObjPostList.length-1].id > 3) {
            LoadMorePost();
        }
        else if(!GetIsSoloAdultContent() && ObjPostList[ObjPostList.length-1].id > 1) {
            LoadMorePost();
        }
    };
});

StartUp();

async function StartUp() {
    Home();
    LoadFormAddPostDetail();
}

async function Home() {
    console.log("HOME!");
    if(GetIsSoloAdultContent()) {
        //#region GetNewPostsAdult
        html = "";
        ObjPostList = [];
        let posts = await getterJson.GetNewPostsAdult();
        if (posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length-1]);
            }
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
        //#endregion GetNewPosts
    }
    IndexManager.ReplaceHtmlContent("PostsContainer", html);
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
            //#endregion GetOldPosts
        }
        IndexManager.InjecHtmlContent("PostsContainer", html);
    } else { console.log(`La lista di ObjPostList contiene ${ObjPostList.length} post, per tanto non puo caricare post precendenti`); }
}

async function LoadFormAddPostDetail() {
    let htmlAddPostDetail = await htmlBuilder.GetHtmlAddPostDetail();
    IndexManager.ReplaceHtmlContent("AddPostContainer", htmlAddPostDetail)
}