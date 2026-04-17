<template>
  <div class="mindmap-view">
    <el-card class="header-card">
      <h2>{{ t('mindmap.title') }}</h2>
      <p class="subtitle">{{ t('mindmap.subtitle') }}</p>
    </el-card>

    <el-row :gutter="20">
      <el-col :xs="24" :lg="16">
        <el-card class="chart-card">
          <h3>{{ t('mindmap.partyDistribution') }}</h3>
          <v-chart :option="pieOption" style="height: 500px; width: 100%" autoresize />
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card class="legend-card">
          <h3>{{ t('mindmap.partyStats') }}</h3>
          <div class="party-stats">
            <div
              v-for="stat in partyStats"
              :key="stat.party"
              class="stat-item"
              :style="{ borderLeftColor: stat.color }"
            >
              <div class="stat-name">{{ stat.name }}</div>
              <div class="stat-count">{{ stat.count }} {{ t('mindmap.presidentsCount') }}</div>
              <div class="stat-percentage">{{ stat.percentage }}%</div>
            </div>
          </div>
        </el-card>

        <el-card class="network-card" style="margin-top: 20px">
          <h3>{{ t('mindmap.filterByParty') }}</h3>
          <el-radio-group v-model="selectedParty" @change="filterByParty">
            <el-radio-button value="">{{ t('mindmap.all') }}</el-radio-button>
            <el-radio-button
              v-for="stat in partyStats"
              :key="stat.party"
              :value="stat.party"
            >
              {{ stat.shortName }}
            </el-radio-button>
          </el-radio-group>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="presidents-grid" style="margin-top: 20px">
      <h3>{{ t('mindmap.presidentList') }}</h3>
      <el-row :gutter="20">
        <el-col
          v-for="president in filteredPresidents"
          :key="president.id"
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
        >
          <el-card
            class="president-mini-card card-hover"
            @click="goToDetail(president.id)"
          >
            <div class="mini-portrait">
              <el-image
                :src="president.portrait"
                :alt="president.name"
                fit="cover"
                style="width: 100%; height: 120px"
              >
                <template #error>
                  <div class="image-slot-mini">
                    <el-icon size="30"><User /></el-icon>
                  </div>
                </template>
              </el-image>
              <div
                class="party-indicator"
                :style="{ backgroundColor: getPartyColor(president.party) }"
              ></div>
            </div>
            <div class="mini-info">
              <div class="mini-number">#{{ president.id }}</div>
              <div class="mini-name">{{ president.name }}</div>
              <div class="mini-term">{{ president.termStart }}-{{ president.termEnd || t('president.current') }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="relation-chart" style="margin-top: 20px">
      <h3>{{ t('mindmap.partyRelationGraph') }}</h3>
      <v-chart :option="graphOption" style="height: 600px; width: 100%" autoresize />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePresidentStore } from '@/stores/president'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, GraphChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import type { EChartsOption } from 'echarts'
import { User } from '@element-plus/icons-vue'

use([
  CanvasRenderer,
  PieChart,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const router = useRouter()
const { t } = useI18n()
const store = usePresidentStore()

const selectedParty = ref('')

const partyColors: Record<string, string> = {
  independent: '#6b7280',
  federalist: '#1a1a2e',
  democraticRepublican: '#2d5a87',
  democratic: '#003366',
  whig: '#744210',
  republican: '#e81c24',
  nationalUnion: '#8b5cf6'
}

const partyNames: Record<string, { name: string; shortName: string }> = {
  independent: { name: 'Independent', shortName: 'Ind' },
  federalist: { name: 'Federalist', shortName: 'Fed' },
  democraticRepublican: { name: 'Democratic-Republican', shortName: 'DR' },
  democratic: { name: 'Democratic', shortName: 'Dem' },
  whig: { name: 'Whig', shortName: 'Whig' },
  republican: { name: 'Republican', shortName: 'GOP' },
  nationalUnion: { name: 'National Union', shortName: 'NU' }
}

const partyStats = computed(() => {
  const stats: Record<string, number> = {}
  store.presidents.forEach(p => {
    stats[p.party] = (stats[p.party] || 0) + 1
  })

  const total = store.presidents.length
  return Object.entries(stats).map(([party, count]) => ({
    party,
    name: partyNames[party]?.name || party,
    shortName: partyNames[party]?.shortName || party,
    count,
    percentage: Math.round((count / total) * 100),
    color: partyColors[party] || '#6b7280'
  })).sort((a, b) => b.count - a.count)
})

const filteredPresidents = computed(() => {
  if (!selectedParty.value) return store.presidents
  return store.presidents.filter(p => p.party === selectedParty.value)
})

const pieOption = computed<EChartsOption>(() => {
  return {
    title: {
      text: t('mindmap.partyDistributionTitle'),
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: `{b}: {c} ${t('mindmap.presidentsCount')} ({d}%)`
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '政党分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: `{b}\n{c}${t('mindmap.presidentsCount')}`
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        data: partyStats.value.map(stat => ({
          value: stat.count,
          name: stat.name,
          itemStyle: { color: stat.color }
        }))
      }
    ]
  }
})

const graphOption = computed<EChartsOption>(() => {
  const nodes = store.presidents.slice(0, 15).map(p => ({
    id: p.id.toString(),
    name: p.name,
    symbolSize: 50,
    itemStyle: {
      color: partyColors[p.party] || '#6b7280'
    },
    label: {
      show: true,
      fontSize: 12
    }
  }))

  const links: any[] = []
  const presidents = store.presidents.slice(0, 15)
  
  for (let i = 0; i < presidents.length; i++) {
    for (let j = i + 1; j < presidents.length; j++) {
      if (presidents[i].party === presidents[j].party) {
        links.push({
          source: presidents[i].id.toString(),
          target: presidents[j].id.toString(),
          lineStyle: {
            color: partyColors[presidents[i].party],
            width: 2,
            opacity: 0.3
          }
        })
      }
    }
  }

  return {
    title: {
      text: t('mindmap.partyRelationGraph'),
      left: 'center'
    },
    tooltip: {
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const p = store.presidents.find(pr => pr.id.toString() === params.data.id)
          if (p) {
            return `
              <div style="padding: 10px">
                <h4>${p.name}</h4>
                <p>${p.nameEn}</p>
                <p>${t('mindmap.party')}: ${partyNames[p.party]?.name || p.party}</p>
                <p>${t('mindmap.term')}: ${p.termStart} - ${p.termEnd || t('president.current')}</p>
              </div>
            `
          }
        }
        return ''
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        label: {
          show: true
        },
        force: {
          repulsion: 300,
          edgeLength: 100
        },
        data: nodes,
        links: links
      }
    ]
  }
})

function getPartyColor(party: string): string {
  return partyColors[party] || '#6b7280'
}

function filterByParty() {
}

function goToDetail(id: number) {
  router.push(`/presidents/${id}`)
}
</script>

<style scoped>
.mindmap-view {
  padding: 20px 0;
}

.header-card {
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

.chart-card,
.legend-card,
.network-card {
  height: 100%;
}

.chart-card h3,
.legend-card h3,
.network-card h3,
.presidents-grid h3,
.relation-chart h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #303133;
}

.party-stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-item {
  padding: 15px;
  background: #f5f7fa;
  border-radius: 8px;
  border-left: 4px solid;
}

.stat-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 5px;
}

.stat-count {
  font-size: 14px;
  color: #606266;
}

.stat-percentage {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}

.presidents-grid {
  padding: 20px;
}

.president-mini-card {
  cursor: pointer;
  margin-bottom: 20px;
  overflow: hidden;
}

.mini-portrait {
  position: relative;
}

.image-slot-mini {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background: #f5f7fa;
  color: #909399;
}

.party-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.mini-info {
  padding: 10px;
}

.mini-number {
  font-size: 12px;
  color: #909399;
  margin-bottom: 3px;
}

.mini-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 3px;
}

.mini-term {
  font-size: 12px;
  color: #606266;
}
</style>
