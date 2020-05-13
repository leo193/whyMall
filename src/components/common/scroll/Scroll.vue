<template>
  <div ref="wrapper" class="wrapper">
      <div class="content">
          <slot></slot>
      </div>     
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name:"Scroll",
  props: {
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
        scroll:null
    };
  },
  mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true, //控制div元素点击，button按钮默认就能点击
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      }) 
      //监听滚动位置
      this.scroll.on('scroll',(position)=>{
        this.$emit("scroll",position)
      })
      //监听上拉事件
      if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    //处理图片刷新BUG
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  }
};
</script>
<style scoped>

</style>