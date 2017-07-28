<template>
    <div class="item-wrapper" ref="wrapper">
        <ul>
            <group>
                <cell title="Total" value="￥1024"></cell>
                <cell-form-preview :list="list"></cell-form-preview>

            </group>

            <group>
                <cell title="Total" value="￥1024"></cell>
                <cell-form-preview :list="list"></cell-form-preview>

            </group>
            <group>
                <cell title="Total" value="￥1024"></cell>
                <cell-form-preview :list="list"></cell-form-preview>

            </group>
            <group>
                <cell title="Total" value="￥1024"></cell>
                <cell-form-preview :list="list"></cell-form-preview>

            </group>
        </ul>
    </div>
</template>

<script>
  import {CellFormPreview, Cell, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Bscroll from '../../node_modules/better-scroll'

  export default {
    components: {
      Actionsheet,
      Group,
      XSwitch,
      Toast,
      CellFormPreview,
      Cell
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
