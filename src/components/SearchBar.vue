<script>
import { ref } from 'vue';
import axios from 'axios';
import { store } from './store'; // Importa il tuo store.js

export default {
    name: 'MovieSearch',
    setup() {
        const query = ref('');
        const movies = ref([]);

        const searchMovies = async () => {
            try {
                const response = await axios.get(store.apiUrlmovie, {
                    params: {
                        api_key: store.apiKey,
                        query: query.value,
                        language: 'it-IT'
                    }
                });
                movies.value = response.data.results;
            } catch (error) {
                console.error("Errore durante la ricerca del film:", error);
            }
        };

        return {
            query,
            movies,
            searchMovies
        };
    }
};
</script>

<template>
    <div>
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand">BOOLFIX</a>
              <form class="d-flex" role="search" @submit.prevent="searchMovies">
                <input v-model="query" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
        </nav>

        <div v-if="movies.length" class="container mt-4">
            <h3>Risultati della ricerca:</h3>
            <ul>
                <li v-for="movie in movies" :key="movie.id" class="mb-3">
                    <strong>{{ movie.title }}</strong> <br>
                    Titolo Originale: {{ movie.original_title }} <br>
                    Lingua: {{ movie.original_language }} <br>
                    Voto: {{ movie.vote_average }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .container {
        margin-top: 20px;
    }
</style>