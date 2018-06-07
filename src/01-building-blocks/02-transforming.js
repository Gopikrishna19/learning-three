const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xeeeeee);
const directionalLight = new THREE.AmbientLight(0xffffff, .75);
const renderer = new THREE.WebGLRenderer();

const objects = {};

const getOrthographicCamera = () => {
  const halfScreenHeight = innerHeight / 2;
  const halfScreenWidth = innerWidth / 2;
  const top = -halfScreenHeight;
  const bottom = halfScreenHeight;
  const left = -halfScreenWidth;
  const right = halfScreenWidth;
  const near = 1;
  const far = 1000;

  return new THREE.OrthographicCamera(left, right, top, bottom, near, far);
};

const getPerspectiveCamera = () => {
  const fieldOfView = 35;
  const aspectRatio = innerWidth / innerHeight;
  const near = 1;
  const far = 10000;

  const perspectiveCamera = new THREE.PerspectiveCamera(35, aspectRatio, near, far);

  perspectiveCamera.position.z = 2000;
  perspectiveCamera.position.y = 200;
  perspectiveCamera.position.x = 200;
  perspectiveCamera.rotation.x = -0.0997;
  perspectiveCamera.rotation.y = 0.0997;

  return perspectiveCamera;
};

const getBoxAt = (x, y, z) => {
  const box = getBox(200, 200, 200);

  box.position.set(x, y, z);
  box.castShadow = true;

  return box;
};

const rotateBox = () => {
  objects.rotatingBox.rotation.y += Math.random() / 100;
  objects.rotatingBox.rotation.x += Math.random() / 100;
  objects.rotatingBox.rotation.z += Math.random() / 100;
};

const scaleBox = () =>
  skipFrames(objects.scalingBox.id, 15, () => {
    objects.scalingBox.scale.y = Math.random();
    objects.scalingBox.scale.x = Math.random();
    objects.scalingBox.scale.z = Math.random();
  });

const moveBox = () =>
  skipFrames(objects.scalingBox.id, 15, () => {
    objects.movingBox.position.y = -300 + 100 * Math.random();
    objects.movingBox.position.x = 300 + 100 * Math.random();
    objects.movingBox.position.z = 100 * Math.random();
  });

const render = () => {
  rotateBox();
  scaleBox();
  moveBox();

  renderer.render(scene, objects.activeCamera);
  requestAnimationFrame(render);
};

const initScene = () => {
  renderer.setSize(innerWidth, innerHeight);
  document.getElementById('webgl-container').appendChild(renderer.domElement);

  objects.orthographicCamera = getOrthographicCamera();
  objects.perspectiveCamera = getPerspectiveCamera();

  objects.activeCamera = objects.perspectiveCamera;

  objects.rotatingBox = getBoxAt(-300, -300, 0);
  objects.scalingBox = getBoxAt(0, 300, 0);
  objects.movingBox = getBoxAt(300, -300, 0);

  scene.add(new THREE.AxesHelper(20));
  scene.add(ambientLight);
  scene.add(directionalLight);

  addObjects(scene, objects);

  render();
};

window.addEventListener('load', () => {
  initScene();
});

window.addEventListener('keypress', event => {
  if (event.key === 'c') {
    objects.activeCamera = objects.activeCamera === objects.orthographicCamera ? objects.perspectiveCamera : objects.orthographicCamera;
  }
});
