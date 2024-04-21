/*
 * @Author: a3802 253092329@qq.com
 * @Date: 2023-07-25 21:05:10
 * @LastEditors: a3802 253092329@qq.com
 * @LastEditTime: 2023-08-02 23:30:53
 * @FilePath: \tgvue\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { CountDown } from 'vant';
import { Form, Field } from 'vant';
import { Toast, Dialog, Overlay, Button } from 'vant';
import App from './App.vue'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import './api/request.js';
import 'vant/lib/index.css';
// import 'amfe-flexible';
import './libs/rem.js';
import router from './router/index';

const app = createApp(App)
app.use(router).use(CountDown).use(Toast).use(Dialog).use(Overlay).use(Form).use(Field);

app.mount('#app')