import Vue from 'vue'
import Router from 'vue-router'
import Rhymesaurus from '@/components/Rhymesaurus'
import RhymeMine from '@/components/RhymeMine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rhymesaurus',
      component: Rhymesaurus
    },
    {
      path: '/rhyme-mine',
      name: 'RhymeMine',
      component: RhymeMine
    }
  ]
})
