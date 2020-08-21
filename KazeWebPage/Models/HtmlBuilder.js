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
        console.log(path);
        let html = await HtmlBuilder.GetTextFromFile(path);
        html = HtmlBuilder.RepleaceKey(html, "title", post.title);
        html = HtmlBuilder.RepleaceKey(html, "tags", post.tags);
        html = HtmlBuilder.RepleaceKey(html, "dateCreated", post.dateCreated);
        html = HtmlBuilder.RepleaceKey(html, "uris", post.uris);
        html = HtmlBuilder.RepleaceKey(html, "description", post.description);
        html = HtmlBuilder.RepleaceKey(html, "nComments", post.nComments);
        console.log(html);
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
        }).then(function(data) {
            return data;
        });             
    }

    static RepleaceKey(mainStr, keyword, replaceStr)
    {
        let keywordAdapted =":|§" + keyword + "§|:"
        return mainStr.replace(keywordAdapted, replaceStr);
    }
}