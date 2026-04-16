<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { usePresidentStore } from '../stores/president'
import type { President } from '../types/president'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const store = usePresidentStore()

const president = ref<President | null>(null)
const activeTab = ref('biography')
const previewImage = ref('')
const previewVisible = ref(false)

onMounted(() => {
  const id = Number(route.params.id)
  president.value = store.getPresidentById(id) || null
})

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

const handlePreview = (url: string) => {
  previewImage.value = url
  previewVisible.value = true
}

const timelineData = computed(() => {
  if (!president.value) return []
  return president.value.keyEvents.map(event => ({
    timestamp: event.year,
    title: locale.value === 'zh-CN' ? event.title : event.titleEn,
    content: locale.value === 'zh-CN' ? event.description : event.descriptionEn
  }))
})

const achievementsList = computed(() => {
  if (!president.value) return []
  return locale.value === 'zh-CN' ? president.value.achievements : president.value.achievementsEn
})

if (!president.value) {
  router.push('/presidents')
}
</script>

<template>
  <div class="president-detail" v-if="president">
    <div class="container">
      <el-button @click="router.back()" class="back-btn">
        <el-icon><ArrowLeft /></el-icon>
        {{ t('common.back') }}
      </el-button>

      <el-card class="profile-card">
        <div class="profile-header">
          <div class="portrait-wrapper">
            <div class="order-badge">#{{ president.order }}</div>
            <img :src="president.portrait" :alt="president.name" class="portrait" />
          </div>
          <div class="profile-info">
            <h1>{{ locale === 'zh-CN' ? president.name : president.nameEn }}</h1>
            <p class="name-en">{{ locale === 'zh-CN' ? president.nameEn : president.name }}</p>
            <div class="info-tags">
              <el-tag :type="getPartyTagType(president.party)" size="large">
                {{ t(`party.${president.party}`) }}
              </el-tag>
              <el-tag type="info" size="large">
                <el-icon><Calendar /></el-icon>
                {{ president.termStart }} - {{ president.termEnd || '现任' }}
              </el-tag>
            </div>
            <div class="quick-info">
              <div class="info-item">
                <span class="label">{{ t('president.vicePresident') }}:</span>
                <span class="value">{{ locale === 'zh-CN' ? president.vicePresident : president.vicePresidentEn }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ t('president.birthDate') }}:</span>
                <span class="value">{{ president.birthDate }}</span>
              </div>
              <div class="info-item" v-if="president.deathDate">
                <span class="label">{{ t('president.deathDate') }}:</span>
                <span class="value">{{ president.deathDate }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ t('president.birthPlace') }}:</span>
                <span class="value">{{ locale === 'zh-CN' ? president.birthPlace : president.birthPlaceEn }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ t('president.education') }}:</span>
                <span class="value">{{ locale === 'zh-CN' ? president.education : president.educationEn }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-tabs v-model="activeTab" class="detail-tabs">
        <el-tab-pane :label="t('president.biography')" name="biography">
          <el-card class="content-card">
            <p class="biography-text">
              {{ locale === 'zh-CN' ? president.biography : president.biographyEn }}
            </p>
          </el-card>
        </el-tab-pane>

        <el-tab-pane :label="t('president.achievements')" name="achievements">
          <el-card class="content-card">
            <div class="achievements-list">
              <div v-for="(achievement, index) in achievementsList" :key="index" class="achievement-item">
                <el-icon color="#667eea"><Star /></el-icon>
                <span>{{ achievement }}</span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane :label="t('president.keyEvents')" name="events">
          <el-card class="content-card">
            <el-timeline>
              <el-timeline-item
                v-for="(event, index) in timelineData"
                :key="index"
                :timestamp="event.timestamp"
                placement="top"
              >
                <h4>{{ event.title }}</h4>
                <p>{{ event.content }}</p>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-tab-pane>

        <el-tab-pane :label="t('president.historicalBackground')" name="background">
          <el-card class="content-card">
            <p class="biography-text">
              {{ locale === 'zh-CN' ? president.historicalBackground : president.historicalBackgroundEn }}
            </p>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="图片" name="images">
          <el-card class="content-card">
            <div v-if="president.images.length > 0" class="image-gallery">
              <div
                v-for="img in president.images"
                :key="img.id"
                class="gallery-item"
                @click="handlePreview(img.url)"
              >
                <img :src="img.url" :alt="locale === 'zh-CN' ? img.title : img.titleEn" />
                <div class="gallery-overlay">
                  <span>{{ locale === 'zh-CN' ? img.title : img.titleEn }}</span>
                </div>
              </div>
            </div>
            <el-empty v-else :description="t('common.noData')" />
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-image-viewer
      v-if="previewVisible"
      :url-list="[previewImage]"
      @close="previewVisible = false"
    />
  </div>
</template>

<style scoped lang="scss">
.president-detail {
  min-height: 100%;
}

.back-btn {
  margin-bottom: 20px;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border: none;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.profile-card {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.95);
}

.profile-header {
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
}

.portrait-wrapper {
  position: relative;
  flex-shrink: 0;
}

.order-badge {
  position: absolute;
  top: -10px;
  left: -10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1rem;
  z-index: 1;
}

.portrait {
  width: 300px;
  height: 380px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    aspect-ratio: 3/4;
  }
}

.profile-info h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
}

.name-en {
  color: #666;
  font-size: 1.125rem;
  margin-bottom: 20px;
}

.info-tags {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.quick-info {
  display: grid;
  gap: 15px;
}

.info-item {
  display: flex;
  gap: 10px;

  .label {
    font-weight: 600;
    color: #555;
    min-width: 100px;
  }

  .value {
    color: #333;
  }
}

.detail-tabs {
  :deep(.el-tabs__nav-wrap::after) {
    background-color: rgba(255, 255, 255, 0.3);
  }

  :deep(.el-tabs__item) {
    color: rgba(255, 255, 255, 0.8);

    &.is-active {
      color: #fff;
    }
  }
}

.content-card {
  background: rgba(255, 255, 255, 0.95);
}

.biography-text {
  line-height: 2;
  color: #444;
  font-size: 1rem;
}

.achievements-list {
  display: grid;
  gap: 20px;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;

  span {
    line-height: 1.6;
  }
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover .gallery-overlay {
    opacity: 1;
  }
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 15px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
