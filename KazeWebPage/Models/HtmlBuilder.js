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
        html = HtmlBuilder.RepleaceKey(html, "id", 5);
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