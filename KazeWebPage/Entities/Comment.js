//export default - serve per consentire l'import su unaltro file js
export default class Comment 
{
	constructor(id, title) {
		this.id = id;
		this.title = title;
	}

	PrintId() {
		console.log('Comment Id: ', this.id);
	}


	static CreateCommentFromJson(json) 
	{
		objComment = new Comment(10,"porva Titolo 10");
		return objComment;
	}
}
