<template>
  <div class="statistics-page">
    <div class="container">
      <div class="page-header">
        <h2>{{ $t('statistics.title') }}</h2>
        <p class="subtitle">{{ $t('statistics.subtitle') }}</p>
      </div>

      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <div class="chart-card card">
            <h3 class="chart-title">{{ $t('statistics.partyDistribution') }}</h3>
            <div ref="partyChartRef" class="chart"></div>
          </div>
        </el-col>
        <el-col :xs="24" :lg="12">
          <div class="chart-card card">
            <h3 class="chart-title">{{ $t('statistics.termDuration') }}</h3>
            <div ref="termChartRef" class="chart"></div>
          </div>
        </el-col>
      </el-row>

      <div class="chart-card card" style="margin-top: 20px;">
        <h3 class="chart-title">{{ $t('statistics.ageDistribution') }}</h3>
        <div ref="ageChartRef" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { usePresidentStore } from '@/stores/president'
import type { ECharts } from 'echarts'

const partyChartRef = ref<HTMLElement>()
const termChartRef = ref<HTMLElement>()
const ageChartRef = ref<HTMLElement>()

let partyChart: ECharts | null = null
let termChart: ECharts | null = null
let ageChart: ECharts | null = null

const presidentStore = usePresidentStore()

const initPartyChart = () => {
  if (!partyChartRef.value) return

  const partyCount: Record<string, number> = {}
  presidentStore.list.forEach(p => {
    const party = p.party
    partyCount[party] = (partyCount[party] || 0) + 1
  })

  const data = Object.entries(partyCount).map(([name, value]) => ({
    name,
    value,
    itemStyle: {
      color: name.includes('民主党') ? '#1976d2' : 
             name.includes('共和党') ? '#c62828' :
             name.includes('民主共和党') ? '#7b1fa2' :
             name.includes('联邦党') ? '#ef6c00' : '#00695c'
    }
  }))

  partyChart = echarts.init(partyChartRef.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
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
          formatter: '{b}: {c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        data
      }
    ]
  }

  partyChart.setOption(option)
}

const initTermChart = () => {
  if (!termChartRef.value) return

  const termDuration: Record<string, number> = {
    '1届(4年以下)': 0,
    '1届(4年)': 0,
    '2届(8年)': 0,
    '3届及以上': 0
  }

  presidentStore.list.forEach(p => {
    const duration = p.termEnd - p.termStart
    if (duration < 4) termDuration['1届(4年以下)']++
    else if (duration < 8) termDuration['1届(4年)']++
    else if (duration < 12) termDuration['2届(8年)']++
    else termDuration['3届及以上']++
  })

  const data = Object.entries(termDuration).map(([name, value]) => ({ name, value }))

  termChart = echarts.init(termChartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
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
      data: data.map(item => item.name)
    },
    yAxis: {
      type: 'value',
      name: '人数'
    },
    series: [
      {
        type: 'bar',
        data: data.map(item => ({
          value: item.value,
          itemStyle: {
            color: '#67c23a'
          }
        })),
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  }

  termChart.setOption(option)
}

const initAgeChart = () => {
  if (!ageChartRef.value) return

  const ageGroups: Record<string, number> = {
    '40岁以下': 0,
    '40-49岁': 0,
    '50-59岁': 0,
    '60-69岁': 0,
    '70岁以上': 0
  }

  presidentStore.list.forEach(p => {
    const birthYear = new Date(p.birthDate).getFullYear()
    const inaugurationAge = p.termStart - birthYear
    if (inaugurationAge < 40) ageGroups['40岁以下']++
    else if (inaugurationAge < 50) ageGroups['40-49岁']++
    else if (inaugurationAge < 60) ageGroups['50-59岁']++
    else if (inaugurationAge < 70) ageGroups['60-69岁']++
    else ageGroups['70岁以上']++
  })

  const data = Object.entries(ageGroups).map(([name, value]) => ({ name, value }))

  ageChart = echarts.init(ageChartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
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
      boundaryGap: false,
      data: data.map(item => item.name)
    },
    yAxis: {
      type: 'value',
      name: '人数'
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: data.map(item => item.value),
        lineStyle: {
          width: 3,
          color: '#409eff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.5)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
          ])
        },
        itemStyle: {
          color: '#409eff'
        },
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  }

  ageChart.setOption(option)
}

const handleResize = () => {
  partyChart?.resize()
  termChart?.resize()
  ageChart?.resize()
}

onMounted(() => {
  initPartyChart()
  initTermChart()
  initAgeChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  partyChart?.dispose()
  termChart?.dispose()
  ageChart?.dispose()
})
</script>

<style scoped lang="scss">
.statistics-page {
  .page-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 32px;
      margin-bottom: 10px;
      color: $text-color;
    }

    .subtitle {
      font-size: 16px;
      color: $text-color-light;
    }

    @include sm {
      h2 {
        font-size: 24px;
      }
      .subtitle {
        font-size: 14px;
      }
    }
  }

  .chart-card {
    padding: 20px;
    margin-bottom: 20px;

    .chart-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid $border-color;
    }

    .chart {
      width: 100%;
      height: 400px;

      @include sm {
        height: 300px;
      }
    }
  }
}
</style>
