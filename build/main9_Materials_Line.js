
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

// Line 材质要模型配合，创建时候要使用THREE.Line来代替THREE.Mesh
var geoMat8 = new THREE.LineBasicMaterial();

// DashedLineMaterial 要起作用，必须在模型上调用computeLineDistances()函数
var geoMat9 = new THREE.LineDashedMaterial({
    dashSize:2,
    gapSize:2
});


//Geometry
var geoMesh = new THREE.BoxGeometry(10, 10, 10);
var geo = new THREE.Line(geoMesh, geoMat9);
geo.position.x = -10;
scene.add(geo);

//配合DashedLine
geo.computeLineDistances();

var geoMesh2 = new THREE.SphereGeometry(10, 20, 20);
var geo2 = new THREE.Line(geoMesh2, geoMat9);
geo2.position.x = 10;
scene.add(geo2);

//配合DashedLine
geo2.computeLineDistances();

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
