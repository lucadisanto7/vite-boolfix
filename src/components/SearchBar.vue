<script>
import { ref } from 'vue';
import axios from 'axios';
import { store } from './store'; // Importa il tuo store.js

export default {
    name: 'MovieSearch',
    setup() {
        const query = ref('');
        const movies = ref([]);
        const series = ref([]);

        const searchMoviesAndSeries = async () => {
            try {
                // Chiamata API per i film
                const movieResponse = await axios.get(store.apiUrlmovie, {
                    params: {
                        api_key: store.apiKey,
                        query: query.value,
                        language: 'it-IT'
                    }
                });

                // Chiamata API per le serie TV
                const seriesResponse = await axios.get(store.apiUrlseries, {
                    params: {
                        api_key: store.apiKey,
                        query: query.value,
                        language: 'it-IT'
                    }
                });

                // Combina i risultati dei film e delle serie TV
                movies.value = movieResponse.data.results;
                series.value = seriesResponse.data.results;

            } catch (error) {
                console.error("Errore durante la ricerca:", error);
            }
        };

        const getFlagImage = (language) => {
            const languageMap = {
                en: 'https://flagcdn.com/us.svg',  // USA flag for English
                it: 'https://flagcdn.com/it.svg',  // Italy flag for Italian
                fr: 'https://flagcdn.com/fr.svg',  // France flag for French
                es: 'https://flagcdn.com/es.svg',  // Spain flag for Spanish
                de: 'https://flagcdn.com/de.svg',  // Germany flag for German
                ja: 'https://flagcdn.com/jp.svg',  // Japan flag for Japanese
                ko: 'https://flagcdn.com/kr.svg',  // Korea flag for Korean
                zh: 'https://flagcdn.com/cn.svg',  // China flag for Chinese
                ru: 'https://flagcdn.com/ru.svg',  // Russia flag for Russian
                // Aggiungi altre lingue se necessario
            };
            return languageMap[language] || null;
        };

        return {
            query,
            movies,
            series,
            searchMoviesAndSeries,
            getFlagImage
        };
    }
};
</script>

<template>
    <div>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand">BOOLFIX</a>
              <form class="d-flex" role="search" @submit.prevent="searchMoviesAndSeries">
                <input v-model="query" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
        </nav>

        <div v-if="movies.length || series.length" class="container mt-4">
            <h3>Risultati della ricerca:</h3>
            <ul>
                <!-- Film Results -->
                <li v-for="movie in movies" :key="movie.id" class="mb-3">
                    <strong>{{ movie.title }}</strong> <br>
                    Titolo Originale: {{ movie.original_title }} <br>
                    <div v-if="getFlagImage(movie.original_language)">
                        Lingua: <img :src="getFlagImage(movie.original_language)" alt="flag" class="flag-icon">
                    </div>
                    <div v-else>
                        Lingua: {{ movie.original_language }}
                    </div>
                    Voto: {{ movie.vote_average }}
                </li>

                <!-- Series Results -->
                <li v-for="serie in series" :key="serie.id" class="mb-3">
                    <strong>{{ serie.name }}</strong> <br>
                    Titolo Originale: {{ serie.original_name }} <br>
                    <div v-if="getFlagImage(serie.original_language)">
                        Lingua: <img :src="getFlagImage(serie.original_language)" alt="flag" class="flag-icon">
                    </div>
                    <div v-else>
                        Lingua: {{ serie.original_language }}
                    </div>
                    Voto: {{ serie.vote_average }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .container {
        margin-top: 20px;
    }
    .flag-icon {
        width: 24px;
        height: 16px;
        margin-left: 5px;
    }
</style>
