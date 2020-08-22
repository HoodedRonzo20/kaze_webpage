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
        let path = `${this.pathTemplate}${Post.name}.html`;
        let htmlPost = await HtmlBuilder.GetTextFromFile(path);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "id", post.id);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "title", post.title);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "tags", post.tags);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "isAdultContent", post.isAdultContent);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "dateCreated", post.dateCreated);
        if(post.uris.length > 0) {
            let stocazzo = await HtmlBuilder.UrisManagement(this.pathTemplate, post.uris[0]);
            htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "uriMain", stocazzo);
        }
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "description", post.description);
        htmlPost = HtmlBuilder.RepleaceKey(htmlPost, "nComments", post.nComments);
        return htmlPost;
    }

    static async UrisManagement(pathTemplate, uri) {
        let html = "";
        let arrayStr = uri.split(".");
        let pathUris = `${pathTemplate}/Uris_View/`;
        switch(arrayStr[arrayStr.length-1]) {
            case "png":
            case "jpeg":
            case "jpg":
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}Img_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "Img_Uri", uri);
                break;
            case "mp4":
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}Video_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "Video_Uri", uri);
                break;
            default:
                html = await HtmlBuilder.GetTextFromFile(`${pathUris}File_Uri_View.html`);
                html = HtmlBuilder.RepleaceKey(html, "File_Uri", uri);
                html = HtmlBuilder.RepleaceKey(html, "File_Name", uri.split("/")[uri.split("/").length-1]);
                break;
        } 
        return html;
    }

    async CreateCommentView(comment) 
    {
        let path = `${this.pathTemplate}${Comment.name}.html`;
        let html = await HtmlBuilder.GetTextFromFile(path);
        return "asd";
    }
    static async GetTextFromFile(path) 
    {
        return await fetch(path).then(function(response) {
            return response.text();
        });             
    }

    static RepleaceKey(mainStr, keyword, replaceStr)
    {
        let keywordAdapted = `:|§${keyword}§|:`
        return mainStr.replace(keywordAdapted, replaceStr);
    }
}