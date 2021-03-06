import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";
import {POP, NEW, SELL} from "./const";

export const itemImgListenerMiXin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    //图片加载完毕的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    //接收总线发送来的事件，重新刷新bscroll
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
};

export const BackTopMiXin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

