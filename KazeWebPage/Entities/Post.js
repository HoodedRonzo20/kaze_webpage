//export default - serve per consentire l'import su unaltro file js
export default class Post 
{
	constructor(id, title) {
		this.id = id;
		this.title = title;
	}

	PrintId() {
		console.log('Post Id: ', this.id);
	}

	static CreatePostFromJson(json) 
	{
		objPost = new Post(10,"porva Titolo 10");
		return objPost;
	}
}