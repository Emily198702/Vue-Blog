<template>
  <div>
    
    <ul class="collection-title">
      <li v-for="year in collections" v-bind:key="year.id" @click="showList(year.id)"> 
        <span>&nbsp;&nbsp;&nbsp;</span>
        {{ year.yearText }}
          <ul v-if="year.id==visibleId">
            <li v-for="ye in year.yearEvents" class="archive-post" v-bind:key="ye.id">
                <span class="archive-post-time" >{{ye.eventDate}}</span> 
                <a class="archive-post-title" v-on:click="showContent(ye.id)">{{ye.eventText}}</a> 
            </li>
          </ul>
      </li>
    </ul>
    <nav class="pagination">
      <a class="next" href="https://huangyijie.com/page/2/">
        <span class="next-text">Next</span>
        <i class="iconfont icon-right"></i>
      </a>
    
    </nav>

   
    
  
  </div>
</template>




<script>

 
 

export default {
  name: 'HelloWorld',
  components:{
   },
  props:{  
  },
  beforeCreate(){
    //console.log(this.menu)
  },
  created(){
    //console.log(this.menu)
  },
  methods:{
    showList(id){
      //console.log(id)
      this.visibleId = id
    },
    showContent(id){
      //console.log("打印跳转路径："+"/detail/"+id)
      this.$router.push("/detail/"+id)

    }
  },
  mounted(){
     var {getData} = require('../blogData.js')
     //console.log(getData())
     this.collections = getData().collections 
     //setData()
  },
  data(){ 
    return {
      
      collections:[],
      visibleId:null,  
      
      
    }
     
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#masthead {
    z-index: 9;
    top: 0;
    right: 0;
    left: 0;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
}

 a {
  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
}

a:-webkit-any-link {
    cursor: pointer;
}
.nav-top {
    float: right;
    margin: 0 auto;
}

.nav-top .menu-item {
    font-size: 16px;
    margin-left: 30px;
    display: inline-block;
}


.site-header-inner {
  height: 65px;
  line-height: 65px;
  max-width: 1000px;
  margin: 0 auto;
  width: 90%; 
  }

.site-title {
  text-align: left;
  display: inline-block;
  margin: 0 auto;
  font-weight: 400;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.7);
}


#content {
  margin: 0 auto;
  width: 90%;
  max-width: 1000px;
}


.collection-title {
  font-family: "Open Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "Microsoft Jhenghei", sans-serif;
  font-size: 29px;

}

.collection-title .archive-year {
  margin: 18px 0;
  font-weight: 400;
  font-size: 29px;
  line-height: 34px;
  list-style:none;
}

.archive-post {
  margin: 15px 0;
  list-style:none;
}

.archive-post:hover {
  transition: 0.2s ease-out;
  transform: translateX(4px); 
}
.archive-post:hover .archive-post-time {
  color: #4D89FB; 
}
.archive-post:hover .archive-post-title{
  color: #4D89FB; }

.archive-post .archive-post-time {
  float: left;
  overflow: hidden;
  color: #aaa;
  font-size: 14px;
  line-height: 25px;
  display: block;
}

 .archive-post .archive-post-title {
  margin-left: 85px;
  display: block;
  font-size: 16px;
  line-height: 25px;
}

.pagination {
  padding-bottom: 1.2em; 
}
.pagination:before, .pagination:after {
  content: " ";
  display: table; 
}
.pagination:after {
  clear: both;
}
.pagination .prev,
.pagination .next {
  font-weight: 400;
  font-size: 16px;
  font-family: "Open Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "Microsoft Jhenghei", sans-serif;
  transition-property: transform;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
}
.pagination .prev {
  float: left;
}
.pagination .prev:hover {
  color: #4D89FB;
  transform: translateX(-4px); 
}
.pagination .next {
  float: right;
}
.pagination .next:hover {
  color: #4D89FB;
  transform: translateX(4px); 
}
.footer {
  margin-top: 2em;
}

#colophon {
  width: 90%;
  margin: 30px auto 0;
  padding: 20px 0;
  border-top: 1px solid #e1e1e1;
  color: #aaa;
  font-size: 14px;
  max-width: 1000px;
  display: block;
  overflow: hidden; 
}
#colophon a {
  color: #aaa; 
}
#colophon .footer-author {
  margin: 0 4px; 
}


</style>
