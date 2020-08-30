import PostDetail from '../ViewModel/PostDetail.js';
import Post from '../ViewModel/Post.js';
import Comment from '../ViewModel/Comment.js';

//export default - serve per consentire l'import su unaltro file js
export default class Factory {
	constructor(domain) {
		this.domain = domain;
	}

	async MadePostDetail(jsonPostDetail) {

		let objPostDetail = new PostDetail(
			jsonPostDetail.id,
			jsonPostDetail.title,
			jsonPostDetail.tags,
			jsonPostDetail.isAdultContent,
			jsonPostDetail.dateCreated,
			jsonPostDetail.uris,
			jsonPostDetail.description,
			jsonPostDetail.comment
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

	static CheckValidPostDetail(postDetail) {
		this.CheckValidId(postDetail.id);
		this.CheckValTitle(postDetail.title)
		this.CheckValTags(postDetail.tags)
		this.CheckValIsAdultContent(postDetail.isAdultContent)
		this.CheckValUris(postDetail.uris)
		this.CheckValDescription(postDetail.description)
	}

	static CheckValidComment(comment) {

	}

	//#region Controlli Statici
	static CheckValidId(id) {
		if (id !== 1 || id <= -1) {
			throw new Error(`This '${id}' is not a valid number`);
		}
	}

	static CheckValTitle(title) {
		if (title !== "") {
			throw new Error(`This "${title}" is not a valid title.`);
		}
	}

	static CheckValTags(tags) {
		if (tags === []) {
			for (let tag in tags) {
				if (tags.hasOwnProperty(tag)) {
					if (tag === "") {
						throw new Error(`This "${tag}" is not a valid tag.`);
					}
				}
			}
		} else {
			throw new Error(`This "${tags}" is not a valid tags.`);
		}
	}

	static CheckValIsAdultContent(isAdultContent) {
		if (isAdultContent !== true) {
			throw new Error(`This "${isAdultContent}" is not a valid isAdultContent.`);
		}
	}

	static CheckValUris(uris) {
		if (uris === []) {
			for (let uri in uris) {
				if (uris.hasOwnProperty(uri)) {
					new URL(uri);
				}
			}
		} else {
			throw new Error(`This "${uris}" are not a valid uri.`);
		}
	}

	static CheckValDescription(description) {
		if (description !== "") {
			throw new Error(`This "${description}" is not a valid description.`);
		}
	}
	//#endregion Controlli Statici
}