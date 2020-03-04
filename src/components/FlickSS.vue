<template>
  <div id="cards">
    <!-- <div v-for="(image, index) in cards" :key="index">
      <img :src="image">
    </div>-->
    <div
      class="card"
      v-for="(image, index) in cards"
      :key="index"
      :style="cardStyle[index]"
      v-touch:swipe="swipeHandler"
      @mousedown="touchstart"
      @mousemove="touchmove"
      @mouseup="touchend"
      @mouseleave="touchend"
    >
      <img :src="image">
    </div>
  </div>
</template>

<script>
const ss = [
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg"
  // "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg"
];
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

export default {
  data() {
    return {
      gone: new Set(),
      cards: ss,
      cardStyle: [],
      canDrag: false,
      prevPos: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    swipeHandler(direction) {
      console.log(direction); // May be left / right / top / bottom
    },
    touchstart: function(e) {
      this.canDrag = true;
      this.targetCard = e.target;

      console.log("touch start:x:%d,%d", e.offsetX, e.offsetY);
      console.log(e.target.offsetLeft);
      this.prevPos.x = e.offsetX;
      this.prevPos.y = e.offsetY;
    },
    touchmove: function(e) {
      // 押下中だったら
      //console.log(e.clientX);
      console.log(e.target.getBoundingClientRect().left);
      if (this.canDrag) {
        // 前回座標との差分を算出
        const x = e.clientX - 200;
        //console.log(`${e.offsetX} - ${this.prevPos.x} = ${x}`);
        //console.log(e.pageX);
        console.log(x);
        e.target.style.transform = `translate3d(${x}px, -4px, 0) perspective(1500px)
             rotateX(30deg) rotateY(0) rotateZ(0) scale(1)`;

        //e.target.style.transform = `translateX(${moved_x}px)`;
        // 全要素に差分を適用
        //for (let line of this.list_line) {
        //   line.x1 += moved_x;
        //   line.x2 += moved_x;
        //   line.y1 += moved_y;
        //   line.y2 += moved_y;
        // }

        // // 前回のクリック座標を更新
        //this.prevPos.x = e.offsetX;
        //this.prevPos.y = e.offsetY;
      }
    },
    touchend: function(e) {
      this.canDrag = false;
      console.log("touch end");
    }
  },
  mounted() {
    setTimeout(() => {
      for (let i = 1; i < 3; i++) {
        const rot = -10 + Math.random() * 20;

        const trans = `translate3d(0, ${-4 * i}px, 0) perspective(1500px) 
          rotateX(30deg) rotateY(${rot / 10}deg) rotateZ(${rot}deg) scale(1)`;

        const styleObj = {
          transform: trans
          //transition: `transform 1s ease-in-out ${0.2 * i}s`
        };

        this.cardStyle.push(styleObj);
      }
      //console.log(this.cardStyle);
    }, 0);

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.addEventListener("transitionend", function transEnd() {
        card.style.transitionDelay = "0s";
        this.removeEventListener("transitionend", transEnd);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
#cards {
  position: absolute;
  width: 100%;
  height: 100vh;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

#cards > .card {
  position: absolute;
  background-color: rgb(255, 255, 255);
  //background-size: auto 85%;
  background-repeat: no-repeat;
  //background-position: center center;
  width: 45vh;
  max-width: 300px;
  height: 85vh;
  max-height: 570px;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);

  align-items: center;
  display: flex;
  justify-content: center;
  user-select: none;

  transform: translate3d(0, -1000px, 0);
  /* &:active {
    transform: rotateY(0) rotateZ(0) !important;
    transition-delay: unset !important;
  } */
}

img {
  width: auto;
  height: auto;
  max-width: 80%;
  max-height: 80%;

  pointer-events: none;
}
</style>
