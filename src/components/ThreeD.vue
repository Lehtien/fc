<template>
  <canvas id="thrCanvas"></canvas>
</template>

<script>
import * as THREE from "three";
import * as OIMO from "oimo";
export default {
  data() {
    const scene = new THREE.Scene();
    const renderer = null;
    const camera = new THREE.PerspectiveCamera(45, 600 / 400, 1, 10000);
    const light = new THREE.DirectionalLight(0xffffff);
    const world = new OIMO.World({
      timestep: 1 / 24,
      iterations: 8,
      broadphase: 2, // 1: brute force, 2: sweep & prune, 3: volume tree
      worldscale: 1,
      random: true,
      info: true,
      gravity: [0, -9.8, 0]
    });
    return {
      scene,
      renderer,
      camera,
      light,
      world,
      physics: [],
      cube: null
    };
  },
  mounted() {
    this.initOimo();
    this.initThree();
  },
  methods: {
    initOimo() {
      this.world.add({
        type: "box",
        size: [300, 1, 200],
        pos: [0, -200, 0],
        rot: [-Math.PI / 2, 0, 0],
        move: false,
        density: 1,
        friction: 0.5,
        restitution: 0.1
      });
      this.physics = this.world.add({
        type: "box",
        size: [30, 30, 30],
        pos: [0, 0, 0],
        rot: [0, 0, 45],
        move: true,
        density: 1,
        friction: 0.5,
        restitution: 0.2
      });
    },
    initThree() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#thrCanvas")
        //alpha: true
      });
      let size = window.innerWidth;

      //this.mesh.position.set(0, -10, 0);
      this.renderer.setSize(size, size);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      const radian = (45 * Math.PI) / 180;
      this.camera.position.y = 500 * Math.sin(radian);
      this.camera.position.z = 500 * Math.cos(radian);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //this.camera.rotation.x = Math.PI;

      this.light.position.set(0, 0, 1);

      // 床
      const groundGeo = new THREE.PlaneGeometry(300, 200);
      const groundMat = new THREE.MeshBasicMaterial({ color: 0x6699ff });
      const groundMesh = new THREE.Mesh(groundGeo, groundMat);
      groundMesh.position.y = -200;
      //groundMesh.rotation.y = Math.PI / 4;
      groundMesh.rotation.x = -Math.PI / 2;
      this.scene.add(groundMesh);
      // 画像
      var loader = new THREE.TextureLoader();
      const texture = loader.load("./images/smpl1.jpg");
      const geometry = new THREE.BoxGeometry(30, 30, 30);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);

      var axes = new THREE.AxisHelper(100);
      this.scene.add(axes);

      // const texLoader = new THREE.TextureLoader();
      // texLoader.crossOrigin = "*";
      // texLoader.load(
      //   "./images/smpl1.jpg",
      //   texture => {
      //     // onLoad
      //     //const geometry = new THREE.PlaneGeometry(1, 1);
      //     const geometry = new THREE.BoxGeometry(30, 30, 30);
      //     const material = new THREE.MeshBasicMaterial({ map: texture });
      //     this.cube = new THREE.Mesh(geometry, material);
      //     this.scene.add(this.cube);
      //     //this.cube.position.y = 20;
      //     this.cube.rotation.x = 0;
      //     this.cube.rotation.y = Math.PI / 4;
      //   },
      //   // onProgress callback currently not supported
      //   undefined,
      //   // onError callback
      //   err => {
      //     console.error("An error happened.");
      //   }
      // );
      this.tick();
    },
    tick() {
      // 物理エンジンの時間を進める
      this.world.step();

      this.cube.position.copy(this.physics.getPosition());
      this.cube.quaternion.copy(this.physics.getQuaternion());
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.tick);
    }
  }
};
</script>

<style lang="scss" scoped>
#thrCanvas {
  //position: fixed;
  //bottom: 0;
  //left: 0;

  pointer-events: none;
  //z-index: -1;
  //opacity: 0.5;
  //animation: opcty 15s infinite ease;
}

/* @keyframes opcty {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.1;
  }
} */
</style>

