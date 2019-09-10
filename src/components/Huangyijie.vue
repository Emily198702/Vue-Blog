<template>
  <div>
    <header id="masthead"> 
      <div class="site-header-inner">

        <h1 class="site-title">
            <a href="https://huangyijie.com/" class="logo">{{msg}}</a>
        </h1>

        <ul class="nav-top">
          <li v-for="item in menu" class="menu-item" v-bind:key="item.id">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </header>
    <div id="content">
      <ul class="collection-title">
        <List  v-for="item in collections" v-bind:visible ="visibleId == item.id"  
        v-bind:key="item.id" v-bind:year="item" v-on:click="whoShow"></List>
      </ul>
      <nav class="pagination">
        <a class="next" href="https://huangyijie.com/page/2/">
          <span class="next-text">Next</span>
          <i class="iconfont icon-right"></i>
        </a>
      
      </nav>

    </div>
    
   <Footer></Footer>
 
  </div>
</template>




<script>
import Footer from './footer'
import List from './List'
export default {
  name: 'HelloWorld',
  components:{
    Footer,
    List
  },
  props:{
    msg:String
  },
  beforeCreate(){
    console.log(this.menu)
  },
  created(){
    console.log(this.menu)
  },
  methods:{
    getData(){
      let _this =this
      const handler = ()=>{
      
         let res = [
        { id:1,
          yearText: '2019',
          visible:false,
          yearEvents:[
            {id:1,eventDate:'Jun 30',eventText:'Aloha 一个Hexo主题'},
            {id:2,eventDate:'Jun 24',eventText:'泰国之旅 [三]'},
            {id:3,eventDate:'Mar 31',eventText:'泰国之旅 [二]'},
            {id:4,eventDate:'Mar 18',eventText:'泰国之旅 [一]'},
            {id:5,eventDate:'Feb 24',eventText:'Nginx使用SSL证书配置https'}
          ]
        } ,
         { id:2,
           yearText: '2017',
           visible:false,
        yearEvents:[
          {id:1,eventDate:'Aug 28',eventText:'i18next'},
          {id:2,eventDate:'Jul 7',eventText:'错误排查：非ROOT用户使用密钥进行ssh登录提示输入密码'},
          {id:3,eventDate:'Jun 22',eventText:'使用Github、Travis-CI和Coding.net自动部署博客［三］'},
          {id:4,eventDate:'Jun 21',eventText:'使用EditorConfig'}

        ]} ,
        { 
          id:3,
          yearText: '2016',
          visible:false,
        yearEvents:[
          {id:1,eventDate:'Oct 8',eventText:'JavaScript执行window.print()打印内容为空白'},
          {id:2,eventDate:'Oct 5',eventText:'使用Github、Travis-CI和Coding.net自动部署博客［二］'},
          {id:3,eventDate:'Oct 1',eventText:'寓食记'},
          {id:4,eventDate:'Apr 7',eventText:'WebJars使用示例'},
          {id:5,eventDate:'Apr 4',eventText:'Maven打jar包内容出错'}

        ]}   
      ]
       this.collections = res
      }
      setTimeout( handler,50)
    },
    whoShow(id){
      console.log(id)
      this.visibleId =id
    }
  },
  mounted(){
    this.getData()
  },
  data(){ 
    return {
    
      visibleId:null, 
      menu:  [
        { 
          id:1,
          text: 'Gallery'
        } ,
        { 
          id:2,
          text: 'About' 
        } 
      ],
      collections:[]
      
    }
     
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
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
