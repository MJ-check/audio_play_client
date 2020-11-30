/**
 * handleBeforeUnload 浏览器页面关闭时的统一事件处理组件
 * 0:存储播放列表
 */

// 需要执行的函数列表
var functionList = undefined;

// 初始化函数列表
const initBeforeUnloadFunctionList = () => {
  functionList = [];
};

// 添加执行函数   
// func:需要执行的函数；
// value：执行函数是需要的数据
const addBeforeUnloadFunction = ( func, value, index ) => {
  if ( functionList ) {
    if ( typeof func === "function" && typeof value === "object" && index >= 0 )
      functionList[index] = {
        func: func,
        value: JSON.parse(JSON.stringify(value)),
      };
    else
      console.error("Parameter Type Error!");
  } else {
    console.error("FunctionList Not Init!");
  }
  console.log("Function List");
  console.log(functionList);
};

// 执行所有函数
const carryBeforeUnloadFunction = () => {
  console.log("Function List");
  console.log(functionList);
  if ( functionList )
    functionList.forEach(item => {
      if ( item ) {
        const func = item.func;
        const value = item.value;
        func(value);
        console.log("value = " + JSON.stringify(value));
      }
    });
  else
    console.error("FunctionList Not Init!");
};

export {
  initBeforeUnloadFunctionList,
  addBeforeUnloadFunction,
  carryBeforeUnloadFunction
};