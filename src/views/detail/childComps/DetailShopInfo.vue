<template>
  <div v-if="Object.keys(shop).length !== 0">
    <div class="home">
      <div class="face">
        <img :src="shop.logo" alt />
      </div>
      <span>{{shop.name}}</span>
    </div>
    <div class="details">
        <div class="details-left">
            <div class="dl">
                <div>{{shop.sells | sellCountFilter}}</div>
                <div>总销量</div>
            </div>
            <div class="dr">
                <div>{{shop.goodsCount}}</div>
                <div>全部宝贝</div>
            </div>
        </div>
        <div class="details-right">
            <div class="info">
                <div v-for="(item,i) in shop.score" :key="i">
                    <span>{{item.name}}</span>
                    <span :class="[item.isBetter==true?'high':'low']">{{item.score}}</span>
                    <span class="lowlast" v-if="!item.isBetter">低</span>
                    <span class="highlast" v-if="item.isBetter">高</span>
                </div>             
            </div>
        </div>
    </div>
    <div class="goShop">
      <span>进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters:{
    sellCountFilter(value){
      let result = value
      if(value>10000){
        result = (result / 10000).toFixed(1)+'万'
      }
      return result
    }
  }
};
</script>

<style scoped >
.home {
  height: 100px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.home span {
  font-size: 18px;
}
.face {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 20px;
}
.face img {
  width: 60px;
  height: 60px;
}
.details{
    height: 150px;
    display:flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
}
.details-left{
    width:49%;
    height: 100px;
    border-right:1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.dl,.dr{
    height: 50px;
    width:70px;
    display: flex;
    flex-wrap:wrap;
    justify-content : center;
}
.dl div,.dr div{
    height: 25px;
    line-height:25px   
}
.details-right{
    width:49%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.info{
    width:150px;
    height: 90px;
}

.info div{
    height: 30px;
    line-height: 20px;
    width:150px;
}

.info div span{
    display:inline-block;
}

.info div span:nth-child(1){
    width:70px;
    text-align: center;
    display:inline-block;
}
.info div span:nth-child(2){
    width:40px;
    display:inline-block;
}
.info div span:nth-child(3){
    width:20px;
    text-align: center;
}
.low{
    color:green;
}
.high{
    color:red;
}
.lowlast{
    color:#fff;
    background:green;
}
.highlast{
    color:#fff;
    background:red;
}
.goShop{
  padding:20px 0 30px 0;
  text-align: center;
  border-bottom: 8px solid #dcdcdc;
}
.goShop span{
  display:inline-block;
  width:200px;
  height: 40px;
  line-height: 40px;
  background:#dfdcdc;
  border-radius: 4px;
}
</style>
