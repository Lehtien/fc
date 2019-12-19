<template>
  <canvas id="thrCanvas"></canvas>
</template>

<script>
import * as THREE from "three";
export default {
  data() {
    const scene = new THREE.Scene();
    const renderer = null;
    //const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    const light = new THREE.DirectionalLight(0xffffff);
    const geometry = new THREE.TorusBufferGeometry(25, 8, 10, 15);
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(0, 0, 0)", //0x008866,
      wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    const size = 0;
    const blue = 0;
    const flg = true;
    return {
      scene,
      renderer,
      camera,
      light,
      geometry,
      material,
      mesh,
      size,
      blue,
      flg
    };
  },
  mounted() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#thrCanvas"),
      alpha: true
    });
    this.size = window.innerWidth;

    //this.mesh.position.set(0, -10, 0);

    this.renderer.setSize(this.size, this.size);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.camera.position.set(0, 0, 100);

    this.light.position.set(0, 0, 10);
    this.scene.add(this.mesh);
    this.scene.add(this.light);

    this.animate();
    // resize
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);

      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.005;

      // color change
      if (this.flg) {
        this.material.color.setStyle(
          `rgb(${Math.floor(this.blue++ / 10)}, ${Math.floor(
            this.blue++ / 10
          )}, ${Math.floor(this.blue++ / 10)})`
        );
        if (this.blue > 2000) this.flg = false;
      } else {
        this.material.color.setStyle(
          `rgb(${Math.floor(this.blue-- / 10)}, ${Math.floor(
            this.blue-- / 10
          )}, ${Math.floor(this.blue-- / 10)})`
        );
        if (this.blue < 1000) this.flg = true;
      }

      this.renderer.render(this.scene, this.camera);
    },
    handleResize() {
      this.size = window.innerWidth;
      this.renderer.setSize(this.size, this.size);
    }
  }
};
</script>

<style lang="scss" scoped>
#thrCanvas {
  position: fixed;
  bottom: 0;
  left: 0;

  pointer-events: none;
  z-index: -1;
  //opacity: 0.5;
  //animation: opcty 15s infinite ease;
}

@keyframes opcty {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.1;
  }
}
</style>

