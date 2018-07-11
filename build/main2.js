
    // essential elements
    var scene=new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, .1,500);
    var renderer = new THREE.WebGLRenderer();

    //setting renderer bg color and size
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //add an axeshelper
    var axis = new THREE.AxesHelper(10);
    scene.add(axis);

    // add a grid
    var gridCenterLineColor = new THREE.Color("rgb(255,0,0)");
    var gridColor = new THREE.Color("rgb(255,255,0)");
    var grid = new THREE.GridHelper(50,10,gridCenterLineColor,gridColor);
    scene.add(grid);

    // add a plane
    var planeMesh = new THREE.PlaneGeometry(30,30,30);
    var planeMat = new THREE.MeshPhongMaterial({color:0xffffff,dithering: true});
    var plane = new THREE.Mesh(planeMesh,planeMat);
    plane.receiveShadow = true;
    scene.add(plane);
    plane.rotation.x = -.5 * Math.PI;

    //Add a cube
    var cubeMesh = new THREE.BoxGeometry(5,5,5);
    var cubeMat = new THREE.MeshPhongMaterial({color:0xff3300,dithering: true});
    var cube = new THREE.Mesh(cubeMesh,cubeMat);
    cube.position.x = 2.5;
    cube.position.y = 2.5;
    cube.position.z = 2.5;
    cube.castShadow = true;
    scene.add(cube);

    //add light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(15,50,50);

    scene.add(spotLight);

    lightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add( lightHelper );
    

    // set camera position
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;    
    camera.lookAt(cube.position);

    document.body.append(renderer.domElement);
    renderer.render(scene,camera);   
