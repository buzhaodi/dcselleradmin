<template>
    <div class="item-wrapper" ref="wrapper">
        <div>


        <div style="margin: 10px;overflow: hidden;" v-for="item in list">
            <div @click="topath(item.link)">
            <masker style="border-radius: 2px;" >
                <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}" ></div>
                <div slot="content" class="m-title">
                    {{item.title}}

                </div>
            </masker>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
  import { Masker } from 'vux'
  import Bscroll from '../../../node_modules/better-scroll'
  import VueRouter from 'vue-router'
  const router = new VueRouter()
  export default {
    components: {
      Masker
    },
    data () {
      return {
        list: [{
          title: '分类管理',
          img: 'http://pic.qbaobei.com/Uploads/Picture/2016-03-23/56f204e7f0178.png',
          link: '/sellerseting/Typecontroller'
        }, {
          title: '会员管理',
          img: 'http://file02.16sucai.com/d/file/2014/0617/1c3d19b9455b56681e4efb872016bd71.jpg',
          link: '/sellerseting/vipcontroller'
        }, {
          title: '店面设置',
          img: 'http://pic1.xtuan.com/upload/casePictures/20131015/10595874832.jpg',
          link: '/sellerseting/dmsttting'
        }]
      }
    },
    created () {
      this.$nextTick(() => {
        this.itmescroll = new Bscroll(this.$refs['wrapper'], {
          click: true
        })
      })
    },
    methods: {
      topath (path) {
        router.push(path)
      }
    }
  }
</script>

<style lang="less">
    .m-img {
        padding-bottom: 33%;
        display: block;
        position: relative;
        max-width: 100%;
        background-size: cover;
        background-position: center center;
        cursor: pointer;
        border-radius: 2px;
    }
    .m-title {
        color: #fff;
        text-align: center;
        text-shadow: 0 0 2px rgba(0, 0, 0, .5);
        font-weight: 500;
        font-size: 24px;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 700;
    }
    .m-time {
        font-size: 12px;
        padding-top: 4px;
        border-top: 1px solid #f0f0f0;
        display: inline-block;
        margin-top: 5px;
    }
    .item-wrapper {
        position: absolute;
        width: 100%;
        height: 90%;
        overflow: hidden;
    }
</style>
