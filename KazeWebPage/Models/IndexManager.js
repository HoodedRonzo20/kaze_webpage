export default class IndexManager
{
    // constructor(value) 
    // {
    //     this.value = value
    // }

    static InjecHtmlElement(elementId, element) 
    {
        let retBool = true;
        if(document.getElementById(elementId))
        {
            try {
                document.getElementById(elementId).innerHTML += element;
            } catch (error) {
                retBool = false;
                console.error(error);
            }
        }
        return retBool
    }
    static InjecMarkdown(insideIn, markdownStr) 
    {
        let retBool = false
        return retBool
    }

    static ReplaceHtmlContent(elementId, element) 
    {
        let retBool = true;
        if(document.getElementById(elementId))
        {
            try {
                document.getElementById(elementId).innerHTML = element;
            } catch (error) {
                retBool = false;
                console.error(error);
            }
        }
        return retBool
    }

    static GetValuesFromNewPostDetail() 
    {
        document.getElementById(elementId).innerHTML = element;
    }
    
    static GetValuesFromNewComment() 
    {

    }
}

