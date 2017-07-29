<template>
    <div class="login-wrapper" ref="wrapper">
        <div class="login">
            <center>
                <img width="80%" src="../Sellersetting/img/mdimg.jpg">
            </center>

            <group>
                <x-textarea title="用户名" v-model="login.username" placeholder="填写用户名" :show-counter="false" :rows="1" autosize></x-textarea>

                <x-textarea  v-model="login.pwd" title="密码" placeholder="填写密码" :show-counter="false" :rows="1" autosize></x-textarea>

            </group>
            <group>
            <x-button type="primary"  @click.native="submit" >登  陆</x-button>
            </group>
        </div>
    </div>
</template>

<script>
  import {AjaxPlugin, XButton, Selector, XTextarea, Tab, TabItem, Divider, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Vue from 'vue'
  Vue.use(AjaxPlugin)

  export default {
    components: {
      Actionsheet,
      Group,
      XSwitch,
      Toast,
      TabItem,
      Tab,
      Divider,
      XTextarea,
      Selector,
      XButton
    },
    directives: {
      TransferDom
    },
    created () {

    },
    data () {
      return {
        login: {}
      }
    },
    methods: {
      check (event) {
        this.activetab = event
      },
      submit (event) {
        this.$http.post('http://127.0.0.1:999/api/login', this.login).then(({data}) => {
          console.log(data)
          if (data.status === 'error') {
            console.log(data.msg)
          } else {
            console.log(data.msg)
          }
        })

// 这个是发送文件的头信息
//        this.$http.post('http://127.0.0.1:999/api/sellersetting/addtype', this.addtype, {
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//          }
//        }).then(({data}) => {
//          console.log(data)
//        })
      }
    }
  }

</script>

<style>
    .login-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 99990;
        background: #FBF9FE;
        top: 0;
    }
    .login{
        position: absolute;
        top:56px;
    }
    img{
        border-radius: 10px;
    }
</style>
