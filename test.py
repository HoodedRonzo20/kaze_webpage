##IGNORO QUELLA MERDA DI SSL e INCLUDO LIBRERIE X JSON
from flask import Flask
import ssl,json,urllib.request
ssl._create_default_https_context = ssl._create_unverified_context

#data = urllib.request.urlopen("https://localhost:6001/Post").read()
#posts = json.loads(data)

#for post in posts:
#    print(f"TITOLO POST= {post['title']}")
#    print(f"ELENCO TAG POST= {post['tags']}")
#    print(f"NUMERO COMMENTI= {post['nComments']}")
#    print(f"ELEMENTI= {post['uris']}")
#    print("----------------------")
 
 
 #   for element in post.elements.split(","):
 #      print(element)
