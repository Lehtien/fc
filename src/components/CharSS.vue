<template>
  <div id="charimg">
    <div class="imgs">
      <img src="images/smpl1.jpg" class="img1">
      <img src="images/smpl1.jpg" class="img2">
      <!-- <img src="images/smpl1.jpg" class="img3">
      <img src="images/smpl1.jpg" class="img4">-->
      <!-- <input
      type="image"
      class="img1"
      :class="{active:isVisible, finish:finished}"
      @click="openModal"
      :src="imgsrc1"
      alt="NoImage"
    >
    <input
      type="image"
      class="img1"
      :class="{active:isVisible, finish:finished}"
      @click="openModal"
      :src="imgsrc1"
      alt="NoImage"
      >-->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
    }
  }
};
</script>


<style lang="scss" scoped>
@mixin imgstyle($flg) {
  position: absolute;
  top: 0;
  //display: grid;
  //grid-template-columns: 1fr 1fr;
  @if ($flg == l) {
    left: 10vw;
  } @else if($flg == r) {
    right: 0;
  }
  //transform-style: preserve-3d;
  perspective: 1000px;
  perspective-origin: top;
  width: 50vw;

  .imgs {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  img {
    width: 100%;
    //margin: 3% -7%;
    border: solid;

    @if ($flg == l) {
      transform: translateZ(20vw) rotate3d(-0.5, 1, 0, 30deg);
    } @else if($flg == r) {
      transform: translateZ(20vw) rotate3d(-0.5, -1, 0, 30deg);
    }
    transition: transform 1s;
  }

  .img1 {
    grid-column: 1 / 2;
  }
  .img2 {
    grid-column: 2 / 3;
  }
  img:hover {
    box-shadow: 6px 3px 3px rgba(255, 255, 255, 1);
    //transform: translate3d(3vw, -1vw, 100px);
    position: absolute;
    top: -10vw;
    left: 0;
    transform: translateZ(0px);
    transition: transform 1s, box-shadow 0.5s;
    z-index: 1;
  }
}

#charimg {
  @include imgstyle(r);
}
</style>

