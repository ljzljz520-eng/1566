<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePresidentStore } from '../stores/president'
import { storeToRefs } from 'pinia'
import { InfoFilled } from '@element-plus/icons-vue'

const { t, locale } = useI18n()
const router = useRouter()
const store = usePresidentStore()
const { presidents } = storeToRefs(store)

const selectedRelationType = ref<string | null>(null)

const relationTypes = [
  { label: '全部关系', value: null },
  { label: '政治合作', value: 'political' },
  { label: '竞争关系', value: 'rival' },
  { label: '家族关系', value: 'family' }
]

const relationLabels: Record<string, string> = {
  political: '政治合作',
  rival: '竞争关系',
  family: '家族关系'
}

const mindMapData = computed(() => {
  const nodes = presidents.value.map(p => ({
    id: p.id.toString(),
    name: locale.value === 'zh-CN' ? p.name : p.nameEn,
    party: p.party,
    symbolSize: 50,
    itemStyle: {
      color: getPartyColor(p.party)
    },
    label: {
      show: true,
      position: 'bottom',
      fontSize: 12,
      color: '#fff'
    }
  }))

  const links: any[] = []
  
  presidents.value.forEach(p => {
    if (p.relations && p.relations.length > 0) {
      p.relations.forEach(rel => {
        if (selectedRelationType.value === null || rel.type === selectedRelationType.value) {
          links.push({
            source: p.id.toString(),
            target: rel.targetId.toString(),
            lineStyle: {
              color: getRelationColor(rel.type),
              width: 2,
              curveness: 0.2
            },
            label: {
              show: true,
              formatter: locale.value === 'zh-CN' ? relationLabels[rel.type] || rel.type : rel.type,
              fontSize: 10,
              color: '#fff'
            }
          })
        }
      })
    }
  })

  if (links.length === 0) {
    presidents.value.forEach((p, index) => {
      if (index > 0) {
        links.push({
          source: presidents.value[0].id.toString(),
          target: p.id.toString(),
          lineStyle: {
            color: 'rgba(255,255,255,0.3)',
            width: 1,
            type: 'dashed'
          }
        })
      }
    })
  }

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const president = presidents.value.find(p => p.id.toString() === params.data.id)
          if (president) {
            return `<div style="padding: 10px;">
              <strong>${locale.value === 'zh-CN' ? president.name : president.nameEn}</strong><br/>
              ${t('party.' + president.party)}<br/>
              ${president.termStart} - ${president.termEnd || '现任'}
            </div>`
          }
        }
        return ''
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        roam: true,
        draggable: true,
        force: {
          repulsion: 300,
          edgeLength: 150,
          gravity: 0.1
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4
          }
        }
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

function getRelationColor(type: string): string {
  const colorMap: Record<string, string> = {
    political: '#67C23A',
    rival: '#F56C6C',
    family: '#409EFF'
  }
  return colorMap[type] || '#909399'
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

function getRelationTagType(type: string) {
  const typeMap: Record<string, string> = {
    political: 'success',
    rival: 'danger',
    family: 'primary'
  }
  return typeMap[type] || 'info'
}

function handleClick(params: any) {
  if (params.dataType === 'node') {
    router.push(`/president/${params.data.id}`)
  }
}
</script>

<template>
  <div class="mindmap-page">
    <div class="container">
      <h1 class="page-title">{{ t('mindmap.title') }}</h1>
      <p class="page-subtitle">{{ t('mindmap.subtitle') }}</p>

      <el-card class="filter-card">
        <el-radio-group v-model="selectedRelationType" size="large">
          <el-radio-button
            v-for="type in relationTypes"
            :key="type.value"
            :label="type.value"
          >
            {{ type.label }}
          </el-radio-button>
        </el-radio-group>
      </el-card>

      <el-card class="legend-card">
        <div class="legend-content">
          <div class="legend-item">
            <span class="legend-title">{{ t('president.party') }}:</span>
            <el-tag type="primary">民主党</el-tag>
            <el-tag type="danger">共和党</el-tag>
            <el-tag type="warning">联邦党</el-tag>
            <el-tag type="success">民主共和党</el-tag>
            <el-tag type="info">无党派</el-tag>
          </div>
          <div class="legend-item">
            <span class="legend-title">关系类型:</span>
            <span class="relation-line" style="background: #67C23A;"></span>
            <span>政治合作</span>
            <span class="relation-line" style="background: #F56C6C;"></span>
            <span>竞争关系</span>
            <span class="relation-line" style="background: #409EFF;"></span>
            <span>家族关系</span>
          </div>
        </div>
      </el-card>

      <el-card class="chart-card">
        <v-chart 
          :option="mindMapData" 
          style="height: 600px; width: 100%" 
          autoresize
          @click="handleClick"
        />
        <div class="chart-tip">
          <el-icon><InfoFilled /></el-icon>
          提示：可拖拽节点、滚轮缩放，点击节点可查看总统详情
        </div>
      </el-card>

      <el-card class="relations-card">
        <h3 class="relations-title">总统关系列表</h3>
        <div class="relations-list">
          <div
            v-for="president in presidents"
            :key="president.id"
            class="president-relations"
          >
            <div class="president-header">
              <img :src="president.portrait" :alt="president.name" class="mini-portrait" />
              <div>
                <h4>{{ locale === 'zh-CN' ? president.name : president.nameEn }}</h4>
                <el-tag size="small" :type="getPartyTagType(president.party)">
                  {{ t('party.' + president.party) }}
                </el-tag>
              </div>
            </div>
            <div v-if="president.relations && president.relations.length > 0" class="relations">
              <div
                v-for="(rel, index) in president.relations"
                :key="index"
                class="relation-item"
              >
                <el-tag size="small" :type="getRelationTagType(rel.type)">
                  {{ relationLabels[rel.type] || rel.type }}
                </el-tag>
                <span class="relation-text">
                  {{ locale === 'zh-CN' ? rel.description : rel.descriptionEn }}
                </span>
              </div>
            </div>
            <div v-else class="no-relations">
              {{ t('common.noData') }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mindmap-page {
  min-height: 100%;
}

.page-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
}

.filter-card {
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
}

.legend-card {
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.95);
}

.legend-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;

  .legend-title {
    font-weight: 600;
    color: #333;
  }

  .relation-line {
    width: 30px;
    height: 3px;
    border-radius: 2px;
  }

  span {
    font-size: 0.875rem;
    color: #666;
  }
}

.chart-card {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
}

.chart-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.relations-card {
  background: rgba(255, 255, 255, 0.95);
}

.relations-title {
  margin: 0 0 20px 0;
  font-size: 1.25rem;
  color: #333;
}

.relations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.president-relations {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.president-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  h4 {
    margin: 0 0 5px 0;
    font-size: 1rem;
    color: #333;
  }
}

.mini-portrait {
  width: 50px;
  height: 62px;
  object-fit: cover;
  border-radius: 6px;
}

.relations {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.relation-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
}

.relation-text {
  flex: 1;
  color: #666;
  line-height: 1.5;
}

.no-relations {
  color: #999;
  font-size: 0.875rem;
  text-align: center;
  padding: 10px;
}
</style>