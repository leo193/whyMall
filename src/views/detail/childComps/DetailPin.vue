<template>
  <div>
    <div class="pinTop">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="person" v-for="(item,i) in pin.list" :key="i">
      <div class="personTop">
        <span class="face">
          <img :src="item.user.avatar" alt />
        </span>
        <span class="name">{{item.user.uname}}</span>
      </div>
      <div class="an1">{{item.content}}</div>
      <div class="an2">
        <span class="time">{{getTime(item.created)}}</span>
        <span>{{item.style}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPin",
  props: {
    pin: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    getTime(timeStamp) {
      let date = new Date();
      date.setTime(timeStamp * 1000);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>

<style scoped >
.pinTop {
  width: 95%;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #dcdcdc;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
}
.person {
  width: 95%;
  margin: 0 auto;
}
.personTop {
  height: 80px;
  display: flex;
  align-items: center;
}
.face {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.face img {
  width: 60px;
  height: 60px;
}
.an1 {
  line-height: 30px;
}
.an2 {
  line-height: 30px;
  color: #acacac;
}
.an2 .time{
    margin-right: 5px;
}
</style>
