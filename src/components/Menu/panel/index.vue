<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd" v-if="header" @click="onClickHeader" v-html="header"></div>
    <div class="weui-panel__bd">
      <!--type==='1'-->
      <template v-if="type === '1'">


      </template>
        <swipeout>
            <swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15" :key="item.id" v-for="(item, index) in list" >
                <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick(item.id)" type="warn" :width="70">删除</swipeout-button>
                </div>
                <div slot="content" class="demo-content vux-1px-b">
                    <a :href="getUrl(item.url)" class="weui-media-box weui-media-box_appmsg">
                        <div v-show="isshow" class="weui-cells weui-cells_checkbox" @click="check(index)">
                            <label class="weui-cell weui-check_label"  >
                                <div class="weui-cell__hd">
                                    <input type="checkbox" class="weui-check" name="111" v-model="item.check"  >
                                    <i class="weui-icon-checked vux-checklist-icon-checked"></i>
                                </div>
                            </label>
                        </div>


                        <span class="stopwrapper"  @click.prevent="onItemClick(item)" >
                              <div class="weui-media-box__hd" v-if="item.src">
                                <img class="weui-media-box__thumb" :src="item.src" alt="">
                              </div>
                              <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">{{item.title}}</h4>
                                <p class="weui-media-box__desc">{{item.desc}}</p>
                              </div>
                        </span>
                    </a>
                </div>
            </swipeout-item>
        </swipeout>

    </div>
    <div class="weui-panel__ft">
      <a class="weui-cell weui-cell_access weui-cell_link" :href="getUrl(footer.url)" v-if="footer && type !== '3'" @click.prevent="onClickFooter">
        <div class="weui-cell__bd" v-html="footer.title"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { go, getUrl } from '../../../../node_modules/vux/src/libs/router'
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
export default {
  name: 'panel',
  components: {
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  props: {
    header: String,
    footer: Object,
    list: Array,
    type: {
      type: String,
      default: '1'
    },
    isshow: false
  },
  data () {
    return {
      currentValue: true,
      text: true,
      disabled: false
    }
  },
  methods: {
    getUrl (url) {
      return getUrl(url, this.$router)
    },
    onClickFooter () {
      this.$emit('on-click-footer')
      go(this.footer.url, this.$router)
    },
    onClickHeader () {
      this.$emit('on-click-header')
    },
    onItemClick (item) {
      this.$emit('on-click-item', item)
      go(item.url, this.$router)
    },
    check (index) {
      this.list[index].check = !this.list[index].check
    },
    onButtonClick (id) {
      console.log(id)
      this.$http.get(this.SERVERDOMIAN + '/api/menu/delfood/id/' + id).then(({data}) => {
        if (data.status === 'success') {
          this.$http.get(this.SERVERDOMIAN + '/api/menu/getfoods').then(({data}) => {
            this.list = data
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';
@import '../../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_access';
@import '../../../../node_modules/vux/src/styles/weui/widget/weui_panel/weui_panel';
@import '../../../../node_modules/vux/src/styles/weui/widget/weui_media_box/weui_media_box';
@import '../../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_check';

.weui-cells_checkbox:before {
  display: none;
}
.weui-cells_checkbox:after {
  display: none;
}
.weui-cells_checkbox {
  padding: 0;
}
.weui-cells_checkbox {
  margin-top: 0;
  background-color: #FFFFFF;
  line-height: 1.41176471;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}
.weui-media-box_appmsg .stopwrapper .weui-media-box__hd {
  margin-right: .8em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
.weui-media-box_appmsg .stopwrapper .weui-media-box__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
  display: inline-block;
  vertical-align: top;
}
</style>
