<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import SearchBar from './components/SearchBar.vue';
import { store } from './components/store.js'
export default{
  components:{
    AppHeader,
    AppMain,
    SearchBar,
    store,
  }
}
</script>
<template>
  <div>
    <AppHeader />
    <AppMain />
    <SearchBar />
  </div>
</template>
<style lang="scss">
@use '../styles/partials/generals.scss'
</style>