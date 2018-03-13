<template>
  <div id="app">
    <transition name="fold">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import flexable from '../flexible'
export default {
  name: 'App'
}
</script>

<style>
  @import './assets/base.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .fold-enter-active {
    animation-name: fold-in;
    animation-duration: .5s;
  }
  .fold-leave-active {
    animation-name: fold-out;
    animation-duration: .5s;
  }
  @keyframes fold-in {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    50% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>
