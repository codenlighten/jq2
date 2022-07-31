let height = window.innerHeight * 3;
let width = window.innerWidth;
let SPEED = 15;
let JUMP_POWER = 800;
let CLOUD_SPEED = 200;
let SILVER_SPEED = 100;
let DOUBLE_JUMP = JUMP_POWER * 1.5;

kaboom({
	width,
	height,
	font: "sinko",
	canvas: document.querySelector("gameCanvas"),
	background: [100, 200, 255],
});
// console.log(window.innerHeight);
loadRoot("./assets/");
loadSprite("player", "traveler.png");
loadSprite("floor", "wood1.png");
loadSprite("wall", "wood2.png");
loadSprite("silver", "metal1.png");
loadSprite("cloud1", "cloud1.png");
const bgMusic = new Audio("/assets/bgmusic.mp3", {
	volume: 0.8,
	// loop: true,
});
const droplet = new Audio("/assets/droplet.wav", {
	volume: 0.8,
	// loop: true,
});
const whoosh = new Audio("/assets/whoosh.flac", {
	volume: 0.8,
	// loop: true,
});
const player = add([
	sprite("player"),
	scale(0.25),
	body(),
	solid(),
	area(),
	pos(100, 100),
	"player",
	// origin(0, 0),
]);

player.onUpdate(() => {
	// center camera to player
	// camPos((currCam.y = player.pos.y - player.pos.y / 2));
	// camPos(player.pos.y + player.pos.y / 2, currCam.y);
	// camPos(player.pos.x + player.pos.x / 2, currCam.x);
	// camPos(player.pos.x - player.pos.x / 3, player.pos.y - player.pos.y / 3);
	camPos(player.pos.x, player.pos.y - height / 3);
	// camPos((currCam.x = player.pos.x - player.pos.x / 2));
	// if (currCam.y > player.pos.y) {
	// 	camPos(player.pos.y, currCam.y);
	// }
	// if (currCam.y < player.pos.y) {
	// 	camPos(player.pos.y, currCam.y);
	// 	camPos(player.pos.x, currCam.x);
	// }
	onCollide("player", "wall", () => {
		player.pos.x += 1;
		// burp();
		console.log(player.pos);
	});
});
add([
	sprite("floor"),
	scale(1000, 10),
	pos(-1000, height - 50),
	solid(),
	area(),
]);
const wall = add([
	sprite("wall"),
	scale(1, 8.5),
	pos(-width / 2, -height),
	solid(),
	area(),
	"wall",
]);
// add([sprite("silver"), scale(0.5), pos(-150, height - 300), solid(), area()]);
// add([sprite("silver"), scale(0.5), pos(230, height - 500), solid(), area()]);
// add([sprite("silver"), scale(0.5), pos(600, height - 400), solid(), area()]);
// add([sprite("silver"), scale(0.5), pos(900, height - 900), solid(), area()]);

onKeyPress("enter", () => {
	bgMusic.play();
});

onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_POWER);
		burp();
	}
});
console.log(player);
onKeyDown("v", () => {
	if (player.isGrounded()) {
		player.jump(DOUBLE_JUMP);
		whoosh.play();
		add([
			text(`X:${player.pos.x}, Y:${player.pos.y}`, {
				size: 21, // 48 pixels tall
				width: 100, // it'll wrap to next line when width exceeds this value
				// there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
			}),
			pos(player.pos.x + 50, player.pos.y - 300),
			{ value: 0 },
		]);
	}
});

onKeyDown("right", () => {
	console.log(player);
	move((player.pos.x += SPEED));
	bgMusic.play();

	cleanup();
});
onKeyDown("left", () => {
	console.log(player);
	move((player.pos.x -= SPEED));
	cleanup();
});
let clouds = [];

function spawnCloud() {
	const x = rand(0, width);
	const y = rand(0, height * 2);

	var newCloud = add([
		sprite("cloud1"),
		pos(x, y),
		scale(),
		area(),
		rotate(0),
		{
			xpos: rand((-1 * width) / 2, width / 2),
			ypos: rand((-1 * height) / 2, height / 2),
			zpos: 1000,
			speed: CLOUD_SPEED + rand(-0.5 * CLOUD_SPEED, 0.5 * CLOUD_SPEED),
		},

		"cloud",
	]);

	clouds.push(newCloud);
	newCloud.move(100, 0);
}

loop(0.8, spawnCloud);

let silvers = [];

function spawnSilver() {
	const x = rand(0, width);
	const y = rand(0, height);

	var newSilver = add([
		sprite("silver"),
		scale(0.1, 0.5),
		pos(x, y),
		solid(),
		area(),
		{
			xpos: rand((-1 * width) / 2, width / 2),
			ypos: rand((-1 * height) / 2, height * 3),
			zpos: 1000,
			speed: SILVER_SPEED + rand(-0.5 * SILVER_SPEED, SILVER_SPEED * 3),
		},

		"cloud",
	]);

	silvers.push(newSilver);
	newSilver.move(100, 0);
}

loop(0.8, spawnSilver);
