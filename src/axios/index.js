import JsonP from 'jsonp'
import axios from 'axios'
import { Modal} from 'antd'
// import Title from 'antd/lib/skeleton/Title'

export default class Axios{
    //定义一个静态的jsonp来给其他页面调用
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function (err,Response){
                //to do
                //debugger;
                // if(Response.status == 'success'){
                //     resolve(Response);
                // }
                // else{
                //     reject(Response.massage);
                // }
            })
        })
    }

    //封装一个ajax来获取动态表格信息
    static ajax(options){
        let baseAPI = 'https://www.fastmock.site/mock/d21de7dec09dd48a8864229d20370c71';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,    //获取在request方法中写入的路由 
                method:'get',       //声明获取的方法
                baseURL:baseAPI,    //设置基础url
                timeout:10000,      //超时报错
                params:options.data.param       //数据
            }).then((response)=>{
                if(response.status == '200'){
                    let res = response.data;
                    if(res.code =='0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            message:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }

}