<template>
  <div class="CalendarView">
    <header-last :title="calentTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="box">
      <div id="calendar" v-if="pickDay != null">
        <!-- <div class="pickDay">
        <span>{{pickDay}}</span>
        <span>日</span>
        </div>-->
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <!-- <li class="year-month" @click="pickYear(currentYear,currentMonth)"> -->
            <li class="year-month">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month">- {{ currentMonth }}</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:red">六</li>
          <li style="color:red">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <li @click="pick(day.day)" v-for="day in days" :key="day.id">
            <!--本月-->
            <div class="pick">
              <span class="momo_mark" v-if="day.memo_type"></span>
              <span
                v-if="day.day.getMonth()+1 != currentMonth"
                class="other-month"
              >{{ day.day.getDate() }}</span>
              <span v-else>
                <!--今天-->
                <!-- <span
                v-if="day.day.getFullYear() == new Date().getFullYear() && day.day.getMonth() == new Date().getMonth() && day.day.getDate() == new Date().getDate()"
                class="active"
                >{{ day.day.getDate() }}</span>-->
                <span
                  v-if="day.day.getDate() == new Date().getDate()"
                  class="active"
                >{{ day.day.getDate() }}</span>
                <span v-else>{{ day.day.getDate() }}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div id="memo">
        <h4>打卡明细</h4>
        <ul class="memo_list" v-if="currentMemo">
          <li v-for="(memo,index) in currentMemo" :key="index">
            <div class="memo_list_s">
              <span class="circle"></span>
              <div class="memo_list_mont">{{memo.cont}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import headerLast from "../header/headerLast";
import fetch from "../../utils/ajax";
export default {
  components: {
    headerLast
  },
  data() {
    return {
      calentTit: "打卡记录",
      currentDay: 1,
      currentMonth: "",
      currentYear: "",
      currentWeek: 1,
      days: [],
      pickDay: "",
      currentMemo: "",
      memo_list: [], //时间格式必须为xxxx-xx-xx;
      memo_time: [],
      memo_address: []
    };
  },
  created: function() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (day < 10) day = "0" + day;
    var param = date.getFullYear() + "-" + month + "-" + day;
    this.initCalendar(
      this.formatDate(date.getFullYear(), date.getMonth() + 1, 1)
    );
    fetch
      .get("?action=/attendance/queryPunchList&day=" + param, {})
      .then(res => {
        console.log("queryPunchList", res);
        if (res.STATUSCODE == "1") {
          if (res.data.length == 0) {
            this.currentMemo = [{ cont: "今天未打卡" }];
          } else {
            for (var i = 0; i < res.data.length; i++) {
              this.memo_time.push(res.data[i].punchTime);
              this.memo_address.push(res.data[i].punchAddress);
            }
            if (res.data.length == 1) {
              this.currentMemo = [
                { cont: this.memo_time[0] + "   " + this.memo_address[0] }
              ];
            } else {
              this.currentMemo = [
                { cont: this.memo_time[0] + "   " + this.memo_address[0] },
                {
                  cont:
                    this.memo_time[res.data.length - 1] +
                    "   " +
                    this.memo_address[res.data.length - 1]
                }
              ];
            }
          }
        } else {
          this.$message({
            message: res.MESSAGE + "发生错误",
            type: "error",
            center: true,
            duration: 1000,
            customClass: "msgdefine"
          });
        }
      });
  },
  methods: {
    initCalendar: function(cur) {
      console.log("看一下当前日期：" + cur);
      var param = cur.substr(0, 7);
      fetch
        .get("?action=/attendance/queryPunchList&month=" + param, {})
        .then(res => {
          console.log("000000000000000000");
          console.log("queryPunchList", res);
          if (res.STATUSCODE == "1") {
            this.memo_list = [];
            for (var i = 0; i < res.data.length; i++) {
              this.memo_list[i] = res.data[i].punchDate;
            }
            console.log("看一下memo_list滴哈111：" + this.memo_list);
            if (cur) {
              var date = new Date(cur);
            } else {
              var date = new Date();
              this.pickDay = date.getDate();
            }
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            var str = this.formatDate(this.currentYear, this.currentMonth, 1);
            this.currentWeek =
              new Date(str).getDay() == 0 ? 7 : new Date(str).getDay();

            this.days.length = 0; //初始化数组
            for (var i = this.currentWeek - 1; i >= 0; i--) {
              var d = new Date(str);
              var memo_type = false;
              d.setDate(d.getDate() - i);
              for (var j = 0; j < this.memo_list.length; j++) {
                var memoTime = new Date(this.memo_list[j]).getTime();
                if (d.getTime() == memoTime) {
                  memo_type = true;
                }
              }
              this.days.push({ day: d, memo_type: memo_type });
            }
            for (var i = 1; i <= 42 - this.currentWeek; i++) {
              var d = new Date(str);
              d.setDate(d.getDate() + i);
              var memo_type = false;
              for (var j = 0; j < this.memo_list.length; j++) {
                var memoTime = new Date(this.memo_list[j]).getTime();
                if (d.getTime() == memoTime) {
                  memo_type = true;
                }
              }
              this.days.push({ day: d, memo_type: memo_type });
            }
          } else {
            this.$message({
              message: res.MESSAGE + "发生错误",
              type: "error",
              center: true,
              duration: 1000,
              customClass: "msgdefine"
            });
          }
        });
      // if (cur) {
      //   var date = new Date(cur);
      // } else {
      //   var date = new Date();
      //   this.pickDay = date.getDate();
      // }
      // this.currentYear = date.getFullYear();
      // this.currentMonth = date.getMonth() + 1;
      // var str = this.formatDate(this.currentYear, this.currentMonth, 1);
      // this.currentWeek =
      //   new Date(str).getDay() == 0 ? 7 : new Date(str).getDay();

      // this.days.length = 0; //初始化数组
      // for (var i = this.currentWeek - 1; i >= 0; i--) {
      //   var d = new Date(str);
      //   var memo_type = false;
      //   d.setDate(d.getDate() - i);
      //   for (var j = 0; j < this.memo_list.length; j++) {
      //     var memoTime = new Date(this.memo_list[j]).getTime();
      //     if (d.getTime() == memoTime) {
      //       memo_type = true;
      //     }
      //   }
      //   this.days.push({ day: d, memo_type: memo_type });
      // }
      // for (var i = 1; i <= 42 - this.currentWeek; i++) {
      //   var d = new Date(str);
      //   d.setDate(d.getDate() + i);
      //   var memo_type = false;
      //   for (var j = 0; j < this.memo_list.length; j++) {
      //     var memoTime = new Date(this.memo_list[j]).getTime();
      //     if (d.getTime() == memoTime) {
      //       memo_type = true;
      //     }
      //   }
      //   this.days.push({ day: d, memo_type: memo_type });
      // }
    },
    pick: function(date) {
      (this.memo_time = []),
        (this.memo_address = []),
        (this.pickDay = date.getDate());
      // this.initCalendar(
      //   this.formatDate(date.getFullYear(), date.getMonth() + 1, 1)
      // );
      // var ddd=date.getDate();
      // if(ddd<10) ddd='0'+ddd;
      var curPickDay = this.formatDate(
        date.getFullYear(),
        // date.getMonth() + 1,
        date.getMonth() + 1,
        date.getDate()
      );
      console.log("选中日期为：" + curPickDay);
      if (this.memo_list.indexOf(curPickDay) > -1) {
        fetch
          .get("?action=/attendance/queryPunchList&day=" + curPickDay, {})
          .then(res => {
            console.log("queryPunchList", res);
            if (res.STATUSCODE == "1") {
              for (var i = 0; i < res.data.length; i++) {
                this.memo_time.push(res.data[i].punchTime);
                this.memo_address.push(res.data[i].punchAddress);
              }
              if (res.data.length == 1) {
                this.currentMemo = [
                  { cont: this.memo_time[0] + "   " + this.memo_address[0] }
                ];
              } else {
                this.currentMemo = [
                  { cont: this.memo_time[0] + "   " + this.memo_address[0] },
                  {
                    cont:
                      this.memo_time[res.data.length - 1] +
                      "   " +
                      this.memo_address[res.data.length - 1]
                  }
                ];
              }
            } else {
              this.$message({
                message: res.MESSAGE + "发生错误",
                type: "error",
                center: true,
                duration: 1000,
                customClass: "msgdefine"
              });
            }
          });
      } else {
        this.currentMemo = [{ cont: "今天未打卡" }];
      }
      // 数据发送请求拿回即可，这里我就写死了,随便写两个样例
      // for(var i=0;i<this.memo_list.length;i++){
      // }
      // if (curPickDay == "2019-10-11") {
      //   this.currentMemo = [
      //     {
      //       cont: "setDate() 方法用于设置一个月的某一天。该方法什么都不返回"
      //     },
      //     {
      //       cont: "getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。"
      //     }
      //   ];
      // } else if (curPickDay == "2019-10-21") {
      //   this.currentMemo = [
      //     {
      //       cont:
      //         "getDay() 方法可返回表示星期的某一天的数字。返回值是 0（周日） 到 6（周六） 之间的一个整数"
      //     },
      //     {
      //       cont:
      //         "setDate(0); 上月最后一天；setDate(-1); 上月倒数第二天；setDate(dx) 参数dx为 上月最后一天的前后dx天"
      //     }
      //   ];
      // } else{
      //   this.currentMemo = [
      //     {
      //       cont:
      //         "今天未打卡"
      //     },
      //   ];
      // }
    },
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      var month = d.getMonth() + 1;
      // var day='01';
      var date = new Date();
      var day = date.getDate();
      var param = d.getFullYear() + "-" + month + "-" + day;
      fetch
        .get("?action=/attendance/queryPunchList&day=" + param, {})
        .then(res => {
          console.log("queryPunchList", res);
          if (res.STATUSCODE == "1") {
            if (res.data.length == 0) {
              this.currentMemo = [{ cont: "今天未打卡" }];
            } else {
              for (var i = 0; i < res.data.length; i++) {
                this.memo_time.push(res.data[i].punchTime);
                this.memo_address.push(res.data[i].punchAddress);
              }
              if (res.data.length == 1) {
                this.currentMemo = [
                  { cont: this.memo_time[0] + "   " + this.memo_address[0] }
                ];
              } else {
                this.currentMemo = [
                  { cont: this.memo_time[0] + "   " + this.memo_address[0] },
                  {
                    cont:
                      this.memo_time[res.data.length - 1] +
                      "   " +
                      this.memo_address[res.data.length - 1]
                  }
                ];
              }
            }
          } else {
            this.$message({
              message: res.MESSAGE + "发生错误",
              type: "error",
              center: true,
              duration: 1000,
              customClass: "msgdefine"
            });
          }
        });
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(42);
      this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      var month = d.getMonth() + 1;
      // var day='01';
      var date = new Date();
      var day = date.getDate();
      var param = d.getFullYear() + "-" + month + "-" + day;
      fetch
        .get("?action=/attendance/queryPunchList&day=" + param, {})
        .then(res => {
          console.log("queryPunchList", res);
          if (res.STATUSCODE == "1") {
            if (res.data.length == 0) {
              this.currentMemo = [{ cont: "今天未打卡" }];
            } else {
              for (var i = 0; i < res.data.length; i++) {
                this.memo_time.push(res.data[i].punchTime);
                this.memo_address.push(res.data[i].punchAddress);
              }
              if (res.data.length == 1) {
                this.currentMemo = [
                  { cont: this.memo_time[0] + "   " + this.memo_address[0] }
                ];
              } else {
                this.currentMemo = [
                  { cont: this.memo_time[0] + "   " + this.memo_address[0] },
                  {
                    cont:
                      this.memo_time[res.data.length - 1] +
                      "   " +
                      this.memo_address[res.data.length - 1]
                  }
                ];
              }
            }
          } else {
            this.$message({
              message: res.MESSAGE + "发生错误",
              type: "error",
              center: true,
              duration: 1000,
              customClass: "msgdefine"
            });
          }
        });
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  margin-top: -0.2rem;
}
/*日历*/
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
#calendar {
  width: 100%;
  /* margin: 40px auto 0; */
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #eee;
}
/* .pickDay {
  margin: 0 auto;
  width: 100px;
  height: 65px;
  text-align: center;
}
.pickDay span {
  font-size: 12px;
  color: #989898;
}
.pickDay span:first-of-type {
  font-size: 72px;
  color: #789af7;
} */
.month {
  width: 100%;
  margin-bottom: -0.1rem;
}
.month ul {
  margin: 29px 0 25px;
  display: flex;
  justify-content: center;
}
.year-month {
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.choose-year {
  font-size: 14px;
  color: #989898;
}
.choose-month {
  text-align: center;
  color: #989898;
  font-size: 14px;
}
.arrow {
  width: 28px;
  height: 28px;
  text-align: center;
}
.arrow:hover {
  background: rgba(100, 2, 12, 0.1);
  cursor: pointer;
}
.month ul li {
  color: #2698d6;
  font-size: 20px;
}
.weekdays {
  width: 90%;
  margin: 0 auto 7.5px;
  display: flex;
  flex-wrap: wrap;
  color: #808080;
  justify-content: space-around;
}
.weekdays li {
  display: inline-block;
  font-size: 16px;
  color: #808080;
  width: 26px;
  text-align: center;
}
.days {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* background: #ffffff; */
}
.days li {
  position: relative;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 0.15rem;
  padding-top: 0.15rem;
  color: #999;
  cursor: pointer;
}
.days .momo_mark {
  position: absolute;
  left: 0.08rem;
  bottom: 0.1rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: #2698d6;
  opacity: 0.3;
}
.days li span {
  font-size: 0.15rem;
}
.days li .active {
  color: #2698d6;
  /* border: 1px solid #7ae690;
  border-radius:50%; */
  /* padding:2px 7px 2px 7px;
  background-color: #7ae690; */
}
.days li .other-month {
  padding: 5px;
  /* color: #e6e6e6; */
  /* color: rgba(255,255,255,0); 设置其他月的字体透明 */
  color: #ccc;
}
.days li:hover {
  color: #2698d6;
  /* border-radius: 50%; */
}
.days li:hover .other-month {
  color: #789af7;
}
.pick:hover {
  position: absolute;
  left: 0.08rem;
  /* bottom: 0.1rem; */
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: #7ae690;
  /* opacity: 0.3; */
  /* color:#666; */
}
/*备忘录*/
#memo {
  width: 400px;
  margin: 10px 0 0 5px;
}
#memo h4 {
  text-indent: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #2698d6;
}
.memo_list li {
  margin-top: 12px;
}
.memo_list .memo_list_s {
  width: 399px;
  margin-left: 20px;
}
.memo_list .memo_list_s:hover {
  background: #eee;
}
.memo_list .memo_list_s:hover .circle {
  background: #f84848;
}
/* .memo_list .memo_list_s:hover #edit_memo {
  background: url(../assets/images/edit_active.png) no-repeat;
} */
/* .memo_list .memo_list_s:hover #del_memo {
  background: url(../assets/del_active.png) no-repeat;
} */
/* .circle {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #2698d6;
  vertical-align: top;
  margin: 12px 5px 0px 9px;
} */
.memo_list_mont {
  display: inline-block;
  width: 323px;
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #666666;
}
/* .memo_operate {
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  padding-top: 9px;
}
.memo_operate button {
  width: 12px;
  height: 12px;
  margin-right: 10px;
  background: #fff;
  border: none;
} */
/* #addMemo {
  width: 96px;
  height: 28px;
  line-height: 28px;
  color: #2698d6;
  background: #fff;
  border: 1px solid #2698d6;
  border-radius: 2px;
  margin: 25px 0 0 20px;
} */
.memo_cont {
  width: 310px;
  background: #2698d6;
  border-radius: 2px;
  margin-left: 20px;
  margin-top: 15px;
  padding: 37px 30px 24px 30px;
}
/* .memo_edit {
  width: 100%;
  min-height: 140px;
  line-height: 28px;
  color: #fff;
  font-size: 14px; */
/* background: url(../assets/bgborder.png) repeat-y; */
/* outline: none;
  border: none;
  resize: none;
}
.edit_operate {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.edit_operate button {
  width: 20px;
  height: 20px;
  margin-left: 16px;
} */
/* #cancel_edit {
  background: url(../assets/error.png) center center no-repeat;
}
#save_edit {
  background: url(../assets/right.png) center center no-repeat;
} */

/*动画*/
/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
.days li span {
  color: #666;
}
.choose-year {
  font-size: 0.15rem;
  color: #666;
}
.choose-month {
  font-size: 0.15rem;
  color: #666;
}
</style>