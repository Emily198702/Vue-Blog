<template>
    
    <div class="blogbody">
      
        <div class="column1">
            <div >
                <div class="connHead">
                    <span>个人资料</span>
                    <span>[管理]</span>
                </div>
                <div class="connBody">
                    <div class="info_img">
                        <img v-bind:src="url" width="180" height="180" alt="点击上传头像"/>
                    </div>
                    <div class="info_txt">
                        <span>果果妈</span>
                    </div>
                    
                </div>
            </div>



            <div style="margin-top:10px">
                <div class="connHead">
                    <span>博文</span>
                    <span>[管理]</span>
                </div>
                <div class="connBody">
                    <ul>
                        <li>
                            <a class="" @click="selectByType('ALL')">全部博文</a> 
                        </li>

                        <li v-for="type in typeList"  v-bind:key="type.id">
                            <a class="" @click="selectByType(type.code)">{{type.value}}</a> 
                        </li>
                    
                    </ul>
                
                </div>
            </div>

        </div>
        <div class="column2 ">
            <div class="connHead">
                <span>全部博文({{count}})</span> 
            </div>
            <div class="connBody" >

                <div class="bloglist" v-for="blog in dataShow" v-bind:key="blog.id">
                    <div class="blog_title_h">
                        <div class="blog_title">
                             <a v-on:click="showDetail(blog.id)">{{handleSlice(blog.title)}}</a>
                        </div>
                        
                        <span>({{handleDate(blog.createDate)}})</span>
                        <a class="blog-edit" v-on:click="edit(blog.id)">[编辑]</a> 
                        <a class="blog-edit" v-on:click="del(blog.id)">[删除]</a>    
                    </div>
                    <div class="articleTag">
                        分类：{{handleType(blog.blogType)}}
                    </div>
                    <div class="content">
                        {{blog.content}}
                    </div>
                    <div class="tagMore">
                        <div>
                            <a @click="showDetail(blog.id)">阅读</a>(99) ┆ 
                            <a @click="showDetail(blog.id)">评论</a>(99) ┆ 
                            <a>转载</a>(99) ┆ 
                            <a>收藏</a>(99) </div>
                        <div>
                            <a @click="showDetail(blog.id)">查看全文>></a>
                        </div>
                                         
                    </div>
                    <div class="linedot"></div>
                </div>
                
                <div class="blogpage">
                    <Page :current="currentPage" :total="count" :page-size="pageSize" show-total 
                    @on-change="changePage" @on-page-size-change="sizeChange" show-sizer   />
                </div>
            </div>
            
        </div>

    </div>
</template>


<script>
import axios from 'axios'
import qs from 'qs'
import { Page,Input } from 'iview';

export default {
    data(){
        return {
            typeList:[],
            blogList:[],
            count:0,
            totalPage:[],
            pageSize:10, 
            dataShow:[],
            currentPage:1,
            searchStr:"",
            url:require("../images/img2.jpg")
        }
    },
    methods:{
         getType(){
            let _this = this
            //console.log("list")
            axios.get('http://localhost:8000/blogType')
            .then(function (response) {
                //console.log(response.data);          
                _this.typeList = response.data
            })
            .catch(function (error) {
                console.log(error);
            });
 
         },

         
        
         getList(code){
            
            let _this = this
            console.log("getList")
            if(!code){
                code = "ALL"
            }  
            axios.get('http://localhost:8000/blogs?code='+code)
            .then(function (response) {  
                _this.blogList = response.data;
                _this.count = _this.blogList.length
                
                if(_this.count<_this.pageSize){
                    _this.dataShow = _this.blogList
                }else{
                    _this.dataShow=_this.blogList.slice(0,_this.pageSize)
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        getListByTitle(code){
            
            let _this = this
            console.log("getListByTitle")
            if(!this.searchStr){
                return
            }  

            axios.get('http://localhost:8000/blogsByTitle?searchStr='+this.searchStr)
            .then(function (response) {  
                _this.blogList = response.data;
                _this.count = _this.blogList.length
                
                if(_this.count<_this.pageSize){
                    _this.dataShow = _this.blogList
                }else{
                    _this.dataShow=_this.blogList.slice(0,_this.pageSize)
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        
        changePage(index){
            console.log(this.pageSize)
            var _start = (index-1)*this.pageSize
            var _end = index * this.pageSize
            this.dataShow = this.blogList.slice(_start,_end)
        },

        sizeChange(index){
            this.pageSize = index
            this.changePage(1)
        },
        
         showDetail(id){
            this.$router.push("/detail/"+id)
        },

         
        edit(id){
             this.$router.push("/newBlog/"+id)
         },

        del(id){
            console.log(id)
            let data = {id : id}
            axios.post('http://localhost:8000/delBlog',qs.stringify(data))
            .then(res=>{
                console.log('res=>',res);
                if(res.data == 1){
                    this.$Message.info('删除成功！');
                    this.getList()
                }else{
                    this.$Message.info('删除失败！');
                }           
            })
         },

        selectByType(code) {
             this.getList(code)
        },

        getTypeValue(code){
           for(var i=0;i<this.typeList.length;i++){

                if(this.typeList[i].code == code) {
                    return this.typeList[i].value
                }
            }
     
        }
 

       
    },

    computed: {
    // 计算属性的 getter
    handleSlice() {
        return function(str) {

            if(str.length<20){
                return str
            }else{
                return str.slice(0,20)+'......'
            }        
        }
      },

    handleType() {
        return function(code) {

            return this.getTypeValue(code)    
        }
      },

      handleDate() {
        return function(date) {
            var {formatDate} = require('../util.js') 
            return formatDate(new Date(date))
               
        }
      }

    },

    mounted(){
        this.getList()
        this.getType()
        
    }

}
</script>


<style>

.bloglist {
    padding: 0 5px;
    clear: both;
    overflow: hidden;
    font-family: "宋体";
    zoom: 1;
}

.bloglist .blog_title_h {
    padding: 20px 0;
    clear: both;
}

.bloglist .blog_title {
    font-size: 18px;
    font-family: "微软雅黑","黑体";
    display: inline;
    font-weight: 300;
}

.articlTag{
    width: 100%;
    clear: both;
    word-break: break-all;
    line-height: 20px;
    font-size: 12px;
}

.bloglist .content {
    position: relative;
    font-size: 14px;
    clear: both;
    margin-bottom: 24px;
    padding-top: 20px;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100px;
}

.bloglist .tagMore {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
 }

.linedot {
    overflow: hidden;
    clear: both;
    border: 1px dotted #c8d9d1;
    margin-top:20px;
}


.info_img {
 
    width: 182px;
    height: 182px;
    text-align: center;
    margin: 0 auto;
}

.info_txt{
    padding-top: 10px;
    width: 182px;
    text-align: center;
    margin: 0 auto;
}
 
</style>

