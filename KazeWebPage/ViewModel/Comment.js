//export default - serve per consentire l'import su unaltro file js
export default class Comment 
{
	#id
	#isAdultContent
	#dateCreated
	#description
	
	constructor(id) {
		SetId(id);
	}
	
	// constructor(id, title) {
	// 	this.id = id;
	// 	this.title = title;
	// }
	
	//#region Getters
	get GetIsAdultContent() { return this.#isAdultContent; }
	get GetDateCreated() { return this.#dateCreated; }
	get GetDescription() { return this.#description; }
	get GetId() { return this.#id; }
	//#endregion Getters
	
	//#region Setters
	set SetId(value) { this.#id = id }
	set SetIsAdultContent(value) { this.#isAdultContent = isAdultContent }
	set SetDateCreated(value) { this.#dateCreated = dateCreated }
	set SetDescription(value) { this.#description = description }
	//#endregion Setters

	PrintId() {
		console.log('Comment Id: ', this.id);
	}


	static CreateCommentFromJson(json) 
	{
		objComment = new Comment(10,"porva Titolo 10");
		return objComment;
	}
}
