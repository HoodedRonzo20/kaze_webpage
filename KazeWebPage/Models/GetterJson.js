
//export default - serve per consentire l'import su unaltro file js
export default class GetterJson 
{
    constructor(domain, data) 
    {
        this.domain = domain;
        this.data = data
    }

    // Simple class instance methods using short-hand method
    // declaration
    PrintDomain() 
    {
        console.log('Domain: ', this.domain);
    }

    GetNewPosts() 
    {
        let url = this.domain + "/Post";
        let json;
        //json = GetterJson.RequestJsonJQuery(url);
        json = GetterJson.RequestJson("GET", url, this.data);
        json.forEach(element => {
            console.log(element)
        });
        return json
    }

    static RequestJsonJQuery(url) 
    {
        var json;
        $.getJSON(url, function(data) {
            data.forEach(element => {
                console.log(element)
            });
            json = data
        });
        return $.getJSON(url);
    }

    static RequestJson(method, url, data) 
    {
        //data e un json che contiene delle informazioni tipo credenziali email, pass
        // nel nostro caso non ci serve.
        let promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.responseType = "json"
            if(data) {
                xhr.setRequestHeader("Content-Type", "application/json")
            }
            xhr.onload = () => {
                if(xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    resolve(xhr.response);
                }
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
    
            xhr.ontimeout = function() {
                reject(new TypeError('Network request failed'));
            };
            xhr.send(JSON.stringify(data));
        });
        promise.then(j => {
            j.forEach(element => console.log(element));
            return j;
        }).catch(err => { 
            console.log(err);
        });
    }
}