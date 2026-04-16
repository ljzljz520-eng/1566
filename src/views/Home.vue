<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePresidentStore } from '../stores/president'
import { computed } from 'vue'

const { t } = useI18n()
const router = useRouter()
const store = usePresidentStore()

const stats = computed(() => [
  { label: t('home.totalPresidents'), value: store.presidents.length, icon: 'User' },
  { label: t('home.totalTerms'), value: store.totalYearsInOffice, icon: 'Calendar' }
])

const featuredPresidents = computed(() => 
  store.presidents.slice(0, 4)
)

const partyStats = computed(() => {
  const stats: Record<string, number> = {}
  store.presidents.forEach(p => {
    stats[p.party] = (stats[p.party] || 0) + 1
  })
  return Object.entries(stats).map(([key, value]) => ({
    name: t(`party.${key}`),
    value
  }))
})

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      name: t('president.party'),
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
        color: '#fff'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      data: partyStats.value
    }
  ]
}))
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1 class="hero-title">{{ t('home.title') }}</h1>
        <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="router.push('/presidents')">
            {{ t('home.viewList') }}
          </el-button>
          <el-button size="large" @click="router.push('/timeline')">
            {{ t('home.viewTimeline') }}
          </el-button>
        </div>
      </div>

      <div class="stats-grid">
        <el-card v-for="stat in stats" :key="stat.label" class="stat-card card-hover">
          <div class="stat-content">
            <el-icon size="40" color="#667eea">
              <component :is="stat.icon" />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="section">
        <h2 class="section-title">党派分布</h2>
        <el-card class="chart-card">
          <v-chart :option="chartOption" style="height: 400px" />
        </el-card>
      </div>

      <div class="section">
        <h2 class="section-title">精选总统</h2>
        <div class="presidents-grid">
          <el-card 
            v-for="president in featuredPresidents" 
            :key="president.id"
            class="president-card card-hover"
            @click="router.push(`/president/${president.id}`)"
          >
            <img :src="president.portrait" :alt="president.name" class="president-portrait" />
            <div class="president-info">
              <h3>{{ president.name }}</h3>
              <p>{{ president.nameEn }}</p>
              <el-tag :type="president.party === 'republican' ? 'danger' : 'primary'" size="small">
                {{ t(`party.${president.party}`) }}
              </el-tag>
              <p class="term">{{ president.termStart }} - {{ president.termEnd || '现任' }}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  text-align: center;
  padding: 60px 0;
  color: #fff;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}

.stat-label {
  color: #666;
  margin-top: 5px;
}

.section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1.75rem;
  color: #fff;
  margin-bottom: 25px;
  text-align: center;
}

.chart-card {
  background: rgba(255, 255, 255, 0.1);
  border: none;
}

.presidents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.president-card {
  cursor: pointer;
  overflow: hidden;
}

.president-portrait {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.president-info h3 {
  font-size: 1.25rem;
  margin-bottom: 5px;
  color: #333;
}

.president-info p {
  color: #666;
  margin-bottom: 10px;
}

.term {
  margin-top: 10px;
  font-size: 0.875rem;
  color: #999;
}
</style>
