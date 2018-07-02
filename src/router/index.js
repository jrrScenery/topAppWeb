import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login/login'
import home from '@/views/home/home'
import eventList from '@/views/home/eventList'
import eventShow from '@/views/home/eventShow'
import eventFeedback from '@/views/home/eventFeedback'
import eventPeople from '@/views/home/eventPeople'
import eventReplenish from '@/views/home/eventReplenish'
import eventEvaluation from '@/views/home/eventEvaluation'
import eventEvaluationEditor from '@/views/home/eventEvaluationEditor'
import programList from '@/views/home/programList'
import programShow from '@/views/home/programShow'
import approve from '@/views/approve/approve'
import workBench from '@/views/workBench/workBench'
import workBenchInfo from '@/views/workBench/workBenchInfo'
import workBenchInfoDetail from '@/views/workBench/workBenchInfoDetail'
import workBenchEventInfo from '@/views/workBench/workBenchEventInfo'
import workBenchPeopleInfo from '@/views/workBench/workBenchPeopleInfo'
import workBenchParts from '@/views/workBench/workBenchParts'
import workBenchSupplier from '@/views/workBench/workBenchSupplier'
import workBenchPOinfo from '@/views/workBench/workBenchPOinfo'
import workBenchMyEvent from '@/views/workBench/workBenchMyEvent'
import workBenchMyPro from '@/views/workBench/workBenchMyPro'
import workBenchDeclare from '@/views/workBench/workBenchDeclare'
import reportForm from '@/views/reportForm/reportForm'
import mine from '@/views/mine/mine'
import mineNotice from '@/views/mine/mineNotice'
import mineFeedback from '@/views/mine/mineFeedback'
import mineFeedbackShow from '@/views/mine/mineFeedbackShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: index,
      name: 'idnex',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/approve',
          name: 'approve',
          component: approve
        },
        {
          path: '/workBench',
          name: 'workBench',
          component: workBench
        },
        {
          path: '/reportForm',
          name: 'reportForm',
          component: reportForm
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home/eventList',
      name: 'eventList',
      component: eventList
    },
    {
      path: '/home/eventShow',
      name: 'eventShow',
      component: eventShow
    },
    {
      path: '/home/eventFeedback',
      name: 'eventFeedback',
      component: eventFeedback
    },
    {
      path: '/home/eventPeople',
      name: 'eventPeople',
      component: eventPeople
    },
    {
      path: '/home/eventReplenish',
      name: 'eventReplenish',
      component: eventReplenish
    },
    {
      path: '/home/eventEvaluation',
      name: 'eventEvaluation',
      component: eventEvaluation
    },
    {
      path: '/home/eventEvaluationEditor',
      name: 'eventEvaluationEditor',
      component: eventEvaluationEditor
    },
    {
      path: '/home/programList',
      name: 'programList',
      component: programList
    },
    {
      path: '/home/programShow',
      name: 'programShow',
      component: programShow
    },
    {
      path: '/workBench/workBenchInfo',
      name: 'workBenchInfo',
      component: workBenchInfo
    },
    {
      path: '/workBench/workBenchInfoDetail',
      name: 'workBenchInfoDetail',
      component: workBenchInfoDetail
    },
    {
      path: '/workBench/workBenchEventInfo',
      name: 'workBenchEventInfo',
      component: workBenchEventInfo
    },
    {
      path: '/workBench/workBenchPeopleInfo',
      name: 'workBenchPeopleInfo',
      component: workBenchPeopleInfo
    },
    {
      path: '/workBench/workBenchParts',
      name: 'workBenchParts',
      component: workBenchParts
    },
    {
      path: '/workBench/workBenchSupplier',
      name: 'workBenchSupplier',
      component: workBenchSupplier
    },
    {
      path: '/workBench/workBenchPOinfo',
      name: 'workBenchPOinfo',
      component: workBenchPOinfo
    },
    {
      path: '/workBench/workBenchMyEvent',
      name: 'workBenchMyEvent',
      component: workBenchMyEvent
    },
    {
      path: '/workBench/workBenchMyPro',
      name: 'workBenchMyPro',
      component: workBenchMyPro
    },
    {
      path: '/workBench/workBenchDeclare',
      name: 'workBenchDeclare',
      component: workBenchDeclare
    },
    {
      path: '/mine/mineNotice',
      name: 'mineNotice',
      component: mineNotice
    },
    {
      path: '/mine/mineFeedback',
      name: 'mineFeedback',
      component: mineFeedback
    },
    {
      path: '/mine/mineFeedbackShow',
      name: 'mineFeedbackShow',
      component: mineFeedbackShow
    }
  ]
})
