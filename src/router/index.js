import Vue from 'vue'
import Router from 'vue-router'

import index from '@/views/index'
/**
import login from '@/views/login/login'
import home from '@/views/home/home'
import eventList from '@/views/home/eventList'
>>>>>>> 4e0a5d184d6bb66073138f82fbbcdd65395d1281
import eventShow from '@/views/home/eventShow'
import eventFeedback from '@/views/home/eventFeedback'
import eventPeople from '@/views/home/eventPeople'
import eventReplenish from '@/views/home/eventReplenish'
import eventEvaluation from '@/views/home/eventEvaluation'
import eventEvaluationEditor from '@/views/home/eventEvaluationEditor'
import programList from '@/views/home/programList'
import programShow from '@/views/home/programShow'
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
import mineNotice from '@/views/mine/mineNotice'
import mineFeedback from '@/views/mine/mineFeedback'
import mineFeedbackShow from '@/views/mine/mineFeedbackShow'*/

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
          component: resolve => require(['@/views/home/home'],resolve)
        },
        {
          path: '/approve',
          name: 'approve',
          component: resolve => require(['@/views/approve/approve'],resolve)
        },
        {
          path: '/workBench',
          name: 'workBench',
          component: resolve => require(['@/views/workBench/workBench'],resolve)
        },
        {
          path: '/reportForm',
          name: 'reportForm',
          component: resolve => require(['@/views/reportForm/reportForm'],resolve)
        },
        {
          path: '/mine',
          name: 'mine',
          component: resolve => require(['@/views/mine/mine'],resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'],resolve)
    },
    {
      path: '/home/eventList',
      name: 'eventList',
      component: resolve => require(['@/views/home/eventList'],resolve)
    },
    {
      path: '/home/eventShow',
      name: 'eventShow',
      component: resolve => require(['@/views//home/eventShow'],resolve)
    },
    {
      path: '/home/eventFeedback',
      name: 'eventFeedback',
      component: resolve => require(['@/views/home/eventFeedback'],resolve)
    },
    {
      path: '/home/eventPeople',
      name: 'eventPeople',
      component: resolve => require(['@/views/home/eventPeople'],resolve)
    },
    {
      path: '/home/eventReplenish',
      name: 'eventReplenish',
      component: resolve => require(['@/views/home/eventReplenish'],resolve)
    },
    {
      path: '/home/eventEvaluation',
      name: 'eventEvaluation',
      component: resolve => require(['@/views/home/eventEvaluation'],resolve)
    },
    {
      path: '/home/eventEvaluationEditor',
      name: 'eventEvaluationEditor',
      component: resolve => require(['@/views/home/eventEvaluationEditor'],resolve)
    },
    {
      path: '/home/programList',
      name: 'programList',
      component: resolve => require(['@/views/home/programList'],resolve)
    },
    {
      path: '/home/programShow',
      name: 'programShow',
      component: resolve => require(['@/views/home/programShow'],resolve)
    },
    {
      path: '/home/opinion',
      name: 'opinion',
      component: resolve => require(['@/views/home/opinion'],resolve)
    },
    {
      path: '/workBench/workBenchInfo',
      name: 'workBenchInfo',
      component: resolve => require(['@/views/workBench/workBenchInfo'],resolve)
    },
    {
      path: '/workBench/workBenchInfoDetail',
      name: 'workBenchInfoDetail',
      component: resolve => require(['@/views/workBench/workBenchInfoDetail'],resolve)
    },
    {
      path: '/workBench/workBenchEventInfo',
      name: 'workBenchEventInfo',
      component: resolve => require(['@/views/workBench/workBenchEventInfo'],resolve)
    },
    {
      path: '/workBench/workBenchPeopleInfo',
      name: 'workBenchPeopleInfo',
      component: resolve => require(['@/views/workBench/workBenchPeopleInfo'],resolve)
    },
    {
      path: '/workBench/workBenchParts',
      name: 'workBenchParts',
      component: resolve => require(['@/views/workBench/workBenchParts'],resolve)
    },
    {
      path: '/workBench/workBenchSupplier',
      name: 'workBenchSupplier',
      component: resolve => require(['@/views/workBench/workBenchSupplier'],resolve)
    },
    {
      path: '/workBench/workBenchPOinfo',
      name: 'workBenchPOinfo',
      component: resolve => require(['@/views/workBench/workBenchPOinfo'],resolve)
    },
    {
      path: '/workBench/workBenchMyEvent',
      name: 'workBenchMyEvent',
      component: resolve => require(['@/views/workBench/workBenchMyEvent'],resolve)
    },
    {
      path: '/workBench/workBenchMyPro',
      name: 'workBenchMyPro',
      component: resolve => require(['@/views/workBench/workBenchMyPro'],resolve)
    },
    {
      path: '/workBench/workBenchDeclare',
      name: 'workBenchDeclare',
      component: resolve => require(['@/views/workBench/workBenchDeclare'],resolve)
    },
    {
      path: '/mine/mineNotice',
      name: 'mineNotice',
      component: resolve => require(['@/views/mine/mineNotice'],resolve)
    },
    {
      path: '/mine/mineFeedback',
      name: 'mineFeedback',
      component: resolve => require(['@/views//mine/mineFeedback'],resolve)
    },
    {
      path: '/mine/mineFeedbackShow',
      name: 'mineFeedbackShow',
      component: resolve => require(['@/views//mine/mineFeedbackShow'],resolve)
    }
  ]
})
