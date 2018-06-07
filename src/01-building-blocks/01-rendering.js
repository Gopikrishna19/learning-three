const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff);
/***
 * 3js has three types of renderer
 * WebGL, performant and feature rich
 * Canvas, uses html5 canvas
 * SVG, is available as a separate package
 */
const renderer = new THREE.WebGLRenderer();

const objects = {};
let camera;

const getCamera = () => {
  const fieldOfView = 35;                       // frustrum cone angle in degrees
  const aspectRatio = innerWidth / innerHeight; // frustrum base area shape
  const near = 1;                               // near plane
  const far = 1000;                             // far plane, only object within this range are rendered

  /***
   * 3js has two types. Perspective and Orthographic
   * Perspective is conical, the nearer the object, bigger it will be, ideal for FPS games
   * Orthographic is 1:1 all the way, ideal for views like RTS games
   */
  return new THREE.PerspectiveCamera(35, aspectRatio, near, far);
};

const render = () => {
  objects.box.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

const initScene = () => {
  renderer.setSize(innerWidth, innerHeight);
  document.getElementById('webgl-container').appendChild(renderer.domElement);

  camera = getCamera();
  camera.position.z = 100;

  objects.box = getBox(20, 20, 20);

  scene.add(light);
  scene.add(camera);

  addObjects(scene, objects);

  render();
};

window.addEventListener('load', () => {
  initScene();
});
