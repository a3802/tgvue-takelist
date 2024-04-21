/*
 * @Author: a3802 253092329@qq.com
 * @Date: 2023-05-25 00:33:21
 * @LastEditors: a3802 253092329@qq.com
 * @LastEditTime: 2023-08-10 21:59:59
 * @FilePath: \tgvue\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from './request'

/**手机号提交 */
export const register = (data) => {
    return axios({
        url: '/equity/h5Login',
        method: 'post',
        data
    })
}


export const callOrder = (data) => {
    return axios({
        url: '/equity/CallOrder',
        method: 'post',
        data
    })
}

export const investPay = (data) => {
    return axios({
        url: '/equity/investPay',
        method: 'post',
        data
    })
}


export const getUserTen = (data) => {
    return axios({
        url: '/equity/getUserTen',
        method: 'post',
        data
    })
}

export default { register, callOrder, investPay, getUserTen }