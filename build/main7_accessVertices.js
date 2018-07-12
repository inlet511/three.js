
/*
    Access Individual vertices

*/

    // essential elements
    var scene=new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, .1,500);
    var renderer = new THREE.WebGLRenderer();

    //setting renderer bg color and size
    renderer.setClearColor(0x555555);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //add an axeshelper
    var axis = new THREE.AxesHelper(10);
    scene.add(axis);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 500;
    controls.enablePan = true;

    // add a grid
    var gridCenterLineColor = new THREE.Color("rgb(255,0,0)");
    var gridColor = new THREE.Color("rgb(255,255,0)");
    var grid = new THREE.GridHelper(50,10,gridCenterLineColor,gridColor);
    scene.add(grid);  


    var geometry = new THREE.PlaneGeometry(100,100);

     
    var geoMat = new THREE.MeshPhongMaterial({color:0xff3300,dithering: true});
    var geo = new THREE.Mesh(geometry,geoMat);
    scene.add(geo);

    //add light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(15,50,50);

    scene.add(spotLight);


    // set camera position
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;    
    camera.lookAt(geo.position);

    document.body.append(renderer.domElement);

    Tick();

    var delta = 0;

    function Tick(){
        delta+=0.1;
        geometry.vertices[0].x = -25 + Math.sin(delta)*50;
        geometry.verticesNeedUpdate=true;
        
        requestAnimationFrame(Tick);
        renderer.render(scene,camera);   
    }
