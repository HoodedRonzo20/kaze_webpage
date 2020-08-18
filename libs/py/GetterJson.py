#Getter JSON
import ssl, json, urllib.request

#IGNORO QUELLA MERDA DI SSL e INCLUDO LIBRERIE X JSON
ssl._create_default_https_context = ssl._create_unverified_context

class GetterJson:
    domain = "https://127.0.0.1:6001"

    @staticmethod
    def GetPostDetailById(id):
        url = f"{GetterJson.domain}/Post/Detail?id={id}"
        data = urllib.request.urlopen(url).read()
        newPosts = json.loads(data)
        return newPosts

    @staticmethod
    def GetNewPosts(isAdultContent):
        paramAdult = "?isAdultContent=TRUE" if isAdultContent else ""
        url = f"{GetterJson.domain}/Post{paramAdult}"
        data = urllib.request.urlopen(url).read()
        newPosts = json.loads(data)
        return newPosts

    @staticmethod
    def GetOldPosts(isAdultContent, lastOldId):
        if(lastOldId >= 1):
            paramAdult = "isAdultContent=TRUE&" if isAdultContent else ""
            url = f"{GetterJson.domain}/Post/Under?{paramAdult}lastOlder={lastOldId}"
            data = urllib.request.urlopen(url).read()
            newPosts = json.loads(data)
            return newPosts

    @staticmethod
    def GetNewAdultPosts():
        url = f"{GetterJson.domain}/Post/Adult"
        data = urllib.request.urlopen(url).read()
        new_posts = json.loads(data)
        return new_posts

    @staticmethod
    def GetOldAdultPosts(lastOldId):
        if(lastOldId >= 1):
            url = f"{GetterJson.domain}/Post/Under?lastOlder={lastOldId}"
            data = urllib.request.urlopen(url).read()
            newPosts = json.loads(data)
            return newPosts