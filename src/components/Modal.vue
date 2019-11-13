<template>
  <!-- <div v-show="Show" v-on:from-child="closeModal">
    <div id="overlay" v-on:click="clickEvent">
      <div id="modal" v-on:click="stopEvent">
        <p>
          <img :src="imgUri" alt="NoImage">
        </p>
      </div>
    </div>
  </div>-->
  <transition name="fade">
    <div id="overlay" :class="{active:Show}" v-show="Show" @click="closeModal">
      <p @click.stop>
        <img :src="imgUri" alt="NoImage">
      </p>
    </div>
  </transition>
</template>

<script>
// import {
//   disableBodyScroll,
//   enableBodyScroll,
//   clearAllBodyScrollLocks
// } from "body-scroll-lock";
export default {
  props: {
    imgUri: String,
    showContent: Boolean
  },
  data() {
    return {
      isShow: false
      //isVisible: false
    };
  },
  methods: {
    closeModal: function() {
      //this.showContent = false;
      //this.isShow = false;
      this.$emit("isS");
    }
    // clickEvent: function() {
    //   this.$emit("from-child");
    // },
    // stopEvent: function() {
    //   event.stopPropagation();
    // }
  },
  computed: {
    Show() {
      //console.log(this.showContent);
      // const overlay = document.querySelector(".overlay");
      // if (this.showContent) {
      //   disableBodyScroll(overlay);
      // } else {
      //   enableBodyScroll(overlay);
      // }
      return this.showContent;
    }
  }
};
</script>

<style lang="scss" scoped>
#overlay {
  z-index: 1;
  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    //z-index: 2;
    border: 2px #ff0000 solid;
    width: 40vw;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* #overlay.active {
  animation: show 1s ease-in-out;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes show-rev {
  100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
} */
</style>


