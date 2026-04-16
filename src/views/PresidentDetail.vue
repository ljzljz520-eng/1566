<template>
  <div class="president-detail" v-if="president">
    <el-button
      type="primary"
      :icon="ArrowLeft"
      @click="goBack"
      style="margin-bottom: 20px"
    >
      返回列表
    </el-button>

    <el-row :gutter="20">
      <el-col :xs="24" :md="8">
        <el-card class="profile-card">
          <div class="portrait-section">
            <el-image
              :src="president.portrait"
              :alt="president.name"
              fit="cover"
              style="width: 100%; height: 300px"
              :preview-src-list="[president.portrait]"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon size="80"><User /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="basic-info">
            <div class="president-title">
              <span class="number">#{{ president.id }}</span>
              <h1>{{ president.name }}</h1>
              <p class="name-en">{{ president.nameEn }}</p>
            </div>
            <el-tag
              class="party-tag"
              :type="getPartyType(president.party)"
              size="large"
            >
              {{ getPartyLabel(president.party) }}
            </el-tag>
            <div class="info-list">
              <div class="info-item">
                <el-icon><Calendar /></el-icon>
                <span class="label">{{ t('president.term') }}:</span>
                <span class="value">{{ president.termStart }} - {{ president.termEnd || '现任' }}</span>
              </div>
              <div class="info-item">
                <el-icon><Star /></el-icon>
                <span class="label">{{ t('president.birth') }}:</span>
                <span class="value">{{ president.birthDate }}</span>
              </div>
              <div class="info-item" v-if="president.deathDate">
                <el-icon><Clock /></el-icon>
                <span class="label">{{ t('president.death') }}:</span>
                <span class="value">{{ president.deathDate }}</span>
              </div>
              <div class="info-item">
                <el-icon><Location /></el-icon>
                <span class="label">{{ t('president.birthplace') }}:</span>
                <span class="value">{{ president.birthplace }}</span>
              </div>
              <div class="info-item">
                <el-icon><Reading /></el-icon>
                <span class="label">{{ t('president.education') }}:</span>
                <span class="value">{{ president.education }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="16">
        <el-card class="detail-card">
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane :label="t('president.biography')" name="biography">
              <div class="tab-content">
                <h3>生平简介</h3>
                <p class="biography-text">{{ president.biography }}</p>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="t('president.achievements')" name="achievements">
              <div class="tab-content">
                <h3>主要成就</h3>
                <el-timeline>
                  <el-timeline-item
                    v-for="(achievement, index) in president.achievements"
                    :key="index"
                    :timestamp="`成就 ${index + 1}`"
                    placement="top"
                  >
                    <el-card>
                      <p>{{ achievement }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="t('president.keyEvents')" name="events">
              <div class="tab-content">
                <h3>关键事件</h3>
                <el-timeline>
                  <el-timeline-item
                    v-for="event in president.keyEvents"
                    :key="event.year"
                    :timestamp="event.year"
                    placement="top"
                    type="primary"
                  >
                    <el-card>
                      <h4>{{ event.title }}</h4>
                      <p>{{ event.description }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="t('president.historicalBackground')" name="background">
              <div class="tab-content">
                <h3>历史背景</h3>
                <p class="background-text">{{ president.historicalBackground }}</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="chart-section" style="margin-top: 20px">
      <h3>任职时间对比</h3>
      <v-chart :option="chartOption" style="height: 400px; width: 100%" autoresize />
    </el-card>
  </div>

  <el-empty v-else description="总统信息不存在" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePresidentStore } from '@/stores/president'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import type { EChartsOption } from 'echarts'
import {
  ArrowLeft,
  User,
  Calendar,
  Star,
  Clock,
  Location,
  Reading
} from '@element-plus/icons-vue'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const store = usePresidentStore()

const activeTab = ref('biography')
const president = computed(() => store.getPresidentById(Number(route.params.id)))

const chartOption = computed<EChartsOption>(() => {
  if (!president.value) return {}

  const allPresidents = store.presidents.slice(0, 10)
  return {
    title: {
      text: '总统任职年限对比',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0]
        const p = allPresidents.find(p => p.name === data.name)
        if (p) {
          return `${p.name}<br/>任职: ${p.termStart} - ${p.termEnd || '现任'}<br/>年限: ${data.value} 年`
        }
        return ''
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: allPresidents.map(p => p.name),
      axisLabel: {
        rotate: 30,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '任职年限（年）'
    },
    series: [
      {
        name: '任职年限',
        type: 'bar',
        data: allPresidents.map(p => {
          const end = p.termEnd || new Date().getFullYear()
          return end - p.termStart
        }),
        itemStyle: {
          color: (params: any) => {
            const p = allPresidents[params.dataIndex]
            if (p.party === 'democratic') return '#003366'
            if (p.party === 'republican') return '#e81c24'
            return '#4a5568'
          }
        }
      }
    ]
  }
})

function getPartyLabel(party: string): string {
  const partyMap: Record<string, string> = {
    independent: '独立',
    federalist: t('parties.federalist'),
    democraticRepublican: t('parties.democraticRepublican'),
    democratic: t('parties.democratic'),
    whig: t('parties.whig'),
    republican: t('parties.republican'),
    nationalUnion: t('parties.nationalUnion')
  }
  return partyMap[party] || party
}

function getPartyType(party: string): '' | 'success' | 'warning' | 'danger' | 'info' {
  const typeMap: Record<string, '' | 'success' | 'warning' | 'danger' | 'info'> = {
    democratic: 'primary',
    republican: 'danger',
    federalist: 'info',
    democraticRepublican: 'warning',
    whig: 'success',
    independent: ''
  } as any
  return typeMap[party] || ''
}

function goBack() {
  router.back()
}

onMounted(() => {
  if (!president.value && route.params.id) {
    router.push('/presidents')
  }
})
</script>

<style scoped>
.president-detail {
  padding: 20px 0;
}

.profile-card {
  margin-bottom: 20px;
}

.portrait-section {
  text-align: center;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background: #f5f7fa;
  color: #909399;
}

.basic-info {
  padding: 20px 0;
}

.president-title {
  text-align: center;
  margin-bottom: 15px;
}

.president-title .number {
  display: block;
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.president-title h1 {
  font-size: 28px;
  margin: 0 0 5px 0;
  color: #303133;
}

.president-title .name-en {
  font-size: 16px;
  color: #606266;
  margin: 0;
}

.party-tag {
  display: block;
  width: fit-content;
  margin: 0 auto 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-item .label {
  color: #606266;
  min-width: 80px;
}

.info-item .value {
  color: #303133;
  flex: 1;
}

.detail-card {
  min-height: 500px;
}

.tab-content {
  padding: 20px 0;
}

.tab-content h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #303133;
}

.biography-text,
.background-text {
  line-height: 1.8;
  color: #606266;
  font-size: 15px;
}

.chart-section {
  padding: 20px;
}

.chart-section h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #303133;
}
</style>
