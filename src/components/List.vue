<template>
     <li @click="showList"> 
          <span>&nbsp;&nbsp;&nbsp;</span>
          {{ year.yearText }}
            <ul >
              <li v-for="ye in year.yearEvents" class="archive-post" v-bind:key="ye.id">
                 <span class="archive-post-time" >{{ye.eventDate}}</span> 
                 <a class="archive-post-title" href="https://huangyijie.com/">{{ye.eventText}}</a> 
              </li>
            </ul>
        </li>
</template>
<script>
export default {
    props:["year"],
    data(){
        return {
            visible:false
        }
    },
    methods:{
        showList(){
              this.visible =!this.visible
            // if(this.visible == true){
               // this.$emit('isShown',this.year.id)
               // console.log(this.year.id)
            // }
        }
    },
    mounted(){
      //  console.log(this.year)
    }
}
</script>
