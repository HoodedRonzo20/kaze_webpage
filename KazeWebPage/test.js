$.getJSON('https://127.0.0.1:5001/Post', function(data) {
    
    var text = `Date: ${data.title}<br>`;
                
    console.log(data);
});