<template>
  <el-footer class="app-footer">
    <div class="footer-content">
      <p>{{ t('footer.copyright') }}</p>
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
  color: white;
  text-align: center;
  padding: 20px 0;
  height: auto !important;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}
</style>
