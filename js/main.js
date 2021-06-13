// Typing effect
// https://www.w3schools.com/howto/howto_js_typewriter.asp

var letterCount = 0;
var txt =
  "SATURNX : PRE-HUMAN EXTINCTION | RECON MOON : IN-ORBIT | RING INTEGRITY: 23.54% | EVACUATION IN PROGRESS"; /* The text */
var speed = 130; /* The speed/duration of the effect in milliseconds */
var end = false;
var doneSFX = false;

function typeWriter() {
  if (letterCount < txt.length) {
    document.getElementById("info").innerHTML +=
      txt.charAt(letterCount) == "|" ? "<br>" : txt.charAt(letterCount);
    speed -= 1;
    if (!typewriterSFX.isPlaying) typewriterSFX.play();
    letterCount++;
  } else {
    speed = 500;
    if (end) {
      document.getElementById("info").innerHTML = document
        .getElementById("info")
        .innerHTML.slice(0, -1);
      end = false;
    } else {
      document.getElementById("info").innerHTML += "_";
      end = true;
      if (!doneSFX) {
        typewriterSFX.stop();
        typewriterDoneSFX.play();
        doneSFX = true;
      }
    }
  }
  setTimeout(typeWriter, speed);
}

// ThreeJS stuff
////////////////////////////////////////////////////////////////////////////

const dataPath = "./data/";
let textures = [];

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("start-button");

// Loading manager
const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  progressBar.style.width = (loaded / total) * 100 + "%";
  progressBar.innerHTML = `Loading ${loaded}/${total}`;
  2;
  startButton.style.visibility = "hidden";
};

manager.onLoad = function () {
  progress.style.display = "none";
  overlay.style.visibility = "visible";
  startButton.style.visibility = "visible";
  startButton.addEventListener("click", () => {
    renderLoop();
    typeWriter();
    spaceSFX.setLoop(true);
    typewriterSFX.setVolume(0.4);
    typewriterDoneSFX.setVolume(0.4);
    spaceSFX.play();
    startButton.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  });
};

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

// Handle window resizing
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Setup audio
const listener = new THREE.AudioListener();
camera.add(listener);
const audioLoader = new THREE.AudioLoader(manager);
// There's no sound in space, but the effect with the ambience is surreal
const spaceSFX = new THREE.Audio(listener);
spaceSFX.load(`${dataPath}space_ambience.ogg`);
const typewriterSFX = new THREE.Audio(listener);
typewriterSFX.load(`${dataPath}typewriter.ogg`);
const typewriterDoneSFX = new THREE.Audio(listener);
typewriterDoneSFX.load(`${dataPath}typewriter_done.ogg`);

// Skybox
// http://wwwtyro.github.io/space-3d

const loader = new THREE.CubeTextureLoader(manager);
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
const saturnTexture = new THREE.TextureLoader(manager).load(
  `${dataPath}saturnx.png`
);
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
const saturnRingTexture1 = new THREE.TextureLoader(manager).load(
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
const saturnRingTexture2 = new THREE.TextureLoader(manager).load(
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
const saturnRingTexture3 = new THREE.TextureLoader(manager).load(
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
const saturnM2Texture = new THREE.TextureLoader(manager).load(
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

// Asteroid Particles

var asteroidVertices = [];
for (var i = 0; i < 2000; i++) {
  var x = THREE.MathUtils.randFloatSpread(1000);
  var y = THREE.MathUtils.randFloatSpread(1000);
  var z = THREE.MathUtils.randFloatSpread(1000);
  asteroidVertices.push(x, y, z);
}
var asteroidGeometry = new THREE.BufferGeometry();
asteroidGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(asteroidVertices, 3)
);
var asteroidMaterial = new THREE.PointsMaterial({
  size: 4,
  transparent: true,
  map: new THREE.TextureLoader().load(`${dataPath}asteroid.png`),
});
var asteroidParts = new THREE.Points(asteroidGeometry, asteroidMaterial);
scene.add(asteroidParts);

// Spaceships
// https://www.reddit.com/r/gamedev/comments/7qymqo/free_lowpoly_spaceships/

const mtlLoader = new THREE.MTLLoader(manager);

var spaceship1,
  ss1AnimState = 0,
  ss1Anim = true;
mtlLoader.load(`${dataPath}Spaceship1.mtl`, (mtl) => {
  mtl.preload();
  const objLoader = new THREE.OBJLoader(manager);
  objLoader.setMaterials(mtl);
  objLoader.load(`${dataPath}Spaceship1.obj`, (root) => {
    spaceship1 = root;
    scene.add(spaceship1);
    spaceship1.position.x = 4.5;
    spaceship1.position.y = 0.2;
    spaceship1.scale.set(0.1, 0.1, 0.1);
    // https://stackoverflow.com/questions/15906248/three-js-objloader-obj-model-not-casting-shadows
    spaceship1.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  });
});
var spaceship2,
  ss2AnimState = 0,
  ss2Anim = true;
mtlLoader.load(`${dataPath}Spaceship3.mtl`, (mtl) => {
  mtl.preload();
  const objLoader = new THREE.OBJLoader(manager);
  objLoader.setMaterials(mtl);
  objLoader.load(`${dataPath}Spaceship3.obj`, (root) => {
    spaceship2 = root;
    scene.add(spaceship2);
    spaceship2.position.set(-7.2, 2, 7);
    spaceship2.rotation.y = Math.PI / 2;
    spaceship2.scale.set(0.1, 0.1, 0.1);
  });
});
var spaceship3,
  ss3AnimState = 0,
  ss3Anim = true;
mtlLoader.load(`${dataPath}Spaceship2.mtl`, (mtl) => {
  mtl.preload();
  const objLoader = new THREE.OBJLoader(manager);
  objLoader.setMaterials(mtl);
  objLoader.load(`${dataPath}Spaceship2.obj`, (root) => {
    spaceship3 = root;
    scene.add(spaceship3);
    spaceship3.position.set(-7.2, 2, 6);
    spaceship3.rotation.y = Math.PI / 2;
    spaceship3.scale.set(0.1, 0.1, 0.1);
  });
});

var spaceship4,
  ss4AnimState = 0,
  ss4Anim = false;
mtlLoader.load(`${dataPath}Spaceship5.mtl`, (mtl) => {
  mtl.preload();
  const objLoader = new THREE.OBJLoader(manager);
  objLoader.setMaterials(mtl);
  objLoader.load(`${dataPath}Spaceship5.obj`, (root) => {
    spaceship4 = root;
    scene.add(spaceship4);
    spaceship4.position.z = 4.5;
    spaceship4.position.y = 0;
    spaceship4.scale.set(0.06, 0.06, 0.06);
    spaceship4.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });
});

var spaceship5,
  ss5AnimState = 0,
  ss5Anim = true;
mtlLoader.load(`${dataPath}Spaceship4.mtl`, (mtl) => {
  mtl.preload();
  const objLoader = new THREE.OBJLoader(manager);
  objLoader.setMaterials(mtl);
  objLoader.load(`${dataPath}Spaceship4.obj`, (root) => {
    spaceship5 = root;
    scene.add(spaceship5);
    spaceship5.position.set(-9, 2, 7);
    spaceship5.rotation.y = Math.PI / 2;
    spaceship5.scale.set(0.1, 0.1, 0.1);
  });
});

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

  asteroidParts.position.x -= 0.01;
  asteroidParts.position.y -= 0.01;

  if (ss1Anim) {
    switch (ss1AnimState) {
      case 0:
        spaceship1.position.y += 0.001;
        if (spaceship1.position.y > 0.6) {
          ss1AnimState = 1;
        }
        break;
      case 1:
        spaceship1.position.z += 0.01;
        if (spaceship1.position.z > 5) {
          ss4Anim = true;
        }
        break;

      default:
        break;
    }
  }

  if (ss4Anim) {
    switch (ss4AnimState) {
      case 0:
        spaceship4.position.y += 0.002;
        if (spaceship4.position.y > 0.6) {
          ss4AnimState = 1;
        }
        break;
      case 1:
        spaceship4.position.z += 0.01;
        break;

      default:
        break;
    }
  }

  if (ss2Anim) {
    spaceship2.position.x += 0.05;
    spaceship2.rotation.x += 0.0025;
  }
  if (ss3Anim) {
    spaceship3.position.x += 0.035;
    spaceship3.rotation.x -= 0.0015;
  }

  if (ss5Anim) {
    switch (ss5AnimState) {
      case 0:
        spaceship5.position.x += 0.035;
        if (spaceship5.position.x > 15) {
          ss5AnimState = 1;
          spaceship5.rotation.y += Math.PI;
        }
        break;
      case 1:
        spaceship5.position.x -= 0.035;
        if (spaceship5.position.x < -12) {
          ss5AnimState = 0;
          spaceship5.rotation.y += Math.PI;
        }
        break;

      default:
        break;
    }
  }

  controls.update(); // CONTROLS

  renderer.render(scene, camera);
};
