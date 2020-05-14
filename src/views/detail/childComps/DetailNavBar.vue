<template>
  <div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" class="title-item" :class="{actived:index === currentIndex}" @click="titleClick(index)">
            {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
    };
  },
  components: {
    NavBar
  },
  methods: {
      titleClick(index){
          this.currentIndex = index
      },
      backClick(){
          this.$router.back()
      }
  }
};
</script>

<style scoped >
.title{
    display: flex;
}
.title-item{
    flex: 1;
    font-size: 14px;
}
.actived{
    color:var(--color-tint);
}
.back img{
    margin-top:12px;
}
</style>
