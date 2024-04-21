<template>
    <ul>
        <van-cell>
                <div class="title_header">
                    <span>编号：</span>
                    <span class="title_sn">{{ order.order_sn }}</span>
                    <span class="order_status">成功</span>
                </div>
                <div class="order_message">
                    <van-image  src="https://phone-card-cx.oss-cn-beijing.aliyuncs.com/image/20240304/0bf02b20-9c02-4c47-8be5-f80bd58a19d9.png"/>
                    <div class="message_right">
                        <div class="m_title">
                            <span>名称：</span>
                            <span>第{{ list[order.num] }}个月10元</span>
                        </div>
                        <div class="d_title">
                            <span>时间：</span>
                            <span>{{ order.create_time }}</span>
                        </div>
                    </div>
                </div>
        </van-cell>
    </ul>




    <van-tabbar v-model="active">
        <van-tabbar-item  replace @click="redirect('takecust')">
            <span>权益领取</span>
            <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace @click="redirect('list')">
            <span>领取记录</span>
            <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
            </template>            
        </van-tabbar-item>
    </van-tabbar>    
</template>
<script>
import { ref,onMounted,reactive, toRefs } from 'vue';
import { Icon, Toast, Dialog } from 'vant';
import * as Index from '../../api/index';
import { useRouter } from 'vue-router';

export default {

    components: {
    'v-dialog': Dialog.Component,
    },  

    setup() {

        const router = useRouter();

        const active = ref(1);
        const icon = {
            active: 'https://image.hrzhuolin.com/tggy/Icon/qy/tcoupona.png',
            inactive: 'https://image.hrzhuolin.com/tggy/Icon/qy/tcoupon.png',
        };
        const icon1 = {
            active: 'https://image.hrzhuolin.com/tggy/Icon/qy/tlista.png',
            inactive: 'https://image.hrzhuolin.com/tggy/Icon/qy/tlist.png',
        };

        const list = ['0','一','二','三','四','五','六','七','八','九','十'];


        const order = reactive({ 
                form: {

                    order_sn: ''                    
                }

            
        });

        const redirect = (str) => {
            if(str == 'takecust'){
                router.push('/takecust?sn='+order.order_sn);
            }else if( str == 'list'){
                router.push('/takecust/list?sn='+order.order_sn);
            }else{
                Toast('系统错误');
            }
        };

        // 取url中的参数值
        const getQuery = (name) => {
            let geturl = window.location.href
            let getqyinfo = geturl.split('?')[1]
            let params = new URLSearchParams('?' + getqyinfo);
            return params.get(name);
        };
        onMounted(() => {

            order.form.order_sn = getQuery('sn');
            Index.getUserTen(order).
                then(result => {
                    if (result.status == 500) {

                        // Toast(result.message)
                        Toast('暂未领取话费');

                    } else {
                        order.order_sn = result.data.data.order_sn;
                        order.create_time = result.data.data.create_time;
                        order.num = result.data.data.num;
                    }


                }).catch(err => {
                    // console.log(err);
                    // Toast('系统错误');
                }) 


        })

        return {
            icon,
            icon1,
            active,
            list,
            order,
            redirect,
            router,
            getQuery

        };        
        
    }



}

</script>

<style lang="less" scoped>
.van-tabbar-item__icon img {
    height: 0.6rem;
}

.van-tabbar-item__text span {
    font-size: 0.2rem;
    
}
/deep/ .van-cell__value{
    padding:0.1rem;
    border: 1px solid #ddd;
    margin: 0.1rem;
}

.title_header {
    height:0.3rem;
    font-size:0.3rem;
    margin:0.1rem 0;
    padding: 0.1rem 0;
    border-bottom: 1px solid #ddd;
}

.order_status{
    float:right;
}

.message_right {
    float: left;
    font-size: 0.3rem;
    display: flex;
    /* align-content: stretch; */
    flex-direction: column;
    /* flex-wrap: nowrap; */
    justify-content: center;
    align-items: flex-start;
    height: 2rem;
    padding: 0 0.2rem;    
}

.m_title {
    font-weight: bold;
}
.m_title, .d_title{
    margin:0.3rem 0;
}

/deep/ .van-image {
    float:left;
    width:2rem;
    height:2rem;
}


</style>

<style>
:root {
    --van-tabbar-height: 120px;
    --van-dialog-message-max-height:200px;
    --van-dialog-message-line-height: 200px;
    --van-dialog-message-padding: 200px;
    /* --van-dialog-header-padding-top: 40px; */
    --van-dialog-header-line-height: 30px;
    --van-cell-group-inset-padding: 20px;
    --van-field-label-color: #666
    
}


</style>