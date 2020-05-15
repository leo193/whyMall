<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"  />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-pin :pin="pin" ref="pin" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailPin from "./childComps/DetailPin";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { itemImgListenerMiXin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  mixins: [itemImgListenerMiXin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      pin: {},
      recommends: [],
      themeTopYs: []
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

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  destoryed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    getDetail(id) {
      getDetail(id).then(res => {
        const data = res.result;
        //获取顶部轮播
        this.topImages = data.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        //创建店铺信息对象
        this.shop = new Shop(data.shopInfo);

        //获取商品详细信息
        this.detailInfo = data.detailInfo;

        //获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        //获取用户评价
        if (data.rate.cRate !== 0) {
          this.pin = data.rate.list[0];
        }

        this.$nextTick(()=>{
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.pin.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs)
         })
      });
    },
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    }
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  background-color: #fff;
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