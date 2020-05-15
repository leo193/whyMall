<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="desc">{{detailInfo.desc}}</div>
    <div v-for="(item,i) in detailInfo.detailImage" :key="i">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img :src="item" alt v-for="(item,index) in item.list" :key="index" @load="imgLoad"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  methods: {
    imgLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped >
.desc {
  padding: 30px 20px;
  line-height: 24px;
  font-size: 18px;
}
.info-key {
  padding: 10px 20px;
}
.info-list img {
  width: 100%;

}
</style>
