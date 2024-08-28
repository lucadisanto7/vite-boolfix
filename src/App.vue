<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import SearchBar from './components/SearchBar.vue';
import { store } from './store.js'
export default{
  data(){
    return{
      store,
      axios
    }
  },
  components:{
    AppHeader,
    AppMain,
    SearchBar
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