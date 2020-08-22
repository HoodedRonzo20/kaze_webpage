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
        let path = this.pathTemplate + Post.name + ".html";
        let html = await HtmlBuilder.GetTextFromFile(path);
        html = HtmlBuilder.RepleaceKey(html, "id", post.id);
        html = HtmlBuilder.RepleaceKey(html, "title", post.title);
        html = HtmlBuilder.RepleaceKey(html, "tags", post.tags);
        html = HtmlBuilder.RepleaceKey(html, "isAdultContent", post.isAdultContent);
        html = HtmlBuilder.RepleaceKey(html, "dateCreated", post.dateCreated);
        html = HtmlBuilder.UrisManagement(post.uris[0]);
        html = HtmlBuilder.RepleaceKey(html, "description", post.description);
        html = HtmlBuilder.RepleaceKey(html, "nComments", post.nComments);
        HtmlBuilder.UrisManagement(html);
        return html;
    }

    static async UrisManagement(uri) {
        let html = "";
        let array = uri.split(".");
        let pathUris = this.pathTemplate + "/Uris_view/";
        switch(array[array.length-1]) {
            case "png":
            case "jpeg":
            case "jpg":
                let path = pathUris + "uri_img" + ".html";
                html = await HtmlBuilder.GetTextFromFile(path);
                html = HtmlBuilder.RepleaceKey(html, "uri_img", uri);
                break;
            case "mp4":
                let path = pathUris + "uri_vid" + ".html";
                html = await HtmlBuilder.GetTextFromFile(path);
                html = HtmlBuilder.RepleaceKey(html, "uri_vid", uri);
                break;
            default:
                let path = pathUris + "uri_file" + ".html";
                html = await HtmlBuilder.GetTextFromFile(path);
                html = HtmlBuilder.RepleaceKey(html, "uri_file", uri);
        } 
        return html;
    }

    async CreateCommentView(comment) 
    {
        let path = this.pathTemplate + Comment.name + ".html";
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
        let keywordAdapted =":|§" + keyword + "§|:"
        return mainStr.replace(keywordAdapted, replaceStr);
    }
}