<template>
    <div id="app">
        <div>
            <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">暖心商家</x-header>
            <div v-transfer-dom>
                <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="changeLocale"></actionsheet>
            </div>
        </div>

        <transition name="fade">
        <router-view></router-view>
        </transition>
        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
            <tabbar-item :link="{path:'/'}" :badge=countsellerdui>
                <span class="iconfontyyy vux-demo-tabbar-icon-home" slot="icon"
                      style="position:relative;top: 0; font-size: 24px">&#xe68e;</span>
                <span slot="label">点餐队列</span>
            </tabbar-item>

            <tabbar-item :link="{path:'/demo'}">
                <span class="iconfontyyy" slot="icon"
                      style="font-size: 24px;position: relative;top: -4px">&#xe604;</span>
                <span slot="label"><span>添加菜品</span></span>
            </tabbar-item>

            <tabbar-item :link="{path:'/sellerseting'}" show-dot>
                <span class="iconfontyyy" slot="icon" style="font-size: 24px">&#xe624;</span>
                <span slot="label">店铺设置</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
  import {
    Tabbar,
    TabbarItem,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Alert,
    Group,
    XSwitch,
    Cell,
    TransferDomDirective as TransferDom
  } from 'vux'

  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      Alert,
      Group,
      XSwitch,
      Cell,
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        menus: {
          menu1: '历史订单',
          menu2: '未完成订单'
        },
        showMenus: false,
        countsellerdui: '9'
      }
    },
    methods: {
      changeLocale (data) {
        console.log(data)
      }
    }

  }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/tap.less';

    @font-face {
        font-family: 'iconfont';  /* project id 367906 */
        src: url('//at.alicdn.com/t/font_cynwu1dhry2mlsor.eot');
        src: url('//at.alicdn.com/t/font_cynwu1dhry2mlsor.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_cynwu1dhry2mlsor.woff') format('woff'),
        url('//at.alicdn.com/t/font_cynwu1dhry2mlsor.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_cynwu1dhry2mlsor.svg#iconfont') format('svg');
    }

    .demo-icon-22 {
        font-family: 'vux-demo';
        font-size: 22px;
        color: #888;
    }

    .iconfontyyy {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    @font-face {
        font-family: 'vux-demo';  /* project id 70323 */
        src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
        src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
        url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
        url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
    }

    body {
        background-color: #fbf9fe;
    }

    .weui-tabbar {
        position: absolute;
    }

    .fade-enter-active, .fade-leave-active{
        transition: opacity .2s
    }


    .fade-enter, .fade-leave-to {
        opacity: 0
    }

</style>
