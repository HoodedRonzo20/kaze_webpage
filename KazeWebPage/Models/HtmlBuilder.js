import Comment from '../ViewModel/Comment.js';
import Post from '../ViewModel/Post.js';

export default class HtmlBuilder 
{
    constructor(pathTemplate) 
    {
        this.pathTemplate = pathTemplate
    }

    async CreatePostView(post) 
    {
        let path = `${this.pathTemplate}/${Post.name}.html`;
        let htmlPost = await HtmlBuilder.GetTextFromFile(path);
        //Insert id
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "id", post.id);
        //Insert titolo
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "title", post.title);
        //Insert tags
        let htmltags = await HtmlBuilder.CreateHtmlTags(this.pathTemplate, post.tags);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "tags", htmltags);
        //Insert tag NSFW nel caso richiesto
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "isAdultContent", post.isAdultContent ? 'NSFW' : '');
        //Insert data di creazione
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "dateCreated", post.dateCreated);
        //Insert del primo URI se esisten altimenti la descrizione
        if(post.uris.length > 0) {
            let htmlFile = await HtmlBuilder.CreateHtmlUrisManagement(this.pathTemplate, post.uris[0]);
            htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "uriMain", htmlFile);
            htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "description", "");
        } else { 
            htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "uriMain", ''); 
            htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "description", post.description);
        }
        //Insert numero dei commenti
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "nComments", post.nComments);
        return htmlPost;
    }
    
    async CreateCommentView(comment) 
    {
        let path = `${this.pathTemplate}${Comment.name}.html`;
        let html = await HtmlBuilder.GetTextFromFile(path);
        return "asd";
    }

    //STATIC METHOS
    static async CreateHtmlTags(pathTemplate, tags) {
        let htmlTags = "";
        let pathElements = `${pathTemplate}/Elements_View`;
        let htmlTag = await HtmlBuilder.GetTextFromFile(`${pathElements}/Tags_View.html`);
        for (let i = 0; i < tags.length; i++) {
            htmlTags += HtmlBuilder.RepleaceKey(htmlTag, "tags", tags[i].trim());
        }
        return htmlTags;
    }

    static async CreateHtmlUrisManagement(pathTemplate, uri) {
        let html = "";
        let arrayStr = uri.split(".");
        let pathUris = `${pathTemplate}/Uris_View`;
        switch(arrayStr[arrayStr.length-1].toLowerCase()) {
            case "png":
            case "jpeg":
            case "jpg":
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}/Img_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "Img_Uri", uri);
                break;
            case "mp3":
            case "wav":
            case "ogg":
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}/Audio_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "Audio_Uri", uri);
                break;
            case "mp4":
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}/Video_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "Video_Uri", uri);
                break;
            default:
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}/File_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "File_Uri", uri);
                break;
            } 
        html = HtmlBuilder.RepleaceKey(html, "File_Name", uri.split("/")[uri.split("/").length-1]);
        return html;
    }

    static RepleaceKey(mainStr, keyword, replaceStr)
    {
        let htmlEdit;
        let keywordAdapted = `:|§${keyword}§|:`
        // if(replaceStr !== null && replaceStr !== '') {
            htmlEdit = mainStr.replace(keywordAdapted, replaceStr);
        // } else {
        //     htmlEdit = mainStr.replace(keywordAdapted, '');
        // }
        return  htmlEdit;
    }

    static async GetTextFromFile(path) 
    {
        return await fetch(path).then(function(response) {
            return response.text();
        });             
    }
}