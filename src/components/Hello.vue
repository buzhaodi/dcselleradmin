<template>
    <div class="item-wrapper" ref="wrapper">
        <ul>
            <group>
                <cell title="总金额（未支付)" value="￥1024"></cell>
                <cell-form-preview :list="list"></cell-form-preview>
                    <flexbox>
                    <flexbox-item>
                        <x-button type="warn">退单</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="primary" @click.native="agree(222,$event)">完成</x-button>
                    </flexbox-item>
                </flexbox>
            </group>
        </ul>
    </div>
</template>

<script>
  import {XButton, Flexbox, FlexboxItem, CellFormPreview, Cell, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Bscroll from '../../node_modules/better-scroll'

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
      FlexboxItem
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
        list: [{
          label: 'Apple',
          value: '3.29'
        }, {
          label: 'Banana',
          value: '1.04'
        }, {
          label: 'Fish',
          value: '8.00'
        }]
      }
    },
    methods: {
      agree (id, event) {
        if (!event._constructed) {
          return
        }
        console.log(id)
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
