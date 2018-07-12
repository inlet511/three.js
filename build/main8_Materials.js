
/*
   

*/

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
var geoMat = new THREE.MeshBasicMaterial({ 
    color: 0xff3300, 
    transparent: true, 
    opacity: 0.5, 
    wireframe: true, 
    wireframeLinewidth:5,//参考官方BasicMaterial的说明，在windows上该值始终是1
    wireframeLinejoin:'round',
    wireframeLinecap:'round'
 });

 var geoMat2 = new THREE.MeshNormalMaterial();

 var geoMat3 = new THREE.MeshLambertMaterial({
    color:0xF390e2,
    emissive:0x0000FF,
    emissiveIntensity:2,
    side:THREE.BackSide
    });

var geoMat4 = new THREE.MeshLambertMaterial({
    color:0xF3E3E2,
    map: new THREE.TextureLoader().load("./examples/textures/lava/lavatile.jpg")
});

var geoMat5 = new THREE.MeshPhongMaterial({
    color:0xffffff,
    specular:0xffffff,
    shininess:500,
    map: new THREE.TextureLoader().load("./examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg"),
    normalMap: new THREE.TextureLoader().load("./examples/textures/floors/FloorsCheckerboard_S_Normal.jpg"),
});

//Standard Material 是一种较新的材质，类似于Unity中的StandardMaterial
var geoMat6 = new THREE.MeshStandardMaterial({
    color:0xffffff,
    roughness: 0.1,
    metalness: 0.4,
    map: new THREE.TextureLoader().load("./examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg"),
    normalMap: new THREE.TextureLoader().load("./examples/textures/floors/FloorsCheckerboard_S_Normal.jpg"),
});


var geoMat7 = new THREE.MeshDepthMaterial();//不起作用,why?


//Geometry
var geoMesh = new THREE.BoxGeometry(10, 10, 10);
var geo = new THREE.Mesh(geoMesh, geoMat6);
geo.position.x = -10;
scene.add(geo);

var geoMesh2 = new THREE.SphereGeometry(10, 20, 20);
var geo2 = new THREE.Line(geoMesh2, geoMat6);
geo2.position.x = 10;
scene.add(geo2);

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
camera.lookAt(geo.position);

document.body.append(renderer.domElement);

Tick();

function Tick() {
    geo.rotation.x += 0.01;
    geo.rotation.y += 0.01;
    requestAnimationFrame(Tick);
    renderer.render(scene, camera);
}
