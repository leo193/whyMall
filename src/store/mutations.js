import{ ADD_COUNTER,ADD_TO_CART,TO_KONG,TO_XUAN,CANCLE_SELECT_ALL,SELECT_ALL } from './mutation-types'

export default {
    [ADD_COUNTER](state,payload){
        payload.count++
    },
    [ADD_TO_CART](state,payload){ 
        payload.checked = true          
        state.cartList.push(payload);
    },
    [TO_KONG](state,payload){
        payload.checked = false
    },
    [TO_XUAN](state,payload){
        payload.checked = true
    },
    [CANCLE_SELECT_ALL](state){
        state.cartList.forEach(item =>item.checked = false)
    },
    [SELECT_ALL](state){
        state.cartList.forEach(item =>item.checked = true)
    }
}