<template>
    <div class="item-wrapper" ref="wrapper">
        <div>
            <group title="选择种类">
                <popup-picker @on-change="chengtype" title="请选择种类" :data="typelist" :columns="3" v-model="typeid" ref="picker3" show-name></popup-picker>
                <x-button type="primary" @click.native="toadd" >添加 {{$refs.picker3&&$refs.picker3.getNameValues()}} 菜品</x-button>
                <x-switch title="多选菜" v-model="isshow"></x-switch>
                <popup-picker  v-show="isshow" @on-change="modtype" title="选择移动到" :data="typelist" :columns="3" v-model="typeid" ref="picker3" show-name></popup-picker>
            </group>
            <panel header="菜单列表" @on-click-item="dellfoods" :isshow="isshow" :list="list" :type="type"></panel>
        </div>

    </div>
</template>
<script>
  import {XSwitch, PopupPicker, Picker, Divider, XButton, Flexbox, FlexboxItem, CellFormPreview, Cell, TransferDom, Actionsheet, Group, Toast} from 'vux'
  import Panel from './panel/index.vue'
  import Bscroll from '../../../node_modules/better-scroll'
  import VueRouter from 'vue-router'
  const router = new VueRouter()
  export default {
    components: {
      Actionsheet,
      Group,
      Toast,
      CellFormPreview,
      Cell,
      XButton,
      Flexbox,
      FlexboxItem,
      PopupPicker,
      Picker,
      Divider,
      Panel,
      XSwitch
    },
    directives: {
      TransferDom
    },
    created () {
      this.$http.get(this.SERVERDOMIAN + '/api/menu/gettype').then(({data}) => {
        this.typelist = data
      })
      this.$http.get(this.SERVERDOMIAN + '/api/menu/getfoods').then(({data}) => {
        this.list = data
        this.$nextTick(() => {
          this.itmescroll = new Bscroll(this.$refs['wrapper'], {
            click: true
          })
        })
      })
    },
    data () {
      return {
        typeid: [],
        typelist: [],
        type: '1',
        list: [],
        isshow: false
      }
    },
    methods: {
      agree (id, event) {
        if (!event._constructed) {
          return
        }
        console.log(id)
      },
      toadd () {
        if (!event._constructed) {
          return
        }
        router.push({path: '/menu/add', query: { typeid: this.typeid }})
      },
      chengtype (num) {
        console.log(num)
        this.$http.get(this.SERVERDOMIAN + '/api/menu/getfoods/typeid/' + num[1]).then(({data}) => {
          this.list = data
          this.$nextTick(() => {
            this.itmescroll = new Bscroll(this.$refs['wrapper'], {
              click: false
            })
          })
        })
      },
      dellfoods (item) {
        router.push({path: '/menu/add', query: item})
      },
      modtype (num) {
        let temp = this.list.filter((item) => {
          return item.check === true
        })
        // 移动的业务逻辑还没写
        console.log(temp)
        this.$http.get(this.SERVERDOMIAN + '/api/menu/getfoods/typeid/' + num[1]).then(({data}) => {
          this.list = data
          this.$nextTick(() => {
            this.itmescroll = new Bscroll(this.$refs['wrapper'], {
              click: false
            })
          })
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
