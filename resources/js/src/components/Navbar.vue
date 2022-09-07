<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">ToDoApp</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    </ul>
                    <ul class="navbar-nav " v-if="!getisAuthenticated">
                        <li class="nav-item">
                            <router-link active-class="active" class="nav-link" to="/login">Giriş Yap</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link active-class="active" class="nav-link" to="/register">Kayıt Ol</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav " v-else>
                        <li class="nav-item">
                            <router-link active-class="active" class="nav-link" to="/dashboard">Panel</router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" @click.prevent="setLogout">Çıkış Yap</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from 'vuex';

    export default {
        data() {
            return {
              
            }
        },
        computed : {
            ...mapGetters(['getisAuthenticated']),

        },
        methods : {
            ...mapMutations(['setLogout'])
        }
    }
</script>

