<!--SLA反馈-->
<template>
  <div class="workBenchSLAfeedback">
    <header-last :title="SLAfeedbackTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="tabheader">
        <el-row>
          <el-col :span="7" style="text-align:left"> 反馈项</el-col>
          <el-col :span="8">反馈时间</el-col>
          <el-col :span="6">说明</el-col>
          <el-col :span="3">状态</el-col>
        </el-row>
      </div>
      <div class="tabdetail">
        <el-row v-for="item in SLAObj" :key="item.slaTypeId"><!--这几条数据在一个json数组slaStatus中，workid相同。-->
          <el-col :span="7"><div style="text-align:left">{{item.slaType}}</div></el-col>
          <el-col :span="8" v-if="item.operateDate!=null"><div style="font-size:0.13rem;line-height:0.2rem;">{{item.operateDate}}</div></el-col>
          <el-col :span="8" v-else><div style="font-size:0.13rem;line-height:0.2rem;">无</div></el-col>
          <el-col :span="6"><div style="word-wrap: break-word;font-size:0.13rem;padding-right:5px;line-height:0.2rem;">{{item.feedbackDescription}}</div></el-col><!--反馈说明-->
          <el-col :span="3" style="float:right;color:#2698d6" >
            <div v-if="item.ifFeedback==0" @click="dialogopen(item.slaTypeId)">反馈</div>
            <div v-if="item.ifFeedback!=0" style="color:#666666" >已反馈</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="SLAdialog">
      <el-dialog :visible.sync="dialogVisible0" width="80%" :show-close=false class="dialog">
        <el-form class="form1" style="color:#333333">
          <el-form-item label="反馈时间">
            <el-input class="input1" :value="date" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="typeid!=='4'&&typeid!=='7'">
            <el-input v-if="typeid==6" type="textarea" :rows="4" placeholder="请简要描述所做操作及处理结果。例如，更换25盘柜上的13号硬盘后，存储状态恢复正常。" v-model="form.des1" style="font-size:6px"></el-input>
            <el-input v-else  type="textarea" placeholder="请填写说明" v-model="form.des1" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button @click="dialogVisible0 = false">取消</el-button>
            <el-button type="primary" class="onsubmit" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="SLAdialog">
      <el-dialog title="任务反馈" :visible.sync="dialogVisible1" width="80%">
        <el-form class="form1">
          <el-form-item  label="原因">
            <el-radio-group v-model="form.des2" style="font-size:6px">
              <el-radio :label="1">故障定位不准确</el-radio><br>
              <el-radio :label="2">现场备件不可用</el-radio><br>
              <el-radio :label="3">操作失误</el-radio><br>
              <el-radio :label="4">客户取消任务</el-radio><br>
              <el-radio :label="5">实施时间不够</el-radio><br>
              <el-radio :label="6">其他</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="解决不成功原因">
            <el-input type="textarea" :rows="3" placeholder="请填写说明" v-model="form.des3" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item  class="submit">
            <el-button @click="dialogVisible1 = false" >取 消</el-button>
          <el-button type="primary"  class="onsubmit"  @click="onSubmit">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="dialogdc">
      <el-dialog
        top="5%"
        width="100%"
        :visible.sync="showModal"
        :show-close="false"
        :fullscreen="true"
        center>
        <div class="countDiv">
          <button class="countButton">{{seconds}}</button>
        </div>
        <div><img :src="require('../../assets/images/'+bgDef)" alt="" style="background-repeat:no-repeat;background-size:contain;display:block"></div>
      </el-dialog>
    </div>
    <div class="dialogdc">
      <el-dialog
        top="5%"
        width="100%"
        :visible.sync="checkdcFlag"
        :show-close="false"
        :fullscreen="true"
        center>
        <el-form class="form1">
        <div>
            <div class="warnTextView">
                <li>每一次严谨，都是风险的消逝！</li>
                <li>风险事故猛于虎！请！立刻！马上！谨慎起来！</li>
            </div>
            <div class="imgView">
                <div class="imgViewCol"><img src="../../assets/images/warn.jpg" alt=""></div>
                <div class="imgViewCol"><img src="../../assets/images/taskWork.jpg" alt=""></div>
                <div class="imgViewCol"><img src="../../assets/images/warnLogo.jpg" alt=""></div>           
            </div>
            <div class="itemsView">
                <div class='itemView'>确认对象</div>
                <div class='itemView'>核实环境</div>
                <div class='itemView'>每步核对</div>
                <div class='itemView'>检查结果</div>
                <div class='itemView'>改前备份</div>
                <div class='itemView'>改后记录</div>
                <div class='itemView'>意外发生</div>
                <div class='itemView'>升级确认</div>
            </div>
            <div style="text-indent: 2em;padding:0.1rem;color:#B22222">如果这道题你都答不出来，赶紧连线你的部门经理手把手教你操作。</div>
            <div style="text-indent: 2em;padding:0.1rem">{{questionObj.QUESTION}}</div>
            <el-form-item prop="options" class="radioView">
                <el-checkbox-group 
                    v-model="form.option" 
                    :min="0"
                    :max="4"
                    v-for="item in questionObj.options" 
                    :key="item.OPTION_ID">
                    <el-checkbox :label="item.OPTION_ID"><div class="optionTextView">{{item.OPTION_NAME}}</div></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </div>
        <el-form-item  class="submit">
            <el-button type="primary"  class="onsubmit" @click="questionSubmit('form')">提 交</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>      
    </div>
    <!-- 答错问题提示 -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="warnVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{wrongMessage}}</span>
          </div>
          <el-form-item class="submit">
            <el-button type="primary" class="onsubmit" @click="getNewQuestion()">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 短信提醒询问框phoneVisible -->
    <div class="dialogdc">
        <el-dialog
            title="提示"
            :visible.sync="phoneVisible"
            :show-close="false"
            width="80%"
            center>
            <el-form>
                <div style="margin:0.2rem">
                    <span>已向客户发送短信提示进行客户评价，请协助提醒客户进行评价</span>
                </div>
                <el-form-item class="submit">
                    <el-button type="primary" class="onsubmit" @click="confirmSendSuccess()" >确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
    <!-- 实施结果任务反馈 taskVisible-->
    <div class="dialogdc">
      <el-dialog
        :visible.sync="taskVisible"
        :show-close="false"
        width="50%"
        center>
        <el-form>
          <el-form-item label="请选择任务是否完成" class="radioView">
            <el-radio-group v-model="form.taskradio" @change="taskRadio(feedbackType)">
                <div style="line-height:0.3rem">
                  <el-radio :label="1">任务已完成</el-radio>
                </div>
                <div style="line-height:0.3rem">
                  <el-radio :label="2">任务未完成 </el-radio>
                </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 实施结果故障反馈 caseVisible-->
    <div class="dialogdc">
      <el-dialog
        :visible.sync="caseVisible"
        :show-close="false"
        width="50%"
        center>
        <el-form>
          <el-form-item label="请选择故障是否解决" class="radioView">
            <el-radio-group v-model="form.caseradio" @change="caseRadio()">
                <div style="line-height:0.3rem">
                  <el-radio :label="1">故障解决</el-radio>
                </div>
                <div style="line-height:0.3rem">
                  <el-radio :label="2">故障解决不成功</el-radio>
                </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 请先完成结果反馈再进行离场feedbackVisible -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="feedbackVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{feedbackDesc}}</span>
          </div>
          <el-form-item class="submit">
            <el-button type="primary" class="onsubmit" @click="feedbackVisible = false" >确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 工单类型为“现场实施”或“现场信息搜集”，工程师点击“离场”逻辑弹框workTypeVisible -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="workTypeVisible"
        :show-close="false"
        width="80%"
        center>
        <el-form>
          <div style="margin:0.2rem">
            <span>{{workTypeWarn}}</span>
          </div>
          <el-form-item class="submit">
            <el-button type="primary" class="onsubmit" @click="workTypeVisible = false" v-if="workTypeStatus==1">确 定</el-button>
            <el-button type="primary" class="onsubmit" @click="confirm()" v-if="workTypeStatus==2">是</el-button>
            <el-button @click="onrefuse()" v-if="workTypeStatus==2">否</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 实施前确认 -->
    <div class="dialogdc workconfirm">
      <el-dialog
        top="5%"
        width="100%"
        title="实施前确认"
        :visible.sync="workConfirmFlag"
        :show-close="false"
        :fullscreen="true"
        center>
        <div class="warnTextView confirmWarn">为确保用户业务连续性及数据安全，请现场工程师务必就以下事项与用户详细沟通，用户确认后方可开始操作：</div>
        <div class="confirmView">
            <el-form :model="formData" ref="formData">
                <div style="padding:0 0.1rem">
                    <el-form-item>
                        <div>1.用户已将维护窗口安排在业务非高峰时段</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[0].ifY1" @change="changeIfY1"></el-checkbox>
                            <div>操作时间</div>
                        </div>
                        <el-form-item label="从：" style="margin-bottom:0.05rem">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.operationStarttime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择开始时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="至：">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.operationEndtime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择结束时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[0].ifF1" @change="changeIfF1"></el-checkbox>
                        </div> 
                    </el-form-item>
                    <el-form-item>
                        <div>2.用户已申请停机维护窗口</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[1].ifY2" @change="changeIfY2"></el-checkbox>
                            <div>停机时间</div>
                        </div>
                        <el-form-item label="从：" style="margin-bottom:0.05rem">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.stopStarttime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择开始时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="至：">
                            <el-col :span="15">
                                    <el-date-picker
                                    v-model="formData.caseServiceQuestion.stopEndtime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择结束时间"
                                    style="width:100%">
                                    </el-date-picker>
                            </el-col>
                        </el-form-item>                    
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[1].ifF2" @change="changeIfF2"></el-checkbox>
                        </div> 
                    </el-form-item>
                    <el-form-item>
                        <div>3、对于涉及重启或配置变更的服务实施</div>
                        <div>用户事先完成了操作系统的备份工作</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[2].ifY3" @change="changeIfY3"></el-checkbox>
                            <div>最近一次备份时间：</div>
                        </div>
                        <div class="block">
                            <el-date-picker
                            v-model="formData.caseServiceQuestion.lastbackupTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                            </el-date-picker>
                        </div>   
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[2].ifF3" @change="changeIfF3"></el-checkbox>
                        </div>                     
                    </el-form-item>
                    <el-form-item>
                        <div>4.服务开始前，用户保留了相关配置信息和文档</div>
                        <div>用于可能必要的恢复</div>
                        <el-form-item label="是：">
                            <el-checkbox v-model="checked[3].ifY4" @change="changeIfY4"></el-checkbox>
                        </el-form-item>
                        <el-form-item label="否：">
                            <el-checkbox v-model="checked[3].ifF4" @change="changeIfF4"></el-checkbox>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <div>5.用户在服务开始前完成了业务相关数据备份</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[4].ifY5" @change="changeIfY5"></el-checkbox>
                            <div>最近一次备份时间：</div>
                        </div>       
                        <div class="block">
                            <el-date-picker
                            v-model="formData.caseServiceQuestion.beforeLastbackupTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                            </el-date-picker>
                        </div>  
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[4].ifF5" @change="changeIfF5"></el-checkbox>
                        </div>               
                    </el-form-item>
                    <el-form-item>
                        <div>6.用户针对这些备份做过备份恢复测试</div>
                        <div class="selectBox">
                            <div>是：</div>
                            <el-checkbox v-model="checked[5].ifY6" @change="changeIfY6"></el-checkbox>
                            <div>备份测试时间：</div>
                        </div>       
                        <div class="block">
                            <el-date-picker
                            v-model="formData.caseServiceQuestion.backuptestTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间">
                            </el-date-picker>
                        </div>  
                        <div class="selectBox">
                            <div>否：</div>
                            <el-checkbox v-model="checked[5].ifF6" @change="changeIfF6"></el-checkbox>
                        </div>               
                    </el-form-item>
                    <div style="margin:0 0.1rem">神州数码工程师已按规范要求就本次服务内容、影响和风险与用户进行了沟通，同意神州数码工程师开始服务实施。</div>
                    
                    <el-form-item label="日期：">
                        <el-col :span="15">
                                <el-date-picker
                                v-model="formData.caseServiceQuestion.serviceTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width:100%">
                                </el-date-picker>
                        </el-col>
                    </el-form-item>  
                </div>
                <div style="height: 0.6rem;"></div>
                <el-form-item class="serviceSubmitBtn">
                    <el-button type="primary" @click="submitForm('formData')">提交</el-button>
                </el-form-item>
            </el-form>
        </div> 
      </el-dialog>
    </div>
    <!--完成后总结-->
    <div class="dialogdc workconfirm">
      <el-dialog
        top="5%"
        width="100%"
        title="完成后总结"
        :visible.sync="summaryFlag"
        :show-close="false"
        :fullscreen="true"
        center>
          <div class="serviceInfoCell">
            <div class="serviceInfoTit">用户及项目信息</div>
            <div class="serviceContent">
                <el-form :model="formData" ref="formData">
                    <div style="padding:0 0.1rem">
                        <ul class="tableTd">
                            <li>
                                <span>服务单号</span>
                                <span>{{formData.userAndPrjItem.serviceCd}}</span>
                            </li>
                            <li>
                                <span>项目编号</span>
                                <span>{{formData.userAndPrjItem.projectCode}}</span>
                            </li>
                            <li>
                                <span>项目名称</span>
                                <span>{{formData.userAndPrjItem.projectName}}</span>
                            </li>
                            <li>
                                <span>用户单位</span>
                                <span>{{formData.userAndPrjItem.customerName}}</span>
                            </li>
                            <li>
                                <span>联系人</span>
                                <span>{{formData.userAndPrjItem.realname}}</span>
                            </li>
                            <li>
                                <span>联系电话</span>
                                <span>{{formData.userAndPrjItem.contactMobile}}</span>
                            </li>
                            <li>
                                <span>事件编号</span>
                                <span>{{formData.userAndPrjItem.caseCd}}</span>
                            </li>
                            <li v-if="serviceType==2">
                                <span>工程师姓名</span>
                                <span>{{formData.userAndPrjItem.enginnername}}</span>
                            </li>
                        </ul>
                        <el-form-item v-if="serviceType==2" label="服务类型">
                            <el-col :span="15">
                                <el-select clearable placeholder="请选择服务类型" v-model="formData.serviceType" style="width:100%">
                                    <el-option v-for="item in serviceTypeArr" :label="item.DICTNAME" :value="item.DICTID" :key="item.value">
                                </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="到场时间">
                            <el-col :span="15">
                                <el-date-picker
                                v-model="formData.userAndPrjItem.arriveTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="离场时间">
                            <el-col :span="15">
                                <el-date-picker
                                v-model="formData.userAndPrjItem.leaveTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择时间"
                                style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <div v-if="serviceType==2">
                            <el-form-item label="实际实用工时">
                                <el-col :span="12">
                                <el-input v-model="formData.userAndPrjItem.realWork" placeholder="请输入使用工时" style="width:100%"></el-input>
                                </el-col>
                            </el-form-item>
                            <div class="article">{{content}}</div>
                            <el-form-item>
                                <el-input type="textarea" v-model="formData.userAndPrjItem.workContent" placeholder="请输入工作内容"></el-input>
                            </el-form-item>
                            <div class="article">{{result}}</div>
                            <el-form-item>
                                <el-radio-group v-for="item in workResultArr" :key="item.id" v-model="formData.workResult">
                                    <el-radio :label="item.DICTID" style="width:100%;margin-left:0.25rem">{{item.DICTNAME}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="textarea" v-model="formData.userAndPrjItem.problemPlan" placeholder="若存在问题及下一步计划：若顺利完成，则此项填无"></el-input>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <el-form-item label="故障现象">
                                <el-input v-model="formData.userAndPrjItem.faultDesc" placeholder="请输入故障现象"></el-input>
                            </el-form-item>
                            <el-form-item label="分析诊断">
                                <el-input v-model="formData.userAndPrjItem.analysis" placeholder="请输入分析诊断"></el-input>
                            </el-form-item>
                            <el-form-item label="实施结果">
                                <el-input v-model="formData.userAndPrjItem.implementResult" placeholder="请输入实施结果"></el-input>
                            </el-form-item>
                            <el-form-item label="遗留问题及建议">
                                <el-input v-model="formData.userAndPrjItem.problemSuggest" placeholder="请输入遗留问题及建议"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="sendMessageView" v-if="isShow">
                        <div class="serviceInfoTit">服务单确认人信息</div>
                        <div class="des">若预选设置内没有需要选择的客户信息，工程师可直补充客户信息后点击“发送评价连接”。</div>
                        <el-form-item label="客户联系人" label-width="1.1rem">
                            <el-select v-model="customerForm.empname" filterable allow-create placeholder="请选择" @change="npmNameChange()">
                                <el-option 
                                    v-for="item in customerList" 
                                    :key="item.empid"
                                    :label="item.empname"
                                    :value="item.empname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="客户联系人手机" label-width="1.1rem">
                            <el-input v-model="customerForm.mobileno" placeholder="请输入客户联系人手机" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="上传纸质服务单（选填）" label-width="1.8rem">
                            <img id="showpic" :src="uploadres" ref="showpic" class="imgout" @click="takePhoto">
                        </el-form-item>
                        <input id='message' type="hidden" v-model ="formData.docId">
                    </div>
                    <div style="height: 0.6rem;"></div>
                    <el-form-item class="serviceSubmitBtn" v-if="serviceStatus==='1'">
                        <el-button type="primary" @click="submitSummaryForm('formData')">提交</el-button>
                    </el-form-item>
                    <el-form-item class="serviceSubmitBtn" v-else>
                        <el-button v-if="serviceStatus=='6'" type="primary" disabled>客户已评价</el-button>
                        <el-button @click="submitSendForm('customerForm')" type="primary" v-else>{{submitName}}</el-button>
                    </el-form-item>   
                </el-form>
            </div>
        </div>
      </el-dialog>
    </div>
    <!-- 点击客户远程确认及评价编辑客户信息 -->
    <div class="dialogdc">
      <el-dialog
        title="提示"
        :visible.sync="editCustomerInfoVisible"
        :show-close="false"
        width="90%"
        center>
        <el-form :model="formData" ref="formData">
          <el-form-item label="客户联系人" label-width="1.1rem">
            <el-select v-model="customerForm.empname" filterable allow-create placeholder="请选择" @change="npmNameChange()">
                <el-option 
                    v-for="item in customerList" 
                    :key="item.empid"
                    :label="item.empname"
                    :value="item.empname">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户联系人手机" label-width="1.1rem">
            <el-input v-model="customerForm.mobileno" placeholder="请输入客户联系人手机" clearable></el-input>
          </el-form-item>
          <el-form-item label="上传纸质服务单（选填）" label-width="1.8rem">
              <img id="showpic1" :src="uploadres" ref="showpic1" class="imgout" @click="takePhoto">
          </el-form-item>
          <input id="tk" type="hidden" v-model ="formData.docId">
          <el-form-item class="submit">
            <el-button @click="editCustomerInfoVisible=false" >取消</el-button>
            <el-button type="primary" class="onsubmit" @click="submitSendForm()" >发送</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headerLast from "../header/headerLast";
import global_ from "../../components/Global";
import fetch from "../../utils/ajax";
import loadingtmp from "@/components/load/loading";
import BMap from 'BMap'
import LocationSdk from "@/utils/wxUtils"
import slacommon from '@/utils/slacommon.js';
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "workBenchSLAfeedback",
  components: {
    headerLast
  },
  data() {
    return {
      SLAfeedbackTit: "SLA反馈",
      dialogVisible0: false,
      dialogVisible1: false,
      checkdcFlag:false,//问题显示
      warnVisible:false,//答错问题提示
      showModal: false,//图片显示
      phoneVisible:false,
      feedbackVisible:false,//先完成结果反馈再进行离场
      workTypeVisible:false,//工单类型为“现场实施”或“现场信息搜集”，工程师点击“离场”逻辑弹框
      workConfirmFlag:false,//实施前确认
      taskVisible:false,//仅需任务反馈弹框
      caseVisible:false,//需反馈任务和故障的弹框
      summaryFlag:false,//完成后总结
      isShow:false,//短信客户信息是否显示
      editCustomerInfoVisible:false,
      feedbackType:'',
      radio: 0,
      typeid: "",
      form:{
        des1:"",
        des2:"",
        des3:"",
        option:[],
        taskradio:0,
        caseradio:0,
        customerContactor:'',
        customerCellnumber:''
      },
      formData:{
        caseServiceQuestion:{},//实施前确认参数
        userAndPrjItem:{},//完成后总结参数
        serviceType:"",
        workResult:"",//完成后总结参数
        docId:''
      },
      customerForm:{
          empname:'',
          mobileno:'',
          empId:''
      },
      submitName:'提交并发送客户评价连接',
      customerList:'',
      date:"",
      status: "",
      serviceStatus:'',
      SLAObj: [],
      workInfo:{},
      differDistance:0,
      isDcFeedBack:false,//是否已经到场操作
      workId:this.$route.query.workId,
      caseId:this.$route.query.caseId,
      taskId:this.$route.query.taskId,
      workTypeId:this.$route.query.workTypeId,
      serviceId:'',
      slaTypeId:'',
      serviceType:'',
      clientHeight:'',
      checkedCities1: ['上海', '北京'],
      cities: cityOptions,
      targetLatitude:this.$route.query.latitude,
      targetLongitude:this.$route.query.longitude,
      latitude:'',
      longitude:'',
      bgDef:'',
      questionObj:'',
      selectAnwser:0,
      noQuestionIds:'',
      wrongMessage:'',
      requestNum:0,
      requireArriveTime:'',
      expectLeave:'',//预计结束时间
      seconds:5,
      type:this.$route.query.type,
      feedbackNum:0,
      feedbackDesc:"请先完成结果反馈再进行离场（故障解决，故障解决不成功，任务已完成，任务未完成四选一）",
      workTypeWarn:'',
      workTypeStatus:'',//离场进行工单类型的判断（未备件整理；未使用件）
      typeIdParams:'',
      checked:[
        {ifY1:false,ifF1:false},
        {ifY2:false,ifF2:false},
        {ifY3:false,ifF3:false},
        {ifY4:false,ifF4:false},
        {ifY5:false,ifF5:false},
        {ifY6:false,ifF6:false}
      ], 
      workResultInfo:'',//完成后总结参数
      workResultArr:[],
      serviceTypeArr:[],
      content:"工作内容",
      result:"工作结果",//完成后总结参数
      serviceCd:'',//短信链接
      uploadres:require('../../assets/images/takephoto.png')
    };
  },
  props: {
    styleObj: { // 用于承接样式类
      type: Object,
      default: function () {
        return {
          position: 'fixed',
          bottom: 0,
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(113,111,111,0.5)'
        }
      }
    }
  },
  created: function() {
    if(this.$route.query.dialogVisible0){
      this.dialogVisible0 = this.$route.query.dialogVisible0
    }
    // this.serviceType = slacommon.getServiceType(this.workTypeId,this.serviceType);//根据工单判断服务单类型
    console.log("serviceType",this.serviceType);
    console.log("workTypeId",this.workTypeId);
    if(this.workTypeId=='XCSS'){//现场实施用case故障处理
      this.serviceType = 1;
    }else if(this.workTypeId=='XXSJ'||this.workTypeId=='XJ'||this.workTypeId=='XJBG'||this.workTypeId=='ZCFW'||this.workTypeId=='JSZC'){
      this.serviceType = 2
    }else{
      this.serviceType = 0//无服务单
    }
    this.getWorkCustList();
    this.getWorkInfo();
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
      this.clientHeight = (document.documentElement.clientHeight-90)+'px'
    }
    this.randomPic();
  },
  mounted(){
    window.photoResult = this.getPhotoUrl;
  },
  methods: {   
    //动态获取背景图片功能
    randomPic:function() {
      this.imgRandom = {
        "1": {
          suprizeUrl: "dc1.jpg",
          href: "",
        },
        "2": {
          suprizeUrl: "dc2.jpg",
          href: "",
        },
        "3": {
          suprizeUrl: "dc3.jpg",
          href: "",
        }
      };
      let randomKeys = ["1", "2", "3"];
      let index = Math.floor(Math.random() * 3);
      this.bgDef = this.imgRandom[randomKeys[index]].suprizeUrl;
    },
    getWorkCustList(){
        fetch.get("?action=/work/getWorkCustList&WORK_ID="+this.workId).then(res=>{
            console.log("getWorkCustList",res);
            if(res.STATUSCODE=='0'){
                this.customerList = res.data;
            }else{
                this.$message({
                  message:res.MESSAGE,
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
              });
            }
        })
    },
    npmNameChange(){
      for(let i =0;i<this.customerList.length;i++){
          if(this.customerList[i].empname === this.customerForm.empname){
              this.customerForm.mobileno = this.customerList[i].mobileno;
              this.customerForm.empId = this.customerList[i].empid;
          }
      }
    },
    submitSendForm(){
      const loading = this.$loading({
          lock: true,
          text: '发送短信中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      if(!slacommon.customerInfoCheck(loading,this.customerForm)) return;
      let params = "&url=http://wxjfb.dcits.com/home/onsiteServiceInfo&CASE_ID="+this.caseId+
            "&SERVICE_ID="+this.serviceId+"&SERVICE_TYPE="+this.serviceType+
            "&evaluateId="+this.evaluateId+"&serviceType="+this.serviceType+
            "&workId="+this.workId+"&userId="+this.customerForm.empId;
      fetch.get("?action=/system/getShortUrl"+params).then(res=>{
          console.log("getShortUrl",res);
          if(res.STATUSCODE=='1'){
            let shortUrl = res.shorturl;
            console.log("customerPhone",this.customerForm.mobileno);
            let content = "尊敬的客户您好，工程师已完成了现场实施，请您对我们的服务进行评价，谢谢！"+shortUrl
            fetch.get("?action=/work/sendCustEvaluate&MOBILE="+this.customerForm.mobileno+"&CONTENT="+content+
                              "&SERVICE_TYPE="+this.serviceType+"&SERVICE_ID="+this.serviceId+
                              "&EMPNAME="+this.customerForm.empname+
                              "&serviceFile="+this.formData.docId).then(res=>{
                console.log("sendCustEvaluate",res);
                loading.close();
                if(res.STATUSCODE=='0'){
                  this.editCustomerInfoVisible = false;
                  this.phoneVisible = true;
                }else{
                    this.$message({
                      message:res.MESSAGE,
                      type: 'error',
                      center: true,
                      customClass: 'msgdefine'
                    });
                }
            })
          }else{
            this.$message({
              message:res.MESSAGE+"发生错误",
              type: 'error',
              center: true,
              customClass: 'msgdefine'
            });
          }
      })           
    },
    getWorkInfo:function(){
      fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res => {
        console.log("getWorkInfo",res);
        if(res.STATUSCODE=='0'){ 
          this.workInfo = res.DATA[0];
          let baseInfo = res.DATA[0];
          this.SLAObj = baseInfo.slaStatus;
          this.form.customerContactor = res.DATA[0].customerContactor;
          this.form.customerCellnumber = res.DATA[0].customerCellnumber; 
          for(let i=0;i<this.SLAObj.length;i++){
            if(this.SLAObj[i].slaTypeId == 5&& this.SLAObj[i].ifFeedback=='1'){
              this.isDcFeedBack = true;
            }
          }
          this.requireArriveTime = res.DATA[0].requireArriveTime.replace(/\-/g, "/");
          this.expectLeave = res.DATA[0].expectLeave.replace(/\-/g, "/");
          this.workTypeStatus = res.DATA[0].leave[0].STATUS;
          this.hasService = res.DATA[0].leave[0].HAS_SERVICE;
        }
      });
    },
    getLocation:function(slaTypeId){
      const loading = this.$loading({
        lock: true,
        text: '正在获取位置信息...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var self = this;
      function success(res){
        var lat = res.latitude;//gps经纬度
        var lng = res.longitude;
          self.gpsPoint = new BMap.Point(lng,lat);
          var convertor = new BMap.Convertor();
          var pointArr = [];
              pointArr.push(self.gpsPoint);
          convertor.translate(pointArr, 1,5, function (point) {  
            console.log("111",point);
            self.latitude = point.points[0].lat;
            self.longitude = point.points[0].lng;
            self.pointA = new BMap.Point(point.points[0].lng, point.points[0].lat);  
            self.differDistance = self.getDistance(self.targetLatitude,self.targetLongitude);
            if(self.differDistance<=4){
              let now = new Date();
              let currentdate = slacommon.formatDateTime(now);//到场时间限制
              if(slaTypeId==5){
                self.intervalTime(self.requireArriveTime,currentdate,slaTypeId);
              }else if(slaTypeId==7){
                // self.intervalTime(self.expectLeave,currentdate,slaTypeId);
                self.leavebjCheck();
              }
            }else{
              self.$message({
                message:'当前不在case所在地点，无法操作',
                type: 'error',
                center: true,
                duration:2000,
                customClass: 'msgdefine'
              })
            }
          })
      }
      LocationSdk.getLocation(this,success,loading)//通过h5获取位置信息
    },
    // 测量百度地图两个点间的距离
    getDistance:function (latitude,longitude) {
      var map = new BMap.Map('')
      var pointB = new BMap.Point(parseFloat(longitude), parseFloat(latitude))  // 店铺的经纬度
      var distance = (map.getDistance(this.pointA, pointB) / 1000).toFixed(2) // 保留小数点后两位
      return distance
    },

    //满足到场时间要求
    inHours(){
      let self = this;
      self.clientHeight = (document.documentElement.clientHeight-90)+'px'
      self.randomPic();//随机选取图片
      self.showModal = true;//显示随机图片10s
      self.requestNum=0;//问题接口请求次数
      self.seconds = 5;
      setInterval(()=>{
        if(self.seconds > 0 && self.seconds <= TIME_COUNT){
          self.seconds--;
        }
      },1000)
      const TIME_COUNT = 5;
      setTimeout(()=>{
        self.showModal = false;//10s后关闭随机图片框
        self.checkdcFlag = true;//显示问题弹框
        self.getQuestionArrive();//调用问题接口，获取问题
      },5000)
    },
    //不满足到场时间要求
    notify(startTime,hours){
      this.$notify.info({
        title: '提示',
        message: '预计到场时间为'+startTime+'，当前不在任务要求到场时间范围内，无法操作;如果“要求到场时间”设置不正确，请联系CMO修改',
        type: 'warning',
        duration:0
      });
    },
    notifyLeave(endTime,hours){
      this.$notify.info({
        title: '提示',
        message: '预计离场时间为'+endTime+'，当前不在任务要求离场时间范围内，无法操作;如果“要求离场时间”设置不正确，请联系CMO修改',
        type: 'warning',
        duration:0
      });
    },
    //工程师操作时间差计算
    intervalTime:function(startTime,endTime,slaTypeId){
      console.log("startTime",startTime);
      console.log("endTime",endTime);
      var self = this;
      function tranDate (time) {
        return new Date(time.replace(/-/g, '/')).getTime();
      }
      let control1 = startTime.substring(0,10)+" 08:00:00"; // 限制时间08:00
      let control2 = startTime.substring(0,10)+" 19:00:00";//显示时间19:00
      let time1 = new Date(control1);
      let time2 = new Date(time1.getTime()+24*60*60*1000);//次日08:00点
      let control3 = slacommon.formatDateTime(time2);//显示时间次日08：00
      let restrict1 = tranDate(control1);//转换限制时间为08:00的时间格式
      let restrict2 = tranDate(control2);//转换限制时间为19:00的时间格式
      let restrict3 = tranDate(control3);//转换限制时间为次日08：00的时间格式
      let expect = tranDate(startTime);//预计到场时间

      let date1 = new Date(startTime);  //预计到场时间
      let date2 = new Date(endTime);    //当前时间
      let date3 = Math.abs(date2.getTime() - date1.getTime());  //时间差的毫秒数
       //计算出相差天数
      let days = Math.floor(date3 / (24 * 3600 * 1000));
       //计算出小时数
      let leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))+days*24;
      if(slaTypeId==5){
        if(hours<=0){
          self.inHours();
        }else{
          self.notify(startTime,hours);
        }
      }
      // if(slaTypeId==7){
      //   console.log('hours',hours);
      //   if(hours<=1){
      //     self.leavebjCheck();
      //     // self.inHours();
      //   }else{
      //     self.notifyLeave(startTime,hours);
      //   }
      // }
      // if(expect>=restrict1&&expect<=restrict2){//如果在预计到场当日的08：00-19：00
      //   if(hours<=3){
      //     self.inHours();
      //   }else{
      //     self.notify(startTime,hours);
      //   }
      // }else if(expect>=restrict2&&expect<=restrict3){//19:00-次日08:00
      //   if(hours<=6){
      //     self.inHours();
      //   }else{
      //     self.notify(startTime,hours);
      //   }
      // }else if(expect<restrict1){
      //   if(hours<=6){
      //     self.inHours();
      //   }else{
      //     self.notify(startTime,hours);
      //   }
      // }else{
      //   self.notify(startTime,hours);
      // }
    },
    getTime:function() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
      return currentdate;
    },
    getQuestionArrive(){//获取问题
      this.questionObj='';
      this.form.option=[];
      this.warnVisible = false;
      fetch.get("?action=/risk/queryQuestionArrive&workId="+this.workId+"&noQuestionIds="+this.noQuestionIds,{}).then(res=>{
        console.log("queryQuestionArrive",res);
        if(res.STATUSCODE=='1'){
          this.questionObj = res.data;               
        }
      })
    },
    dialogopen(slaTypeId) {
      this.slaTypeId=slaTypeId;
      this.date=this.$options.methods.getTime();
      this.typeid = slaTypeId;
      if(slaTypeId == null){
        this.form.taskradio = 0;
        this.form.caseradio = 0;
        let caseType = this.workInfo.caseType;
        let workType = this.workInfo.workType;
        let caseTypeFlag1 = (caseType==='故障');
        let caseTypeFlag2 = (caseType==='技术咨询');
        let caseTypeFlag3 = (caseType==='RMA');
        let workTypeFlag1 = (workType==='现场信息收集');
        let workTypeFlag2 = (workType==='远程指导实施');
        let workTypeFlag3 = (workType==='现场实施');
        if(caseTypeFlag1||caseTypeFlag2||caseTypeFlag3){
          if(workTypeFlag1||workTypeFlag2||workTypeFlag3){
            //需反馈任务和故障解决的工单
            this.taskVisible = true;
            this.feedbackType = "case";
          }else{
            //仅需反馈任务的工单
            this.taskVisible = true;
            this.feedbackType = "task";
          }
        }else{
          //仅需反馈任务的工单
          this.taskVisible = true;
          this.feedbackType = "task";
        }
      }
      else if(slaTypeId == 5){
        if(this.workInfo.caseType=='故障'&&this.workInfo.workType!='其他'){        
          //类型是到场逻辑处理
          this.getLocation(slaTypeId);
        }else if(this.workInfo.caseType!='故障'){
          if(this.serviceType == 0){
            this.dialogVisible0 = true;
          }else{
            this.newService(this.serviceType);
          }
        }else{
          this.dialogVisible0 = true;
        }
      }else if(slaTypeId == 7){
        if(this.workInfo.caseType=='故障'&&this.workInfo.workType!='其他'){
          this.getLocation(slaTypeId);
        }
        else{
          this.dialogVisible0 = true;
        }
      } 
      else {
        this.dialogVisible0 = true;
      }
      console.log("feedbackType",this.feedbackType);
    },
    //实施结果反馈前对到场操作的控制
    dcCheck(slaTypeId){
      if (slaTypeId == 8 || slaTypeId == 10) {
        this.typeid = slaTypeId;
          if(this.isDcFeedBack){
            this.dialogVisible1 = true;
          }else{
            this.$message({
              message:'请先进行到场操作',
              type: 'warning',
              center: true,
              duration:2000,
              customClass: 'msgdefine'
            })
          }
      }else if(slaTypeId == 6 || slaTypeId == 9){
        this.typeid = slaTypeId;
        console.log("slaTypeId0000000000",slaTypeId);
        this.typeIdParams += slaTypeId+","
          if(this.isDcFeedBack){
            this.dialogVisible0 = true;
          }else{
            this.$message({
              message:'请先进行到场操作',
              type: 'warning',
              center: true,
              duration:2000,
              customClass: 'msgdefine'
            })
          }
      }
    },
    //点击实施结果反馈操作
    taskRadio(type){
      if(type==='task'){//仅需完成任务的工单
        this.taskVisible = false;
        if(this.form.taskradio==1){//任务完成
          console.log("9999999999");
          this.dcCheck('9');
        }else if(this.form.taskradio==2){//任务未完成
          this.dcCheck('10');
        }
      }else{//先完成任务反馈在完成故障反馈
        this.taskVisible = false;
        if(this.form.taskradio==1){//任务完成弹出故障解决和未解决单选框
         this.typeIdParams += '9,';
          this.caseVisible = true;
        }else if(this.form.taskradio==2){//任务未完成
          this.dcCheck('10');
        }
      }
    },
    //
    caseRadio(){
      this.caseVisible = false;
      if(this.form.caseradio==1){//故障解决成功
      console.log("66666666");
        this.dcCheck('6');
      }else if(this.form.caseradio==2){//故障解决不成功
        this.dcCheck('8');
      }
    },
    //离场时备件判断
    leavebjCheck(){
      if(this.workTypeStatus==1){
        this.workTypeVisible = true;
        this.workTypeWarn = '请先完成备件整理再进行离场反馈';
        return false;
      }else if(this.workTypeStatus==2){
        this.workTypeVisible = true;
        this.workTypeWarn = '请确认未使用件的真实性？';
        return false;
      }else{
        this.getFeedbackResult();
      }
    },
    //工程师必须反馈处理结果后（故障解决，故障解决不成功，任务已完成，任务未完成四选一完成SLA反馈），才可以点击“离场”反馈
    getFeedbackResult(){
      for(let i=0;i<this.SLAObj.length;i++){
          if(this.SLAObj[i].ifFeedback=='1'&&this.SLAObj[i].slaTypeId===null){
            this.feedbackNum++;
            break;
          }
        }
        console.log('serviceType',this.serviceType);
        if(this.feedbackNum){
          this.dialogVisible0 = true;
        }else{
          this.feedbackVisible = true;
        }
    },
    confirmSendSuccess(){
      this.phoneVisible = false;
      this.summaryFlag = false;
    },
    questionSubmit(){//提交问题
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      if(vm.form.option.length==0){
        loading.close();
        this.$message({
            message:'请选择答案',
            type: 'error',
            center: true,
            duration:2000,
            customClass: 'msgdefine'
        })
      }else{
        let ifAnswerTrue = 1;
        let rightAnwser = 0;
        let answerIds = '';
        for(let i = 0;i<vm.questionObj.options.length;i++){
          let rightAnwserObj = {};
          if(vm.questionObj.options[i].IF_TRUE=="1"){
              rightAnwser = rightAnwser+1;
              rightAnwserObj.OPTION_ID =vm.questionObj.options[i].OPTION_ID;
              rightAnwserObj.OPTION_NAME =vm.questionObj.options[i].OPTION_NAME; 
          }
        }
        for(let i = 0;i<vm.form.option.length;i++){
          vm.selectAnwser = vm.form.option.length;
          if(i==vm.form.option.length-1){
              answerIds+=vm.form.option[i]
          }else{
              answerIds+=vm.form.option[i]+","
          }
        }
        for(let i = 0;i<vm.form.option.length;i++){
          for(let j =0;j<vm.questionObj.options.length;j++){
              if(vm.form.option[i] == vm.questionObj.options[j].OPTION_ID){
                  console.log((vm.questionObj.options[j].IF_TRUE!="1")+","+(rightAnwser!=vm.selectAnwser));
                  if(vm.questionObj.options[j].IF_TRUE!="1"||(rightAnwser!=vm.selectAnwser)){
                      ifAnswerTrue = 0;
                  }
              }
          }
        }
        let params = {};
        params.workId = vm.workId;
        params.excuteType = vm.questionObj.EXCUTE_TYPE;
        params.questionId = vm.questionObj.QUESTION_ID;
        params.answerIds = answerIds;
        params.ifAnswerTrue = ifAnswerTrue;
        let data = {}
        data.data = JSON.stringify(params);
        fetch.questionPost("?action=/risk/saveAnswerArrive",data).then(res=>{
          loading.close();
          console.log("saveAnswerArrive",res);
          if(res.STATUSCODE=='1'){//问题回答正确，显示反馈框，进行到场反馈
              vm.checkdcFlag = false;
              //服务单实施前确认
              vm.newService(vm.serviceType);
          }else{//问题回答错误，弹出弹框，提示回答错误并给出正确答案
            vm.warnVisible = true;
            vm.wrongMessage = res.MESSAGE;          
          }
        })
      }
    },
    newService(serviceType){
      console.log("serviceType",serviceType); 
      console.log("serviceId",this.serviceId);
      if(serviceType == 2){//现场服务单
          if(!this.serviceId){
            fetch.get("?action=/work/SubmitSceneServiceFormInfo&CASE_ID="+this.caseId+"&WORK_ID="+this.workId+"&TASK_ID="+this.taskId).then(res=>{
              console.log('SubmitSceneServiceFormInfo',res);
              this.serviceId = res.TEMP.serviceId;
              this.evaluateId = res.TEMP.evaluateId;     
              let data = res.TEMP;   
              this.getCaseServiceQuestion(); 
            })
          }else{
            this.getCaseServiceQuestion(); 
          }
      }else if(serviceType == 1){//故障解决服务单
        if(!this.serviceId){
          fetch.get("?action=/work/SubmitCaseTroubleShootingServiceFormInfo&CASE_ID="+this.caseId+"&WORK_ID="+this.workId+"&TASK_ID="+this.taskId).then(res=>{
              console.log("SubmitCaseTroubleShootingServiceFormInfo",res);
              let data = res.TEMP; 
              this.serviceId = res.TEMP.serviceId;
              this.evaluateId = res.TEMP.evaluateId; 
              this.getCaseServiceQuestion();            
          })
        }else{
          this.getCaseServiceQuestion(); 
        }
      }else{
         this.dialogVisible0 = true;
      }
    },
    getNewQuestion(){//点击问题答错框确定按钮，关闭此弹框，显示问题界面
      this.requestNum+=1;  
      if(this.requestNum==1){
        this.noQuestionIds +=this.questionObj.QUESTION_ID;
        this.getQuestionArrive();
      }else if(this.requestNum==2){
        this.noQuestionIds +=","+this.questionObj.QUESTION_ID;
        this.getQuestionArrive();
      }else{//回答3道题，不管对错，进行到场反馈
        this.warnVisible = false;
        this.checkdcFlag = false;
        this.newService(this.serviceType);
      }     
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var vm = this;
      let params="&REASON="+this.form.des2+"&EXPLAIN="+this.form.des1+this.form.des3
                  +"&LATITUDE="+this.targetLatitude+"&LONGITUDE="+this.targetLongitude;
      fetch.get("?action=/work/UpdateWorkSLAStatus&WORK_ID="+vm.$route.query.workId+
      "&SLA_TYPE="+vm.typeid+"&OPERATE_DATE="+vm.date+params).then(res=>{
        console.log("UpdateWorkSLAStatus",res);
        loading.close();
        if(res.STATUSCODE=="0"){
          this.$message({
            message:'提交成功',
            type: 'success',
            center: true,
            customClass: 'msgdefine',
            TimeRanges:'1000'
          });
          this.dialogVisible0=false;
          this.dialogVisible1=false;
          this.serviceId = res.SERVICEID;
          vm.form.des1 = '';
          vm.form.des2 = '';
          vm.form.des3 = '';
          vm.getWorkInfo();  
          if(this.slaTypeId == null){            
            vm.getEndSummary();
          }       
        }else{
          this.$message({
            message:res.MESSAGE,
            type: 'error',
            center: true,
            customClass: 'msgdefine'
          });
          this.dialogVisible0=false;
          this.dialogVisible1=false;
        }              
      });
    },
    getEndSummary(){
      console.log("serviceType",this.serviceType);
      console.log("serviceId",this.serviceId);
      if(this.serviceType==2){        
          fetch.get("?action=/work/GetOnsiteServiceFormInfo&CASE_ID="+this.caseId+"&SERVICE_ID="+this.serviceId).then(res=>{
              console.log("GetOnsiteServiceFormInfo",res);
              this.summaryFlag = true;
              this.formData.userAndPrjItem = res.DATA[0];
              this.serviceCd = res.DATA[0].serviceCd;
              this.workResultInfo = res.DATA[0].workResult;
              this.ifSendEvaluate = res.DATA[0].ifSendEvaluate;
              this.serviceStatus = res.DATA[0].serviceStatus;
              this.evaluateId = res.DATA[0].evaluateId;
              if(res.DATA[0].serviceStatus==='2'){
                  if(res.DATA[0].ifSendEvaluate===1){  
                    this.isShow = true;                       
                    this.submitName = "再次发送客户评价连接";
                  }else{
                    this.isShow = true; 
                    this.submitName = "发送客户评价连接";
                  }
              }
          })
          fetch.get("?action=/system/getDict2&DICT_TYPE=NT_SERVICE_TYPE","").then(res=>{
              console.log("serviceTypeArr",res);
              this.serviceTypeArr = res.data;
          })
          fetch.get("?action=/system/getDict2&DICT_TYPE=NT_CASE_WORK_RESULT","").then(res=>{
              console.log("getDict2",res);
              this.workResultArr = res.data;
          })
      }else if(this.serviceType==1){         
          fetch.get("?action=/work/GetCaseroubleShootingServiceFormInfo&CASE_ID="+this.caseId+"&SERVICE_ID="+this.serviceId).then(res=>{
              console.log("GetCaseroubleShootingServiceFormInfo",res);
              this.summaryFlag = true;
              this.formData.userAndPrjItem = res.DATA[0];
              this.workResultInfo = res.DATA[0].implementResult;
              this.ifSendEvaluate = res.DATA[0].ifSendEvaluate;
              this.serviceStatus = res.DATA[0].serviceStatus;
              this.evaluateId = res.DATA[0].evaluateId;
              if(res.DATA[0].serviceStatus==='2'){
                if(res.DATA[0].ifSendEvaluate===1){ 
                  this.isShow = true;    
                  this.submitName = "再次发送客户评价连接";
                }else{
                  this.isShow = true; 
                  this.submitName = "发送客户评价连接";
                }
              }
          })
      }
    },
    confirm(){
      this.workTypeVisible = false;
      this.getFeedbackResult();
    },
    onrefuse(){
      this.workTypeVisible = false
      this.$router.push({name:'sparePartsSortOut',query:{caseId:this.caseId,workId:this.workId}})
    },
    //获取服务单数据
    getCaseServiceQuestion(){
      fetch.get("?action=/work/getCaseServiceQuestion&CASE_ID="+this.caseId+"&SERVICE_ID="+this.serviceId+"&SERVICE_TYPE="+this.serviceType).then(res=>{
          console.log("getCaseServiceQuestion",res)
          this.workConfirmFlag = true;            
          if(this.serviceType==2){
              this.evaluateId = res.dataService[0].evaluateId;
              this.formData.caseServiceQuestion = res.dataService[0];        
          }else{
              this.evaluateId = res.dataDealService[0].evaluateId;
              this.formData.caseServiceQuestion = res.dataDealService[0];
          }
          if(this.formData.caseServiceQuestion.serviceTime == null){
              this.formData.caseServiceQuestion.serviceTime = new Date();
          }
          if(this.formData.caseServiceQuestion.numberIf1==1){
              this.checked[0].ifY1 = true;
          }else if(this.formData.caseServiceQuestion.numberIf1==0){
              this.checked[0].ifF1 = true;
          }
          if(this.formData.caseServiceQuestion.numberIf2==1){
              this.checked[1].ifY2 = true;
          }else if(this.formData.caseServiceQuestion.numberIf2==0){
              this.checked[1].ifF2 = true;
          }
          if(this.formData.caseServiceQuestion.numberIf3==1){
              this.checked[2].ifY3 = true;
          }else if(this.formData.caseServiceQuestion.numberIf3==0){
              this.checked[2].ifF3 = true;
          }
          if(this.formData.caseServiceQuestion.numberIf4==1){
              this.checked[3].ifY4 = true;
          }else if(this.formData.caseServiceQuestion.numberIf4==0){
              this.checked[3].ifF4 = true;
          }
          if(this.formData.caseServiceQuestion.numberIf5==1){
              this.checked[4].ifY5 = true;
          }else if(this.formData.caseServiceQuestion.numberIf5==0){
              this.checked[4].ifF5 = true;
          }
          if(this.formData.caseServiceQuestion.numberIf6==1){
              this.checked[5].ifY6 = true;
          }else if(this.formData.caseServiceQuestion.numberIf6==0){
              this.checked[5].ifF6 = true;
          }
      })
    },
    changeIfY1(val){
      if(val==true){
          this.checked[0].ifY1 = true;
          this.checked[0].ifF1 = false;
      }
    },
    changeIfF1(val){
      if(val==true){
          this.checked[0].ifF1 = true;
          this.checked[0].ifY1 = false;
      }
    },
    changeIfY2(val){
      if(val==true){
          this.checked[1].ifY2 = true;
          this.checked[1].ifF2 = false;
      }
    },
    changeIfF2(val){
      if(val==true){
          this.checked[1].ifF2 = true;
          this.checked[1].ifY2 = false;
      }
    },
    changeIfY3(val){
      if(val==true){
          this.checked[2].ifY3 = true;
          this.checked[2].ifF3 = false;
      }
    },
    changeIfF3(val){
      if(val==true){
          this.checked[2].ifF3 = true;
          this.checked[2].ifY3 = false;
      }
    },
    changeIfY4(val){
      if(val==true){
          this.checked[3].ifY4 = true;
          this.checked[3].ifF4 = false;
      }
    },
    changeIfF4(val){
      if(val==true){
          this.checked[3].ifF4 = true;
          this.checked[3].ifY4 = false;
      }
    },
    changeIfY5(val){
      if(val==true){
          this.checked[4].ifY5 = true;
          this.checked[4].ifF5 = false;
      }
    },
    changeIfF5(val){
      if(val==true){
          this.checked[4].ifF5 = true;
          this.checked[4].ifY5 = false;
      }
    },
    changeIfY6(val){
      if(val==true){
          this.checked[5].ifY6 = true;
          this.checked[5].ifF6 = false;
      }
    },
    changeIfF6(val){
      if(val==true){
          this.checked[5].ifF6 = true;
          this.checked[5].ifY6 = false;
      }
    },
  submitForm(formName){
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formName].validate((valid) => {
          if(valid){
              // if(!vm.check(loading)) return;     
              if(!slacommon.beforeConfirmCheck(loading,this.checked,this.formData)) return;             
              let temp = {};
              temp.operationStarttime = this.formData.caseServiceQuestion.operationStarttime;
              temp.operationEndtime = this.formData.caseServiceQuestion.operationEndtime;
              temp.stopStarttime = this.formData.caseServiceQuestion.stopStarttime;
              temp.stopEndtime = this.formData.caseServiceQuestion.stopEndtime;
              temp.lastbackupTime = this.formData.caseServiceQuestion.lastbackupTime;
              temp.beforeLastbackupTime = this.formData.caseServiceQuestion.beforeLastbackupTime;
              temp.backuptestTime = this.formData.caseServiceQuestion.backuptestTime;
              temp.serviceTime = this.formData.caseServiceQuestion.serviceTime;
              temp.serviceId=this.serviceId;
              if(!slacommon.beforeConfirmSubmitCheck(loading,temp,this.checked)) return;             
              if(this.checked[0].ifY1==true){
                  temp.numberIf1=1;
              }else{
                  temp.numberIf1=0;
              }
              if(this.checked[1].ifY2==true){
                  temp.numberIf2="1";
              }else{
                  temp.numberIf2="0";
              }
              if(this.checked[2].ifY3==true){
                  temp.numberIf3="1";
              }else{
                  temp.numberIf3="0";
              }
              if(this.checked[3].ifY4==true){
                  temp.numberIf4="1";
              }else{
                  temp.numberIf4="0";
              }
              if(this.checked[4].ifY5==true){
                  temp.numberIf5="1";
              }else{
                  temp.numberIf5="0";
              }
              if(this.checked[5].ifY6==true){
                  temp.numberIf6="1";
              }else{
                  temp.numberIf6="0";
              }
              let data = {};
              data.serviceType = this.serviceType;
              data.data = JSON.stringify(temp);
              console.log(data);
              fetch.questionPost("?action=/work/submitServiceQuestion",data).then(res=>{
                  loading.close();
                  console.log('submitServiceQuestion',res);
                  if(res.STATUSCODE=="0"){
                      this.$message({
                          message:'提交成功',
                          type: 'success',
                          center: true,
                          customClass: 'msgdefine'
                      });
                      vm.workConfirmFlag = false;
                      vm.dialogVisible0 = true;
                  }else{
                      this.$message({
                      message:res.MESSAGE+"发生错误",
                      type: 'error',
                      center: true,
                      customClass: 'msgdefine'
                      });
                  }
              })
          }
      })
    },
    submitSummaryForm(formName){
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formName].validate((valid) => {
          if(valid){
              // if(!vm.summaryCheck(loading)) return;
              if(!slacommon.check(loading,this.formData,this.serviceType)) return;
              let data = {};
                  data.serviceId = this.formData.userAndPrjItem.serviceId;
                  data.opFlg = 1;
                  data.customerId = this.formData.userAndPrjItem.customerId;
              let temp = {};
              temp.serviceId = this.formData.userAndPrjItem.serviceId;
              temp.caseId=this.caseId;
              if(vm.serviceType==2){
                  temp.serviceType = this.formData.serviceType;
                  temp.realWork = this.formData.userAndPrjItem.realWork;
                  temp.workContent = this.formData.userAndPrjItem.workContent;
                  temp.workResult = this.formData.workResult;
                  temp.problemPlan = this.formData.userAndPrjItem.problemPlan;
              }else{
                  temp.faultDesc = this.formData.userAndPrjItem.faultDesc;
                  temp.analysis = this.formData.userAndPrjItem.analysis;
                  temp.implementResult = this.formData.userAndPrjItem.implementResult;
                  temp.problemSuggest = this.formData.userAndPrjItem.problemSuggest;
              }
              temp.arriveTime = this.formData.userAndPrjItem.arriveTime;
              temp.leaveTime = this.formData.userAndPrjItem.leaveTime;
              console.log(temp);
              data.data=JSON.stringify(temp);
              console.log(data);
              let nowWorkId = vm.workId;
              let nowCaseId = vm.caseId;
              let nowtaskId = vm.taskId;
              let type = vm.type;
              if(vm.serviceType==2){
                  fetch.questionPost("?action=/work/UpdateSceneServiceFormInfo",data).then(res=>{
                      console.log("UpdateSceneServiceFormInfo",res);    
                      loading.close();
                      if(res.STATUSCODE=="0"){
                          this.$message({
                          message:'提交成功',
                          type: 'success',
                          center: true,
                          customClass: 'msgdefine'
                          });
                          vm.getEndSummary();
                          vm.editCustomerInfoVisible = true;
                      }else{
                          this.$message({
                          message:res.MESSAGE+"发生错误",
                          type: 'error',
                          center: true,
                          customClass: 'msgdefine'
                          });
                      }
                  })
              }else{
                  fetch.questionPost("?action=/work/UpdateCaseTroubleShootingServiceFormInfo",data).then(res=>{
                      console.log(res);    
                      loading.close();
                      if(res.STATUSCODE=="0"){
                          this.$message({
                              message:'提交成功',
                              type: 'success',
                              center: true,
                              customClass: 'msgdefine'
                          });
                          vm.getEndSummary();
                          vm.editCustomerInfoVisible = true;
                      }else{
                          this.$message({
                          message:res.MESSAGE+"发生错误",
                          type: 'error',
                          center: true,
                          customClass: 'msgdefine'
                          });
                      }       
                  })                     
              }
          }
      })
    },
    takePhoto:function(){
      let ua = navigator.userAgent.toLowerCase();
      console.log(ua);
      if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
          var info={action:"takePhoto"}
          window.webkit.messageHandlers.ioshandle.postMessage({body: info});
      }else if(/(Android)/i.test(ua) && /mobile/i.test(ua)){
          var value = "{action:takePhoto}";
          android.getClient(value);
      }
    },
    getPhotoUrl: function(photodata){
      let loading = this.$loading({
          lock: true,
          text: '上传中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      var data=new FormData();
      data.append("FILETYPE","jpg")
      data.append("FILE", photodata);
      let config = {
          headers:{'Content-Type':'multipart/form-data'}
      };
      fetch.post("?action=upload",data,config).then(res=>{
          console.log("upload",res)
          if(res['STATUSCODE'] == '0'){
              this.formData.docId= res.data.docId
              if(this.ifSendEvaluate===1){
                this.$refs.showpic.src = photodata;
              }else{
                this.$refs.showpic1.src = photodata;
              }
              // this.$refs.showpic.src = photodata;
          }
          else{
              this.$toast(res.MESSAGE);
          }
          loading.close();
      });
    },
  },
  beforeDestroy(){
    window.photoResult = null;
  }

  
};
</script>

<style scoped>
.workBenchSLAfeedback {width: 100%;line-height: 0.3rem;color: #666666;}
.tabheader {text-align: center;padding: 0.15rem 0.1rem 0 0.2rem;line-height: 0.36rem;color: #333333;font-size: 0.14rem;font-weight: bold;}
.tabdetail {text-align: center;padding-left: 0.2rem; padding-right: 0.1rem;}
.tabdetail el-row el-col {height: 0.16rem;}
.el-dailog {margin:10px;}
.SLAdialog .dialog>>> .el-dialog__header{padding-bottom: 0}
.SLAdialog .dialog>>> .el-dialog__body{padding:0px 20px 20px; color:#606266;font-size:14px;}
.SLAdialog>>>.el-form .el-form-item {font-size: 0.08rem;}
.SLAdialog>>>.el-radio { margin-top: 5px;font-size:6px}
.SLAdialog  .submit{position: absolute;left: 0; right: 0; height: 0.4rem;}
.SLAdialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.SLAdialog >>> .submit .el-button:hover{background: #ffffff;}
.SLAdialog >>> .submit .onsubmit:hover{background: #2698d6;}
.SLAdialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.SLAdialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
.self-modal{z-index: 3000;}

.dialogdc >>> .el-dialog__body{padding: 0px 0px}
.dialogdc >>> .el-dialog__header{padding: 0px 0px 0px;}
.workconfirm >>> .el-dialog__header{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: center;align-items: center; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
.workconfirm >>> .el-dialog__title{color: #ffffff;font-size: 0.16rem;}
.workconfirm >>> .confirmWarn{margin-top:0.45rem;font-size: 0.12rem;line-height: 0.2rem}

.endSummaryView{width: 100%; position: relative;background-color: #ffffff;margin-top:0.45rem}
.serviceInfoCell{white-space:normal;margin-top:0.45rem}
.serviceInfoCell .serviceInfoTit{position: relative; line-height: 0.2rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.serviceInfoCell .serviceInfoTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.serviceInfoCell .serviceInfoTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.serviceContent{background: #ffffff; color: #999999; padding: 0.1rem 0}
.serviceContent >>> .el-form-item{border-bottom: 0.01rem; margin: 0.03rem 0;}
.serviceContent >>> .el-form-item__label{font-size: 0.13rem; text-align: left}
.article{line-height: 0.3rem; }
.tableTd li{display: flex; line-height: 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}

.dialogdc >>> .el-dialog__footer{padding: 0px 0px 0px}
.dialogdc >>>.warnTextView{padding:0.1rem;background-color:#B22222;color:#ffffff;}
.dialogdc >>>.imgView{display:flex;position: relative; width: 90%; height: 100%;background-color: #ffffff;padding-left:5%;padding-right: 5%}
.imgView >>>.imgViewCol{display: flex;align-items: center}
.dialogdc >>>.itemsView{display:flex;flex-direction:row;flex-wrap: wrap;color:#B22222;text-align:center;border-bottom:0.01rem solid #e5e5e5;}
.itemsView >>> .itemView{width: 25%}
.radioView{margin-left: 0.2rem;}
.optionTextView{word-wrap:break-word;word-break: break-all;white-space:normal;margin-right:0.2rem}

.dialogdc >>> .submit .el-button{width: 100%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.dialogdc >>> .submit .el-button:hover{background: #ffffff;}
.dialogdc >>> .submit .onsubmit:hover{background: #2698d6;}
.dialogdc >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.dialogdc >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}

.countDiv{float:right;margin-top:0.2rem;font-size:0.16rem;margin-right:0.2rem}
.countButton{border-radius:50%;width:0.3rem;height:0.3rem;text-align:center;}

.confirmView{margin:0.1rem 0;line-height: 0.2rem}
.confirmView >>> .el-form-item{margin-bottom:0;}
.selectBox{display: flex;}
.serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #ffffff;border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;z-index: 1}

.sendMessageView{padding: 0.1rem}
.sendMessageView>>>.des{padding: 0.1rem}
.sendMessageView>>>.imgout{padding: 0.1rem}
.dialogdc >>>.imgout{height:0.3rem;width:0.3rem;margin-left:0.2rem}
</style>
