import { type } from "../aciton";

/* 
Reducer数据处理
*/
const initialState = {
    menuName : '首页'
}
//定义一个导出方法
export default (state =initialState ,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
            return{
                ...state,                   //保留之前的值
                menuName:action.menuName    //新的值
            }
        default:
            return {...state};
    }
}