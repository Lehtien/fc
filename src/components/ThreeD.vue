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
    const camera = new THREE.PerspectiveCamera(45, 600 / 400, 1, 10000);
    const light = new THREE.DirectionalLight(0xffffff);
    const clock = new THREE.Clock();
    const world = new OIMO.World({
      timestep: 1 / 24,
      iterations: 8,
      broadphase: 2, // 1: brute force, 2: sweep & prune, 3: volume tree
      worldscale: 1,
      random: true,
      info: false,
      gravity: [0, -9.8, 0]
    });
    return {
      scene,
      renderer,
      camera,
      light,
      clock,
      world,
      physics: [],
      cube: [],
      board: ss
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
          size: [2, 30, 30],
          pos: [this.randomRange(-80, 80), 30, this.randomRange(-20, 20)],
          rot: [0, this.randomRange(0, 180), this.randomRange(45, 135)],
          move: true,
          density: 1,
          friction: 0.5,
          restitution: 0.2
        });
        this.physics.push(physics);
        if (this.physics.length >= this.board.length) clearInterval(intervalId);
      }, 1000);

      // this.physics[0] = this.world.add({
      //   type: "box",
      //   size: [1, 30, 30],
      //   pos: [0, 0, 0],
      //   rot: [0, -3, 20],
      //   move: true,
      //   density: 1,
      //   friction: 0.5,
      //   restitution: 0.2
      // });

      // this.physics[1] = this.world.add({
      //   type: "box",
      //   size: [1, 30, 30],
      //   pos: [0, 50, 0],
      //   rot: [0, 0, 45],
      //   move: true,
      //   density: 1,
      //   friction: 0.5,
      //   restitution: 0.2
      // });
      //this.world.postLoop = this.postLoop;
    },
    // postLoop() {
    //   var m;
    //   this.temp--;
    //   const b = this.physics[0];
    //   //this.physics.forEach(function(b, id) {
    //   if (this.temp !== 0) return;
    //   this.temp = 100;
    //   if (b.type === 1) {
    //     console.log(b.position || "none");
    //     //if (b.sleeping) switchMat(m, "sleep");
    //     //else switchMat(m, "move");
    //     // if (m.position.y < -30) {
    //     //   b.resetPosition(Math.rand(-5, 5), 30, Math.rand(-5, 5));
    //     // }
    //   }
    //   //});
    // },

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

      const radian = (90 * Math.PI) / 180;
      this.camera.position.y = 10 * Math.sin(radian);
      this.camera.position.z = 100 * Math.cos(radian);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //this.camera.rotation.x = Math.PI;

      this.light.position.set(0, 0, 1);
      this.createGround();
      this.createBoard();
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
    // 床の生成
    createGround() {
      const groundGeo = new THREE.PlaneGeometry(300, 200);
      const groundMat = new THREE.MeshBasicMaterial({ color: 0x6699ff });
      const groundMesh = new THREE.Mesh(groundGeo, groundMat);
      groundMesh.position.y = -200;
      //groundMesh.rotation.y = Math.PI / 4;
      groundMesh.rotation.x = -Math.PI / 2;
      this.scene.add(groundMesh);
    },
    createBoard() {
      var loader = new THREE.TextureLoader();
      const texture = loader.load("./images/smpl1.jpg");
      const geometry = new THREE.BoxGeometry(1, 30, 30);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      // this.cube[0] = new THREE.Mesh(geometry, material);
      // this.scene.add(this.cube[0]);
      // this.cube[1] = new THREE.Mesh(geometry, material);
      // this.scene.add(this.cube[1]);
      // this.cube[2] = new THREE.Mesh(geometry, material);
      // this.scene.add(this.cube[2]);
      for (let i = 0; i < this.board.length; i++) {
        this.cube.push(new THREE.Mesh(geometry, material));
        this.scene.add(this.cube[i]);
      }
      var axes = new THREE.AxisHelper(100);
      this.scene.add(axes);
    },
    tick() {
      this.world.step(); // 物理エンジンの時間を進める
      // this.timeElapsed += this.clock.getDelta();
      // if (this.timeElapsed > 5.0) {
      //   this.timeElapsed = 0.0;
      // }
      //console.log(this.timeElapsed);
      // this.cube[0].position.copy(this.physics[0].getPosition());
      // this.cube[0].quaternion.copy(this.physics[0].getQuaternion());
      // this.cube[1].position.copy(this.physics[1].getPosition());
      // this.cube[1].quaternion.copy(this.physics[1].getQuaternion());
      for (let i = 0; i < this.physics.length && i < this.cube.length; i++) {
        this.cube[i].position.copy(this.physics[i].getPosition());
        this.cube[i].quaternion.copy(this.physics[i].getQuaternion());
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

