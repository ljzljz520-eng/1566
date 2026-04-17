<template>
  <el-header class="app-header">
    <div class="header-content">
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <span class="logo-icon">🇺🇸</span>
          <span class="logo-text">{{ t('nav.presidents') }}</span>
        </router-link>
      </div>

      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        :router="true"
        class="nav-menu"
        :collapse="isMobile"
      >
        <el-menu-item index="/presidents">
          <el-icon><List /></el-icon>
          <span>{{ t('nav.presidents') }}</span>
        </el-menu-item>
        <el-menu-item index="/timeline">
          <el-icon><Clock /></el-icon>
          <span>{{ t('nav.timeline') }}</span>
        </el-menu-item>
        <el-menu-item index="/mindmap">
          <el-icon><Share /></el-icon>
          <span>{{ t('nav.mindmap') }}</span>
        </el-menu-item>
      </el-menu>

      <div class="header-actions">
        <el-dropdown @command="changeLanguage" trigger="click">
          <el-button circle size="small">
            <el-icon><Location /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh" :disabled="locale === 'zh'">
                🇨🇳 中文
              </el-dropdown-item>
              <el-dropdown-item command="en" :disabled="locale === 'en'">
                🇺🇸 English
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          v-if="isMobile"
          circle
          size="small"
          @click="toggleMobileMenu"
          class="mobile-menu-btn"
        >
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>
    </div>

    <el-drawer
      v-model="mobileMenuVisible"
      direction="rtl"
      size="250px"
      class="mobile-drawer"
    >
      <el-menu
        :default-active="activeMenu"
        mode="vertical"
        :router="true"
        @select="mobileMenuVisible = false"
      >
        <el-menu-item index="/presidents">
          <el-icon><List /></el-icon>
          <span>{{ t('nav.presidents') }}</span>
        </el-menu-item>
        <el-menu-item index="/timeline">
          <el-icon><Clock /></el-icon>
          <span>{{ t('nav.timeline') }}</span>
        </el-menu-item>
        <el-menu-item index="/mindmap">
          <el-icon><Share /></el-icon>
          <span>{{ t('nav.mindmap') }}</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { List, Clock, Share, Location, Menu } from '@element-plus/icons-vue'

const route = useRoute()
const { locale, t } = useI18n()

const isMobile = ref(false)
const mobileMenuVisible = ref(false)

const activeMenu = computed(() => route.path)

function changeLanguage(lang: string) {
  locale.value = lang
  document.documentElement.lang = lang
}

function toggleMobileMenu() {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
  color: white;
  padding: 0;
  height: auto !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.nav-menu {
  background: transparent;
  border: none;
  flex: 1;
  justify-content: center;
}

.nav-menu .el-menu-item {
  color: rgba(255, 255, 255, 0.9);
}

.nav-menu .el-menu-item:hover,
.nav-menu .el-menu-item.is-active {
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mobile-menu-btn {
  display: none;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .logo-text {
    font-size: 16px;
  }
}
</style>
