<template>
  <div id="whole">
    <Top/>
    <Members/>
    <!-- <SS/> -->
    <!-- <div class="cursor" id="cursor"></div> -->
    <!--<div class="follower"></div> -->
  </div>
</template>

<script>
//import HelloWorld from "./HelloWorld"
import Top from "./Top";
import Members from "./Members";
import SS from "./SS";

export default {
  //name: "App",
  components: {
    Top,
    Members,
    SS
  }
};

const cursor = document.createElement("div"); //divタグを作成
cursor.id = "cursor"; //IDを付与
document.body.appendChild(cursor); //bodyの最後に挿入

const stalker = document.createElement("div");
stalker.id = "stalker";
document.body.appendChild(stalker);

//const cursor = document.getElementById("cursor");
//console.log(document.getElementById("cursor"));

document.addEventListener("mousemove", function(e) {
  cursor.style.transform = `translate(${e.clientX}px,${
    e.clientY
  }px) rotate(-10deg)`;
  stalker.style.transform = `translate(${e.clientX}px,${
    e.clientY
  }px) rotate(30deg)`;
  //cursor.style.left = e.clientX + 'px';
  //console.log(e.clientX);
  //console.log(cursor.style.transform);
  //console.log(e.clientX);
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

  background: black;
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
</style>