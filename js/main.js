// Typing effect
// https://www.w3schools.com/howto/howto_js_typewriter.asp

var i = 0;
var txt = "SATURNX : PRE-HUMAN EXTINCTION"; /* The text */
var speed = 100; /* The speed/duration of the effect in milliseconds */
var end = false;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("info").innerHTML += txt.charAt(i);
    speed -= 1;
    i++;
  } else {
    speed = 500;
    if (end) {
      document.getElementById("info").innerHTML = txt;
      end = false;
    } else {
      document.getElementById("info").innerHTML = txt + "_";
      end = true;
    }
  }
  setTimeout(typeWriter, speed);
}

// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
document.addEventListener("DOMContentLoaded", function (event) {
  typeWriter();
});

// ThreeJS stuff
////////////////////////////////////////////////////////////////////////////

const dataPath = "./data/";

// Setting up the scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMapEnabled = true;

// Skybox
// http://wwwtyro.github.io/space-3d

const loader = new THREE.CubeTextureLoader();
loader.setPath(dataPath);

const skyboxTextures = loader.load([
  "skybox_front.png",
  "skybox_back.png",
  "skybox_top.png",
  "skybox_bottom.png",
  "skybox_left.png",
  "skybox_right.png",
]);

scene.background = skyboxTextures;

// Saturn
const saturnGeometry = new THREE.SphereGeometry(3, 100, 100);
const saturnTexture = new THREE.TextureLoader().load(`${dataPath}saturnx.png`);
const saturnMaterial = new THREE.MeshPhongMaterial({
  map: saturnTexture,
  shininess: 60,
  bumpMap: saturnTexture,
  bumpScale: 0.05,
});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);
saturn.castShadow = true;
saturn.receiveShadow = true;

// Saturn Rings
const saturnRingGeometry1 = new THREE.RingGeometry(3.1, 3.5, 100);
const saturnRingTexture1 = new THREE.TextureLoader().load(
  `${dataPath}ring_1.jpg`
);
const saturnRingMaterial1 = new THREE.MeshLambertMaterial({
  map: saturnRingTexture1,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.6,
});
const saturnRing1 = new THREE.Mesh(saturnRingGeometry1, saturnRingMaterial1);
saturnRing1.rotation.x += Math.PI / 2;
saturnRing1.rotation.y = 0.05;
scene.add(saturnRing1);
saturnRing1.receiveShadow = true;

const saturnRingGeometry2 = new THREE.RingGeometry(3.55, 3.9, 100);
const saturnRingTexture2 = new THREE.TextureLoader().load(
  `${dataPath}ring_2.jpg`
);
const saturnRingMaterial2 = new THREE.MeshLambertMaterial({
  map: saturnRingTexture2,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.6,
});
const saturnRing2 = new THREE.Mesh(saturnRingGeometry2, saturnRingMaterial2);
saturnRing2.rotation.x += Math.PI / 2;
saturnRing2.rotation.y = 0.05;
scene.add(saturnRing2);
saturnRing2.receiveShadow = true;

const saturnRingGeometry3 = new THREE.RingGeometry(4, 5, 100);
const saturnRingTexture3 = new THREE.TextureLoader().load(
  `${dataPath}ring_3.jpg`
);
const saturnRingMaterial3 = new THREE.MeshLambertMaterial({
  map: saturnRingTexture3,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.6,
});
const saturnRing3 = new THREE.Mesh(saturnRingGeometry3, saturnRingMaterial3);
saturnRing3.rotation.x += Math.PI / 2;
saturnRing3.rotation.y = 0.05;
scene.add(saturnRing3);
saturnRing3.receiveShadow = true;

// SaturnX Planets
const saturnM1Geometry = new THREE.SphereGeometry(0.5, 100, 100);
const saturnM1Texture = new THREE.TextureLoader().load(
  `${dataPath}saturnx_p1.jpg`
);
const saturnM1Material = new THREE.MeshLambertMaterial({
  map: saturnM1Texture,
});
const saturnM1 = new THREE.Mesh(saturnM1Geometry, saturnM1Material);
scene.add(saturnM1);
saturnM1.castShadow = true;
saturnM1.position.set(-3, 3, 6);

const saturnM2Geometry = new THREE.SphereGeometry(0.3, 100, 100);
const saturnM2Texture = new THREE.TextureLoader().load(
  `${dataPath}saturnx_p2.jpg`
);
const saturnM2Material = new THREE.MeshLambertMaterial({
  map: saturnM2Texture,
});
const saturnM2 = new THREE.Mesh(saturnM2Geometry, saturnM2Material);
scene.add(saturnM2);
saturnM2.castShadow = true;
saturnM2.position.set(-3, 3, 6);

// Reconnaissance moon
const saturnM3Geometry = new THREE.SphereGeometry(0.3, 100, 100);
const refractionCube = skyboxTextures;
refractionCube.mapping = THREE.CubeRefractionMapping;
const saturnM3Material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  envMap: refractionCube,
  refractionRatio: 0.99,
});

const saturnM3 = new THREE.Mesh(saturnM3Geometry, saturnM3Material);
saturnM3.position.set(-3, 3, 6);
scene.add(saturnM3);

// Lighting

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.castShadow = true;
scene.add(directionalLight1);
directionalLight1.position.set(50, 35, 0);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.castShadow = true;
scene.add(directionalLight2);
directionalLight2.position.set(50, -10, 0);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const controls = new THREE.OrbitControls(camera, renderer.domElement); // CONTROLS

camera.position.set(6.7900673199524295, 2.212726262903611, 7.356446520692252);

let ringAnim = 0;

const renderLoop = function () {
  requestAnimationFrame(renderLoop);

  saturn.rotation.y += 0.0005;
  saturnRing1.rotation.z += 0.0005;
  saturnRing2.rotation.z -= 0.0003;
  saturnRing3.rotation.z += 0.0002;
  ringAnim += 0.001;
  saturnRing1.rotation.y = 0.1 * Math.cos(ringAnim);
  saturnRing2.rotation.y = 0.08 * Math.sin(ringAnim);
  saturnRing3.rotation.y = 0.05 * Math.cos(ringAnim);

  saturnM1.rotation.y -= 0.002;
  saturnM1.position.set(6 * Math.sin(ringAnim), 3, 6 * Math.cos(ringAnim));

  saturnM2.rotation.y -= 0.003;
  saturnM2.position.set(
    -5 * Math.sin(ringAnim + 4),
    -1,
    5 * Math.cos(ringAnim + 4)
  );

  saturnM3.rotation.y -= 0.003;
  saturnM3.position.set(
    -7 * Math.sin(ringAnim * 6 + 20),
    1,
    7 * Math.cos(ringAnim * 6 + 20)
  );

  controls.update(); // CONTROLS

  renderer.render(scene, camera);
};

renderLoop();
