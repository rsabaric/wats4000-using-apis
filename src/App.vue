<template>
  <div id="app">
    <h1>Rhymesaurus: The Rhyming Thesaurus</h1>
    <h2> and also </h2>
    <h1>The Dog Photo Finder!</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
