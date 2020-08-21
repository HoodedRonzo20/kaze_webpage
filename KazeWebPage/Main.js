//La funzione vien eseguita quando la pagina html e completamente caricata, in questo modo
// si evitano errori adi elementi mancanti con i js che potrebbero essere caricati prima della index.html

import GetterJson from './Models/GetterJson.js';
import HtmlBuilder from './Models/HtmlBuilder.js';
import IndexInjector from './Models/IndexInjector.js';

var getterJson = new GetterJson("https://localhost:5001", null);
console.log("DOMAIN: " + getterJson.domain);
console.log(getterJson.GetNewPosts());

var htmlBuilder = new HtmlBuilder("./KazeWebPage/View/");
console.log(htmlBuilder.pathTemplate);
console.log(htmlBuilder.CreatePostView("asd"));


console.log("Finish!");
//Evento di caricamento post successivi
// $(window).scroll(function() {
//     if($(window).scrollTop() == $(document).height() - $(window).height()) {
//         $.ajax({
//             url: "/loadmore/",
//             type: "POST",
//             success: function(resp){
//                 $('div#response').append(resp);
//             }
//         });
//     };
// });