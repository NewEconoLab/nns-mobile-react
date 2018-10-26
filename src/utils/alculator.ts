// /**
//  ** 加法函数，用来得到精确的加法结果
//  ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//  ** 调用：accAdd(arg1,arg2)
//  ** 返回值：arg1加上arg2的精确结果
//  **/

export const splitLenght = (arg)=>
{
    return arg.split(".").length>1?arg.split(".")[1].length:0;
}

export const accAdd = (arg1, arg2) =>
{
    arg1 = (typeof arg1) === "number" ? arg1 : parseFloat(arg1);
    arg2 = (typeof arg2) === "number" ? arg2 : parseFloat(arg2);
    // tslint:disable-next-line:one-variable-per-declaration
    let r1, r2, m, c;
    try {
        r1 = splitLenght(arg1);
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = splitLenght(arg2);
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        const cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

// /**
//  ** 减法函数，用来得到精确的减法结果
//  ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
//  ** 调用：accSub(arg1,arg2)
//  ** 返回值：arg1加上arg2的精确结果
//  **/
export const accSub = function (arg1, arg2) {
    arg1 = (typeof arg1) === "number" ? arg1 : parseFloat(arg1);
    arg2 = (typeof arg2) === "number" ? arg2 : parseFloat(arg2);
    // tslint:disable-next-line:one-variable-per-declaration
    let r1, r2, m, n;
    try {
        r1 = splitLenght(arg1);
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = splitLenght(arg2);
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
}

// /**
//  ** 乘法函数，用来得到精确的乘法结果
//  ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//  ** 调用：accMul(arg1,arg2)
//  ** 返回值：arg1乘以 arg2的精确结果
//  **/
export const accMul = (arg1, arg2) => {
    const s1 = (typeof arg1) === "string" ? arg1 : arg1.toString();
    const s2 = (typeof arg2) === "string" ? arg2 : arg2.toString();
    let m = 0;
    try {
        m += splitLenght(s1);
    }
    catch (e) {
        throw e;        
    }
    try {
        m += splitLenght(s2);
    }
    catch (e) {
        throw e;
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


// /** 
//  ** 除法函数，用来得到精确的除法结果
//  ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//  ** 调用：accDiv(arg1,arg2)
//  ** 返回值：arg1除以arg2的精确结果
//  **/
export const accDiv = (arg1, arg2) => {
    arg1 = (typeof arg1) === "string" ? arg1 : arg1.toString();
    arg2 = (typeof arg2) === "string" ? arg2 : arg2.toString();
    // tslint:disable-next-line:one-variable-per-declaration
    let t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = splitLenght(arg1);
    }
    catch (e) {
        throw e;
    }
    try {
        t2 =  splitLenght(arg2);
    }
    catch (e) {
        throw e;
    }
    r1 = Number(arg1.replace(".", ""));
    r2 = Number(arg2.replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}