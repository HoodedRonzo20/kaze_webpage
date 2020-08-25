//export default - serve per consentire l'import su unaltro file js
export default class Post 
{
	constructor(id, title, tags, isAdultContent, dateCreated, uris, description, comments) {
		this.id = id;
		this.title = title;
		this.tags = tags;
		this.isAdultContent = isAdultContent;
		this.dateCreated = dateCreated;
		this.uris = uris;
		this.description = description;
		this.comments = comments;
	}

	PrintId() 
	{
		console.log('Post Id: ', this.id);
	}

	static async CreatePostDetailFromJson(objJson) 
	{
		let postDetail = new Post(
			objJson.id,
			objJson.title,
			objJson.tags,
			objJson.isAdultContent,
			objJson.dateCreated,
			objJson.uris,
			objJson.description,
			objJson.comments
		);
		return postDetail;
	}
}