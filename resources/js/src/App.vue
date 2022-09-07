<template>
    <div id="nav">
        <Navbar></Navbar>
    </div>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
    data() {
        return {
        }
    },
    created(){
        this.$store.dispatch("initAuth");
    }
}
</script>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;900&display=swap');
    h1{
        font-family: 'Montserrat';
        font-weight: 900 !important;
    }
    h2,h3,h3,h5{
        font-family: 'Montserrat';
        font-weight: 500 !important;
    }
    p{
        font-family: 'Montserrat';
        font-weight: 200 !important;
    }
</style>