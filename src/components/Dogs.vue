<template>
  <div class="rhyme-mine">
   <p)
    <router-link v-bind:to="{ name: 'RhymeMine' }">Rhyme Mine</router-link>
    &bull;
    <router-link v-bind:to="{ name: 'Rhymesaurus' }">Rhymesaures</router-link>
    &bull;
    <router-link v-bind:to="{ name: 'Dogs' }">Dog Photo Finder</router-link>
   </p>
        <label for="petChooser">Pick a dog breed:</label>
    <select v-model="dogSelection" v-on:change="results=null">
      <option disabled value="">Please select one</option>
      <option v-for="(value, key) in posts.message" v-bind:value="key">{{ key }}</option>
    </select>
    <form v-if="dogSelection" v-on:submit.prevent="getDog">
      <p><button type="submit">Get a random {{dogSelection }} photo</button></p>
    </form>
    <ul v-if="errors.length>0" class="errors">
      <li v-for="error in errors">
      {{ error.message }}
      </li>
    </ul>
    <ul v-if="results" class="photobox">
      <p v-if="dogUrls">keep clicking for more random {{dogSelection}} photos</p>
      <img v-bind:src="dogPic" class="dogImg" v-on:click="getDog">
        <ul class = "likebar">
          <input v-on:keyup.enter="likelist.push({dog: dogSelection,link:dogPic, comment:dogComment}), dogComment=''" type="text" v-model="dogComment" placeholder="Add Optional Comment Here"></input>
          <button v-on:click="likelist.push({dog: dogSelection,link:dogPic, comment:dogComment}), dogComment=''"> Like Dog </button>
        </ul>
    </ul>
    <div class = "liked">
      <h3 v-if="likelist.length>0">My Favorite Dogs:</h3>
      <ul v-for="item in likelist" class="likeHistory">
        <li class="likeHistoryelement">
          <a v-bind:href="item.link" target="_blank"> {{item.dog}} </a>
          <span v-if="item.comment">"{{item.comment}}"</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Dogs',
  data () {
    return {
      results: null,
      errors: [],
      phrase: '',
      rhyme: '',
      posts: null,
      dogSelection: null,
      dogUrls:'',
      dogPic:'',
      photoIndex: 0,
      likelist:[],
      dogComment:''
    }
  },
methods: {

  getDog: function(){
    axios.get('https://dog.ceo/api/breed/'+this.dogSelection+'/images')
    .then(response => {
      this.results = response.data;
      this.dogUrls = response.data.message;
      this.photoIndex = Math.floor(Math.random()*this.dogUrls.length);
      this.dogPic = this.dogUrls[this.photoIndex];

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
.dogImg {
    max-width: 80%;
    height: auto;
    cursor: pointer;
}
.likeHistory {
  display: block;
}
.likeHistoryelement{
  display: inline-block;
}
.liked {
  border: 1px solid black;
  margin: 100px;
}
.likebar {
  float: bottom;
  padding: 10px;
}
.photobox{
  margin: 100px;
}
</style>
