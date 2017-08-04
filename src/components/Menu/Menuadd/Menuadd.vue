<template>
    <div class="item-wrapper" ref="wrapper">
         <div>
             <group title="选择种类">
                <popup-picker title="请选择种类" :data="typelist" :columns="3" v-model="typeid" ref="picker3" show-name></popup-picker>
             </group>
             <group>
                 <x-input title="菜名" v-model="topost.name" required  placeholder="输入菜名"></x-input>
                 <x-input title="价格" v-model="topost.price" required is-type="number"  placeholder="请输入价格 数字如37.2"></x-input>
                 <x-input title="原价" v-model="topost.oldPrice" required is-type="number"  placeholder="数字 可不填"></x-input>
                 <x-input title="一句话描述" v-model="topost.description" required is-type="text"  placeholder="一句话描述"></x-input>
                 <x-input title="详细介绍" v-model="topost.info" required is-type="text"  placeholder="详细介绍一下咱们的菜吧"></x-input>
                 <uploader
                         :max="max"
                         :images="images"
                         :upload-url="uploadUrl"
                         size="normal"
                         :handleClick="false"
                 ></uploader>
                 <x-button type="primary" @click.native="addcai">确定</x-button>
             </group>
             <br>
             <br>
             <br>

         </div>
    </div>
</template>

<script>
  import {XInput, PopupPicker, Picker, XButton, CellFormPreview, Cell, TransferDom, Actionsheet, Group, XSwitch, Toast} from 'vux'
  import Bscroll from '../../../../node_modules/better-scroll'
  import Uploader from 'vux-uploader'
  export default {
    components: {
      Actionsheet,
      Group,
      XSwitch,
      Toast,
      CellFormPreview,
      Cell,
      XButton,
      PopupPicker,
      Picker,
      XInput,
      Uploader
    },
    directives: {
      TransferDom
    },
    created () {
      this.$http.get(this.SERVERDOMIAN + '/api/menu/gettype').then(({data}) => {
        this.typelist = data
      })
      this.$nextTick(() => {
        this.itmescroll = new Bscroll(this.$refs['wrapper'], {
          click: true
        })
        if (this.$route.query.name) {
          this.typeid = ['', this.$route.query.type]
          this.topost = this.$route.query
          this.images = [{url: this.$route.query.image, urlsmall: this.$route.query.icon}]
          console.log(this.$route.query)
        } else {
          this.typeid = this.$route.query.typeid
        }
      })
    },
    data () {
      return {
        typeid: [],
        typelist: [],
        topost: {},
        max: 1,
        images: [],
        uploadUrl: this.SERVERDOMIAN + '/api/menu/addimg'
      }
    },
    methods: {
      agree (id, event) {
        if (!event._constructed) {
          return
        }
        console.log(id)
      },
      addcai () {
        if (!event._constructed) {
          return
        }
        if (!this.images[0]) {
          this.$vux.alert.show({
            title: '错误',
            content: '请选择图片'
          })
          return
        }
        this.topost.type = this.typeid ? this.typeid[1] : null
        this.topost.image = this.images ? this.images[0]['url'] : null
        this.topost.icon = this.images ? this.images[0]['urlsmall'] : null
        this.$http.post(this.SERVERDOMIAN + '/api/menu/addfood', this.topost).then((data) => {
          data.data.status === 'error' ? data.data.status = '添加失败' : data.data.status = '添加成功'
          this.$vux.alert.show({
            title: data.data.status,
            content: data.data.msg
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
