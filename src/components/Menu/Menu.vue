<template>
    <div class="item-wrapper" ref="wrapper">
        <div>
            <group title="选择种类">
                <popup-picker title="请选择种类" :data="typelist" :columns="3" v-model="typeid" ref="picker3" show-name></popup-picker>
                <cell title="您选择的种类" @click.native="test" :value="$refs.picker3&&$refs.picker3.getNameValues()"></cell>
            </group>

        </div>
    </div>
</template>

<script>
  import {PopupPicker, Picker, Divider, XButton, Flexbox, FlexboxItem, CellFormPreview, Cell, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Bscroll from '../../../node_modules/better-scroll'

  export default {
    components: {
      Actionsheet,
      Group,
      XSwitch,
      Toast,
      CellFormPreview,
      Cell,
      XButton,
      Flexbox,
      FlexboxItem,
      PopupPicker,
      Picker,
      Divider
    },
    directives: {
      TransferDom
    },
    created () {
      this.$http.get(this.SERVERDOMIAN + '/api/menu/gettype').then(({data}) => {
        console.log(data)
        console.log(this.list3)
        this.typelist = data
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
        typelist: []
      }
    },
    methods: {
      agree (id, event) {
        if (!event._constructed) {
          return
        }
        console.log(id)
      },
      test () {
        console.log(this.typeid)
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
