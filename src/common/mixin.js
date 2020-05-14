import { debounce } from "common/utils";

export const itemImgListenerMiXin = {
    data(){
        return {
            itemImgListener:null
        }
    },
    mounted(){
        //图片加载完毕的事件监听
        const refresh = debounce(this.$refs.scroll.refresh, 500);
        //对监听的事件进行保存
        this.itemImgListener = () => {
        refresh();
        };
        //接收总线发送来的事件，重新刷新bscroll
        this.$bus.$on("itemImageLoad", this.itemImgListener);

    }
}