<template>
  <section>
    <h3 :class="{txtmember:flg}" v-observe-visibility="visibilityChanged">MEMBERS</h3>
    <Character position="true" imgsrc="images/smpl1.jpg"/>
    <Character imgsrc="images/smpl1.jpg"/>
    <Character position="true" imgsrc="images/smpl1.jpg"/>
    <Modal :showContent="showContent" @isS="isShow" :imgUri="imgUri"/>
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
      flg: false
    };
  },
  methods: {
    isShow() {
      this.showContent = false;
    },
    visibilityChanged(isVisible, entry) {
      this.flg = isVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-style: italic;
  text-decoration: underline;
  position: relative;
  left: 20px;
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


