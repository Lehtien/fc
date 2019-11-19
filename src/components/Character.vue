<template>
  <div class="imgblock" :class="[position ? 'L' : 'R']" v-observe-visibility="visibilityChanged">
    <canvas id="square" :class="{active:isVisible}"></canvas>
    <input
      type="image"
      class="img"
      :class="{active:isVisible, finish:finished}"
      @click="openModal"
      :src="imgsrc"
      alt="NoImage"
    >
    <article class="chrName" :class="{active:isVisible}">ChrName</article>
    <!-- <h1 class="centered" v-observe-visibility="visibilityChanged" :class='{active:isVisible}'>Scroll me</h1> -->
    <!-- <div class="box" v-scroll="handleScroll"> -->
  </div>
</template>

<script>
export default {
  props: {
    position: String,
    imgsrc: String
  },
  data() {
    return {
      isVisible: true,
      finished: true
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
    transform: translateX(10px);
    transition: transform 1s, opacity 1s;
    opacity: 1;
  }
  .img {
    height: auto;
    max-width: 60vw;
    position: absolute;
    left: 10px;
    top: 10px;
    transform: translateX(-150%);
    opacity: 0;
    cursor: none;
  }
  .img.active {
    transform: translateX(10px);
    transition: transform 2s, opacity 3s, box-shadow 1s;
    opacity: 1;
  }

  .img.active.finish:hover {
    box-shadow: 6px 3px 3px rgba(255, 255, 255, 1);
    transform: translate(calc(10px + #{$diff}), $diff);
    transition: transform 1s, box-shadow 1s;
  }

  .chrName {
    position: absolute;
    left: 55%;
    bottom: 20%;
    transform: translateY(-20px);
    opacity: 0;
    color: beige;
    font-size: 4vw;
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
    right:-50px;
    width:75vw;
    /* transition: all 300ms 0s ease; */
    //transform: translateX(200%);
    opacity: 0;
  }
  #square.active {
    //transform: translateX($pos);
    right: 10px;
    transition: right 1s, opacity 1s;
    opacity: 1;
  }
  .img {
    height: auto;
    max-width: 60vw;
    position: absolute;
    top:10px;
    right: -100%;
    /*left: 0;
    top: 0;
    */
    //transform: translateX(250%);
    opacity: 0;
    cursor: none;
  }
  .img.active {

    right: 20px;
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
  }
  .chrName.active {
    transform: rotate3d(1, 1, 0, 30deg);
    transition-delay: 3s;
    transition: transform 3s, opacity 3s;
    opacity: 1;
  }
}
</style>

