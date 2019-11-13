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
// let canvas = document.getElementById('square');
// if (canvas.getContext){
//   var ctx = canvas.getContext('2d');
//   // drawing code here
// }

export default {
  //props: ["position"],
  props: {
    position: String,
    imgsrc: String
  },
  data() {
    return {
      isVisible: true,
      finished: true
      //showContent: false,
      //imgUri: null
      //canvas: null,
      // ctx: null
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      //console.log(this.imgsrc);
      this.isVisible = isVisible;
      if (!this.isVisible) {
        //this.isVisible = isVisible;
      }
    },
    openModal(event) {
      //this.showContent = true;
      //this.imgUri = event.target.src;
      this.$parent.showContent = true;
      //console.log(this.$parent.showContent);
      this.$parent.imgUri = event.target.src;
      //console.log(this.$parent.imgUri);
      //console.log(this.imgUri);
      //this.$Members.showContent = true;
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
      const transition = this.$el.querySelector(".img.active"); //document.querySelector(".img");
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
  // directives: {
  //   scroll: {
  //     inserted: function(el, binding) {
  //       let f = function(evt) {
  //         if (binding.value(evt, el)) {
  //           window.removeEventListener("scroll", f);
  //         }
  //       };
  //       window.addEventListener("scroll", f);
  //     }
  //   }
  // },
  // methods: {
  //   handleScroll: function(evt, el) {
  //     console.log(this.offset());
  //     if (window.scrollY > this.offset().top) {
  //       el.setAttribute(
  //         "style",
  //         "opacity: 1; transform: translate3d(0, -10px, 0)"
  //       );
  //     }
  //     return window.scrollY > 100;
  //   }
  // },
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
.imgblock.L {
  overflow: hidden;
  position: relative;
  /* position: absolute; */
  /* left: 10px; */
  min-height: 300px;

  #square {
    background: #666;
    width: 50%;
    height: 300px;
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
    height: 300px;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%; //height: 500px;
    transform: translateX(-150%);
    opacity: 0;
    cursor: none;
  }
  .img.active {
    transform: translateX(10px);
    transition: transform 2s, opacity 2s, box-shadow 1s;
    opacity: 1;
  }

  .img.active.finish:hover {
    box-shadow: 6px 3px 3px rgba(255, 255, 255, 1);
    transform: translateY(-10px);
    transition: transform 1s, box-shadow 1s;
  }

  .chrName {
    position: absolute;
    left: 45%;
    bottom: 20%;
    transform: translateY(-20px);
    opacity: 0;
    color: beige;
  }
  .chrName.active {
    transform: rotate3d(1, 1, 0, 30deg);
    transition: transform 2s, opacity 3s;
    transition-delay: 1s;
    opacity: 1;
  }
}

.imgblock.R {
  $pos: calc(100% - 10px);
  overflow: hidden;
  position: relative;
  min-height: 300px;
  /* position: absolute; */
  /* left: 10px; */
  #square {
    background: #666;
    width: 50%;
    height: 300px;
    /* transition: all 300ms 0s ease; */
    transform: translateX(200%);
    opacity: 0;
  }
  #square.active {
    transform: translateX($pos);
    transition: transform 1s, opacity 1s;
    opacity: 1;
  }
  .img {
    height: 300px;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%; //height: 500px;
    transform: translateX(250%);
    opacity: 0;
    cursor: none;
  }
  .img.active {
    transform: translateX($pos);
    transition: transform 2s, opacity 2s, box-shadow 1s;
    opacity: 1;
  }
  .img.active.finish:hover {
    box-shadow: 6px 3px 3px rgba(255, 255, 255, 1);
    //transform: translateX($pos);
    transform: translate(calc(#{$pos} - 10px), -10px);
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

