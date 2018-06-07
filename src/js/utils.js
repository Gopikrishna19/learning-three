const frames = {};

const skipFrames = (id, framesToSkip, callback) => {

  if (frames[id] === undefined) frames[id] = 0;

  frames[id] += 1;

  if (frames[id] >= framesToSkip) {
    frames[id] = 0;
    callback();
  }

};

const getBox = (x, y, z) => {
  const size = new THREE.BoxGeometry(x, y, z);
  const material = new THREE.MeshBasicMaterial({color: 0xff0000});

  return new THREE.Mesh(size, material);
};

const addObjects = (scene, objectsToAdd) =>
  Object.values(objectsToAdd).forEach(obj => scene.add(obj));
