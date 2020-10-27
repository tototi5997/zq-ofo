/* 
Action类型
*/
export const type ={
    SWITCH_MENU:'SWITCH_MENU'           //类型
}
//声明一个方法
export function switchMenu(menuName){
    return{
        type:type.SWITCH_MENU,          //事件类型
        menuName
    }
}