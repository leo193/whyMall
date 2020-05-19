<template>
    <div class="toast" v-if="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name: "Toast" ,
    data(){
        return{
            message:'',
            isShow:false
        }
    },
    methods: {
        show(message,duration=2000){
            this.isShow = true;
            this.message = message;
            setTimeout(()=>{
                this.isShow = false;
                this.message =''
            },duration)
        }
    }
};
</script>

<style scoped >
.toast{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    background:rgba(0,0,0,.6);
    color:#fff;
    z-index: 20;
    border-radius: 4px;
}
</style>
