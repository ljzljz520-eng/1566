<template>
  <div class="timeline-page">
    <div class="container">
      <div class="page-header">
        <h2>{{ $t('timeline.title') }}</h2>
        <p class="subtitle">{{ $t('timeline.subtitle') }}</p>
      </div>

      <div class="timeline-container card">
        <el-timeline>
          <el-timeline-item
            v-for="president in sortedPresidents"
            :key="president.id"
            :timestamp="`${president.termStart} - ${president.termEnd}`"
            placement="top"
            :hollow="false"
            :color="getPartyColor(president.party)"
          >
            <div class="timeline-card" @click="goToDetail(president.id)">
              <div class="president-info">
                <img :src="president.avatar" :alt="president.name" class="avatar" />
                <div class="info">
                  <h3 class="name">{{ getPresidentName(president) }}</h3>
                  <div class="party" :class="getPartyClass(president.party)">
                    {{ getPartyName(president) }}
                  </div>
                  <div class="term">
                    <el-icon><Calendar /></el-icon>
                    <span>{{ president.term }}</span>
                  </div>
                </div>
              </div>
              <div class="event-preview">
                <h4 v-if="president.keyEvents.length > 0" class="event-title">关键事件:</h4>
                <p v-if="president.keyEvents.length > 0" class="event-content">
                  {{ getLatestEvent(president) }}
                </p>
              </div>
              <el-button type="text" class="view-btn">{{ $t('common.viewDetails') }}</el-button>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePresidentStore } from '@/stores/president'
import { useI18n } from 'vue-i18n'
import { Calendar } from '@element-plus/icons-vue'
import type { President } from '@/types/president'

const router = useRouter()
const presidentStore = usePresidentStore()
const { locale } = useI18n()

const sortedPresidents = computed(() => {
  return [...presidentStore.list].sort((a, b) => a.termStart - b.termStart)
})

const getPresidentName = (president: President) => {
  return locale.value === 'zh-CN' ? president.name : president.nameEn
}

const getPartyName = (president: President) => {
  return locale.value === 'zh-CN' ? president.party : president.partyEn
}

const getPartyColor = (party: string) => {
  if (party.includes('民主党') || party.includes('Democratic')) return '#1976d2'
  if (party.includes('共和党') || party.includes('Republican')) return '#c62828'
  if (party.includes('民主共和党')) return '#7b1fa2'
  if (party.includes('联邦党')) return '#ef6c00'
  return '#00695c'
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

const getLatestEvent = (president: President) => {
  if (president.keyEvents.length === 0) return ''
  const latestEvent = president.keyEvents[president.keyEvents.length - 1]
  return locale.value === 'zh-CN' ? latestEvent.event : latestEvent.eventEn
}

const goToDetail = (id: number) => {
  router.push(`/president/${id}`)
}
</script>

<style scoped lang="scss">
.timeline-page {
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

  .timeline-container {
    padding: 30px;

    :deep(.el-timeline-item) {
      padding-bottom: 40px;

      &:last-child {
        padding-bottom: 0;
      }

      .el-timeline-item__timestamp {
        font-size: 18px;
        font-weight: 600;
        color: $text-color;
        margin-bottom: 10px;
      }

      .el-timeline-item__node {
        width: 20px;
        height: 20px;
      }
    }

    .timeline-card {
      background: $bg-color;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 20px;

      &:hover {
        background: #eaf4ff;
        transform: translateX(10px);
      }

      .president-info {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-shrink: 0;

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }

        .info {
          .name {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
            color: $text-color;
          }

          .party {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 6px;

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

          .term {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: $text-color-light;
          }
        }
      }

      .event-preview {
        flex: 1;

        .event-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .event-content {
          font-size: 14px;
          color: $text-color-light;
          line-height: 1.6;
        }
      }

      .view-btn {
        flex-shrink: 0;
      }

      @include sm {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;

        .president-info {
          width: 100%;
        }

        .event-preview {
          width: 100%;
        }

        .view-btn {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
