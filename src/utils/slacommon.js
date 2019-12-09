import Vue from 'vue';
import ElementUI from 'element-ui';
export default{
    inject:['inHours','notify'],
    formatDateTime:function(date) {  
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        let h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        let minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        let second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;  
    },    
    check:function(loading,formData,serviceType){
        console.log("formData.serviceType:",formData.serviceType);
        console.log("serviceType:",serviceType);
        if((formData.serviceType==null||formData.serviceType=='')&&serviceType==2){
            ElementUI.Message({ 
                message:'请选择服务类型!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.arriveTime==null){
            ElementUI.Message({
                message:'请填写到场时间!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.leaveTime==null){
            ElementUI.Message({
                message:'请填写离场时间!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.realWork==null&&serviceType==2){
            ElementUI.Message({
                message:'请填写实际工时!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.workResult==null&&serviceType==2){
            ElementUI.Message({
                message:'请填写工作结果!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        
        if(formData.userAndPrjItem.workContent==null&&serviceType==2){
            ElementUI.Message({
                message:'请填写工作内容!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.problemPlan==null&&serviceType==2){
            ElementUI.Message({
                message:'请填写存在问题!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.faultDesc==null&&serviceType==1){
            ElementUI.Message({
                message:'请选择工作结果!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.analysis==null&&serviceType==1){
            ElementUI.Message({
                message:'请填写分析诊断!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.implementResult==null&&serviceType==1){
            ElementUI.Message({
                message:'请填写实施结果!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        if(formData.userAndPrjItem.problemSuggest==null&&serviceType==1){
            ElementUI.Message({
                message:'请填写遗留问题及建议!',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
            loading.close();
            return false
        }
        return true;
    },
    beforeConfirmCheck(loading,checked,formData){
      if(checked[0].ifY1==true&&formData.caseServiceQuestion.operationStarttime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择操作开始时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[0].ifY1==true&&formData.caseServiceQuestion.operationEndtime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择操作结束时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[1].ifY2==true&&formData.caseServiceQuestion.stopStarttime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择停机开始时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[1].ifY2==true&&formData.caseServiceQuestion.stopEndtime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择停机结束时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[2].ifY3==true&&formData.caseServiceQuestion.lastbackupTime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择选项3最近一次备份时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[4].ifY5==true&&formData.caseServiceQuestion.beforeLastbackupTime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择选项5最近一次备份时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[5].ifY6==true&&formData.caseServiceQuestion.backuptestTime==null){
          loading.close();
          ElementUI.Message({
              message:'请选择备份测试时间',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[0].ifY1==true&&checked[0].ifF1==true||checked[0].ifY1==false&&checked[0].ifF1==false){
          loading.close();
          ElementUI.Message({
              message:'序号1请选择是或者否,不能全选或不选!',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[1].ifY2==true&&checked[1].ifF2==true||checked[1].ifY2==false&&checked[1].ifF2==false){
          loading.close();
          ElementUI.Message({
              message:'序号2请选择是或者否,不能全选或不选!',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[2].ifY3==true&&checked[2].ifF3==true||checked[2].ifY3==false&&checked[2].ifF3==false){
          loading.close();
          ElementUI.Message({
              message:'序号3请选择是或者否,不能全选或不选!',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[3].ifY4==true&&checked[3].ifF4==true||checked[3].ifY4==false&&checked[3].ifF4==false){
          loading.close();
          ElementUI.Message({
              message:'序号4请选择是或者否,不能全选或不选!',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[4].ifY5==true&&checked[4].ifF5==true||checked[4].ifY5==false&&checked[4].ifF5==false){
          loading.close();
          ElementUI.Message({
              message:'序号5请选择是或者否,不能全选或不选!',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      if(checked[5].ifY6==true&&checked[5].ifF6==true||checked[5].ifY6==false&&checked[5].ifF6==false){
          loading.close();
          ElementUI.Message({
              message:'序号6请选择是或者否,不能全选或不选!',
              type: 'warning',
              center: true,
              customClass:'msgdefine'
          });
          return false
      }
      return true
  },
  customerInfoCheck:function(loading,customerForm){
      
    if(customerForm.empname===''){
        ElementUI.Message({
            message:'请选择客户联系人!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
    }
    if(customerForm.mobileno===''){
        ElementUI.Message({
            message:'请选择客户联系人电话!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
    }
    return true
  },
  beforeConfirmSubmitCheck:function(loading,temp,checked){
    if((temp.operationStarttime!=null&&checked[0].ifY1==false)||(temp.operationEndtime!=null&&checked[0].ifY1==false)){
        loading.close();
        ElementUI.Message({
            message:'序号1请选择是,取消否!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        return false;        
    }
    if((temp.stopStarttime!=null&&checked[1].ifY2==false)||(temp.stopEndtime!=null&&checked[1].ifY2==false)){
        loading.close();
        ElementUI.Message({
            message:'序号2请选择是,取消否!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        return false;         
    }
    if(temp.lastbackupTime!=null&&checked[2].ifY3==false){
        loading.close();
        ElementUI.Message({
            message:'序号3请选择是,取消否!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        return false;                       
    }
    if(temp.beforeLastbackupTime!=null&&checked[4].ifY5==false){
        loading.close();
        ElementUI.Message({
            message:'序号5请选择是,取消否!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        return false;                       
    }
    if(temp.backuptestTime!=null&&checked[5].ifY6==false){
        loading.close();
        ElementUI.Message({
            message:'序号6请选择是,取消否!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        return false;                       
    }
    return true
  },
  getServiceType:function(workTypeId,serviceType){
    if(this.workTypeId=='XCSS'){//现场实施用case故障处理
        serviceType = 1;
    }else if(workTypeId=='XXSJ'||workTypeId=='XJ'||workTypeId=='XJBG'||workTypeId=='ZCFW'||workTypeId=='JSZC'){
        serviceType = 2
    }else{
        serviceType = 0//无服务单
    }
    console.log("serviceType111",serviceType);
    return serviceType
  }
}