<template>
  <div id="app" class="blogb">
    <Header msg="果果妈的博客"></Header>
    <div id="content"><router-view></router-view></div>
    <Footer></Footer>
  </div>
</template>

<script>
 
import Footer from './components/footer'
import Header from './components/Header'
import axios from 'axios'

export default {
  name: 'app',
  components: { 
    Footer,
    Header
    //HelloWorld
  },
  data(){
    return {
      
    }
  },
  mounted(){
      
    this.$router.push("/blogList")
    
  },
  
  methods:{
    
  }
}
</script>

<style>

.bloga{
    background-image: none;
    background-repeat: no-repeat;
    background-position: center bottom;
    width: 100%;
    clear: both; 
}

#app {
  
  display: block;

}

.blogb{    
    background-image: url(images/blogb.jpg);
    background-color: #e2e2e2;
    background-repeat: no-repeat;
    background-position: center top;
    width: 100%;
    clear: both;
}

body {
    padding: 0;
    margin: 0;
    font-family: "Open Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "Microsoft Jhenghei", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.75);
    background: #fefefe;
    scroll-behavior: smooth;
    vertical-align: baseline;
}
</style>
