<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app-layout">
    <header class="app-header">
      <!-- Optional Header Content (e.g., Logo, Nav) -->
      <!-- <img src="/logo.png" alt="App Logo" class="logo"> -->
      <!-- <span>SpaceX Viewer</span> -->
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      <!-- Optional Footer Content -->
      <!-- <p>&copy; 2024 Your Company</p> -->
    </footer>
  </div>
</template>

<style scoped>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  /* Add styles if you have header content */
  /* background-color: var(--color-surface); */
  /* padding: 10px 20px; */
  /* border-bottom: 1px solid var(--color-border); */
  /* box-shadow: 0 2px 4px rgba(0,0,0,0.05); */
}

.app-main {
  flex-grow: 1; /* Allows main content to fill available space */
  padding: 20px; /* Add some padding around the main content */
  width: 100%;
  max-width: 1200px; /* Set a max-width for content */
  margin: 0 auto; /* Center the content */
}

.app-footer {
  /* Add styles if you have footer content */
  /* background-color: var(--color-surface); */
  /* padding: 10px 20px; */
  /* text-align: center; */
  /* font-size: 0.9em; */
  /* color: var(--color-text-muted); */
  /* border-top: 1px solid var(--color-border); */
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
