<template>
  <div id="whole">
    <!-- <div id="loading">
      <Loading/>
    </div>
    <div id="contents" class="waiting">
      <Top/>
      <Members/>
      <SS/>
    </div>-->
    <Top/>
    <a v-scroll-to="'#whole'" class="scroll-top" v-show="isTopBtn">Top Page</a>
    <div class="arrow"></div>
  </div>
</template>

<script>
import Loading from "./Loading";
import Top from "./Top";
import Members from "./Members";
import SS from "./SS";

export default {
  //name: "App",
  components: {
    Loading,
    Top,
    Members,
    SS
  },
  data() {
    return {
      scrollY: 0
    };
  },
  mounted() {
    // const loading = document.getElementById("loading");
    // const contents = document.getElementById("contents");
    // loading.style.display = "none";
    // contents.classList.remove("waiting");
    window.addEventListener("scroll", this.onScroll);
    this.onScroll();
  },
  computed: {
    isTopBtn() {
      //console.log(window.pageYOffset);
      console.log(window.scrollY);
      return window.pageYOffset > 200 ? true : false;
    }
  },
  methods: {
    // スクロール値の取得
    onScroll() {
      console.log("!");
      this.scrollY = window.pageYOffset;
    }
  }
};
// cursol, stalker
const cursor = document.createElement("div"); //divタグを作成
cursor.id = "cursor"; //IDを付与
document.body.appendChild(cursor); //bodyの最後に挿入

const stalker = document.createElement("div");
stalker.id = "stalker";
document.body.appendChild(stalker);

document.addEventListener("mousemove", function(e) {
  cursor.style.transform = `translate(${e.clientX}px,${
    e.clientY
  }px) rotate(-10deg)`;
  stalker.style.transform = `translate(${e.clientX}px,${
    e.clientY
  }px) rotate(30deg)`;
});
</script>

<style lang="scss">
html,
body {
  position: relative;
  cursor: none;
  margin: 0;
  overflow-x: hidden;
  height: 100%;

  background: rgb(0, 0, 0);

  animation: fadeIn 1s ease 0s 1 normal;
}

.waiting {
  display: none;
}

#cursor {
  transform: translate(0px, 0px);
  pointer-events: none;
  position: fixed;
  top: -4px; //座標調節（カーソル位置と円の中心を合わせる）
  left: -4px; //座標調節（カーソル位置と円の中心を合わせる）
  width: 20px; //カーソルの直径
  height: 20px; //カーソルの直径
  background: rgba(90, 86, 86, 0.75);
  //border-radius: 50%;
  z-index: 999;
  //transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
}

#stalker {
  pointer-events: none;
  position: fixed;
  top: -8px; //座標調節（カーソル位置と円の中心を合わせる）
  left: -8px; //座標調節（カーソル位置と円の中心を合わせる）
  width: 40px; //マウスストーカーの直径
  height: 40px; //マウスストーカーの直径
  background: rgba(0, 0, 0, 0);
  //border-radius: 50%;
  transform: translate(0, 0) rotate(30deg);
  transition: transform 0.2s; //ちょっと遅れてついてくるように
  transition-timing-function: ease-out;
  z-index: 999;

  border: solid 3px #000000;
}

// fade
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

// scroll arrow
.arrow {
  display: block;
  position: fixed;
  //top: 0;
  bottom: 15px;
  left: calc(50% - 16px);
  //left: 0;
  //right: 0;
  //margin: auto;
  width: 14px;
  height: 14px;
  border-top: 2px solid rgb(255, 255, 255);
  border-right: 2px solid rgb(255, 255, 255);
  //transform: rotate(135deg);
  //opacity: 0.5;
  animation: sdb 3s infinite;
}

@keyframes sdb {
  0% {
    transform: rotate(135deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: rotate(135deg) translate(7px, -7px);
    opacity: 0;
  }
}

// go to top
.scroll-top {
  font-size: 10px;
  color: white;
  position: fixed;
  top: 10px;
  right: 20px;
}
</style>