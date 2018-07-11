var scene, camera, spotLight, render, cube;
var rotSpeedX = 0.01;
var rotSpeedY = 0.01;
var rotSpeedZ = 0.01;


function init() {
    // essential elements
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 500);
    renderer = new THREE.WebGLRenderer();

    //setting renderer bg color and size
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //add an axeshelper
    var axis = new THREE.AxesHelper(10);
    scene.add(axis);

    // add a grid
    var gridCenterLineColor = new THREE.Color("rgb(255,0,0)");
    var gridColor = new THREE.Color("rgb(255,255,0)");
    var grid = new THREE.GridHelper(50, 10, gridCenterLineColor, gridColor);
    scene.add(grid);

    // add a plane
    var planeMesh = new THREE.PlaneGeometry(30, 30, 30);
    var planeMat = new THREE.MeshPhongMaterial({ color: 0xffffff, dithering: true });
    var plane = new THREE.Mesh(planeMesh, planeMat);
    plane.receiveShadow = true;
    scene.add(plane);
    plane.rotation.x = -.5 * Math.PI;

    //Add a cube
    var cubeMesh = new THREE.BoxGeometry(5, 5, 5);
    var cubeMat = new THREE.MeshPhongMaterial({ color: 0xff3300, dithering: true });
    cube = new THREE.Mesh(cubeMesh, cubeMat);
    cube.position.x = 2.5;
    cube.position.y = 5;
    cube.position.z = 2.5;
    cube.castShadow = true;
    scene.add(cube);

    //add light
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(15, 50, 50);

    scene.add(spotLight);

    lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);


    // set camera position
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;
    camera.lookAt(cube.position);

    document.body.append(renderer.domElement);
}



function buildGui() {

    gui = new dat.GUI();

    var params = {
        'light color': spotLight.color.getHex(),
        intensity: spotLight.intensity,
        distance: spotLight.distance,
        angle: spotLight.angle,
        penumbra: spotLight.penumbra,
        decay: spotLight.decay,
        rotX: rotSpeedX,
        rotY: rotSpeedY,
        rotZ: rotSpeedZ,
    }

    gui.addColor(params, 'light color').onChange(function (val) {
        spotLight.color.setHex(val);
    });
    gui.add(params, 'intensity', 0, 2).onChange(function (val) {
        spotLight.intensity = val;
    });
    gui.add(params, 'distance', 50, 200).onChange(function (val) {
        spotLight.distance = val;
    });
    gui.add(params, 'angle', 0, Math.PI / 3).onChange(function (val) {
        spotLight.angle = val;
    });
    gui.add(params, 'penumbra', 0, 1).onChange(function (val) {
        spotLight.penumbra = val;
    });
    gui.add(params, 'decay', 1, 2).onChange(function (val) {
        spotLight.decay = val;
    });
    gui.add(params, 'rotX', 0, 0.5).onChange(function (val) {
        rotSpeedX = val;
    });
    gui.add(params, 'rotY', 0, 0.5).onChange(function (val) {
        rotSpeedY = val;
    });
    gui.add(params, 'rotZ', 0, 0.5).onChange(function (val) {
        rotSpeedZ = val;
    });

    gui.open();

}

function render() {
    cube.rotation.x += rotSpeedX;
    cube.rotation.y += rotSpeedY;
    cube.rotation.z += rotSpeedZ;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
buildGui();
render();