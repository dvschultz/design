images = {
	textures: [
		"assets/textures/diag.png",
		"assets/textures/dots-md.png",
		"assets/textures/dots-sm.png",
		"assets/textures/vert.png",
		"assets/textures/x.png",
		"assets/textures/x.png",
	],
	textures2: [
		"assets/textures/diag2.png",
		"assets/textures/dots-md2.png",
		"assets/textures/dots-sm2.png",
		"assets/textures/vert2.png",
		"assets/textures/x2.png",
		"assets/textures/x2.png",
	],
	about: [
		"assets/about/bug.png",
		"assets/about/dots.png",
		"assets/about/field.png",
		"assets/about/painting.png",
		"assets/about/pixels.png",
		"assets/about/pixels.png",
	],
	vistaprint: [
		"assets/ai/rc1.png",
		"assets/ai/styletransfer.png",
		"assets/ai/B007.png",
		"assets/ai/bladerunner-nfp.png",
		"assets/ai/nfp.png",
		"assets/ai/gan.png",
		"assets/ai/gan.png"
	],
	mailchimp: [
		"assets/mailchimp/mailchimp-010.png",
		"assets/mailchimp/mailchimp-018.png",
		"assets/mailchimp/mailchimp-026a.png",
		"assets/mailchimp/mailchimp-026b.png",
		"assets/mailchimp/mailchimp-027.png",
		"assets/mailchimp/mailchimp-028a.png",
		"assets/mailchimp/mailchimp-028b.png"
	],
	ai: [
		"assets/ai/advanced-stylegan.png",
		"assets/ai/styletransfer.png",
		"assets/ai/B007.png",
		"assets/ai/bladerunner-nfp.png",
		"assets/ai/nfp.png",
		// "assets/ai/gan.png",
		"assets/ai/nyt.png",
		"assets/ai/bbvday.png"
	],
	nyt: [
		"assets/nyt/bn.png",
		"assets/nyt/cards.png",
		"assets/nyt/concept.png",
		"assets/nyt/grid.png",
		"assets/nyt/grid2.png",
		"assets/nyt/header.png",
		"assets/nyt/opinion.png",
		"assets/nyt/protopper.png",
		"assets/nyt/provocations.png",
		"assets/nyt/type.png",
		"assets/nyt/type.png",
	],
	atavist: [
		"assets/atavist/compose.png",
		"assets/atavist/email.png",
		"assets/atavist/featured.png",
		"assets/atavist/header.png",
		"assets/atavist/icons.png",
		//"assets/atavist/publish.png",
		"assets/atavist/sketch.png",
		"assets/atavist/colby.png",
		"assets/atavist/colby.png",
	],
	atavistbooks: [
		"assets/atavistbooks/01.png",
		"assets/atavistbooks/04.png",
		"assets/atavistbooks/eye.png",
		"assets/atavistbooks/moon1.png",
		"assets/atavistbooks/announce01.png",
		"assets/atavistbooks/announce02.png",
		"assets/atavistbooks/announce02.png",
	],
	betterbook: [
		"assets/betterbook/cocktails.png",
		"assets/betterbook/cocktails2.png",
		"assets/betterbook/wine.png",
		"assets/betterbook/wine2.png",
		"assets/betterbook/dog.png",
		"assets/betterbook/dog2.png",
		"assets/betterbook/dog2.png",
	],
	bbvday: [
		"assets/bbvday/3d-2.png",
		"assets/bbvday/bbvday2019.png",
		"assets/bbvday/uplifting.png",
		"assets/bbvday/vday2012.png",
		//"assets/bbvday/2018-3.png",
		"assets/bbvday/kanye.png",
		"assets/bbvday/kanye.png",
	]
};

window.onload = function() {
	const canvasArray = document.querySelectorAll("canvas");
	const prop = window.innerHeight / window.innerWidth; // >1 = vertical, <1 = horizontal

	for(var c = 0; c < canvasArray.length; c++) {
		let thisCanvas = canvasArray[c];
		let ctx = thisCanvas.getContext('2d');

		if(prop > 1) { //vertical
			thisCanvas.setAttribute("class","vertical");
			ctx.canvas.height = 1600;
			ctx.canvas.width = 1200;
		} else {
			thisCanvas.setAttribute("class","horizontal");
			ctx.canvas.height = 1200;
			ctx.canvas.width = 1600;
		}

		let name = thisCanvas.getAttribute("data-name");
		let layout = thisCanvas.getAttribute("data-layout");

		if(layout === "bands") {
			thisCanvas.classList.add("bands");
			bands(thisCanvas,ctx,prop,name);
		} else if(layout === "blocks") {
			thisCanvas.classList.add("blocks");
			blocks(thisCanvas,ctx,prop,name);
		}
		


		// let rLayout = Math.random();

		// if(rLayout <.5){
		// 	thisCanvas.classList.add("bands");
		// 	bands(thisCanvas,ctx,prop);
		// } else {
		// 	thisCanvas.classList.add("blocks");
		// 	blocks(thisCanvas,ctx,prop);
		// }

		thisCanvas.classList.add("fade-in");
	}
}

function bands(c,ctx,p,name) {
	let maxW,maxH;
	if(p > 1) { //vertical
		maxW = 24;
		maxH = 32;
	} else { //horizontal
		maxW = 32;
		maxH = 24;
	}

	let texts = getTextures(name,3);
	loadImages(texts, function(images) {
		// ctx.fillStyle = "green";
		let startX = randInt(0,maxW*.25);
		let startY = 0;
		let w = randInt(maxW*.8, (maxW-startX));
		let h = randInt(maxH*.125,maxH*.5);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[0], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		// ctx.fillStyle = "orange";
		startX = randInt(0,maxW*.25);
		startY+=h;
		w = randInt(maxW*.8, (maxW-startX));
		h = randInt(maxH*.125,maxH*.5);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[1], startX*50, (images[1].height/2)-((h*50)/2), w*50, h*50, startX*50, startY*50, w*50, h*50);

		// ctx.fillStyle = "red";
		startX = randInt(0,maxW*.25);
		startY+=h;
		w = randInt(maxW*.8, (maxW-startX));
		h = maxH-startY;
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[2], startX*50, images[2].height-(h*50), w*50, h*50, startX*50, startY*50, w*50, h*50);

		// ctx.fillStyle = "black";
		startX = randInt(0,maxW*.5);
		startY = randInt(0,maxH*.375);
		w = randInt(maxW*.1, maxW*.5);
		h = randInt(maxH*.125,maxH*.75);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[3], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.25,maxW*.875);
		startY = randInt(maxH*.5,maxH*.75);
		w = randInt(maxW*.1, maxW*.375);
		h = randInt(maxH*.1,maxH*.75);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[4], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.25,maxW*.875);
		startY = randInt(maxH*.25,maxH*.75);
		w = randInt(maxW*.1, maxW*.5);
		h = randInt(maxH*.1,maxH*.75);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[5], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.25,maxW*.875);
		startY = randInt(maxH*.5,maxH*.75);
		w = randInt(maxW*.1, maxW*.375);
		h = randInt(maxH*.1,maxH*.75);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[6], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		// startX = randInt(maxW*.25,maxW*.875);
		// startY = randInt(maxH*.25,maxH*.75);
		// w = randInt(maxW*.1, maxW*.5);
		// h = randInt(maxH*.1,maxH*.75);
		// // ctx.fillRect(startX*50, startY*50, w*50, h*50);
		// ctx.drawImage(images[7], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.125,maxW*.5);
		startY = randInt(maxH*.125,maxH*.75);
		let h2 = c.nextSibling.nextSibling;
		h2.style.top = ((startY/maxH)*100) + "%";
		h2.style.left = ((startX/maxW)*100) + "%";
		h2.style.position = "absolute";
		h2.style.width = "auto";
	});


}

function blocks(c,ctx,p,name) {
	let maxW,maxH;
	if(p > 1) { //vertical
		maxW = 24;
		maxH = 32;
	} else { //horizontal
		maxW = 32;
		maxH = 24;
	}

	centerX = randInt(maxW*.325,maxW*.675);
	centerY = randInt(maxH*.325,maxH*.675);

	let texts = getTextures(name,4);

	// ctx.fillStyle = "red";
	// ctx.fillRect( (centerX*50) - 25, (centerY*50) - 25, 50, 50);
	loadImages(texts, function(images) {
		//top left block
		ctx.fillStyle = "blue";
		let w = randInt(maxW*.25,centerX);
		let h = randInt(maxH*.25,centerY);
		let hrand = Math.random();
		if (hrand < .25) h = centerY;
		if (hrand > .75) w = centerX;
		//ctx.fillRect( (centerX-w)*50, (centerY-h)*50, w*50, h*50 );
		ctx.drawImage(images[0], (centerX-w)*50, (centerY-h)*50, w*50, h*50, (centerX-w)*50, (centerY-h)*50, w*50, h*50);

		//top right block
		ctx.fillStyle = "green";
		w = randInt(maxW*.375,maxW-centerX);
		h = randInt(maxH*.25,maxH-centerY);
		hrand = Math.random();
		if (hrand < .5) h = centerY;
		if (hrand < .25) w = maxW-centerX;
		//ctx.fillRect( centerX*50, (centerY-h)*50, w*50, h*50 );
		ctx.drawImage(images[1], centerX*50, (centerY-h)*50, w*50, h*50, centerX*50, (centerY-h)*50, w*50, h*50);

		//bottom right block
		ctx.fillStyle = "orange";
		w = randInt(maxW*.375,maxW-centerX);
		h = randInt(maxH*.25,maxH-centerY);
		hrand = Math.random();
		if (hrand < .5) h = maxH-centerY;
		if (hrand < .25) w = maxW-centerX;
		//ctx.fillRect( centerX*50, centerY*50, w*50, h*50 );
		ctx.drawImage(images[2], centerX*50, images[2].height-(h*50), w*50, h*50, centerX*50, centerY*50, w*50, h*50);

		//bottom left block
		ctx.fillStyle = "white";
		w = randInt(maxW*.375,maxW-centerX);
		h = randInt(maxH*.125,maxH-centerY);
		hrand = Math.random();
		if (hrand < .75) h = maxH-centerY;
		if (hrand < .25) w = maxW-centerX;
		// ctx.fillRect( (centerX-w)*50, centerY*50, w*50, h*50 );
		ctx.drawImage(images[3], (centerX-w)*50, images[3].height-(h*50), w*50, h*50, (centerX-w)*50, centerY*50, w*50, h*50);

		ctx.fillStyle = "red";	
		let startX = randInt(0,maxW*.5);
		let startY = randInt(0,maxH*.375);
		w = randInt(maxW*.1, maxW*.375);
		h = randInt(maxH*.125,maxH*.75);
		// ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[4], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		ctx.fillStyle = "black";
		startX = randInt(maxW*.25,maxW*.875);
		startY = randInt(maxH*.5,maxH*.75);
		w = randInt(maxW*.1, maxW*.375);
		h = randInt(maxH*.1,maxH*.75);
		//ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[5], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.25,maxW*.875);
		startY = randInt(maxH*.25,maxH*.75);
		w = randInt(maxW*.1, maxW*.5);
		h = randInt(maxH*.1,maxH*.75);
		//ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[6], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.25,maxW*.875);
		startY = randInt(maxH*.25,maxH*.75);
		w = randInt(maxW*.1, maxW*.5);
		h = randInt(maxH*.1,maxH*.75);
		//ctx.fillRect(startX*50, startY*50, w*50, h*50);
		ctx.drawImage(images[7], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		// startX = randInt(maxW*.25,maxW*.875);
		// startY = randInt(maxH*.25,maxH*.75);
		// w = randInt(maxW*.1, maxW*.5);
		// h = randInt(maxH*.1,maxH*.75);
		// //ctx.fillRect(startX*50, startY*50, w*50, h*50);
		// ctx.drawImage(images[8], startX*50, startY*50, w*50, h*50, startX*50, startY*50, w*50, h*50);

		startX = randInt(maxW*.125,maxW*.5);
		startY = randInt(maxH*.125,maxH*.75);
		let h2 = c.nextSibling.nextSibling;
		h2.style.top = ((startY/maxH)*100) + "%";
		h2.style.left = ((startX/maxW)*100) + "%";
		h2.style.position = "absolute";
		h2.style.width = "auto";

	});
	
}

function getTextures(name,picks) {
	texts = [];

	let imgOpts = images[name].slice(0);

	for(let p = 0; p < picks; p++) {
		let i = randInt(0,imgOpts.length-1);
		texts.push(imgOpts[i]);
		imgOpts.splice(i,1);
	}

	//three random textures
	texts.push(images.textures[randInt(0,images.textures.length)]);
	texts.push(images.textures[randInt(0,images.textures.length)]);
	texts.push(images.textures[randInt(0,images.textures.length)]);
	texts.push(images.textures2[randInt(0,images.textures2.length)]);
	// texts.push(images.textures[randInt(0,images.textures.length)]);
	return texts;
}

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }

    if(numImages == 0) callback(sources);

    for(var src in sources) {
        if (sources[src] != "solid") {
            images[src] = new Image();
            images[src].onload = function() {
                if(++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].src = sources[src];
        } else {
            images[src] = new Image();
        }
    }
}

function randInt(min,max) {
	return Math.floor( (Math.random()*(max-min)) + min);
}