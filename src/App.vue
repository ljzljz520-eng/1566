<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { Menu, Close } from '@element-plus/icons-vue'

const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

const navigateTo = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
}

const navItems = [
  { path: '/', key: 'home' },
  { path: '/presidents', key: 'presidents' },
  { path: '/timeline', key: 'timeline' },
  { path: '/mindmap', key: 'mindmap' }
]
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo" @click="navigateTo('/')">
            <span class="logo-icon">🇺🇸</span>
            <span class="logo-text">US Presidents</span>
          </div>

          <nav class="nav-desktop">
            <template v-for="item in navItems" :key="item.path">
              <router-link
                :to="item.path"
                class="nav-link"
                :class="{ active: route.path === item.path }"
              >
                {{ t(`nav.${item.key}`) }}
              </router-link>
            </template>
          </nav>

          <div class="header-actions">
            <el-button
              :type="locale === 'zh-CN' ? 'primary' : 'default'"
              size="small"
              @click="toggleLanguage"
            >
              {{ locale === 'zh-CN' ? '中文' : 'EN' }}
            </el-button>

            <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
              <el-icon v-if="!isMenuOpen"><Menu /></el-icon>
              <el-icon v-else><Close /></el-icon>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isMenuOpen" class="nav-mobile">
        <template v-for="item in navItems" :key="item.path">
          <div
            class="nav-mobile-item"
            :class="{ active: route.path === item.path }"
            @click="navigateTo(item.path)"
          >
            {{ t(`nav.${item.key}`) }}
          </div>
        </template>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2024 US Presidents Archive. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.25rem;
  color: #333;
}

.logo-icon {
  font-size: 1.5rem;
}

.nav-desktop {
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &.active {
    color: #667eea;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #667eea;
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  @media (max-width: 768px) {
    display: block;
  }
}

.nav-mobile {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 10px 0;

  @media (min-width: 769px) {
    display: none;
  }
}

.nav-mobile-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover,
  &.active {
    background: #f5f5f5;
    color: #667eea;
  }
}

.main {
  flex: 1;
  padding: 40px 0;
}

.footer {
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 20px 0;
  text-align: center;
  font-size: 0.875rem;
}
</style>
