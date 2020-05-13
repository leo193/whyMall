//防抖函数，性能优化
export function debounce(func,delay=300){
    let timer = null
    return function(...args){
      if(timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        func.apply(this,args)
        clearTimeout(timer)
      },delay)
    }
  }