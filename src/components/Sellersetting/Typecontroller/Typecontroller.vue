<template>
    <div class="item-wrapper" ref="wrapper">
        <div>
            <tab :animate="false">
                <tab-item active-class="active-6-1" selected @on-item-click="check">常规</tab-item>
                <tab-item active-class="active-6-2"  @on-item-click="check">满减</tab-item>
                <tab-item active-class="active-6-3"  @on-item-click="check">折扣</tab-item>
                <tab-item active-class="active-6-4"  @on-item-click="check">特价</tab-item>
            </tab>

        {{activetab}}

        </div>
    </div>
</template>

<script>
  import {Tab, TabItem, Divider, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Bscroll from '../../../../node_modules/better-scroll'

  export default {
    components: {
      Actionsheet,
      Group,
      XSwitch,
      Toast,
      TabItem,
      Tab,
      Divider
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
        activetab: 0
      }
    },
    methods: {
      check (event) {
        this.activetab = event
      }
    },
    computed: {
      nowcheck: function () {
        return console.log(this.activetab)
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
