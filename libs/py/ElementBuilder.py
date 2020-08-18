#HtmlBuilder
from flask import render_template

class ElementBuilder:
    templates = "/"

    @staticmethod
    def Test():
        print("ElementBuilder.Test()")

    @staticmethod
    def Home(posts):
        htmlElement = render_template('index.html')
        for post in posts:
            htmlElement = htmlElement + render_template("post_ric.html", post = post)
        htmlElement = htmlElement + '<div id="response"></div>'
        #htmlElement = htmlElement + render_template("footer.html")
        return htmlElement

    @staticmethod
    def LoadMorePost(posts):
        htmlElement = ""
        if posts:
            for post in posts:
                htmlElement = htmlElement + render_template("post_ric.html", post = post)
        return htmlElement

