<template>
  <div
    class="imgblock"
    :class="[position ? 'L' : 'R']"
    v-observe-visibility="visibilityChanged"
    v-lazy-container="{ selector: 'input' }"
  >
    <canvas id="square" :class="{active:isVisible}"></canvas>
    <input
      type="image"
      class="img"
      :class="{active:isVisible, finish:finished}"
      @click="openModal"
      :data-src="imgsrc"
      alt="NoImage"
    >
    <article class="chrName" :class="{active:isVisible}">{{charName}}</article>
    <div v-if="drawable">
      <CharSS :isVisible="isVisible" :position="position" :chrss="chrss"/>
    </div>
  </div>
</template>

<script>
import CharSS from "./CharSS";
export default {
  components: {
    CharSS
  },
  props: {
    position: String,
    imgsrc: String,
    charName: String,
    chrss: Array
  },
  data() {
    return {
      isVisible: true,
      finished: true,
      drawable: false // CharSS描画可否
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      if (!this.isVisible) {
        //this.isVisible = isVisible;
      }
    },
    openModal(event) {
      this.$parent.showContent = true;
      this.$parent.imgUri = event.target.src;

      const currentScrollY = window.pageYOffset;
      this.$parent.currentY = currentScrollY;
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = `-${currentScrollY}px`;
    }
  },
  watch: {
    isVisible() {
      const self = this;
      //const visible = this.isVisible;
      //console.log(this.isVisible + "!");
      //this.finished = false;
      //console.log(this.finished + ": ??");
      //console.log(this.isVisible + ": is V");
      //this.finished = false;
      //if (this.isVisible) {
      const transition = this.$el.querySelector(".img.active");
      //console.log(transition + "is T if");
      //if (transition != null) {
      //console.log(visible + "!");
      if (transition != null) {
        //console.log(transition);
        self.finished = false;
        transition.addEventListener("transitionend", function fin(e) {
          //console.log("Transition ended");
          //e.stopPropagation();
          //this.finished = false;
          //if (e.propertyName === "boxshadow") {

          //e.stopImmediatePropagation();
          //}
          //e.stopPropagation();
          transition.removeEventListener("transitionend", fin);
          self.finished = true;
          //console.log(self.finished);
        });
      }
    }
  },
  mounted() {
    if (window.screen.width > 560) {
      this.drawable = true;
    }
    //this.canvas = document.getElementById("square");
    const canvas = document.getElementById("square");
    //this.ctx = this.canvas.getContext("2d");
    //const canvass = this.$refs.canvas.getContext('2d');
    if (canvas.getContext) {
      //const ctx = canvas.getContext("2d");
      //ctx.fillRect(20,40,50,100);
      // drawing code here
    } else {
      console.log("no");
    }
    // if (canvas.getContext){
    //   var ctx = canvas.getContext('2d');
    // }
  }
};
</script>

<style lang="scss" scoped>
$diff: -5px;

// Left
.imgblock.L {
  overflow: hidden;
  position: relative;
  height: 40vw;
  //margin-bottom: 10%;
  #square {
    background: #666;
    width: 60vw;
    //height: 300px;
    /* transition: all 300ms 0s ease; */
    transform: translateX(-100%);
    opacity: 0;
  }
  #square.active {
    transform: translateX(5vw);
    transition: transform 1s, opacity 1s;
    opacity: 1;
  }
  .img {
    height: auto;
    width: 60vw;
    position: absolute;
    left: 10px;
    top: 10px;
    transform: translateX(-150%);
    opacity: 0;
    cursor: none;
  }
  .img.active {
    transform: translateX(5vw);
    transition: transform 2s, opacity 3s, box-shadow 1s;
    opacity: 1;
  }

  .img.active.finish:hover {
    box-shadow: 6px 3px 3px rgba(255, 255, 255, 1);
    transform: translate(3vw, -1vw); //translate(calc(10px + #{$diff}), $diff);
    transition: transform 1s, box-shadow 0.5s;
  }

  .chrName {
    position: absolute;
    left: 55%;
    bottom: 20%;
    transform: translateY(-20px);
    opacity: 0;
    color: beige;
    font-size: 4vw;
    text-shadow: 5px 5px 1px #000000;
  }
  .chrName.active {
    transform: rotate3d(1, 1, 0, 30deg);
    transition: transform 2s, opacity 3s;
    transition-delay: 1s;
    opacity: 1;
  }
}

// Right
.imgblock.R {
  $pos: calc(100% - 10px);

  overflow: hidden;
  position: relative;
  height: 41vw;

  #square {
    background: #666;
    //width: 40%;

    //height: 300px;
    //max-width: 60%;
    position: absolute;
    right: -50px;
    width: 75vw;
    /* transition: all 300ms 0s ease; */
    //transform: translateX(200%);
    opacity: 0;
  }
  #square.active {
    //transform: translateX($pos);
    right: 3vw;
    transition: right 1s, opacity 1s;
    opacity: 1;
  }
  .img {
    height: auto;
    max-width: 60vw;
    position: absolute;
    top: 10px;
    right: -100%;
    /*left: 0;
    top: 0;
    */
    //transform: translateX(250%);
    opacity: 0;
    cursor: none;
  }
  .img.active {
    right: 5vw;
    //transform: translateX($pos);
    transition: right 2s, transform 2s, opacity 3s, box-shadow 1s;
    opacity: 1;
  }
  .img.active.finish:hover {
    box-shadow: 6px 3px 3px rgba(255, 255, 255, 1);
    //transform: translateX($pos);
    //transform: translate(calc(#{$pos} + #{$diff}), $diff);
    transform: translate(-5px, -5px);
    transition: transform 1s, box-shadow 1s;
  }
  .chrName {
    position: absolute;
    right: 45%;
    bottom: 20%;
    transform: translateY(-100px);
    opacity: 0;
    color: beige;
    text-shadow: 5px 5px 1px #000000;
  }
  .chrName.active {
    transform: rotate3d(1, 1, 0, 30deg);
    transition-delay: 3s;
    transition: transform 3s, opacity 3s;
    opacity: 1;
  }
}
</style>

