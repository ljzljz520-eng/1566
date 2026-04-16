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
  const data = sortedPresidents.value.map(p => ({
    name: locale.value === 'zh-CN' ? p.name : p.nameEn,
    value: [p.termStart, p.termEnd || new Date().getFullYear()],
    itemStyle: {
      color: getPartyColor(p.party)
    }
  }))

  return {
    tooltip: {
      trigger: 'item'
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      type: 'value',
      min: 1780,
      max: new Date().getFullYear(),
      axisLabel: {
        formatter: '{value}',
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      }
    },
    series: [
      {
        type: 'bar',
        orientation: 'horizontal',
        barWidth: 20,
        data: data
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
                <img :src="president.portrait" :alt="president.name" class="mini-portrait" />
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
