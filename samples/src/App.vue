<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="header-brand">
        <h1>@qverse-ui/lit-components</h1>
        <p class="subtitle">Vue 3 + Element Plus + Lit Web Components</p>
      </div>
    </el-header>
    <el-main class="main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  background: var(--el-color-primary);
  color: #fff;
  padding: 0 1.5rem;
  height: auto;
  min-height: 64px;
}

.header-brand h1 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.subtitle {
  margin: 0.15rem 0 0;
  font-size: 0.8rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.85);
}

.main {
  padding: 0;
  background: var(--el-bg-color-page);
}
</style>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
