
    // essential elements
    var scene=new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, .1,500);
    var renderer = new THREE.WebGLRenderer();

    //setting renderer bg color and size
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth,window.innerHeight);

    //add an axeshelper
    var axis = new THREE.AxesHelper(10);
    scene.add(axis);

    //Add a cube
    var cubeMesh = new THREE.BoxGeometry(5,5,5);
    var cubeMat = new THREE.MeshBasicMaterial({color:0xdddddd,wireframe:true});
    var cube = new THREE.Mesh(cubeMesh,cubeMat);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    scene.add(cube);


    // set camera position
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;    
    camera.lookAt(scene.position);

    document.body.append(renderer.domElement);
    renderer.render(scene,camera);   
