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
        let html = await HtmlBuilder.GetTextFromFile(path);
        html = HtmlBuilder.RepleaceKey(html, "id", post.id);
        html = HtmlBuilder.RepleaceKey(html, "title", post.title);
        html = HtmlBuilder.RepleaceKey(html, "tags", post.tags);
        html = HtmlBuilder.RepleaceKey(html, "isAdultContent", post.isAdultContent);
        html = HtmlBuilder.RepleaceKey(html, "dateCreated", post.dateCreated);
        html = await HtmlBuilder.UrisManagement(this.pathTemplate, post.uris[0]);
        html = HtmlBuilder.RepleaceKey(html, "description", post.description);
        html = HtmlBuilder.RepleaceKey(html, "nComments", post.nComments);
        HtmlBuilder.UrisManagement(html);
        return html;
    }

    static async UrisManagement(pathTemplate, uri) {
        let html = "";
        console.log(uri.split("."));
        let arrayStr = uri.split(".");
        console.log(arrayStr);
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