<!--
 * @Author: a3802 253092329@qq.com
 * @Date: 2024-04-11 19:09:51
 * @LastEditors: a3802 253092329@qq.com
 * @LastEditTime: 2024-04-22 06:20:20
 * @FilePath: \tgvue\src\views\takecust\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <van-image width="100%" height="100%" src="https://assetcdn.oss-cn-shanghai.aliyuncs.com/assets/qylqzx-e233fa67.png"/>
    <div class="item_list">
        <div class="title">
           <h6>会员权益</h6>  
        </div>
        <div class="content">
            <ul style="height:650px;">
                <li class="list_atr" v-for="(item,index) in arr" v-bind:key="index" @click="handleItemClick(item,index)">
                    <van-image src="https://phone-card-cx.oss-cn-beijing.aliyuncs.com/image/20240304/0bf02b20-9c02-4c47-8be5-f80bd58a19d9.png"/>
                    <div class="atr_title">第{{item}}个月10元</div>
                </li>                
            </ul>
        </div>
    </div>




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


    <v-dialog  v-model:show="showDialog" show-cancel-button @cancel="onCancel" @confirm="onConfirm">
      <slot><div class="title_atr">第{{title_text}}月10元</div></slot>
      <template v-if="showDialog">
          <van-cell-group inset>
            <van-field v-model="mobile" required type="number"  placeholder="请输入手机号" class="num_text"/>
          </van-cell-group>
          <div class="message_text">
            <span>请输入注册手机号领取话费权益</span>
            <span>话费会在24小时内到账,请耐心等待</span>
          </div>
      </template>

    </v-dialog>

    <div  class="toast tos" style="display: none;">
        <div></div>
    </div>
    
</template>
<script>
import { ref,onMounted,reactive, toRefs } from 'vue';
import { Icon, Toast, Dialog } from 'vant';
import * as Verify from '../../api/verify';
import * as Index from '../../api/index';
import { useRouter } from 'vue-router';

export default {

  components: {
    'v-dialog': Dialog.Component,
  },  

  setup() {

    const autosize = {
      maxHeight: 2000,
      minHeight: 1000
    };

    const router = useRouter();

    const order_sn = ref('');

    const title_text = ref(0);
    const mobile = ref('');

    const active = ref(0);
    const icon = {
      active: 'https://image.hrzhuolin.com/tggy/Icon/qy/tcoupona.png',
      inactive: 'https://image.hrzhuolin.com/tggy/Icon/qy/tcoupon.png',
    };
    const icon1 = {
      active: 'https://image.hrzhuolin.com/tggy/Icon/qy/tlista.png',
      inactive: 'https://image.hrzhuolin.com/tggy/Icon/qy/tlist.png',
    };

    const arr = ['一','二','三','四','五','六','七','八','九','十'];

    const showDialog  = ref(false);

    const form = reactive({
      form: {
          mobile: '',
          mode: 'Coupon',
          order_sn: '',
          num: ''
          // categoryId: 10072
      }

    });

    const redirect = (str) => {
      console.log(str);
        if(str == 'takecust'){
            router.push('/takecust?sn='+order_sn.value);
        }else if( str == 'list'){
            router.push('/takecust/list?sn='+order_sn.value);
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

    const handleItemClick = (value,key) => {

        title_text.value = value;       
        showDialog.value = true;

    };

    const findKeyByValue = (array,value) => {
        return array.findIndex(element => element === value);
    };

    // 验证手机号
    const validteData = (str) => {
        if (Verify.isEmpty(str)) {
            Toast('请输入手机号');
            return false
        }
        if (!Verify.isMobile(str)) {
            Toast('请输入正确格式的手机号')
            return false
        }
        return true
    };

    // 确认按钮的回调
    const onConfirm = () => {

      console.log(mobile.value);
      if (validteData(mobile.value)) {
          showDialog.value = false; // 关闭对话框
          let res = submitBuy(mobile.value)
      }
      mobile.value = '';

      console.log('点击了确认按钮');


    };


    const submitBuy = (str) => {
      form.form.order_sn = order_sn.value;
      form.form.mobile = str;
      form.form.num = findKeyByValue(arr,title_text.value);
      Index.investPay(form).
          then(result => {
              console.log(result);
              if (result.status == 200) {
                  Toast('充值成功,请耐心等待');
                  return result;
              } else {
                  // Toast(result.message);
                  Toast('充值失败');
              }
          }).catch(err => {
              Toast('充值失败');

          })
    };


    // 取消按钮的回调
    const onCancel = () => {
      // console.log('点击了取消按钮');
      mobile.value = '';
      showDialog.value = false; // 关闭对话框
    };

    onMounted(() => {

       order_sn.value = getQuery('sn');


    });


    return {
      icon,
      icon1,
      active,
      arr,
      handleItemClick,
      showDialog,
      onConfirm,
      onCancel,
      autosize,
      title_text,
      mobile,
      getQuery,
      redirect,
      order_sn

    };
  }
}



</script>

<style lang="less" scoped>
h6 {
    display: block;
    font-size: 0.4em;
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
    font-weight: bold;
    unicode-bidi: isolate;
}

.item_list {
    padding: 0.1rem 0 0 0.2rem;
}
.list_atr {
    float:left;
    margin:20px;
}
.list_atr>div {
    font-size:24px;
    text-align: center;
}


.van-tabbar-item__icon img {
    height: 0.6rem;
}

.van-tabbar-item__text span {
    font-size: 0.2rem;
}


/deep/ .van-image {
    float:left;
    width:1.9rem;
    height:1.9rem;
    margin-bottom:0.1rem;
}




.wxpDialogContentClass{
  padding: 10px 8px;
  word-wrap: break-word;
  font-size: 14px;
  white-space: pre-wrap;
  color: #646566;
  max-height: 60vh;
  overflow: auto;
  line-height: 20px;
}
 
 
.wxContent{
  display: block;
  max-height: 65vh;
  overflow: auto;
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
.van-field__label {
  display: flex;
  align-items: center;
}

.van-field__control {
  line-height:50px;
  background-color: #efefef;;
}

.van-dialog {
  width:480px;
}
.van-dialog__content{
  padding: 10px 0 50px 0;
}
.title_atr {
  text-align:center;
  margin: 0.3rem 0;
  padding: 0 0 0.1rem 0;
  border-bottom: 1px solid #f7f4f4;
  font-size: 0.23rem;
}
.message_text {
    font-size: 0.2rem;
    padding: 0 0.85rem;
    color: #666;
}

.num_text{
    font-size: 0.3rem;
}
.van-dialog__footer {
  margin-bottom: 10px;
  padding-top: 0.1rem;
}

.van-dialog__confirm, .van-dialog__cancel {
  font-size:0.3rem;
}

.van-toast--text {
    font-size: 0.36rem;
    height:1.6rem;
    line-height:0.5rem;
}

</style>