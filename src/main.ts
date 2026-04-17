import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, TreeChart, GraphChart, CustomChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent
} from 'echarts/components'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import './styles/global.scss'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TreeChart,
  GraphChart,
  CustomChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent
])

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('v-chart', ECharts)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(i18n)

app.mount('#app')
