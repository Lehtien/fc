<template>
  <section>
    <Character position="true" imgsrc="images/logo.png"/>
    <Character imgsrc="images/logo.png"/>
    <Character position="true" imgsrc="images/wallpaper.jpg"/>
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
      imgUri: ""
    };
  },
  methods: {
    isShow() {
      this.showContent = false;
    }
  }
};
</script>

