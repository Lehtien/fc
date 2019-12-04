<template>
  <div v-observe-visibility="visibilityChanged" v-lazy-container="{ selector: 'input' }">
    <h3 :class="{activeSS:isVisible}">ScreenShots</h3>
    <div class="loop_ss" :class="{activeSS:isVisible}">
      <div class="ss">
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/wallpaper.jpg"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/a1.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
      </div>
      <div class="ss">
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/wallpaper.jpg"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
      </div>
    </div>
    <div class="loop_ss_rev" :class="{activeSS:isVisible}">
      <div class="ss">
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
      </div>
      <div class="ss">
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
        <input
          type="image"
          class="ss_img"
          @click="openModal"
          data-src="images/logo.png"
          alt="NoImage"
        >
      </div>
    </div>
    <Modal :showContent="showContent" @isS="isShow" :imgUri="imgUri" :currentY="currentY"/>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      showContent: false,
      imgUri: "",
      isVisible: false,
      currentY: 0
    };
  },
  methods: {
    isShow() {
      this.showContent = false;
    },
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
    },
    openModal(event) {
      // const ss = document.querySelector(".loop_ss > .ss");
      // ss.style = "animation-play-state: paused";
      //this.showContent = true;
      //this.imgUri = event.target.src;
      this.showContent = true;
      //console.log(this.$parent.showContent);
      this.imgUri = event.target.src;

      this.currentY = window.pageYOffset;
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = `-${this.currentY}px`;

      //console.log(this.$parent.imgUri);
      //console.log(this.imgUri);
      //this.$Members.showContent = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.loop_ss {
  position: relative;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  opacity: 0;
  .ss {
    animation: infinity-loop 30s infinite linear 1s both;
  }
  overflow: hidden;
}
.loop_ss_rev {
  position: relative;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  opacity: 0;
  .ss {
    animation: infinity-loop 30s infinite reverse linear 1s both;
  }
  overflow: hidden;
}

// common
.activeSS {
  //transform: translateX(10px);
  transition: opacity 1.5s;
  opacity: 1;
}
.ss_img {
  align-self: center;
  width: 30vw;
  cursor: none;
  transition: transform 1s, box-shadow 1s;
}
.ss_img:hover {
  box-shadow: 3px 1px 3px rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  transition: transform 1s, box-shadow 1s;
}
.ss {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}
@keyframes infinity-loop {
  from {
    transform: translateX(0vw);
  }
  to {
    transform: translateX(-100%);
  }
}

// text
h3 {
  font-size: 10vw;
  font-style: italic;
  text-decoration: underline;
  position: relative;
  left: 5vw;
  transform: rotate(-5deg);
  display: inline-block;
  opacity: 0;
  will-change: opacity;
}
h3.activeSS {
  opacity: 1;
  transition: opacity 0.5s;
}
</style>

