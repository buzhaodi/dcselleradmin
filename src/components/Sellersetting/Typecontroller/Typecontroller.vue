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
                <x-textarea v-if="activetab===3" v-model="addtype.special"  title="特价金额" placeholder="次品类下统一售价" :show-counter="false" :rows="1" autosize></x-textarea>

            </group>
            <x-button type="primary" plain @click.native="submit" >添加</x-button>




            <x-table :cell-bordered="false" :content-bordered="true" style="background-color:#fff;">
                <thead>
                <tr style="background-color: #F7F7F7">
                    <th>分类名</th>
                    <th  v-if="activetab===1">满</th>
                    <th  v-if="activetab===1">减</th>
                    <th v-show="activetab===2">折扣</th>
                    <th v-show="activetab===3">特价</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-show="activetab===item.type ||(item.type===-1&&activetab===0)" v-for="item in type">
                    <td>{{item.description}}</td>
                    <td  v-if="activetab===1">{{item.fullprice}}元</td>
                    <td  v-if="activetab===1">{{item.subtraction}}元</td>
                    <td v-show="activetab===2">{{item.discount}}折</td>
                    <td v-show="activetab===3">{{item.special}}元</td>
                    <td><x-button @click.native="deltype(item.id)" mini type="warn">删除</x-button></td>
                </tr>
                </tbody>
            </x-table>

        </div>

    </div>
</template>

<script>
  import {Confirm, XTable, AjaxPlugin, XButton, Selector, XTextarea, Tab, TabItem, Divider, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Vue from 'vue'
  import Bscroll from '../../../../node_modules/better-scroll'
  Vue.use(AjaxPlugin)

  export default {
    components: {
      XTable,
      Actionsheet,
      Group,
      XSwitch,
      Toast,
      TabItem,
      Tab,
      Divider,
      XTextarea,
      Selector,
      XButton,
      Confirm
    },
    directives: {
      TransferDom
    },
    created () {
      this.$http.get(this.SERVERDOMIAN + '/api/sellersetting/gettype').then(({data}) => {
        this.type = data
      })
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
        addtype: {},
        type: {},
        deleteid: 'null'
      }
    },
    methods: {
      check (event) {
        let temp = this.addtype.description
        this.addtype = {}
        this.addtype.description = temp
        this.activetab = event
      },
      onChangezhe (num) {
        const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
        this.$vux.confirm.show({
          // 组件除show外的属性
          onCancel () {
            console.log(this) // 非当前 vm
            console.log(_this) // 当前 vm
          },
          onConfirm () {}
        })

        console.log(num)
      },
      submit (event) {
        if (!event._constructed) {
          return
        }
        this.addtype.type = this.activetab === 0 ? -1 : this.activetab

        this.$http.post(this.SERVERDOMIAN + '/api/sellersetting/addtype', this.addtype).then(({data}) => {
          if (data.status === 'success') {
            this.addtype.id = data.id
            this.type.push(this.addtype)
            this.addtype.id = ''
            this.$vux.alert.show({
              title: '添加成功',
              content: data.msg
            })
          } else {
            this.$vux.alert.show({
              title: '添加失败',
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
      },
      deltype (id) {
        if (!event._constructed) {
          return
        }
        let that = this
        this.$vux.confirm.show({
          title: '你确定要删除吗？',
          content: '删除？',
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            that.$http.get(this.SERVERDOMIAN + '/api/sellersetting/delete/id/' + id).then((data) => {
              if (data.status === 'success') {
                that.$http.get(this.SERVERDOMIAN + '/api/sellersetting/gettype').then(({data}) => {
                  this.type = data
                })
                console.log(1)
              } else {
                this.$vux.alert.show({
                  title: '删除失败，请联系管理员',
                  content: data.msg
                })
              }
            })
          }
        })
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
