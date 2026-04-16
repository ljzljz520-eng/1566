<template>
  <div class="president-detail-page">
    <div class="container">
      <el-button type="default" @click="goBack" class="back-btn">
        <el-icon><ArrowLeft /></el-icon>
        {{ $t('common.back') }}
      </el-button>

      <div v-if="president" class="detail-content">
        <div class="basic-info-section card">
          <div class="avatar-section">
            <img :src="president.avatar" :alt="getPresidentName(president)" class="main-avatar" />
            <div class="term-badge">{{ president.term }}</div>
          </div>
          <div class="info-section">
            <h1 class="name">{{ getPresidentName(president) }}</h1>
            <div class="party-tag" :class="getPartyClass(president.party)">
              {{ getPartyName(president) }}
            </div>
            <div class="stats-row">
              <div class="stat-item">
                <span class="label">{{ $t('presidentDetail.yearsInOffice') }}:</span>
                <span class="value">{{ president.termEnd - president.termStart }} {{ $t('common.term') }}</span>
              </div>
              <div class="stat-item">
                <span class="label">{{ $t('presidentDetail.partyAffiliation') }}:</span>
                <span class="value">{{ getPartyName(president) }}</span>
              </div>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">{{ $t('common.birthDate') }}:</span>
                <span class="value">{{ president.birthDate }}</span>
              </div>
              <div class="info-item" v-if="president.deathDate">
                <span class="label">{{ $t('common.deathDate') }}:</span>
                <span class="value">{{ president.deathDate }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('common.birthPlace') }}:</span>
                <span class="value">{{ getBirthPlace(president) }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('common.vicePresident') }}:</span>
                <span class="value">{{ getVicePresidentName(president) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="biography-section card">
          <h3 class="section-title">
            <el-icon><Document /></el-icon>
            {{ $t('common.biography') }}
          </h3>
          <p class="biography-content">{{ getBiography(president) }}</p>
        </div>

        <div class="achievements-section card">
          <h3 class="section-title">
            <el-icon><Trophy /></el-icon>
            {{ $t('common.achievements') }}
          </h3>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="(achievement, index) in getAchievements(president)" :key="index">
              <div class="achievement-item">
                <el-icon class="achievement-icon"><Star /></el-icon>
                <span>{{ achievement }}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="key-events-section card">
          <h3 class="section-title">
            <el-icon><Clock /></el-icon>
            {{ $t('common.keyEvents') }}
          </h3>
          <el-timeline>
            <el-timeline-item
              v-for="(event, index) in president.keyEvents"
              :key="index"
              :timestamp="event.year"
              placement="top"
            >
              <template #dot>
                <el-icon color="#409EFC" class="is-size-18"><Flag /></el-icon>
              </template>
              <div class="event-content">
                {{ locale === 'zh-CN' ? event.event : event.eventEn }}
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div v-if="president.images.length > 0" class="images-section card">
          <h3 class="section-title">
            <el-icon><Picture /></el-icon>
            {{ $t('common.images') }}
          </h3>
          <div class="images-grid">
            <div
              v-for="(image, index) in president.images"
              :key="index"
              class="image-item"
              @click="showImageViewer = true; initialImageIndex = index"
            >
              <img :src="image" alt="President image" class="gallery-image" />
            </div>
          </div>
        </div>

        <div v-if="president.relations.length > 0" class="relations-section card">
          <h3 class="section-title">
            <el-icon><Connection /></el-icon>
            {{ $t('common.relations') }}
          </h3>
          <div class="relations-grid">
            <div
              v-for="relation in president.relations"
              :key="relation.id"
              class="relation-item"
              @click="goToDetail(relation.id)"
            >
              <div class="relation-avatar">
                <img :src="getRelationAvatar(relation.id)" :alt="getRelationName(relation)" />
              </div>
              <div class="relation-info">
                <div class="relation-name">{{ getRelationName(relation) }}</div>
                <div class="relation-type">{{ getRelationType(relation) }}</div>
              </div>
              <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <el-empty description="总统信息不存在" />
      </div>
    </div>

    <el-image-viewer
      v-if="showImageViewer"
      :url-list="president?.images || []"
      :initial-index="initialImageIndex"
      @close="showImageViewer = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePresidentStore } from '@/stores/president'
import { useI18n } from 'vue-i18n'
import { 
  ArrowLeft, Document, Trophy, Star, Clock, Flag, Picture, Connection, ArrowRight 
} from '@element-plus/icons-vue'
import type { President } from '@/types/president'

const route = useRoute()
const router = useRouter()
const presidentStore = usePresidentStore()
const { locale } = useI18n()

const president = ref<President | null>(null)
const showImageViewer = ref(false)
const initialImageIndex = ref(0)

onMounted(() => {
  const id = Number(route.params.id)
  president.value = presidentStore.getPresidentById(id)
})

const getPresidentName = (p: President) => {
  return locale.value === 'zh-CN' ? p.name : p.nameEn
}

const getPartyName = (p: President) => {
  return locale.value === 'zh-CN' ? p.party : p.partyEn
}

const getBirthPlace = (p: President) => {
  return locale.value === 'zh-CN' ? p.birthPlace : p.birthPlaceEn
}

const getVicePresidentName = (p: President) => {
  return locale.value === 'zh-CN' ? p.vicePresident : p.vicePresidentEn
}

const getBiography = (p: President) => {
  return locale.value === 'zh-CN' ? p.biography : p.biographyEn
}

const getAchievements = (p: President) => {
  return locale.value === 'zh-CN' ? p.achievements : p.achievementsEn
}

const getRelationName = (relation: any) => {
  return locale.value === 'zh-CN' ? relation.name : relation.nameEn
}

const getRelationType = (relation: any) => {
  return locale.value === 'zh-CN' ? relation.relation : relation.relationEn
}

const getRelationAvatar = (id: number) => {
  const rel = presidentStore.getPresidentById(id)
  return rel?.avatar || ''
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

const goBack = () => {
  router.back()
}

const goToDetail = (id: number) => {
  router.push(`/president/${id}`)
}
</script>

<style scoped lang="scss">
.president-detail-page {
  .back-btn {
    margin-bottom: 20px;
  }

  .detail-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .basic-info-section {
    display: flex;
    gap: 30px;
    padding: 30px;

    @include sm {
      flex-direction: column;
      padding: 20px;
    }

    .avatar-section {
      position: relative;
      flex-shrink: 0;
      width: 300px;
      height: 380px;
      border-radius: 8px;
      overflow: hidden;

      @include sm {
        width: 100%;
        height: auto;
      }

      .main-avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .term-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: $primary-color;
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }

    .info-section {
      flex: 1;

      .name {
        font-size: 36px;
        margin-bottom: 15px;
        color: $text-color;

        @include sm {
          font-size: 28px;
        }
      }

      .party-tag {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 25px;

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

      .stats-row {
        display: flex;
        gap: 40px;
        margin-bottom: 25px;

        @include sm {
          flex-direction: column;
          gap: 15px;
        }

        .stat-item {
          .label {
            font-size: 14px;
            color: $text-color-light;
            margin-right: 8px;
          }
          .value {
            font-size: 18px;
            font-weight: 600;
            color: $text-color;
          }
        }
      }

      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        @include sm {
          grid-template-columns: 1fr;
        }

        .info-item {
          display: flex;
          flex-direction: column;

          .label {
            font-size: 14px;
            color: $text-color-light;
            margin-bottom: 4px;
          }
          .value {
            font-size: 16px;
            color: $text-color;
          }
        }
      }
    }
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid $border-color;
  }

  .biography-section {
    padding: 30px;

    .biography-content {
      font-size: 16px;
      line-height: 1.8;
      color: $text-color;
      text-indent: 2em;
    }
  }

  .achievements-section {
    padding: 30px;

    .achievement-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-bottom: 15px;

      .achievement-icon {
        color: $warning-color;
        font-size: 20px;
        margin-top: 2px;
        flex-shrink: 0;
      }

      span {
        flex: 1;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }

  .key-events-section {
    padding: 30px;

    .event-content {
      font-size: 15px;
      padding: 10px 0;
    }
  }

  .images-section {
    padding: 30px;

    .images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;

      .image-item {
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }

        .gallery-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
      }
    }
  }

  .relations-section {
    padding: 30px;

    .relations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 15px;

      .relation-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #e9ecef;
        }

        .relation-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .relation-info {
          flex: 1;

          .relation-name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .relation-type {
            font-size: 13px;
            color: $text-color-light;
          }
        }

        .arrow-icon {
          color: $text-color-light;
        }
      }
    }
  }

  .empty-state {
    padding: 60px 0;
    text-align: center;
  }
}
</style>
