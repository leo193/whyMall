<template>
    <div v-if="Object.keys(goods).length !== 0">
        <div class="toptext">{{goods.desc}}</div>
        <div class="price">
            <span class="priceNow">{{goods.realPrice}}</span>
            <span class="priceOld">{{goods.oldPrice}}</span>
            <span class="discount" v-if="goods.discount" :style="{background:goods.discountBgColor}">{{goods.discount}}</span>
        </div>
        <div class="shopinfo" >
            <!-- <span v-for="(item,index) in goods.columns" :key="index">{{item}}</span> -->
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="four">     
            <span v-for="index in goods.services.length-1" :key="index"><img :src="goods.services[index-1].icon" alt="">{{goods.services[index-1].name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailBaseInfo" ,
    props: {
        goods:{
            type:Object,
            default() {
                return {}
            }
        }
    }
};
</script>

<style scoped >
.toptext{
    padding: 6px;
    line-height:24px;
}
.price{
    padding:6px;
}
.priceNow{
    font-size: 26px;
    color:var(--color-tint);
    padding-right:5px;
}
.priceOld{
    color:#ccc;
    text-decoration:line-through;
    padding-right:5px;
}
.discount{
    padding:4px;
    font-size:12px;
    color:#fff;
    border-radius: 4px;
    position: relative;
    bottom:12px;
}
.shopinfo{
    height: 40px;
    padding: 0 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.shopinfo span{
    color:#ccc;
    font-size: 14px;
}
.four{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 14px;
    
}
.four span{
    width:50%;
    display:inline-block;
    height: 40px;
    line-height: 40px;
}
.four img{
    width:12px;
    margin-right:4px;
}
.four span:nth-child(2n){
    text-align: right;
}
</style>
