import GetterJson from './Models/GetterJson.js';
import Factory from './Models/Factory.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexManager from './Models/IndexManager.js';
import Post from './ViewModel/Post.js';
import Comment from './ViewModel/Comment.js';
//#region COMPONENTI
AOS.init(); // "https://5.95.151.239:25565"
var getterJson = new GetterJson("https://localhost:5001", null);
var factory = new Factory("");
var htmlBuilder = new HtmlBuilder("./KazeWebPage/View");
var html = "";
var ObjPostList = []; //Lista di oggetti Post
var ObjCommentList = []; //Lista di oggetti Post
let eleAddPost = document.getElementById("SectionAddPost");
let eleAdvancedSearch = document.getElementById("SectionAdvSearch");
let elePosts = document.getElementById("SectionPosts");
let uriCounter = 0;
let inputFileBar = "";
var booleanScroll = true;
//#endregion

// let x = new Comment("ASD");
// console.log(x.GetId());
// x.#id = "is change"
// console.log(x.#Id);

//#region RETURN DEGLI STATI DEGLI SWITCH PER ADULTI
function GetIsAdultContentBlur() {
    return document.getElementById("isAdultContentCheck").checked;
}

function GetIsHideAdultContent() {
    //inverto per non cambiare il codice fatto dopo perchè sono un porco
    if(document.getElementById("isHideNSFW").checked == false) {
        return true;
    }
    else {
        return false;
    }
}

function GetIsSoloAdultContent() {
    return document.getElementById("isSoloAdultContentCheck").checked;
}
//#endregion

//#region EVENT LISTENERS
document.getElementById("btnHome").addEventListener("click", Home);

document.getElementById("isSoloAdultContentCheck").addEventListener("click", () => {
    Home();
});

document.getElementById("isHideNSFW").addEventListener("click", () => {
    Home();
});

document.getElementById("isAdultContentCheck").addEventListener("click", () => {
    UnlockJustNSFW();
    ShowHideBlur();
});

document.getElementById("btnAddPostDetail").addEventListener("click", ShowAddPost);
document.getElementById("btnAdvancedSearch").addEventListener("click", ShowAdvancedSearch);

document.getElementById("FormHomeSearch").addEventListener("submit", (e) => {
    e.preventDefault();
    SearchResults();
});
//#endregion

//#region FUNZIONE LOAD MORE CON SCROLL
window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        if (booleanScroll == true) {
            booleanScroll = false;
            if (GetIsSoloAdultContent() && ObjPostList[ObjPostList.length - 1].id > 3) {
                LoadMorePost();
            } else if (!GetIsSoloAdultContent() && ObjPostList[ObjPostList.length - 1].id > 1) {
                LoadMorePost();
            }
            //necessario per non far si che la funzione venga chiamata più di una volta nello stesso istante, duplicando i post
            setTimeout(function(){ booleanScroll = true; }, 200);
        }
    }
  };
//#endregion

StartUp();

async function StartUp() {
    Home();
    LoadFormAddPostDetail();
    LoadFormAdvSearch();
    // let script = document.createElement('script');
    // script.src = "./Controllers/AddPostDetailController.js";
    // document.body.append(script);
}


function ShowAddPost() {
    if (eleAddPost.style.display == "none") {
        //nascondo le altre due pagine html
        elePosts.style.display = "none";
        eleAdvancedSearch.style.display = "none";
        //mostro quella che mi serve vedere e basta
        eleAddPost.style.display = "block";
    }
}

function ShowAdvancedSearch() {
    if (eleAdvancedSearch.style.display == "none") {
        //nascondo le altre due pagine html
        elePosts.style.display = "none";
        eleAddPost.style.display = "none";
        //mostro quella che mi serve vedere e basta
        eleAdvancedSearch.style.display = "block";
    }
}

async function Home() {
    elePosts.style.display = "block";
    eleAddPost.style.display = "none";
    eleAdvancedSearch.style.display = "none";

    if (GetIsSoloAdultContent()) {
        //#region GetNewPostsAdult
        html = "";
        ObjPostList = [];
        let posts = await getterJson.GetNewPostsAdult();
        if (posts != null) {
            if (posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length - 1]);
                }
            } else {
                throw new Error("There are not posts");
            }
        } else {
            throw new Error("The value posts is null");
        }
        //#endregion GetNewPostsAdult
    } else {
        //#region GetNewPosts
        html = "";
        ObjPostList = [];
        let posts = await getterJson.GetNewPosts(GetIsHideAdultContent());
        if (posts != null) {
            if (posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostView(ObjPostList[i], GetIsAdultContentBlur());
                }
            } else {
                throw new Error("There are not posts");
            }
        } else {
            throw new Error("The value posts is null");
        }
        //#endregion GetNewPosts
    }
    IndexManager.ReplaceHtmlContent("PostsContainer", html);
}

async function LoadMorePost() {
    if (ObjPostList.length > 0) {
        if (GetIsSoloAdultContent()) {
            //#region GetOldPostsAdult
            html = "";
            let posts = await getterJson.GetOldPostsAdult(ObjPostList[ObjPostList.length - 1].id - 1);
            if (posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length - 1], GetIsAdultContentBlur());
                }
            }
            //#endregion GetOldPostsAdult
        } else {
            //#region GetOldPosts
            html = "";
            let posts = await getterJson.GetOldPosts(ObjPostList[ObjPostList.length - 1].id - 1, GetIsHideAdultContent());
            if (posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostView(ObjPostList[ObjPostList.length - 1], GetIsAdultContentBlur());
                }
            }
            //#endregion GetOldPosts
        }
        IndexManager.InjecHtmlContent("PostsContainer", html);
    } else {
        console.log(`La lista di ObjPostList contiene ${ObjPostList.length} post, per tanto non puo caricare post precendenti`);
    }
}

async function LoadFormAddPostDetail() {
    let htmlAddPostDetail = await htmlBuilder.GetHtmlAddPostDetail();
    IndexManager.ReplaceHtmlContent("AddPostContainer", htmlAddPostDetail);
    document.getElementById("btnAddUri").addEventListener("click", ShowUrls);
    document.getElementById("btnRemoveUri").addEventListener("click", DeleteUrls);
}

async function LoadFormAdvSearch() {
    let htmlAdvSearch = await htmlBuilder.GetHtmlAdvSearch();
    IndexManager.ReplaceHtmlContent("AdvSearchContainer", htmlAdvSearch);
}
//#region AGGIUNGI E RIMUOVI URL 
function ShowUrls() {
    if (uriCounter < 3) {
        uriCounter++;
        inputFileBar = '<input type="text" class="form-control" id="inputUri' + uriCounter + '" placeholder="Insert URL ' + uriCounter + '">';
        document.getElementById("btnRemoveUri").disabled = false;
        IndexManager.InjecHtmlContent("addURL", inputFileBar);
    } else {
        document.getElementById("btnAddUri").disabled = true;
    }
}
function DeleteUrls() {
    let child = document.getElementById("inputUri" + uriCounter);
    document.getElementById("addURL").removeChild(child);
    uriCounter--;
    if (uriCounter == 0) {
        document.getElementById("btnRemoveUri").disabled = true;
        document.getElementById("btnAddUri").disabled = false;
    }
}
//#endregion

//#region FUNZIONE CHE GESTISCE LA LOGICA DIETRO I 2 SWITCH, CHE DEVONO FUNZIONARE INSIEME
function UnlockJustNSFW() {
    if(document.getElementById("isSoloAdultContentCheck").disabled == true) {
        document.getElementById("isSoloAdultContentCheck").disabled = false;
    }
    else {
        document.getElementById("isSoloAdultContentCheck").disabled = true;
    }
    if(document.getElementById("isSoloAdultContentCheck").checked == true) {
        document.getElementById("isSoloAdultContentCheck").checked = false;
        document.getElementById("isSoloAdultContentCheck").disabled = true;
    }
}
//#endregion

async function HomeSearchPost(searchValue) {
    elePosts.style.display = "block";
    eleAddPost.style.display = "none";
    eleAdvancedSearch.style.display = "none";
        //#region GetNewPosts
        html = "";
        ObjPostList = [];
        let posts = await getterJson.GetPostsSearch(searchValue);
        if (posts != null) {
            if (posts.length > 0) {
                for (let i = 0; i < posts.length; i++) {
                    ObjPostList.push(await Post.CreatePostFromJson(posts[i]));
                    html += await htmlBuilder.CreatePostDetailView(ObjPostList[i], GetIsAdultContentBlur());
                }
            } else {
                throw new Error("There are not posts");
            }
        } else {
            throw new Error("The value posts is null");
        }
        //#endregion GetNewPosts
    IndexManager.ReplaceHtmlContent("PostsContainer", html);
}

function SearchResults() {
    var searchValue = document.getElementById("HomeSearch").value;
    HomeSearchPost(searchValue);

}

function ShowHideBlur() {
    if(GetIsSoloAdultContent()) {
        let blurPostList = document.getElementsByClassName("blur");
        for (let blurPost in blurPostList) {
            if (blurPostList.hasOwnProperty(blurPost)) {
                let element = blurPostList[blurPost];
                element.classList.replace("blur", "notBlur");
            }
        }
    }
    else {
        if(GetIsAdultContentBlur()) {
            let blurPostList = document.getElementsByClassName("blur");
            for (let blurPost in blurPostList) {
                if (blurPostList.hasOwnProperty(blurPost)) {
                    let element = blurPostList[blurPost];
                    element.classList.replace("blur", "notBlur");
                }
            }
        }
        else {
            let blurPostList = document.getElementsByClassName("notBlur");
            console.log(document.getElementsByClassName("notBlur"));
            for (let blurPost in blurPostList) {
                if (blurPostList.hasOwnProperty(blurPost)) {
                    let element = blurPostList[blurPost];
                    element.classList.replace("notBlur", "blur");
                }
            }
    
        }
    }
}

