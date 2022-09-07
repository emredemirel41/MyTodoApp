<template>
    <div class="progress mt" style="height: 30px;">
        <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Basic example"
            :style="{width: calcPercentage}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{{getDoneTaskCount}}/{{getAllTaskCount}}</div> 
    </div>
</template>

<script>
    import ItemDetail from './ItemDetail.vue';
    import { mapGetters } from 'vuex';
      
        export default {
            data(){
                return {
                   
                }
            },
            methods: {},
            components: { ItemDetail },
            computed : {
                ...mapGetters(['getAllTaskCount','getDoneTaskCount']),
                calcPercentage(){
                    if(this.getAllTaskCount > 0){
                        return (100*this.getDoneTaskCount)/this.getAllTaskCount + '%';
                    }else{
                        return 0+ '%';
                    }  
                }
            },
            watch:{
                calcPercentage(){
                    if(this.getAllTaskCount > 0){
                        return (100*this.getDoneTaskCount)/this.getAllTaskCount + '%';
                    }else{
                        return 0+ '%';
                    }  
                }
            }
            
        }
        
        </script>
