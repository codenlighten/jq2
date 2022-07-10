let height = window.innerHeight * 3;
let width = window.innerWidth;
let SPEED = 15;
let JUMP_POWER = 800;
let CLOUD_SPEED = 200;
let DOUBLE_JUMP = JUMP_POWER * 1.5;
kaboom({
	width,
	height,
	font: "sinko",
	canvas: document.querySelector("gameCanvas"),
	background: [100, 200, 255],
});
console.log(window.innerHeight);
loadRoot("./assets/");
loadSprite("traveler", "traveler.png");
loadSprite("floor", "wood1.png");
loadSprite("silver", "metal1.png");
loadSprite("cloud1", "cloud1.png");

const player = add([
	sprite("traveler"),
	scale(0.25),
	body(),
	solid(),
	area(),
	pos(100, 100),
	// origin(0, 0),
]);

player.onUpdate(() => {
	// center camera to player
	var currCam = camPos();
	// camPos((currCam.y = player.pos.y));
	// if (currCam.y > player.pos.y) {
	// 	camPos(player.pos.y, currCam.y);
	// }
	// if (currCam.y < player.pos.y) {
	// 	camPos(player.pos.y, currCam.y);
	// 	camPos(player.pos.x, currCam.x);
	// }
});
add([sprite("floor"), scale(10), pos(0, height - 50), solid(), area()]);
add([sprite("silver"), scale(0.5), pos(-150, height - 300), solid(), area()]);
add([sprite("silver"), scale(0.5), pos(230, height - 500), solid(), area()]);
add([sprite("silver"), scale(0.5), pos(600, height - 400), solid(), area()]);
add([sprite("silver"), scale(0.5), pos(900, height - 900), solid(), area()]);

onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_POWER);
	}
});
console.log(player);
onKeyDown("v", () => {
	if (player.isGrounded()) {
		player.jump(DOUBLE_JUMP);
	}
});

onKeyDown("right", () => {
	console.log(player);
	move((player.pos.x += SPEED));
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
	const y = rand(0, height);

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
