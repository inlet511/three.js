
// essential elements
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 500);
var renderer = new THREE.WebGLRenderer({ antialias: true });

//setting renderer bg color and size
renderer.setClearColor(0x555555);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//add an axeshelper
var axis = new THREE.AxesHelper(10);
scene.add(axis);

// orbit control
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 500;
controls.enablePan = true;

// add a grid
var gridCenterLineColor = new THREE.Color("rgb(255,0,0)");
var gridColor = new THREE.Color("rgb(255,255,0)");
var grid = new THREE.GridHelper(50, 10, gridCenterLineColor, gridColor);
scene.add(grid);



//Materials

var material = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load('./examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg'),
});

var mesh = new THREE.Sprite(material);
mesh.scale.set(10,10,10);
scene.add(mesh);

// Ambient Light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//Point light
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.castShadow = true;
spotLight.position.set(15, 50, 50);
scene.add(spotLight);


// set camera position
camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(mesh.position);

document.body.append(renderer.domElement);

Tick();

function Tick() {
    requestAnimationFrame(Tick);
    renderer.render(scene, camera);
}
