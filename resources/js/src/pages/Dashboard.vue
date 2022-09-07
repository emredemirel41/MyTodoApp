<template>
    <ProgressBar></ProgressBar>
    <div class="container mt-5 h-100 ">
        <h3 class="text-center">Merhaba {{controlUser}}</h3>
            <AddItem></AddItem>
            <ItemList></ItemList>
    </div>
</template>

<script>
import AddItem from '../components/AddItem.vue';
import ItemList from '../components/ItemList.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { mapActions,mapGetters } from 'vuex';

export default {
    data() {
        return {
            username : "Emre",
        }
    },
    methods: {
        ...mapActions(['setUserTask']),
    },
    computed : {
        ...mapGetters(['getUser']),
        controlUser(){
            if(this.getUser){
                return this.getUser.name;
            }else{
                return "Value";
            }
        }
        
    },
    components: { AddItem, ItemList, ProgressBar },
    mounted() {
        console.log(`the component is now mounted.`)
        this.setUserTask();
    }
}

</script>