import{ ADD_COUNTER,ADD_TO_CART,TO_KONG,TO_XUAN,CANCLE_SELECT_ALL,SELECT_ALL } from './mutation-types'

export default {
    addCart({state,commit},payload){
        //判断state.cartList中是否有传入的该商品
        // let oldProduct = null;
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = item;
        //     }
        // }
        return new Promise((resolve) => {
            let oldProduct = state.cartList.find(item=>item.iid === payload.iid)
            //判断oldProduct
            if(oldProduct){
                //oldProduct.count += 1;
                commit(ADD_COUNTER,oldProduct)
                resolve('当前的商品数量+1')
            }else{
                payload.count = 1;
                commit(ADD_TO_CART,payload)
                resolve('添加新商品成功')       
            }
        })
    },

    //商品单选或不选
    checkClick({state,commit},payload){
        let Product = state.cartList.find(item=>item.iid === payload)
        if(Product.checked){
            commit(TO_KONG,Product)
        }else{
            commit(TO_XUAN,Product)
        }
    },

    //取消全选
    cancelSelectAll({commit}){
        commit(CANCLE_SELECT_ALL)
    },

    //全选
    SelectAll({commit}){
        commit(SELECT_ALL)
    }
}