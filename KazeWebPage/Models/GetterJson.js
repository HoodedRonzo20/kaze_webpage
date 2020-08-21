import HtmlBuilder from "./HtmlBuilder.js";
import Comment from '../ViewModel/Comment.js';
import Post from '../ViewModel/Post.js';
import IndexInjector from "./IndexInjector.js";


//export default - serve per consentire l'import su unaltro file js
export default class GetterJson 
{
    constructor(domain, data) 
    {
        this.domain = domain;
        this.data = data
    }

    async GetNewPosts() 
    {
        let url = this.domain + "/Post";
        let json;
        //json = GetterJson.RequestJsonJQuery(url);
        json = await GetterJson.RequestJsonAsync("GET", url, this.data, "Post");
        return json
    }

    static async RequestJsonAsync(method, url, data, type) 
    {
        //data e un json che contiene delle informazioni tipo credenziali email, pass
        //nel nostro caso non ci serve.
        return await new Promise((resolve, reject)=> {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = "json"
            if(data) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }
            xhr.onload = () => {
                if(xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
    
            xhr.ontimeout = function() {
                reject(new TypeError('Network request failed'));
            };
            // xhr.onreadystatechange = function() {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         console.log(xhr.response);
            //     }
            // };
            xhr.send(JSON.stringify(data));
        }).then(responseResult => {
            //VIA AI GIOCHI
            var htmlBuilder = new HtmlBuilder("KazeWebPage/View/");

            var allPostHtml = ""; 
            var i;
            for (i = 0; i < responseResult.length; i++) {
                allPostHtml = allPostHtml + htmlBuilder.CreatePostView(responseResult[i]);
                console.log(htmlBuilder.CreatePostView(responseResult[i]));
              }

            console.log(allPostHtml);
            IndexInjector.InjecHtmlElement("posts", allPostHtml);

            return responseResult;
        }).catch(err => {console.log(err);});
    }


//     static async RequestJsonAsync(method, url, data) 
//     {
//         //data e un json che contiene delle informazioni tipo credenziali email, pass
//         // nel nostro caso non ci serve.
//         return await new Promise((resolve, reject)=> {
//             let xhr = new XMLHttpRequest();
//             xhr.open(method, url, true);
//             xhr.responseType = "text" //"json"
//             if(data) {
//                 xhr.setRequestHeader("Content-Type", "plain/text")// "application/json")
//             }
//             xhr.onload = () => {
//                 if(xhr.status >= 400) {
//                     reject(xhr.response);
//                 } else {
//                     resolve(xhr.response);
//                 }
//             };
//             xhr.onerror = function() {
//                 reject(new TypeError('Network request failed'));
//             };
    
//             xhr.ontimeout = function() {
//                 reject(new TypeError('Network request failed'));
//             };
//             // xhr.onreadystatechange = function() {
//             //     if (xhr.readyState == 4 && xhr.status == 200) {
//             //         console.log(xhr.response);
//             //     }
//             // };
//             xhr.send(JSON.stringify(data));
//         }).then(responseResult => {
//             document.getElementById('PorcoPromise').innerHTML = responseResult;
//             return responseResult;
//         }).catch(err => {console.log(err);});
//     }
}