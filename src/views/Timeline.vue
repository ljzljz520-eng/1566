<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePresidentStore } from '../stores/president'
import { storeToRefs } from 'pinia'

const { t, locale } = useI18n()
const router = useRouter()
const store = usePresidentStore()
const { presidents } = storeToRefs(store)

const selectedCentury = ref<number | null>(null)

const centuries = [
  { label: '全部', value: null },
  { label: '18世纪', value: 1700 },
  { label: '19世纪', value: 1800 },
  { label: '20世纪', value: 1900 },
  { label: '21世纪', value: 2000 }
]

const sortedPresidents = computed(() => {
  let list = [...presidents.value].sort((a, b) => a.termStart - b.termStart)
  
  if (selectedCentury.value !== null) {
    list = list.filter(p => 
      p.termStart >= selectedCentury.value! && 
      p.termStart < selectedCentury.value! + 100
    )
  }
  
  return list
})

const timelineChartData = computed(() => {
  const presidents = sortedPresidents.value
  const categories = presidents.map(p => locale.value === 'zh-CN' ? p.name : p.nameEn)
  
  const seriesData = presidents.map((p, index) => {
    const start = p.termStart
    const end = p.termEnd || new Date().getFullYear()
    return {
      name: categories[index],
      value: [index, start, end],
      itemStyle: {
        color: getPartyColor(p.party)
      },
      startYear: start,
      endYear: end,
      party: p.party
    }
  })

  return {
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        const data = params.data
        const start = data.startYear
        const end = data.endYear
        return `${data.name}<br/>任期: ${start} - ${end === new Date().getFullYear() ? '现任' : end}`
      }
    },
    grid: {
      left: '18%',
      right: '10%',
      top: '8%',
      bottom: '12%'
    },
    xAxis: {
      type: 'value',
      min: 1780,
      max: new Date().getFullYear() + 5,
      axisLabel: {
        formatter: '{value}',
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: categories,
      inverse: true,
      axisLabel: {
        color: '#fff',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      }
    },
    series: [
      {
        type: 'custom',
        renderItem: function(params: any, api: any) {
          const categoryIndex = api.value(0)
          const start = api.coord([api.value(1), categoryIndex])
          const end = api.coord([api.value(2), categoryIndex])
          const height = api.size([0, 1])[1] * 0.6
          
          const rectShape = {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          }
          
          return {
            type: 'rect',
            shape: rectShape,
            style: api.style()
          }
        },
        dimensions: ['index', 'start', 'end'],
        encode: {
          x: [1, 2],
          y: 0
        },
        data: seriesData
      }
    ]
  }
})

function getPartyColor(party: string): string {
  const colorMap: Record<string, string> = {
    democratic: '#409EFF',
    republican: '#F56C6C',
    federalist: '#E6A23C',
    democraticRepublican: '#67C23A',
    whig: '#909399',
    nationalUnion: '#E6A23C',
    independent: '#909399'
  }
  return colorMap[party] || '#909399'
}

function getPartyTagType(party: string) {
  const typeMap: Record<string, string> = {
    democratic: 'primary',
    republican: 'danger',
    federalist: 'warning',
    democraticRepublican: 'success',
    whig: 'info',
    nationalUnion: 'warning',
    independent: 'info'
  }
  return typeMap[party] || 'info'
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjwvc3ZnPg=='
}
</script>

<template>
  <div class="timeline-page">
    <div class="container">
      <h1 class="page-title">{{ t('timeline.title') }}</h1>
      <p class="page-subtitle">{{ t('timeline.subtitle') }}</p>

      <el-card class="filter-card">
        <el-radio-group v-model="selectedCentury" size="large">
          <el-radio-button
            v-for="century in centuries"
            :key="century.value"
            :label="century.value"
          >
            {{ century.label }}
          </el-radio-button>
        </el-radio-group>
      </el-card>

      <el-card class="chart-card">
        <v-chart :option="timelineChartData" style="height: 500px; width: 100%" autoresize />
      </el-card>

      <div class="timeline-container">
        <el-timeline>
          <el-timeline-item
            v-for="president in sortedPresidents"
            :key="president.id"
            :timestamp="president.termStart"
            placement="top"
            :color="getPartyColor(president.party)"
            size="large"
          >
            <el-card 
              class="timeline-card card-hover" 
              @click="router.push(`/president/${president.id}`)"
            >
              <div class="timeline-card-content">
                <img :src="president.portrait" :alt="president.name" class="mini-portrait" @error="handleImageError" />
                <div class="card-info">
                  <div class="card-header">
                    <h3>{{ locale === 'zh-CN' ? president.name : president.nameEn }}</h3>
                    <el-tag :type="getPartyTagType(president.party)" size="small">
                      {{ t(`party.${president.party}`) }}
                    </el-tag>
                  </div>
                  <p class="term">
                    {{ president.termStart }} - {{ president.termEnd || '现任' }}
                  </p>
                  <p class="preview">
                    {{ (locale === 'zh-CN' ? president.achievements[0] : president.achievementsEn[0]) }}
                  </p>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline-page {
  min-height: 100%;
}

.page-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
}

.filter-card {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
}

.chart-card {
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
}

.timeline-container {
  padding: 20px 0;
}

.timeline-card {
  cursor: pointer;
  max-width: 600px;
}

.timeline-card-content {
  display: flex;
  gap: 20px;
}

.mini-portrait {
  width: 80px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    color: #333;
  }
}

.term {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.preview {
  color: #555;
  font-size: 0.875rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
