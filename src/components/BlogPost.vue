<template>
    <div class="post">
        <h3 class="post-title">{{blogPost.title}}</h3>
      
        <div class="post-time">{{blogPost.createDate}}</div>

        <div class="post-content">  
            {{blogPost.content}}
        </div>
    </div>
</template>
<script>
import axios from 'axios'


export default {
    
    data(){ 
    return {
        blogPost:{}

        }
    },
    methods:{
         
    },
    mounted(){
        let id = this.$route.params.id

        if(id){  
            let _this = this
            axios.get('http://localhost:8000/blog?id='+id)
            .then(function (response) {  
                _this.blogPost = response.data;
                var {formatDate} = require('../util.js') 
                _this.blogPost.createDate = formatDate(new Date(_this.blogPost.createDate))
            })
            .catch(function (error) {
                console.log(error);
            });

        }
        
    }
}
</script>


<style scoped>
.post {
    max-width: 850px;
    margin: 0 auto;
    padding: 40px 0;
    max-width: 850px;
}

.post .post-title {
    margin: 0 0 10px;
    line-height: 1.4;
    font-size: 1.3em;
    font-weight: 400;
    font-family: "Open Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "Microsoft Jhenghei", sans-serif;
}
 
.post .post-time {
    color: #aaa;
    display: block;
    font-size: 14px;
    margin-bottom: 10px;
}

.post .post-content {
    margin-bottom: 40px;
}

</style>

