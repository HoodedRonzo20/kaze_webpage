//export default - serve per consentire l'import su unaltro file js
export default class Post 
{
	constructor(id, title) {
		this.id = id;
		this.title = title;
	}

	PrintId() 
	{
		console.log('Post Id: ', this.id);
	}

	static CreatePostFromJson(objJson) 
	{
		let objPost = new Post(
			objJson.id,
			objJson.title,
		);
		return objPost;
	}
}