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
      v-touch:swipe="swipe(this)"
      @mousedown="touchstart($event, index)"
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

const translateX = (target, x) => {
  const prevTransform = target;
  const transX = `translate3d(${x}px,`;

  target = prevTransform.replace(/translate3d\(.+?,/, transX);
  //console.log(target);
  return target;
};

export default {
  data() {
    return {
      gone: new Set(),
      cards: ss,
      cardStyle: [],
      isDragging: false,
      prevPos: {
        x: 0,
        y: 0
      },
      currentPosX: 0
    };
  },
  methods: {
    swipe(el) {
      return (direction, event) => {
        if (direction === "left") {
          console.log("left");
          // const prevTransform = el.event.target.style.transform
          // const transX = `translate3d(${this.currentPosX}px,`;
          // el.event.target.style.transform = prevTransform.replace(
          //   /translate3d\(.+?,/,
          //   transX
          // );
          //translateX(el.event.target.style.transform, this.currentPosX);
          const style = el.event.target.style;
          style.transform = translateX(style.transform, this.currentPosX);
        }
        if (direction === "right") {
          console.log(direction, el.event.target);
        }
      };
    },
    touchstart: function(e, index) {
      this.isDragging = true;
      this.prevPos.x = e.clientX;

      const prevTransform = e.target.style.transform;
      //.replace(/\)/g, "))")
      //.split(/\)\s/);
      e.target.style.transform = prevTransform.replace(
        /rotateY.*scale\(.+\)/,
        "rotateY(0) rotateZ(0) scale(1.1)"
      );
      e.target.style.zIndex = this.cardStyle.length - index;
      //prevTransform + ` rotateX(30deg) rotateY(0) rotateZ(0) scale(1.1)`;
      //e.target.style.scale = `0`;
    },
    touchmove: function(e) {
      // 押下中だったら
      //console.log(e.target.getBoundingClientRect().left);
      if (this.isDragging) {
        // 前回座標との差分を算出
        //const x = e.clientX - this.prevPos.x;
        this.currentPosX = e.clientX - this.prevPos.x;

        // const prevTransform = e.target.style.transform;
        // const transX = `translate3d(${this.currentPosX}px,`;

        // e.target.style.transform = prevTransform.replace(
        //   /translate3d\(.+?,/,
        //   transX
        // );
        const style = e.target.style;
        style.transform = translateX(style.transform, this.currentPosX);

        e.target.style.transition = `transform 0s`;
        // e.target.style.transform = `translate3d(${x}px, -4px, 0) perspective(1500px)
        //     rotateX(30deg) rotateY(0) rotateZ(0) scale(1.1)`;
      }
    },
    touchend: function(e) {
      if (this.isDragging) {
        const style = e.target.style;
        style.transform = translateX(style.transform, 0);
        //const prevTransform = e.target.style.transform;
        //let changeTransform = prevTransform.replace(/\(.+?,/, `(0px,`); // translate3d-xの置換
        let changeTransform = style.transform;
        changeTransform = changeTransform.replace(/scale\(.+\)/, `scale(1)`); // scaleの置換

        e.target.style.transform = changeTransform;
        e.target.style.transition = `transform 1s`;

        //e.target.style.zIndex = 0;

        this.isDragging = false;
        console.log(style.transform);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      for (let i = 1; i < 3; i++) {
        const rot = -10 + Math.random() * 20;

        const trans = `translate3d(0, ${-4 * i}px, 0) perspective(1500px)
          rotateX(30deg) rotateY(${rot / 10}deg) rotateZ(${rot}deg) scale(1)`;

        const styleObj = {
          transform: trans,
          transition: `transform 1s ease-in-out ${0.2 * i}s`
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
  max-width: 20vw;
  height: 85vh;
  max-height: 25vh;
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
