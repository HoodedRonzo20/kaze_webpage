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
            let div = document.querySelector(insideIn);
            div.innerHTML = element;
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