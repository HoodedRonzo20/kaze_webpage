export default class IndexInjector
{
    // constructor(value) 
    // {
    //     this.value = value
    // }

    static InjecHtmlElement(insideIn, element) 
    {
        let retBool = false
        if(insideIn != null)
        {
            document.getElementById(insideIn).innerHTML = element;
            retBool = true;
        }
        return retBool
    }
    static InjecMarkdown(insideIn, markdownStr) 
    {
        let retBool = false
        return retBool
    }
}