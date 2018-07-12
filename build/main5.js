/*
    Geometry Vs BufferGeometry
    BufferGeometry为高性能设计，但是缺少动态性
    如果要对点进行改变，最好使用Geometry

    BoxGeometry, SphereGeometry等都是继承自Geometry，只不过进行了封装，使得创建几何体更加简单
    BoxBufferGeometry,SphereBufferGeometry等也是继承自BufferGeometry
    这些对象都只需要一行代码，传入一些参数即可创建几何体。
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


    // 创建Geometry的方法-开始
    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(-10,10,0),
    //     new THREE.Vector3(-10,-10,0),
    //     new THREE.Vector3(10,-10,0)
    // );
    // geometry.faces.push(new THREE.Face3(0,1,2));
    // 创建Geometry的方法-结束

    // 创建BufferGeometry的方法-开始
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
        -10,-10,0.0,
        10.0,-10.0,0.0,
        10.0,10.0,0.0
    ]);
    geometry.addAttribute('position',new THREE.BufferAttribute(vertices,3));
    // 创建BufferGeometry的方法-结束

    //上述这两段都可以被一句简单的代码代替：
    //var geometry = new THREE.BoxGeometry(10,10,10); //或者其他几何体
     
    var geoMat = new THREE.MeshPhongMaterial({color:0xff3300,dithering: true});
    var geo = new THREE.Mesh(geometry,geoMat);
    geo.position.x = 2.5;
    geo.position.y = 2.5;
    geo.position.z = 2.5;
    geo.castShadow = true;
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

    function Tick(){
        geo.rotation.x+=0.01;
        geo.rotation.y+=0.01;
        requestAnimationFrame(Tick);
        renderer.render(scene,camera);   
    }
