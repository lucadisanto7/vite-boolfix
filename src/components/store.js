import { reactive } from "vue";
import axios from 'axios'

export const store = reactive({
    apiUrlmovie: "https://api.themoviedb.org/3/search/movie",
    apiUrlseries: "https://api.themoviedb.org/3/search/tv",
    apiKey:'753ac455416759864f56f8ca60a4d469'
})