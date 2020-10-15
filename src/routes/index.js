import Home from '@pages/Home'
import SubIndex from '@pages/SubIndex'
import NotFound from '@pages/NotFound'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/subIndex',
    component: SubIndex,
    exact: true
  },
  {
    path: '*',
    component: NotFound
  }
]