import axios from './axios'
// 首页
export function postNews(token) {
    return axios({
        url: 'Functions/news',
        method:'post',
        dataType:'json',
        data: {
            token
        }
    })
}