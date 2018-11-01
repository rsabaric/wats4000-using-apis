<template>
  <div class="rhyme-mine">
   <p)
    <router-link v-bind:to="{ name: 'RhymeMine' }">Rhyme Mine</router-link>
    &bull;
    <router-link v-bind:to="{ name: 'Rhymesaurus' }">Rhymesaures</router-link>
    &bull;
    <router-link v-bind:to="{ name: 'Dogs' }">Dogs</router-link>
   </p>
        <label for="petChooser">Pick a dog breed:</label>
    <select v-model="dogSelection">
      <option disabled value="">Please select one</option>
      <option v-for="(value, key) in posts.message" v-bind:value="key">{{ key }}</option>
    </select>
    <form v-on:submit.prevent="getDog">
      <p><button type="submit">Get Dog</button></p>
    </form>
    <p> {{ dogSelection }} </p>
    <ul v-if="errors.length>0" class="errors">
      <li v-for="error in errors">
      {{ error.message }}
      </li>
    </ul>
    <p> {{results.message[0]}} </p>
    <img src="https://www.w3schools.com/images/w3schools_green.jpg">
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'RhymeMine',
  data () {
    return {
      results: null,
      errors: [],
      phrase: '',
      rhyme: '',
      posts: null,
      dogSelection: null,
      dogUrl:''
    }
  },
methods: {

  getDog: function(){
    axios.get('https://dog.ceo/api/breed/'+this.dogSelection+'/images')
    .then(response => {
      this.results = response.data;
    })
    .catch(error => {
      this.errors.push(error);
    });
  }
},
created () {
    axios.get(`https://dog.ceo/api/breeds/list/all`)
    .then(response => {
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rhyme-mine {
  font-size: 1.4rem;
}

input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0,0,0,0.02);
  padding: 0.5rem;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1, h2 {
  font-weight: normal;
}

ul.results {
  list-style-type: none;
  padding: 0;
}

.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0,0,0,0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}

a {
  color: #42b983;
}
</style>
