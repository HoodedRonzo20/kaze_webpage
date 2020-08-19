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
        return HttpGetterJson.RequestJson(url).toString();
    }

    // static RequestJson(url) 
    // {
    //     sendHttpRequest("GET", url, true).then(responseData => {
    //         console.log(responseData);
    //     });
    // }
        
    static RequestJson(url) 
    {
        url = "https://support.oneskyapp.com/hc/en-us/article_attachments/202761627/example_1.json";
        var init = {method: 'GET', mode: 'cors'};
        return new Promise(function(resolve, reject) {
            var request = new Request(url, init);
            var xhr = new XMLHttpRequest();

            xhr.onload = function() {
                var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || '')
            };

            options.url = 'responseURL' in xhr
                ? xhr.responseURL
                : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
            };

            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };

            xhr.ontimeout = function() {
                reject(new TypeError('Network request failed'));
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                xhr.withCredentials = true;
            } else if (request.credentials === 'omit') {
                xhr.withCredentials = false;
            }

            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob';
            }

            request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
            });

            xhr.send(
                typeof request._bodyInit === 'undefined' ? null : request._bodyInit
            );
        });
    }

    // static RequestJson(url) 
    // {
    //     var json;
    //     var xmlhttp = new XMLHttpRequest();
    //     xmlhttp.onreadystatechange = function() {
    //         if (this.readyState === 4 && this.status === 200) {
    //             json = JSON.parse(this.responseText);
    //             json = this.responseText;
    //         } else {
    //             console.log("Did not recive 200 ok from response!");
    //         }      
    //     };
    //     xmlhttp.open('GET', url, true);
    //     xmlhttp.send();
    //     return json;
    // }

    // We will look at static and subclassed methods shortly
}

const sendHttpRequest = (method, url,) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json"
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.send();
    });
    return promise;
};
const getData = () => {
    sendHttpRequest("GET", url, true).then(responseData => {
        console.log(responseData);
    });
};