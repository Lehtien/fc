<template>
  <section>
    <h3 :class="{txtmember:flg}" v-observe-visibility="visibilityChanged">MEMBERS</h3>
    <Character position="true" imgsrc="images/smpl1.jpg" charName="ABCDE" :chrss="chrss[0]"/>
    <Character imgsrc="images/smpl1.jpg" :chrss="chrss[0]"/>
    <!-- <Character position="true" imgsrc="images/smpl1.jpg" charName="ABCDE" :chrss="chrss[0]"/> -->
    <Modal :showContent="showContent" @isS="isShow" :imgUri="imgUri" :currentY="currentY"/>
  </section>
</template>

<script>
//import HelloWorld from "./HelloWorld";
import Character from "./Character";
import Modal from "./Modal";

export default {
  components: {
    Character,
    Modal
  },
  data() {
    return {
      showContent: false,
      imgUri: "",
      flg: false,
      currentY: 0,
      chrss: []
    };
  },
  methods: {
    isShow() {
      this.showContent = false;
    },
    visibilityChanged(isVisible, entry) {
      this.flg = isVisible;
    }
  },
  created() {
    const h = [
      "images/smpl1.jpg",
      "images/smpl1.jpg",
      "images/smpl1.jpg",
      "images/smpl1.jpg"
    ];
    this.chrss.push(h);
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 10vw;
  font-style: italic;
  text-decoration: underline;
  position: relative;
  left: 5vw;
  transform: rotate(-5deg);
  display: inline-block;
  opacity: 0;
  will-change: opacity;
}

h3.txtmember {
  opacity: 1;
  transition: opacity 0.5s;
}
</style>


