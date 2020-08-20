
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

    async GetNewPosts() 
    {
        let url = this.domain + "/Post";
        let json;
        console.log("Start await");
        //json = GetterJson.RequestJsonJQuery(url);
        json = await GetterJson.RequestJsonAsync("GET", url, this.data);
        console.log("end await");
        return json
    }

    static async RequestJsonAsync(method, url, data) 
    {
        //data e un json che contiene delle informazioni tipo credenziali email, pass
        // nel nostro caso non ci serve.
        return await new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
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
            // xhr.onreadystatechange = function() {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         console.log(xhr.response);
            //     }
            // };
            xhr.send(JSON.stringify(data));
        }).then(resJson => {
            console.log(resJson);
            return resJson;
            
        }).catch(err => {console.log(err);});
    }
}