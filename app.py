#Main
from libs.py.GetterJson import GetterJson
from libs.py.ElementBuilder import ElementBuilder
from flask import Flask

app = Flask(__name__)

lastOldId = 0

#CARICO I PRIMI POST (I PIU' NUOVI)
@app.route('/', methods=["GET", "POST"])
def index():
    global lastOldId
    posts = GetterJson.GetNewPosts(False)
    lastOldId = posts[-1]['id']-1
    return ElementBuilder.Home(posts)

#FUNZIONE PER AGGIORNAMENTO IN AJAX DELLA PAGINA
@app.route('/loadmore/', methods=['POST'])
def loadmore():
    global lastOldId
    posts = GetterJson.GetOldPosts(False, lastOldId)
    lastOldId = posts[-1]['id']-1
    return ElementBuilder.LoadMorePost(posts)

#Debug mode poi da togliere quando il progetto è finito
if __name__ == "__main__":
    app.run(debug=True)





