<template>
  <div class="president-list-page">
    <div class="container">
      <div class="page-header">
        <h2>{{ $t('presidentList.title') }}</h2>
        <p class="subtitle">{{ $t('presidentList.subtitle') }}</p>
      </div>

      <div class="filter-section card">
        <el-form :inline="true" :model="filters" class="filter-form">
          <el-form-item :label="$t('common.search')">
            <el-input
              v-model="filters.name"
              :placeholder="$t('presidentList.searchPlaceholder')"
              clearable
              style="width: 240px"
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('common.party')">
            <el-select
              v-model="filters.party"
              :placeholder="$t('presidentList.partyFilter')"
              clearable
              style="width: 180px"
              @change="handleFilter"
            >
              <el-option
                v-for="party in parties"
                :key="party"
                :label="party"
                :value="party"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('common.term')">
            <el-input-number
              v-model="filters.termStart"
              :min="1789"
              :max="new Date().getFullYear()"
              :placeholder="$t('presidentList.termFilter')"
              style="width: 120px"
              @change="handleFilter"
            />
            <span class="term-separator">{{ $t('presidentList.to') }}</span>
            <el-input-number
              v-model="filters.termEnd"
              :min="1789"
              :max="new Date().getFullYear()"
              :placeholder="$t('presidentList.termFilter')"
              style="width: 120px"
              @change="handleFilter"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleReset">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="presidents-grid">
        <div
          v-for="president in presidentStore.filteredList"
          :key="president.id"
          class="president-card card"
          @click="goToDetail(president.id)"
        >
          <div class="avatar-wrapper">
            <img :src="president.avatar" :alt="president.name" class="avatar" />
            <div class="term-badge">{{ president.term }}</div>
          </div>
          <div class="card-content">
            <h3 class="name">{{ getPresidentName(president) }}</h3>
            <div class="party" :class="getPartyClass(president.party)">
              {{ getPartyName(president) }}
            </div>
            <div class="term">
              <el-icon><Calendar /></el-icon>
              <span>{{ president.termStart }} - {{ president.termEnd }}</span>
            </div>
            <div class="vice-president">
              <el-icon><User /></el-icon>
              <span>VP: {{ getVicePresidentName(president) }}</span>
            </div>
            <div class="achievements-preview">
              <h4>{{ $t('common.achievements') }}:</h4>
              <ul>
                <li v-for="(achievement, index) in getAchievements(president).slice(0, 2)" :key="index">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
          <div class="card-footer">
            <el-button type="primary" text>{{ $t('common.viewDetails') }}</el-button>
          </div>
        </div>
      </div>

      <div v-if="presidentStore.filteredList.length === 0" class="empty-state">
        <el-empty :description="$t('presidentList.noData')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePresidentStore } from '@/stores/president'
import { useI18n } from 'vue-i18n'
import { Search, Calendar, User } from '@element-plus/icons-vue'
import type { President, FilterOptions } from '@/types/president'

const router = useRouter()
const presidentStore = usePresidentStore()
const { locale } = useI18n()

const filters = ref<FilterOptions>({})
const parties = computed(() => presidentStore.getParties())

const handleSearch = () => {
  presidentStore.setFilters(filters.value)
}

const handleFilter = () => {
  presidentStore.setFilters(filters.value)
}

const handleReset = () => {
  filters.value = {}
  presidentStore.resetFilters()
}

const getPresidentName = (president: President) => {
  return locale.value === 'zh-CN' ? president.name : president.nameEn
}

const getPartyName = (president: President) => {
  return locale.value === 'zh-CN' ? president.party : president.partyEn
}

const getVicePresidentName = (president: President) => {
  return locale.value === 'zh-CN' ? president.vicePresident : president.vicePresidentEn
}

const getAchievements = (president: President) => {
  return locale.value === 'zh-CN' ? president.achievements : president.achievementsEn
}

const getPartyClass = (party: string) => {
  const partyMap: Record<string, string> = {
    '民主党': 'democratic',
    '共和党': 'republican',
    '民主共和党': 'democratic-republican',
    '联邦党': 'federalist',
    '无党派': 'independent'
  }
  return partyMap[party] || ''
}

const goToDetail = (id: number) => {
  router.push(`/president/${id}`)
}
</script>

<style scoped lang="scss">
.president-list-page {
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

  .filter-section {
    padding: 20px;
    margin-bottom: 30px;

    .filter-form {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }

    .term-separator {
      margin: 0 10px;
      color: $text-color-light;
    }

    @include sm {
      .el-form-item {
        width: 100%;
        margin-bottom: 15px;

        .el-input,
        .el-select,
        .el-input-number {
          width: 100% !important;
        }
      }
    }
  }

  .presidents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    @include sm {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .president-card {
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .avatar-wrapper {
        position: relative;
        height: 200px;
        overflow: hidden;

        .avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .term-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: $primary-color;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }
      }

      .card-content {
        padding: 20px;

        .name {
          font-size: 20px;
          margin-bottom: 10px;
          color: $text-color;
        }

        .party {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 10px;

          &.democratic {
            background: #e3f2fd;
            color: #1976d2;
          }

          &.republican {
            background: #ffebee;
            color: #c62828;
          }

          &.democratic-republican {
            background: #f3e5f5;
            color: #7b1fa2;
          }

          &.federalist {
            background: #fff3e0;
            color: #ef6c00;
          }

          &.independent {
            background: #e0f2f1;
            color: #00695c;
          }
        }

        .term,
        .vice-president {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: $text-color-light;
          margin-bottom: 8px;
        }

        .achievements-preview {
          margin-top: 15px;

          h4 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          ul {
            padding-left: 16px;
            font-size: 13px;
            color: $text-color-light;

            li {
              margin-bottom: 4px;
              list-style-type: disc;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

      .card-footer {
        padding: 0 20px 20px;
        text-align: right;
      }
    }
  }

  .empty-state {
    padding: 60px 0;
    text-align: center;
  }
}
</style>
