
<template lang="html"> 
    <div class="blogEditor">
        <div class="div1"><label>标题：</label>
            <Input v-model="blog.title" clearable style="width: 500px" /></div>
        <div class="div1"> 
           <Input v-model="blog.content" type="textarea" :rows="10" placeholder="内容" clearable style="width: 800px" />

        </div>
        <div class="div1">
            <label>分类：</label>
            <Select v-model="blog.blogType" style="width:200px">
                <Option v-for="type in typeList" :value="type.code" :key="type.id"> {{ type.value }}</Option>
            </Select>
         </div>
      
        <div class="btn-div">
            <Button type="primary" @click="submitForm">发博文</Button>
        </div>
   </div>
</template>
 

<script>

import axios from 'axios'
import qs from 'qs' 
import { Message,Button } from 'iview';
import { type } from 'os';
 

 
export default {
 
    data(){ 
    return {
         blog:{
             title:"",
             content:"",
             blogType:"",

         },
         typeList:[],
         isEdit:false

        }
    },
    methods:{

        submitForm(){ 
            if(this.isEdit){
                console.log(this.blog)
                axios.post('http://localhost:8000/updateBlog',this.blog)
                .then(res=>{
                    console.log('res=>',res);
                    if(res.data == 1){
                        this.$Message.info('修改成功！');
                        this.$router.push("/manageList")
                    }            
                })
                
            }else{ 
                axios.post('http://localhost:8000/newBlog',this.blog)
                .then(res=>{
                    console.log('res=>',res);
                    if(res.data == 1){
                        this.$Message.info('保存成功！');
                        this.$router.push("/manageList")
                    }            
                })
            }

        },

        getType(){
            let _this = this 
            axios.get('http://localhost:8000/blogType')
            .then(function (response) { 
                _this.typeList = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
 
         },

        handleChange (html, text) {
            console.log(html, text)
        },

         
    },
    mounted(){
        console.log("new mounted")
        if(this.$route.params.id){
            this.isEdit = true
            let id = this.$route.params.id
            let _this = this
            axios.get('http://localhost:8000/blog?id='+id)
            .then(function (response) {  
                _this.blog = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        }
         
        this.getType()
        
    }
}
</script>


<style scoped> 

.blogEditor {
    margin:20px auto;
}

.blogEditor .div1{
    width: 910px;
    margin: 0 auto;
    padding: 2px 0; 
    overflow: hidden;
}

.btn-div{
    margin-top: 50px;
    text-align: center;
}



</style>

