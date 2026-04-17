<template>
  <el-container class="app-container">
    <el-header class="header">
      <div class="container header-content">
        <div class="logo">
          <h1>🇺🇸 {{ $t('presidentList.title') }}</h1>
        </div>
        <el-menu
          :default-active="currentActiveMenu"
          mode="horizontal"
          :router="true"
          class="nav-menu"
          :collapse-on-click="false"
        >
          <el-menu-item index="Presidents">
            {{ $t('nav.presidents') }}
          </el-menu-item>
          <el-menu-item index="Timeline">
            {{ $t('nav.timeline') }}
          </el-menu-item>
          <el-menu-item index="MindMap">
            {{ $t('nav.mindmap') }}
          </el-menu-item>
          <el-menu-item index="Statistics">
            {{ $t('nav.statistics') }}
          </el-menu-item>
        </el-menu>
        <div class="header-right">
          <el-dropdown @command="handleLanguageChange">
            <span class="el-dropdown-link">
              {{ $t('common.language') }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-CN" :disabled="appStore.locale === 'zh-CN'">
                  {{ $t('common.chinese') }}
                </el-dropdown-item>
                <el-dropdown-item command="en-US" :disabled="appStore.locale === 'en-US'">
                  {{ $t('common.english') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
    <el-footer class="footer">
      <div class="container">
        <p>© 2024 美国历届总统资料展示网站 | 基于 Vue3 + Vite + TypeScript 开发</p>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import type { LocaleType } from '@/i18n'
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const appStore = useAppStore()

const currentActiveMenu = computed(() => {
  if (route.name === 'PresidentDetail') {
    return 'Presidents'
  }
  return route.name as string
})

const handleLanguageChange = (locale: string) => {
  appStore.setLocale(locale as LocaleType)
}
</script>

<style scoped lang="scss">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  .logo h1 {
    font-size: 20px;
    color: $primary-color;
    margin: 0;
  }

  .nav-menu {
    flex: 1;
    justify-content: center;
    border: none;

    @include sm {
      display: none;
    }
  }

  .header-right {
    .el-dropdown-link {
      cursor: pointer;
      color: $text-color;
      display: flex;
      align-items: center;
    }
  }
}

.main-content {
  flex: 1;
  padding: 20px 0;

  @include sm {
    padding: 15px 0;
  }
}

.footer {
  background: white;
  padding: 20px 0;
  text-align: center;
  color: $text-color-light;
  font-size: 14px;
  border-top: 1px solid $border-color;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
