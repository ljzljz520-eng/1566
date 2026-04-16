<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePresidentStore } from '../stores/president'
import { storeToRefs } from 'pinia'
import type { PartyType } from '../types/president'

const { t, locale } = useI18n()
const router = useRouter()
const store = usePresidentStore()
const { filteredPresidents, filterOptions } = storeToRefs(store)

const partyOptions = [
  { value: '', label: 'party.all' },
  { value: 'democratic', label: 'party.democratic' },
  { value: 'republican', label: 'party.republican' },
  { value: 'federalist', label: 'party.federalist' },
  { value: 'democraticRepublican', label: 'party.democraticRepublican' },
  { value: 'whig', label: 'party.whig' },
  { value: 'nationalUnion', label: 'party.nationalUnion' },
  { value: 'independent', label: 'party.independent' }
]

const handleSearch = (value: string) => {
  store.setFilter({ searchText: value })
}

const handlePartyChange = (value: string) => {
  store.setFilter({ party: value as PartyType | '' })
}

const handleReset = () => {
  store.resetFilter()
}

const getPartyTagType = (party: string) => {
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
  <div class="presidents-page">
    <div class="container">
      <h1 class="page-title">{{ t('nav.presidents') }}</h1>

      <el-card class="filter-card">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-input
              v-model="filterOptions.searchText"
              :placeholder="t('filter.searchPlaceholder')"
              clearable
              @input="handleSearch"
              size="large"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-select
              v-model="filterOptions.party"
              :placeholder="t('president.party')"
              clearable
              @change="handlePartyChange"
              size="large"
              style="width: 100%"
            >
              <el-option
                v-for="option in partyOptions"
                :key="option.value"
                :label="t(option.label)"
                :value="option.value"
              />
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="12">
            <el-button size="large" @click="handleReset">
              <el-icon><Refresh /></el-icon>
              {{ t('common.reset') }}
            </el-button>
          </el-col>
        </el-row>
      </el-card>

      <div v-if="filteredPresidents.length > 0">
        <div class="results-count">
          {{ t('common.search') }}结果: {{ filteredPresidents.length }} 位总统
        </div>

        <div class="presidents-grid">
          <el-card
            v-for="president in filteredPresidents"
            :key="president.id"
            class="president-card card-hover"
            shadow="hover"
            @click="router.push(`/president/${president.id}`)"
          >
            <div class="card-content">
              <div class="order-badge">#{{ president.order }}</div>
              <img :src="president.portrait" :alt="president.name" class="president-portrait" />
              <div class="president-info">
                <h3>{{ locale === 'zh-CN' ? president.name : president.nameEn }}</h3>
                <p class="name-en">{{ locale === 'zh-CN' ? president.nameEn : president.name }}</p>
                <el-tag :type="getPartyTagType(president.party)" size="small">
                  {{ t(`party.${president.party}`) }}
                </el-tag>
                <div class="term-info">
                  <el-icon size="14"><Calendar /></el-icon>
                  <span>{{ president.termStart }} - {{ president.termEnd || '现任' }}</span>
                </div>
                <p class="achievements-preview">
                  {{ locale === 'zh-CN' ? president.achievements[0] : president.achievementsEn[0] }}
                </p>
              </div>
            </div>
            <div class="card-footer">
              <el-button type="primary" link>
                {{ t('common.viewDetail') }}
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </el-card>
        </div>
      </div>

      <el-empty v-else :description="t('common.noData')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.presidents-page {
  min-height: 100%;
}

.filter-card {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.95);
}

.results-count {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  font-size: 0.875rem;
}

.presidents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

.president-card {
  cursor: pointer;
  overflow: hidden;
}

.card-content {
  position: relative;
}

.order-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.875rem;
  z-index: 1;
}

.president-portrait {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.president-info h3 {
  font-size: 1.375rem;
  margin-bottom: 5px;
  color: #333;
}

.name-en {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 10px;
}

.term-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  margin-top: 10px;
  font-size: 0.875rem;
}

.achievements-preview {
  margin-top: 12px;
  color: #555;
  font-size: 0.875rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  text-align: right;
}
</style>
