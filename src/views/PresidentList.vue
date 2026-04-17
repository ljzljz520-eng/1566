<template>
  <div class="president-list">
    <div class="search-section">
      <el-card class="search-card">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="16" :md="18">
            <el-input
              v-model="searchQuery"
              :placeholder="t('search.placeholder')"
              size="large"
              clearable
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-select
              v-model="selectedParty"
              :placeholder="t('filter.party')"
              size="large"
              clearable
              style="width: 100%"
              @change="handleFilter"
            >
              <el-option :label="t('filter.all')" value="" />
              <el-option
                v-for="party in parties"
                :key="party"
                :label="getPartyLabel(party)"
                :value="party"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div class="stats-section">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ presidents.length }}</div>
              <div class="stat-label">{{ t('president.totalCount') }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ filteredPresidents.length }}</div>
              <div class="stat-label">{{ t('president.filterResults') }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ parties.length }}</div>
              <div class="stat-label">{{ t('president.partyCount') }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-number">{{ getTermRange }}</div>
              <div class="stat-label">{{ t('president.timeSpan') }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="list-section">
      <el-row :gutter="20">
        <el-col
          v-for="president in filteredPresidents"
          :key="president.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <el-card
            class="president-card card-hover"
            @click="goToDetail(president.id)"
          >
            <div class="card-image">
              <el-image
                :src="president.portrait"
                :alt="president.name"
                fit="cover"
                style="width: 100%; height: 200px"
                :preview-src-list="[president.portrait]"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon size="50"><User /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="party-badge" :class="president.party">
                {{ getPartyLabel(president.party) }}
              </div>
            </div>
            <div class="card-content">
              <div class="president-number">#{{ president.id }}</div>
              <h3 class="president-name">{{ president.name }}</h3>
              <p class="president-name-en">{{ president.nameEn }}</p>
              <div class="term-info">
                <el-icon><Calendar /></el-icon>
                <span>{{ president.termStart }} - {{ president.termEnd || t('president.current') }}</span>
              </div>
              <div class="achievements-preview">
                <el-tag
                  v-for="(achievement, index) in president.achievements.slice(0, 2)"
                  :key="index"
                  size="small"
                  type="info"
                  class="achievement-tag"
                >
                  {{ achievement }}
                </el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-empty
        v-if="filteredPresidents.length === 0"
        :description="t('president.noMatchFound')"
        style="margin-top: 50px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePresidentStore } from '@/stores/president'
import { Search, User, Calendar } from '@element-plus/icons-vue'

const router = useRouter()
const { t } = useI18n()
const store = usePresidentStore()

const searchQuery = computed({
  get: () => store.searchQuery,
  set: (value) => store.setSearchQuery(value)
})

const selectedParty = computed({
  get: () => store.selectedParty,
  set: (value) => store.setSelectedParty(value)
})

const presidents = computed(() => store.presidents)
const filteredPresidents = computed(() => store.filteredPresidents)
const parties = computed(() => store.parties)

const getTermRange = computed(() => {
  if (presidents.value.length === 0) return '-'
  const start = Math.min(...presidents.value.map(p => p.termStart))
  const end = Math.max(...presidents.value.map(p => p.termEnd || new Date().getFullYear()))
  return `${start}-${end}`
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

function handleSearch() {
}

function handleFilter() {
}

function goToDetail(id: number) {
  router.push(`/presidents/${id}`)
}
</script>

<style scoped>
.president-list {
  padding: 20px 0;
}

.search-section {
  margin-bottom: 20px;
}

.search-card {
  padding: 20px;
}

.stats-section {
  margin-bottom: 30px;
}

.stat-card {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.stat-content .stat-number {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-content .stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.list-section {
  margin-top: 20px;
}

.president-card {
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;
}

.card-image {
  position: relative;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background: #f5f7fa;
  color: #909399;
}

.party-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  font-weight: 500;
}

.party-badge.democratic {
  background: #003366;
}

.party-badge.republican {
  background: #e81c24;
}

.party-badge.federalist {
  background: #1a1a2e;
}

.party-badge.democraticRepublican {
  background: #4a5568;
}

.party-badge.whig {
  background: #744210;
}

.party-badge.independent {
  background: #6b7280;
}

.card-content {
  padding: 15px;
}

.president-number {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.president-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #303133;
}

.president-name-en {
  font-size: 14px;
  color: #606266;
  margin: 0 0 10px 0;
}

.term-info {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
}

.achievements-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.achievement-tag {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
