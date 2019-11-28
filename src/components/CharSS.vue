<template>
  <div id="charimg" :class="[{active:isVisible}, position ? 'T' : 'F']">
    <!-- <img :src="chrss[0]" class="img1">
    <img src="images/smpl1.jpg" class="img2">
    <img src="images/smpl1.jpg" class="img3">
    <img src="images/smpl1.jpg" class="img4">-->
    <img v-for="(image, index) in chrss" :src="image" :key="index" :class="'img' + index">
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    position: String,
    chrss: Array
  },
  mounted() {
    //console.log(this.chrss);
  }
};
</script>


<style lang="scss" scoped>
@mixin imgstyle($flg) {
  position: absolute;
  top: 5%;

  @if ($flg == l) {
    left: 5%;
  } @else if($flg == r) {
    right: 25%;
  }
  transform-style: preserve-3d;
  perspective: 800px;
  perspective-origin: top;
  width: 20vw;
  opacity: 0;

  img {
    position: absolute;
    width: 100%;
    border: solid;

    @if ($flg == l) {
      transform: rotate3d(-0.5, 1, 0, 30deg);
    } @else if($flg == r) {
      transform: rotate3d(-0.5, -1, 0, 30deg);
    }
    transition: transform 1s;
    will-change: transform;
  }

  .img0 {
    top: 0;
    left: 0;

    &:hover {
      transform: translate3d(7vw, 3vw, 300px);
    }
  }
  .img1 {
    top: 0;
    left: 20vw;

    &:hover {
      transform: translate3d(-13vw, 3vw, 300px);
    }
  }
  .img2 {
    top: 18vw;
    left: 0;

    &:hover {
      transform: translate3d(7vw, -15vw, 300px);
    }
  }
  .img3 {
    top: 18vw;
    left: 20vw;

    &:hover {
      transform: translate3d(-13vw, -15vw, 300px);
    }
  }
}

// T is right position
// F is left position
#charimg.T {
  @include imgstyle(r);
}
#charimg.F {
  @include imgstyle(l);
}
#charimg.active {
  opacity: 1;
  transition: opacity 1.5s;
  transition-delay: 2.5s;
}
</style>

