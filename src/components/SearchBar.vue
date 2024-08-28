<script>
import { ref } from 'vue';
import axios from 'axios';
import { store } from './store'; // Importa il tuo store.js

export default {
    name: 'Milestone3',
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
                en: 'https://flagcdn.com/us.svg',
                it: 'https://flagcdn.com/it.svg',
                fr: 'https://flagcdn.com/fr.svg',
                es: 'https://flagcdn.com/es.svg',
                de: 'https://flagcdn.com/de.svg',
                ja: 'https://flagcdn.com/jp.svg',
                ko: 'https://flagcdn.com/kr.svg',
                zh: 'https://flagcdn.com/cn.svg',
                ru: 'https://flagcdn.com/ru.svg',
            };
            return languageMap[language] || null;
        };

        const getPosterUrl = (posterPath) => {
            return posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : null;
        };

        const getStarRating = (vote) => {
            return Math.ceil(vote / 2); // Converte un voto da 1-10 a 1-5 stelle
        };

        return {
            query,
            movies,
            series,
            searchMoviesAndSeries,
            getFlagImage,
            getPosterUrl,
            getStarRating
        };
    }
};
</script>

<template>
    <div class="bg-black">
        <nav class="navbar">
            <div class="container-fluid">
              <a class="navbar-brand red-text">BOOLFIX</a>
              <form class="d-flex" role="search" @submit.prevent="searchMoviesAndSeries">
                <input v-model="query" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-danger" type="submit">Search</button>
              </form>
            </div>
        </nav>

        <div v-if="movies.length || series.length" class="containers p-5">
            <h3 class="white-text">Risultati della ricerca:</h3>
            <div class="results-grid">
                <!-- Film Results -->
                <div v-for="movie in movies" :key="movie.id" class="result-item">
                    <img :src="getPosterUrl(movie.poster_path)" alt="Poster" class="poster">
                    <strong>{{ movie.title }}</strong> <br>
                    Titolo Originale: {{ movie.original_title }} <br>
                    <div v-if="getFlagImage(movie.original_language)">
                        Lingua: <img :src="getFlagImage(movie.original_language)" alt="flag" class="flag-icon">
                    </div>
                    <div v-else>
                        Lingua: {{ movie.original_language }}
                    </div>
                    <div>
                        Voto: 
                        <span v-for="n in getStarRating(movie.vote_average)" :key="n" class="star">★</span>
                        <span v-for="n in 5 - getStarRating(movie.vote_average)" :key="n" class="star-empty">☆</span>
                    </div>
                </div>

                <!-- Series Results -->
                <div v-for="serie in series" :key="serie.id" class="result-item">
                    <img :src="getPosterUrl(serie.poster_path)" alt="Poster" class="poster">
                    <strong>{{ serie.name }}</strong> <br>
                    Titolo Originale: {{ serie.original_name }} <br>
                    <div v-if="getFlagImage(serie.original_language)">
                        Lingua: <img :src="getFlagImage(serie.original_language)" alt="flag" class="flag-icon">
                    </div>
                    <div v-else>
                        Lingua: {{ serie.original_language }}
                    </div>
                    <div>
                        Voto: 
                        <span v-for="n in getStarRating(serie.vote_average)" :key="n" class="star">★</span>
                        <span v-for="n in 5 - getStarRating(serie.vote_average)" :key="n" class="star-empty">☆</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        margin-top: 20px;
    }
    .results-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        color: white;
    }
    .result-item {
        width: 200px;
        text-align: center;
    }
    .poster {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    .flag-icon {
        width: 24px;
        height: 16px;
        margin-left: 5px;
    }
    .star {
        color: gold;
    }
    .star-empty {
        color: lightgray;
    }
    .red-text{
        color: red;
        font-size: 100px;
    }
    .white-text{
        color: white;
    }
</style>
