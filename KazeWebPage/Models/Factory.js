import PostDetail from '../ViewModel/PostDetail.js';
import Post from '../ViewModel/Post.js';
import Comment from '../ViewModel/Comment.js';

//export default - serve per consentire l'import su unaltro file js
export default class Factory {
	constructor(domain) {
		this.domain = domain;
	}

	async MadePostDetail(jsonPostDetail) {
		let objPostDetail = new Post(
			jsonPostDetail.id,
			jsonPostDetail.title,
			jsonPostDetail.tags,
			jsonPostDetail.isAdultContent,
			jsonPostDetail.dateCreated,
			jsonPostDetail.uris,
			jsonPostDetail.description,
			jsonPostDetail.nComments
		);
		return objPostDetail;
	}

	async MadePost(jsonPost) {
		let objPost = new Post(
			jsonPost.id,
			jsonPost.title,
			jsonPost.tags,
			jsonPost.isAdultContent,
			jsonPost.dateCreated,
			jsonPost.uris,
			jsonPost.description,
			jsonPost.nComments
		);
		return objPost;
	}

	async MadeComment(jsonComment) {
		let res = false;
		return res;
	}

	static IsValidId(id) {
		if (id !== 1) {
			throw new Error(`This '${id}' is not a valid number`);
		}
	}

	static IsValTitle(title) {
		if (title !== "") {
			throw new Error(`This "${title}" is not a valid title.`);
		}
	}

	static IsValTags(tags) {
		if (tasg !== []) {
			throw new Error(`This "${tags}" is not a valid tags.`);
		}
	}

	static IsValDescription(description) {
		if (description !== "") {
			throw new Error(`This "${description}" is not a valid description.`);
		}
	}

	static IsValIsAdultContent(isAdultContent) {
		if (isAdultContent !== true) {
			throw new Error(`This "${isAdultContent}" is not a valid isAdultContent.`);
		}
	}
}