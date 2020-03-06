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
      v-touch:swipe="swipe(index)"
      @mousedown="touchstart"
      @mousemove="touchmove"
      @mouseup="touchend"
      @mouseleave="touchend"
      data-canmove="true"
    >
      <img :src="image">
    </div>
  </div>
</template>

<script>
const ss = [
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg"
  // "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  // "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg"
];

// swipe-translate
const translateX = (prevTransform, x) => {
  const style = prevTransform.replace(
    /translate3d\(.+?,/,
    `translate3d(${x}px,`
  );
  return style;
};

const getMaxZIndex = () => {
  const cards = document.querySelectorAll(".card");
  const zIndex = [];
  cards.forEach(card => {
    const crZIndex = card.style.zIndex;
    if (crZIndex !== "initial") {
      zIndex.push(crZIndex);
    }
  });
  return Math.max(...zIndex);
};

export default {
  data() {
    return {
      cards: ss,
      cardStyle: [],
      isDragging: false,
      prevPosXX: 0,
      currentPosX: 0
    };
  },
  methods: {
    swipe(index) {
      return (direction, e) => {
        if (direction === "left" || direction === "right") {
          const style = e.target.style;
          style.transform = translateX(style.transform, this.currentPosX);
          e.target.dataset.canmove = false;
          if (index === 0) this.resetCardPosition();
        }
        if (direction === "right") {
        }
      };
    },
    // the cards position are reset when last card is flicked.
    resetCardPosition() {
      const cards = document.querySelectorAll(".card");
      const cardsWidth = document.querySelector("#cards").clientWidth / 2 - 100;
      console.log(cardsWidth);
      const scatter = async () => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log("sca");

            this.cardStyle = [];

            for (let i = 0; i < cards.length; i++) {
              const rot = -10 + Math.random() * 20;
              let sign = Math.floor(Math.random() * Math.floor(2));
              sign = sign === 0 ? -1 : sign;
              const trans = `translate3d(${-cardsWidth + 30 * i}px, ${20 *
                i}px, 0) perspective(1500px)
               rotateX(30deg) rotateY(${rot /
                 10}deg) rotateZ(${rot}deg) scale(1)`;

              const styleObj = {
                transform: trans,
                transition: `transform 2s ease-in-out ${0.4 * i}s`
              };
              this.cardStyle.push(styleObj);
            }
            resolve();
          }, 600);
        });
      };
      scatter().then(() => {
        setTimeout(() => {
          this.cardStyle = [];
          for (let i = 0; i < cards.length; i++) {
            const rot = -10 + Math.random() * 20;

            const trans = `translate3d(0, ${-4 * i}px, 0) perspective(1500px)
                           rotateX(30deg) rotateY(${rot /
                             10}deg) rotateZ(${rot}deg) scale(1)`;

            const styleObj = {
              transform: trans,
              transition: `transform 1s ease-in-out ${0.2 * i}s`
            };
            this.cardStyle.push(styleObj);
            cards[i].style.zIndex = "initial";
            cards[i].dataset.canmove = true;
          }
        }, 3000);
      });
    },
    touchstart: function(e) {
      if (e.target.dataset.canmove === "false") return;

      this.isDragging = true;
      this.prevPosX = e.clientX;
      const prevTransform = e.target.style.transform;

      e.target.style.transform = prevTransform.replace(
        /rotateY.*scale\(.+\)/,
        "rotateY(0) rotateZ(0) scale(1.1)"
      );
      e.target.style.zIndex = getMaxZIndex() + 1;
    },
    touchmove: function(e) {
      // 押下中だったら
      if (this.isDragging) {
        // 前回座標との差分を算出
        this.currentPosX = e.clientX - this.prevPosX;

        const style = e.target.style;
        style.transform = translateX(style.transform, this.currentPosX);

        e.target.style.transition = `transform 0s`;
      }
    },
    touchend: function(e) {
      if (this.isDragging) {
        const style = e.target.style;
        style.transform = translateX(style.transform, 0);

        let changeTransform = style.transform;
        changeTransform = changeTransform.replace(/scale\(.+\)/, `scale(1)`); // scaleの置換

        e.target.style.transform = changeTransform;
        e.target.style.transition = `transform 1s`;

        this.isDragging = false;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      for (let i = 0; i < cards.length; i++) {
        const rot = -10 + Math.random() * 20;

        const trans = `translate3d(0, ${-4 * i}px, 0) perspective(1500px)
          rotateX(30deg) rotateY(${rot / 10}deg) rotateZ(${rot}deg) scale(1)`;

        const styleObj = {
          transform: trans,
          transition: `transform 1s ease-in-out ${0.2 * i}s`
        };

        this.cardStyle.push(styleObj);
      }
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
    transform: rotateY(0) rotateZ(0);
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
