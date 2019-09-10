<template>

    <header class="bloghead" > 
      
        <div class="blogtoparea">
          <h1>{{count}}{{msg}}</h1>
          <a  @click="gotoManage" class="logo">{{msg}}</a>
        </div>
       
        
        
        <div class="blognav">
          <span><a @click="gotoMain"> 首页 </a></span>|
          <span><a @click="gotoManage"> 目录 </a></span>|
          <span><a @click="gotoNew"> 发博文 </a></span>
        </div>
       
    </header>
</template>

<script>

import { setInterval } from 'timers'


export default {
 props:{
    msg:String
  },
  data(){ 
    return { 
      test:"测试测试，测试！" ,
      intervalId:null,
      count:0,
      menu:  [
        { 
          id:1,
          text: 'Gallery'
        } ,
        { 
          id:2,
          text: 'About' 
        }   
      ]

    }
  },

  methods:{
    doSth(){
      this.intervalId = setInterval(()=>{
        var start = this.test.substring(0,1)
        var end = this.test.substring(1)
        this.test = end + start
      },400)
    },
    gotoManage(){
      this.$router.push("/manageList")
    },

    gotoNew(){
      this.$router.push("/newBlog")
    },

    gotoMain(){
      this.$router.push("/index")
    }

    

  },

  mounted(){
    this.doSth()
    this.count = this.$store.state.count
  }
  
    
}
</script>

<style scoped>
.bloghead {
    height: 290px;
    width: 950px; 
    clear: both;
    margin: 0 auto;
    position: relative;
    z-index: 100;
}
.blogtoparea {
  position: absolute;
  left: 320px;
  top: 120px;
}

.bloghead .blognav {
    position: absolute;
    left: 320px;
    top: 250px;
    width: 250px;
    height: 38px;
    font-size: 14px;
}

.bloghead .blognav span{
  margin:  10px;
}

</style>




