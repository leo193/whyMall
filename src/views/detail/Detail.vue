<template>
  <div id="detail">
     <detail-nav-bar/>
     <scroll class="content" ref="scroll" :probe-type="3"
      :pull-up-load="true"
      @pullingUp="LoadMore">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>  
      <detail-paramInfo :paramInfo="paramInfo"/>
      <detail-pin :pin="pin"/>
      <goods-list :goods="showGoods"/>
     </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailPin from './childComps/DetailPin'

import GoodsList from "components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'

import { getHomeGoods } from "network/home";

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      pin:{},
      hotgoods: {
        pop: { page: 0, list: [] }
      },
      currentType: "pop",
    };
  },
  components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailPin,
     GoodsList,
     Scroll
  },
  created() {
     //保存传入的iid
     this.iid = this.$route.params.iid;
     //根据iid请求详情数据
     this.getDetail(this.iid);

     //求商品数据
    this.getHomeGoods("pop");

  },
  computed: {
    showGoods() {
      return this.hotgoods[this.currentType].list;
    }
  },
  methods: {
     getDetail(id){
        getDetail(id).then((res)=>{
           
           const data = res.result
           console.log(data)
           //获取顶部轮播
           this.topImages = data.itemInfo.topImages

           //获取商品信息
           this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

           //创建店铺信息对象
           this.shop = new Shop(data.shopInfo)

           //获取商品详细信息
           this.detailInfo = data.detailInfo

            //获取参数的信息
           this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

           //获取用户评价
           this.pin = data.rate
        })
     },
     imgLoad(){
         this.$refs.scroll.refresh();
     },
     getHomeGoods(type) {
      const page = this.hotgoods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.hotgoods[type].list.push(...res.data.list);
        this.hotgoods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    LoadMore() {
      this.getHomeGoods(this.currentType);
    }
  }
};
</script>

<style scoped>
#detail{
   height: 100vh;
   position: relative;
   background-color:#fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
}
</style>