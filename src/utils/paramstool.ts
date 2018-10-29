/*-----------------实现1--------------------*/
export const getPar = function (par){
    // 获取当前URL
    const localUrl:string = document.location?document.location.href:""; 
    // 获取要取得的get参数位置
    const get = localUrl.indexOf(par +"=");
    if(get === -1){
        return false;   
    }   
    // 截取字符串
    let getParams = localUrl.slice(par.length + get + 1);    
    // 判断截取后的字符串是否还有其他get参数
    const nextPar = getParams.indexOf("&");
    if(nextPar !== -1){
        getParams = getParams.slice(0, nextPar);
    }
    return getParams;
}
 
/*--------------------实现2(返回 $_GET 对象, 仿PHP模式)----------------------*/
export const $_GET =()=>{
    const url = window.document.location?window.document.location.href.toString():"";
    let u = url.split("?");
    if(typeof(u[1]) === "string"){
        u = u[1].split("&");
        const get = {};
        // tslint:disable-next-line:forin
        for(const i in u){
            const j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}
 
/*第2种方式, 使用时, 可以直接 $_GET['get参数'], 就直接获得GET参数的值*/