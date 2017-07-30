<template>
    <div class="login-wrapper" ref="wrapper">
        <div class="login">
            <center>
                <img width="80%" src="../Sellersetting/img/mdimg.jpg">
            </center>

            <group>
                <x-input title="用户名" required type="text" placeholder="填写用户名" v-model="login.username" :min="1" :max="25"  ></x-input>
                <x-input title="请输入密码"  required type="password" placeholder="最小6位" v-model="login.pwd" :min="6" :max="25"  ></x-input>
            </group>
            <group>
            <x-button type="primary"  @click.native="submit" >登  陆</x-button>
            </group>
        </div>
    </div>
</template>

<script>
  import {XInput, XButton, Selector, XTextarea, Divider, TransferDom, Group, XSwitch, Toast} from 'vux'
  import VueRouter from 'vue-router'
  const router = new VueRouter()
  export default {
    components: {
      Group,
      XSwitch,
      Toast,
      Divider,
      XTextarea,
      Selector,
      XButton,
      XInput
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        login: {}
      }
    },
    methods: {
      check (event) {
        console.log(event)
      },
      submit (event) {
        this.$http.post(this.SERVERDOMIAN + '/api/login', this.login).then(({data}) => {
          console.log(data)
          if (data.status === 'success') {
            router.push(-1)
          } else {
            this.$vux.alert.show({
              title: '登录失败',
              content: data.msg
            })
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
        z-index: 1000;
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
