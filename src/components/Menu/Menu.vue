<template>
    <div class="item-wrapper" ref="wrapper">
        <div>
            <group title="选择种类">
                <popup-picker @on-change="chengtype" title="请选择种类" :data="typelist" :columns="3" v-model="typeid" ref="picker3" show-name></popup-picker>
                <x-button type="primary" @click.native="toadd" >添加 {{$refs.picker3&&$refs.picker3.getNameValues()}} 菜品</x-button>
            </group>
            <panel header="菜单列表"  :list="list" :type="type"></panel>
        </div>
    </div>
</template>

<script>
  import {Panel, PopupPicker, Picker, Divider, XButton, Flexbox, FlexboxItem, CellFormPreview, Cell, TransferDom, Actionsheet, Group, Toast} from 'vux'
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
      Panel
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
      })
      this.$nextTick(() => {
        this.itmescroll = new Bscroll(this.$refs['wrapper'], {
          click: true
        })
      })
    },
    data () {
      return {
        typeid: [],
        typelist: [],
        type: '1',
        list: []
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
