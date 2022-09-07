<template>
    <div class="row mt-3 mb-5">
            <div class="mt-5 col-lg-8  mx-auto card p-5 shadow-lg  mb-5">
                <div v-if="getTasks.length > 0">
                    <ItemDetail v-for="task in getTasks" :item="task" :key="task.id" ></ItemDetail>
                </div>
                <div v-else>
                    <h3>Hiç Görev Yok</h3>
                </div>
               
            </div>
        </div>
</template>

<script>
import ItemDetail from './ItemDetail.vue';
import { mapGetters } from 'vuex';
  
    export default {
        methods: {},
        components: { ItemDetail },
        computed : {
            ...mapGetters(['getTasks']),
        },
    }
    
    </script>