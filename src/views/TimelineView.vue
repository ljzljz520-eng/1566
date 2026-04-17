<template>
  <div class="timeline-view">
    <el-card class="header-card">
      <h2>{{ t('timeline.title') }}</h2>
      <p class="subtitle">{{ t('timeline.subtitle') }}</p>
    </el-card>

    <div class="chart-container">
      <el-card>
        <h3>{{ t('timeline.termTimeline') }}</h3>
        <v-chart :option="timelineOption" style="height: 800px; width: 100%" autoresize />
      </el-card>
    </div>

    <div class="timeline-container" style="margin-top: 30px">
      <el-card>
        <h3>{{ t('timeline.detailedTimeline') }}</h3>
        <el-timeline v-if="sortedPresidents.length > 0">
          <el-timeline-item
            v-for="president in sortedPresidents"
            :key="president.id"
            :timestamp="`${president.termStart} - ${president.termEnd || t('president.current')}`"
            placement="top"
            :type="getTimelineType(president.party)"
            :color="getTimelineColor(president.party)"
            size="large"
          >
            <el-card class="timeline-card card-hover" @click="goToDetail(president.id)">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="6">
                  <el-image
                    :src="president.portrait"
                    :alt="president.name"
                    fit="cover"
                    style="width: 100%; height: 120px; border-radius: 8px"
                  >
                    <template #error>
                      <div class="image-slot-small">
                        <el-icon size="40"><User /></el-icon>
                      </div>
                    </template>
                  </el-image>
                </el-col>
                <el-col :xs="24" :sm="18">
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <el-tag size="small">#{{ president.id }}</el-tag>
                      <h4>{{ president.name }}</h4>
                      <el-tag :type="getPartyType(president.party)" size="small">
                        {{ getPartyLabel(president.party) }}
                      </el-tag>
                    </div>
                    <p class="president-name-en">{{ president.nameEn }}</p>
                    <div class="key-events-preview">
                      <el-tag
                        v-for="event in president.keyEvents.slice(0, 2)"
                        :key="event.year"
                        size="small"
                        type="info"
                      >
                        {{ event.year }}: {{ event.title }}
                      </el-tag>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePresidentStore } from '@/stores/president'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CustomChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import type { EChartsOption } from 'echarts'
import { User } from '@element-plus/icons-vue'

use([
  CanvasRenderer,
  CustomChart,
  TooltipComponent,
  GridComponent
])

const router = useRouter()
const { t } = useI18n()
const store = usePresidentStore()

const sortedPresidents = computed(() => {
  return [...store.presidents].sort((a, b) => a.termStart - b.termStart)
})

const timelineOption = computed<EChartsOption>(() => {
  const presidents = sortedPresidents.value
  const categories = presidents.map(p => p.name)
  const data = presidents.map((p, index) => {
    const end = p.termEnd || new Date().getFullYear()
    return [p.termStart, index, end, p.termStart, p]
  })

  return {
    tooltip: {
      formatter: (params: any) => {
        const p = params.data[4]
        return `
          <div style="padding: 10px">
            <h4 style="margin: 0 0 10px 0">${p.name}</h4>
            <p style="margin: 5px 0">${p.nameEn}</p>
            <p style="margin: 5px 0">${t('timeline.termLabel')}: ${p.termStart} - ${p.termEnd || t('president.current')}</p>
            <p style="margin: 5px 0">${t('timeline.partyLabel')}: ${getPartyLabel(p.party)}</p>
          </div>
        `
      }
    },
    grid: {
      left: '15%',
      right: '10%',
      top: '5%',
      bottom: '5%'
    },
    xAxis: {
      type: 'value',
      min: 1780,
      max: new Date().getFullYear() + 5,
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        type: 'custom',
        renderItem: (params, api) => {
          const categoryIndex = api.value(1) as number
          const start = api.coord([api.value(0), categoryIndex])
          const end = api.coord([api.value(2), categoryIndex])
          const height = api.size([0, 1])[1] * 0.6

          const rectShape = {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          }

          const p = presidents[categoryIndex]
          let color = '#4a5568'
          if (p.party === 'democratic') color = '#003366'
          if (p.party === 'republican') color = '#e81c24'
          if (p.party === 'federalist') color = '#1a1a2e'
          if (p.party === 'democraticRepublican') color = '#2d5a87'

          return {
            type: 'rect',
            shape: rectShape,
            style: {
              fill: color,
              stroke: '#fff',
              lineWidth: 1
            }
          }
        },
        dimensions: ['start', 'category', 'end'],
        encode: {
          x: [0, 2],
          y: 1
        },
        data: data
      }
    ]
  }
})

function getPartyLabel(party: string): string {
  const partyMap: Record<string, string> = {
    independent: t('president.independent'),
    federalist: t('parties.federalist'),
    democraticRepublican: t('parties.democraticRepublican'),
    democratic: t('parties.democratic'),
    whig: t('parties.whig'),
    republican: t('parties.republican'),
    nationalUnion: t('parties.nationalUnion')
  }
  return partyMap[party] || party
}

function getPartyType(party: string): '' | 'success' | 'warning' | 'danger' | 'info' | 'primary' {
  const typeMap: Record<string, '' | 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
    democratic: 'primary',
    republican: 'danger',
    federalist: 'info',
    democraticRepublican: 'warning',
    whig: 'success',
    independent: ''
  }
  return typeMap[party] || ''
}

function getTimelineType(party: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' {
  return getPartyType(party) || 'info'
}

function getTimelineColor(party: string): string {
  const colorMap: Record<string, string> = {
    democratic: '#409eff',
    republican: '#f56c6c',
    federalist: '#909399',
    democraticRepublican: '#e6a23c',
    whig: '#67c23a',
    independent: '#909399'
  }
  return colorMap[party] || '#909399'
}

function goToDetail(id: number) {
  router.push(`/presidents/${id}`)
}
</script>

<style scoped>
.timeline-view {
  padding: 20px 0;
}

.header-card {
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.header-card h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.header-card .subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 16px;
}

.chart-container {
  margin-bottom: 30px;
}

.chart-container h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #303133;
}

.timeline-container h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #303133;
}

.timeline-card {
  cursor: pointer;
  margin-bottom: 10px;
}

.image-slot-small {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background: #f5f7fa;
  color: #909399;
  border-radius: 8px;
}

.timeline-content {
  padding: 5px 0;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.timeline-header h4 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.president-name-en {
  margin: 0 0 10px 0;
  color: #606266;
  font-size: 14px;
}

.key-events-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
