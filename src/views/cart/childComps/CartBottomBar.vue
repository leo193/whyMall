<template>
    <div class="bottom-bar">
        <div class="check-content">
             <check-button class="check-button" :is-checked="isSelectAll" @click.native="selectAll"/>
             <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}
        </div>  
        <div class="goBuy" @click="calcClick">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name: "CartBottomBar" ,
    components:{
        CheckButton
    },
    data() {
        return {
            
        };
    },
    methods:{
        selectAll(){
            if(this.isSelectAll){// 全部选中
                this.$store.dispatch('cancelSelectAll')
                //this.$store.state.cartList.forEach(item =>item.checked = false)
            }else{
                //this.$store.state.cartList.forEach(item =>item.checked = true)
                this.$store.dispatch('SelectAll')
            }
        },
        calcClick(){
            if(!this.isSelectAll){
                 this.$toast.show('请选择购买的商品');
            }
        }
    },
    computed:{
        totalPrice(){
            return '¥' + this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item=>item.checked).reduce((preValue, item) => {
                return preValue + item.count
            },0)
        },
        isSelectAll(){
            if(this.$store.state.cartList.length === 0) return false;
            return this.$store.state.cartList.every(item=>item.checked)
        }
    }
};
</script>

<style scoped >
.bottom-bar{
    display: flex;
    height: 40px;
    line-height:40px;
    background-color:#eee;
    right:0;
    left: 0;
    bottom: 49px;
    overflow: hidden;
    position: absolute;
}
.check-content{
    display: flex;
    align-items:center;
    margin-left:10px;
    width:60px;
}
.check-button{
    width:20px;
    height: 20px;
    line-height:20px;
    margin-right:5px;
    
}
.price{
    margin-left:30px;
    flex:1;
}
.goBuy{
    width:90px;
    background:var(--color-tint);
    text-align: center;
    color:#fff;
    font-size: 14px;
}
</style>
