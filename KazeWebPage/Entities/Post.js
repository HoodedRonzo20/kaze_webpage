'use strict';

class Post 
{
	constructor(id, title) {
		this.id = id;
		this.title = title;
	}

	sayName() {
		ChromeSamples.log('Hi, I am a ', this.name + '.');
	}

	static CreatePostFromJson(json) 
	{
		objPost = new Post(10,"porva Titolo 10");
		return objPost;
	}

	// We will look at static and subclassed methods shortly
}

// Classes are used just like ES5 constructor functions:
let p = new Polygon(300, 400);
p.sayName();
ChromeSamples.log('The width of this polygon is ' + p.width);