<template>
  <div>
    <div class="floatPage">
      <div class="title_css">
        当前任务进度管理
      </div>
        <div v-for="(item,index) in items">
          <label style="float:left">当前任务：{{progressData[index].task}}</label>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="progressData[index].val"></el-progress>
      </div>
    </div>

    </div>
</template>

<script>
  import {getInfo} from '@/httpConfig/api'
  export default {
    name: "taskProgress",
    data() {
      return {
        totalTaskNum: 0,
        items : [],
        text : 0,
        progressData: []
      }
    },
    created(){
      this.getinfo()
    },
    methods : {

      addProgress(proData, taskName){

        this.progressData.push({val: proData, task: taskName});
        this.items.push(this.text++);
      },
      deleteProgress : function(){
        this.items.pop(this.text);
      },
      updateProgressData(proData, taskName, index){
        this.progressData[index].val = proData;
        this.progressData[index].task =taskName;
      },

      getinfo(){
        getInfo().then((response) => {
          let objArray = response.data.obj;
          console.log(objArray);
          if (objArray === undefined || objArray.length <= 0){
            return 0;
          }
          else{
            let progressId = 0;               //用于在progressData中找到对应的值
            let correctTaskNum = 0;
            for(let i=0; i < objArray.length; i++)
            {
              if(objArray[i].length > 0){
                correctTaskNum++;
              }
            }

            for(let i=0; i < objArray.length; i++)
            {
              if(objArray[i].length > 0){
                if(this.totalTaskNum < correctTaskNum){
                  this.addProgress(0,'NULL');
                  this.totalTaskNum++;
                }
                this.handleInfo(objArray[i], progressId);
                progressId++;
              }
            }
          }
          setTimeout(()=>{this.getinfo()}, 5000);                 // 递归调用轮询
        }).catch((error) => {
          console.log(error);
        });
      },
      handleInfo(array, index){
        let id = '0';
        let cnt = '0';
        let finishFlag = '0';
        let breakFlag = '0';
        let count = '0';
        let taskName = 'NULL';
        for(let i=0; i<array.length; i++)
        {
          if(array[i].Name === 'UserId'){id = array[i].Value}
          if(array[i].Name === 'cnt'){cnt = array[i].Value}
          if(array[i].Name === 'breakdown'){breakFlag = array[i].Value}
          if(array[i].Name === 'taskName'){taskName = array[i].Value}
          if(array[i].Name === 'count'){count = array[i].Value}
          if(array[i].Name === 'finish'){finishFlag = array[i].Value}
        }

        if (breakFlag === '1'){
          this.progressNum = 0;
          taskName += ' 状态： breakdown';
        }
        else {
          if (finishFlag === '0'){
            taskName += ' 状态： doing';
            if (count === '0'){
              this.progressNum = 0;
            }
            else{
              if (cnt <= count){
                this.progressNum = +(cnt*100/count).toFixed(2);    // 加上+变成number类型
              }
              else{
                this.progressNum = 99.99
              }
            }
          }
          else{
            taskName += ' 状态： done';
            this.progressNum = 100
          }
        }
        // this.$refs.myProgress.updateProgressData(this.progressNum, taskName, index)
        this.updateProgressData(this.progressNum, taskName, index);
      },
    }
  }
</script>



<style scoped>
  .floatPage{
    /*border: 0px ;*/
    /*display: inline-block;*/
    padding: 10px 10px 10px 10px;
    margin: 10px 10% 10px 10%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }
  .title_css{
    font-size: 20px;
    padding-bottom: 20px;
  }
</style>
