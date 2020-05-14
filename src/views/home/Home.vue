<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      class="tab-control"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="LoadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import TabControl from "components/content/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  components: {
    TabControl,
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[0].list;
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();

    //求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  //运用此生命周期函数需要keep-alive包裹
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    //强制刷新一次，避免莫名切换，页面自动回滚到顶部
    this.$refs.scroll.refresh();
  },
  //运用此生命周期函数需要keep-alive包裹
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  mounted() {
    //图片加载完毕的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    //接收总线发送来的事件，重新刷新bscroll
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //因为是实时监听的，所以无需if判断
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // if(position.y<-1000){
      //   this.isShowBackTop = true;
      // }else{
      //   this.isShowBackTop = false;
      // }
      //判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //加载更多图片
    LoadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  /* padding-top:44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>