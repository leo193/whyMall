<template>
  <scroll class="content" ref="scroll">
    <div class="cart-list">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated(){
      this.$refs.scroll.refresh()
  }
};
</script>

<style scoped >
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
