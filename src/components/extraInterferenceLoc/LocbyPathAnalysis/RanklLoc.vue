<template>
  <div class="floatPage">
    <div class="title_css">
      基于排序模型的网外干扰源定位
    </div>
    <el-form
      ref="SDTForm"
      :model="SDTForm"
      :rules="rules"
      label-width="150px"
      type="flex"
      justify="center"
      border
      style="margin:10px 10% 10px 10%;;min-width:600px;"
    >
      <el-form-item label="扫频路测版本号INF" prop="virname">
        <el-input  v-model="SDTForm.virname"></el-input>
      </el-form-item>

      <el-form-item label="候选栅格TOP K" prop="k">
        <el-input type="ratioAPW" v-model="SDTForm.k"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button
          type="primary"
          @click="addSubmit()"
          :loading="addLoading"
        >提交</el-button>
        <el-button @click="cancleSubmit()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Bus from '../../../store/bus'
  import {RankLoc} from "@/httpConfig/api";

  export default {
    name: 'RanklLoc',
    data () {
      return {
        addLoading: false,
        SDTForm: {
          virname:"Test_v4",
          ratioAP: '0.5',
          ratioP: '0.2',
          ratioAPW: '0.3',
          k:'1'
        },
        rules: {
          virname: [
            {required: true, message: '请输入扫频路测版本号', trigger: 'blur'}
          ],
          // ratioAP: [
          //   {required: true, message: '请输入选点个数', trigger: 'blur'}
          //
          // ],
          // ratioP: [
          //   {required: true, message: '请输入点间角约束', trigger: 'blur'}
          // ],
          // ratioAPW: [
          //   {required: true, message: '请输入点间距约束', trigger: 'blur'}
          // ],
          k: [
            {required: true, message: '请输入候选栅格个数k', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      addSubmit: function () {
        this.$refs.SDTForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = this.SDTForm;
              console.log(this.SDTForm);
              RankLoc(para).then((res) => {
                this.addLoading = false;
                if (res && res.data.ok) {
                  console.log(res);
                  let msg = res.data.msg;
                  // let lat = res.data.obj.lat;
                  // let lon = res.data.obj.lon;

                  var posArray = res.data.obj

                  for(var i = 0; i < posArray.length; i++) {
                    console.log(posArray[i])
                    Bus.$emit('locLatLon',posArray[i].Latitude, posArray[i].Longitude, this.SDTForm.virname,posArray[i].ansID);
                  }

                  // console.log(lat);
                  // console.log(lon);
                  // Bus.$emit('locLatLon',lat, lon, this.SDTForm.virname);
                  this.$message.success({message: msg});
                  this.$router.push({ path: "/index"});
                }
              });
            });
          }
        });
      },
      cancleSubmit: function () {
        this.$refs['SDTForm'].resetFields();
        //this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>

  .floatPage {
    /*border: 0px ;*/
    /*display: inline-block;*/
    padding: 10px 10px 10px 10px;
    margin: 10px 10% 10px 10%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }

  .title_css {
    font-size: 20px;
    padding-bottom: 20px;
  }
</style>
