<template>
  <div class="mindmap-page">
    <div class="container">
      <div class="page-header">
        <h2>{{ $t('mindmap.title') }}</h2>
        <p class="subtitle">{{ $t('mindmap.subtitle') }}</p>
      </div>

      <div class="mindmap-container card">
        <div ref="chartRef" class="chart"></div>
      </div>

      <div class="legend-info card">
        <h3>图例说明</h3>
        <div class="legend-list">
          <div class="legend-item">
            <div class="legend-color democratic"></div>
            <span>民主党</span>
          </div>
          <div class="legend-item">
            <div class="legend-color republican"></div>
            <span>共和党</span>
          </div>
          <div class="legend-item">
            <div class="legend-color other"></div>
            <span>其他党派/无党派</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { usePresidentStore } from '@/stores/president'
import type { ECharts } from 'echarts'
import type { President } from '@/types/president'

const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | null = null
const presidentStore = usePresidentStore()

const getPartyColor = (party: string) => {
  if (party.includes('民主党') || party.includes('Democratic')) return '#1976d2'
  if (party.includes('共和党') || party.includes('Republican')) return '#c62828'
  return '#7b1fa2'
}

const buildGraphData = () => {
  const nodes: any[] = []
  const links: any[] = []
  const presidentMap = new Map<number, President>()

  presidentStore.list.forEach(p => {
    presidentMap.set(p.id, p)
    nodes.push({
      id: p.id.toString(),
      name: p.name,
      symbolSize: 50 + (p.termEnd - p.termStart) * 2,
      value: p.termEnd - p.termStart,
      itemStyle: {
        color: getPartyColor(p.party)
      },
      label: {
        show: true,
        fontSize: 12
      }
    })
  })

  presidentStore.list.forEach(p => {
    p.relations.forEach(rel => {
      if (presidentMap.has(rel.id)) {
        links.push({
          source: p.id.toString(),
          target: rel.id.toString(),
          value: 1,
          lineStyle: {
            width: 1,
            curveness: 0.1
          }
        })
      }
    })
  })

  return { nodes, links }
}

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  const graphData = buildGraphData()

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const president = presidentStore.getPresidentById(Number(params.data.id))
          if (president) {
            return `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 8px;">${president.name}</div>
                <div>任期: ${president.termStart} - ${president.termEnd}</div>
                <div>党派: ${president.party}</div>
                <div>在任年数: ${president.termEnd - president.termStart}年</div>
              </div>
            `
          }
        }
        return ''
      }
    },
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: graphData.nodes,
        links: graphData.links,
        roam: true,
        draggable: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        emphasis: {
          focus: 'adjacency',
          label: {
            fontSize: 14,
            fontWeight: 'bold'
          },
          lineStyle: {
            width: 3
          }
        },
        force: {
          repulsion: 500,
          gravity: 0.1,
          edgeLength: 150
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped lang="scss">
.mindmap-page {
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

  .mindmap-container {
    height: 700px;
    padding: 20px;
    margin-bottom: 20px;

    .chart {
      width: 100%;
      height: 100%;
    }

    @include sm {
      height: 500px;
    }
  }

  .legend-info {
    padding: 20px;

    h3 {
      margin-bottom: 15px;
      font-size: 18px;
    }

    .legend-list {
      display: flex;
      gap: 30px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;

          &.democratic {
            background: #1976d2;
          }

          &.republican {
            background: #c62828;
          }

          &.other {
            background: #7b1fa2;
          }
        }
      }
    }
  }
}
</style>
