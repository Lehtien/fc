<template>
  <canvas id="thrCanvas"></canvas>
</template>

<script>
import * as THREE from "three";
import * as OIMO from "oimo";

const ss = [
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg"
];

export default {
  data() {
    const scene = new THREE.Scene();
    const renderer = null;
    const camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 1000);
    const light = new THREE.DirectionalLight(0xffffff, 1); //new THREE.SpotLight(0xffffff, 1, 1000, Math.PI / 4, 1);
    const world = new OIMO.World({
      timestep: 1 / 24,
      iterations: 8,
      broadphase: 2, // 1: brute force, 2: sweep & prune, 3: volume tree
      worldscale: 1,
      random: true,
      info: false,
      gravity: [0, -9.8, 0]
    });
    const boardHeight = 80;
    const boardWidth = 80;
    return {
      scene,
      renderer,
      camera,
      light,
      world,
      physics: [],
      board: [],
      boardSS: ss,
      boardHeight,
      boardWidth
    };
  },
  mounted() {
    this.initOimo();
    this.initThree();
  },
  methods: {
    // 物理エンジン
    initOimo() {
      this.world.add({
        type: "box",
        size: [300, 10, 200],
        pos: [0, -200, 0],
        rot: [-Math.PI / 2, 0, 0],
        move: false,
        density: 1,
        friction: 0.5,
        restitution: 0.1
      });

      // boardの追加

      const intervalId = setInterval(() => {
        console.log(this.physics.length);
        const physics = this.world.add({
          type: "box",
          size: [2, this.boardHeight, this.boardWidth],
          pos: [this.randomRange(-80, 80), 30, this.randomRange(-20, 20)],
          rot: [0, this.randomRange(0, 180), this.randomRange(45, 135)],
          move: true,
          density: 1,
          friction: 0.5,
          restitution: 0.2
        });
        this.physics.push(physics);
        if (this.physics.length >= this.boardSS.length)
          clearInterval(intervalId);
      }, 2 * 1000);
    },
    // 乱数を指定範囲内で取得
    randomRange(min, max) {
      return Math.random() * (max - min) + min;
    },
    // 3Dオブジェクト
    initThree() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#thrCanvas")
        //alpha: true
      });
      let size = window.innerWidth;

      this.renderer.setSize(size, size);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;

      const radian = (90 * Math.PI) / 180;
      this.camera.position.y = 200 * Math.sin(radian);
      this.camera.position.z = 100 * Math.cos(radian);
      //this.camera.position.x = 100;
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //this.camera.rotation.x = Math.PI;

      // Light Settings
      this.light.position.set(0, 10, 5);
      this.light.rotation.y = 100;
      this.light.castShadow = true;
      // Shadow Settings
      this.light.shadow.camera.position.set(0, 100, 0);
      this.light.shadow.camera.left = -100;
      this.light.shadow.camera.right = 100;
      this.light.shadow.camera.top = 100;
      this.light.shadow.camera.bottom = -100;
      //this.light.shadow.mapSize.width = 2048;
      //this.light.shadow.mapSize.height = 2048;

      this.scene.add(this.light);

      // helper
      var helper = new THREE.DirectionalLightHelper(this.light, 30);
      this.scene.add(helper);
      const lightHelper = new THREE.SpotLightHelper(this.light);
      this.scene.add(lightHelper);
      let cameraHelper = new THREE.CameraHelper(this.light.shadow.camera);
      this.scene.add(cameraHelper);
      var axes = new THREE.AxisHelper(1000);
      this.scene.add(axes);

      this.createGround();
      this.createBoard();

      this.tick();
    },
    // 床の生成
    createGround() {
      const groundGeo = new THREE.PlaneGeometry(300, 200);
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x6699ff,
        roughness: 0.8
      });
      const groundMesh = new THREE.Mesh(groundGeo, groundMat);
      groundMesh.position.y = -200;
      //groundMesh.rotation.y = Math.PI / 4;
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.receiveShadow = true;
      this.scene.add(groundMesh);
    },
    createBoard() {
      var loader = new THREE.TextureLoader();
      const texture = loader.load("./images/smpl1.jpg");
      const geometry = new THREE.BoxGeometry(
        1,
        this.boardHeight,
        this.boardWidth
      );
      const material = new THREE.MeshLambertMaterial({ map: texture });
      for (let i = 0; i < this.boardSS.length; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;

        this.board.push(mesh);
        this.scene.add(this.board[i]);
      }
    },
    tick() {
      this.world.step(); // 物理エンジンの時間を進める

      // boardに物理演算を適用
      for (let i = 0; i < this.physics.length && i < this.board.length; i++) {
        this.board[i].position.copy(this.physics[i].getPosition());
        this.board[i].quaternion.copy(this.physics[i].getQuaternion());
      }

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

