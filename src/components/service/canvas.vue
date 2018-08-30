<template>
  <div class="hello">
<!--touchstart,touchmove,touchend,touchcancel 这-->
    <el-form ref="form" :model="form" style="display:flex">
        <el-form-item>
            <el-button type=""  @click="clear">清除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="save">保存</el-button>
        </el-form-item>
    </el-form>
    <!-- <button v-on:click="save">保存</button> -->
    <canvas id="canvas" width="300" height="600" style="border:1px solid black">Canvas画板</canvas>
  </div>
</template>

<script>
var draw;
var preHandler = function(e){e.preventDefault();}
class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        this.stage_info = canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    init(btn) {
        var that = this; 
        
        this.canvas.addEventListener('touchstart', function(event) {
            document.addEventListener('touchstart', preHandler, false); 
            that.drawBegin(event)
        })
        this.canvas.addEventListener('touchend', function(event) { 
            document.addEventListener('touchend', preHandler, false); 
            that.drawEnd()
            
        })
        this.clear(btn)
    }
    drawBegin(e) {
        var that = this;
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = "#000"
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
        canvas.addEventListener("touchmove",function(){
            that.drawing(event)
        })
    }
    drawing(e) {
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke()
    }
    drawEnd() {
        document.removeEventListener('touchstart', preHandler, false); 
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear(btn) {
        this.cxt.clearRect(0, 0, 300, 600)
    }
    save(){
       return canvas.toDataURL("image/png")
    }
}

export default {
    props: ['queryData'],
    data () {
        return {
        form:{
            imgStrQuestion:''
        },
        msg: 'Welcome to Your Vue.js App',
        val:true,
        url:""
        }
    },
  mounted() {
      draw=new Draw('canvas');
      draw.init();
    //   let data = {
    //     popBg: false
    //   }
    //   this.$emit('change', data)
  },
  methods:{
    clear:function(){
        draw.clear();
        let data = {
            popBg: false
        }
        this.$emit('change', data)
    },
    save(){
        var data1=draw.save();
        let form = this.form;
        this.form.imgStrQuestion = data1;
        // console.log(this.form.imgStrQuestion);
        this.$emit('search', this.form.imgStrQuestion)
        let data = {
            popBg: false
        }
        this.$emit('change', data)
    },
    noKeyword () {
      document.activeElement.blur()
    },

} } </script> <!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped> 
    h1, h2 { font-weight: normal; } 
    ul { list-style-type: none; padding: 0; } 
    li { display: inline-block; margin: 0 10px; } 
    a { color: #42b983; } 
    #canvas { background: #ffffff; cursor: default; } 
    #keyword-box { margin: 10px 0; } 
    .hello{display: inline-block}
</style>