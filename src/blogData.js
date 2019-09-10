const data = {
    collections:[
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
          {id:6,eventDate:'Aug 28',eventText:'i18next'},
          {id:7,eventDate:'Jul 7',eventText:'错误排查：非ROOT用户使用密钥进行ssh登录提示输入密码'},
          {id:8,eventDate:'Jun 22',eventText:'使用Github、Travis-CI和Coding.net自动部署博客［三］'},
          {id:9,eventDate:'Jun 21',eventText:'使用EditorConfig'}

        ]} ,
        { 
          id:3,
          yearText: '2016',
          visible:false,
        yearEvents:[
          {id:10,eventDate:'Oct 8',eventText:'JavaScript执行window.print()打印内容为空白'},
          {id:12,eventDate:'Oct 5',eventText:'使用Github、Travis-CI和Coding.net自动部署博客［二］'},
          {id:13,eventDate:'Oct 1',eventText:'寓食记'},
          {id:14,eventDate:'Apr 7',eventText:'WebJars使用示例'},
          {id:15,eventDate:'Apr 4',eventText:'Maven打jar包内容出错'}

        ]}   
      ]
}

function getData(){
    return data
}


function getDataById(id){
     
    for(var i=0;i<data.collections.length;i++){
        var blogs = data.collections[i].yearEvents

        for(var j=0;j<blogs.length;j++){

            if(blogs[j].id == id) {
                return blogs[j]
            }
        }
    
    }
    
}


module.exports = {getData,getDataById}