<template>
    
    <div class="blogbody">
      
        <div class="column1">
            <div >
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

            <div style="margin-top:10px">
                <div class="connHead">
                    <span>搜博文</span>
                </div>
                <div class="connBody">
                     <Input v-model="searchStr" search placeholder="请输入内容" @on-search="getListByTitle" />
                </div>
            </div>

        </div>
        <div class="column2 ">
            <div class="connHead">
                <span>全部博文({{count}})</span> 
            </div>
            <div class="connBody">
                <ul>
                    <li v-for="blog in dataShow" class="blog-li" v-bind:key="blog.id">
                        
                        <div class="blog-title"><a class="" @click="showDetail(blog.id)">{{blog.title}}</a> </div>
                        <span> 
                            <a class="blog-edit" v-on:click="edit(blog.id)">编辑</a> 
                            |<a class="blog-edit" v-on:click="del(blog.id)">删除</a> 
                        </span>
                        
                    </li>
                </ul>

                
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
            searchStr:""
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

         newBlog(){
            this.$router.push("/newBlog")
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
        }

    },

    mounted(){
        this.getList()
        this.getType()
        
    }

}
</script>


<style>

.blogbody {
    width: 950px;
    clear: both;
    margin: 0 auto;
    z-index: 10; 
}

.column1{
    width: 210px;
    display: inline; 
    overflow: hidden;
    float: left;
 }


.column2{
    width: 700px;
    display: inline; 
    overflow: hidden;
    float: left;
    margin-left:10px
 }

.connHead{
    display: flex;
    justify-content:space-between;
    color:#767775;
    height: 24px;
    overflow: hidden;
    background-color:#f4f4f4;
    font-family: "宋体",sans-serif;
    font-size: 12px; 
    font-weight: 700;
    padding-left: 8px;
    padding-top: 3px;
}

a.blog-edit {
    font-family: "宋体";
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    zoom: 1;
    color: red;
}

 

.connBody{
    
    clear: both;
    padding: 10px 10px;
    zoom: 1;
    overflow: hidden;
    font-size: 14px;
    background-color: #fefefe;
    
}

ul{
    list-style-position: inside;
    list-style-type: disc;

}

 

.blog-li{
    display: flex;
    justify-content:space-between;
    padding: 4px;
    border-bottom: 1px dotted #c8d9d1;
}

.blog-title{
    width:70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.blogpage{
    margin-top: 10px;
    text-align: right;
}

 
</style>

