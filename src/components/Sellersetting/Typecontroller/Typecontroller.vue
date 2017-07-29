<template>
    <div class="item-wrapper" ref="wrapper">
        <div>
            <tab :animate="false">
                <tab-item active-class="active-6-1" selected @on-item-click="check">常规</tab-item>
                <tab-item active-class="active-6-2"  @on-item-click="check">满减</tab-item>
                <tab-item active-class="active-6-3"  @on-item-click="check">折扣</tab-item>
                <tab-item active-class="active-6-4"  @on-item-click="check">特价</tab-item>
            </tab>

            <group :title="typename[activetab]">
                <x-textarea title="分类名称" v-model="addtype.description" placeholder="填写分类名称" :show-counter="false" :rows="1" autosize></x-textarea>



                <x-textarea  v-if="activetab===1" v-model="addtype.fullprice" title="添加满金额" placeholder="填写满多少" :show-counter="false" :rows="1" autosize></x-textarea>



                <x-textarea v-if="activetab===1" v-model="addtype.subtraction"  title="添加减金额" placeholder="填写减多少" :show-counter="false" :rows="1" autosize></x-textarea>



                <selector  v-show="activetab===2" v-model="addtype.discount" placeholder="请选择折扣" title="折扣" :options="list" ></selector>
            </group>
            <x-button type="primary" plain @click.native="submit" >添加</x-button>
        </div>
    </div>
</template>

<script>
  import {AjaxPlugin, XButton, Selector, XTextarea, Tab, TabItem, Divider, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Vue from 'vue'
  import Bscroll from '../../../../node_modules/better-scroll'
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
      this.$nextTick(() => {
        this.itmescroll = new Bscroll(this.$refs['wrapper'], {
          click: true
        })
      })
    },
    data () {
      return {
        activetab: 0,
        typename: ['添加常规分类', '添加满减分类', '添加折扣分类', '添加特价分类'],
        list: [{key: '0', value: '无折扣'}, {key: '95', value: '九五折'}, {key: '90', value: '九折'}, {key: '85', value: '八五折'}, {key: '80', value: '八折'}, {key: '75', value: '七五折'}, {key: '70', value: '七折'}, {key: '65', value: '六五折'}, {key: '60', value: '六折'}, {key: '55', value: '五五折'}, {key: '50', value: '五折'}, {key: '45', value: '四五折'}, {key: '40', value: '四折'}, {key: '35', value: '三五折'}, {key: '30', value: '三折'}, {key: '25', value: '二五折'}, {key: '20', value: '二折'}, {key: '15', value: '一五折'}, {key: '10', value: '一折'}],
        addtype: {}
      }
    },
    methods: {
      check (event) {
        this.activetab = event
      },
      onChangezhe (num) {
        console.log(num)
      },
      submit (event) {
        if (!event._constructed) {
          return
        }
        this.addtype.type = this.activetab === 0 ? -1 : this.activetab

        this.$http.post('http://127.0.0.1:999/api/sellersetting/addtype', this.addtype).then(({data}) => {
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
    .item-wrapper {
        position: absolute;
        width: 100%;
        height: 90%;
        overflow: hidden;
    }
</style>
