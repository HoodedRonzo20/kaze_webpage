'use strict';

class HttpGetterJson 
{
    constructor(domain) 
    {
        this.domain = domain;
    }

    // Simple class instance methods using short-hand method
    // declaration
    PrintDomain() 
    {
        console.log('Domain: ', this.domain);
    }
    GetNewPosts() 
    {
        var url = this.domain + "/Post";
        console.log(url);
        return HttpGetterJson.RequestJeson(url);
    }

    static RequestJeson(url) 
    {
        var json;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                //json = JSON.parse(this.responseText);
                json = this.responseText;
            }
        };
        xmlhttp.open('GET', url);
        xmlhttp.send();
        return json;
    }
    // We will look at static and subclassed methods shortly
}