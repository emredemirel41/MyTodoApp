<template>
    <div class="row mt-3 mb-5 ">
        <div class="mt-5 col-lg-8  mx-auto card p-5 shadow-lg  mb-5">
            <div v-if="getTasks.length > 0">
                
                <draggable class="border p-3 " v-model="getTasks" item-key="id" @end="checkChange" :move="checkMove">
                    <template class="" #item="{element}">
                        
                        <ItemDetail  :item="element" :key="element.id"></ItemDetail>
                    </template>
                </draggable>
            </div>
            <div v-else>
                <h3>Hiç Görev Yok</h3>
            </div>

        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import ItemDetail from './ItemDetail.vue';
import { mapGetters,mapActions } from 'vuex';

export default {
    methods: {},
    data() {
        return {
            drag: true,
            stateChange: {
                id: 0,
                curOrd: 0,
                newOrd: 0,
            }
        }
    },
    components: { ItemDetail, draggable, },
    computed: {
        ...mapGetters(['getTasks']),
    },
    methods: {
        ...mapActions(['updateTask']),
        checkMove: function (evt) {
            this.stateChange.id = evt.draggedContext.element.id;

        },
        toApplyChange: function () {
            var selectedItemId = this.stateChange.id;
            var selectedItem = this.getTasks.find(element => element.id == selectedItemId);
            //Change This İtem Order
            var diffVal = (this.stateChange.newOrd - this.stateChange.curOrd)
            if (diffVal != 0) {
                var tempArr = [];
                if (diffVal > 0) {
                    for (let i = 0; i < Math.abs(diffVal); i++) {
                        var tempItem = this.getTasks.find(element => element.order == this.stateChange.curOrd + i + 1 && element.id != selectedItemId);
                        tempArr.push(tempItem);
                    }
                } else {

                    for (let i = 0; i < Math.abs(diffVal); i++) {
                        var tempItem = this.getTasks.find(element => element.order == this.stateChange.newOrd + i && element.id != selectedItemId);
                        tempArr.push(tempItem);
                    }
                }
                this.updateTask({id:this.stateChange.id,order:this.stateChange.newOrd});
                for (let i = 0; i < tempArr.length; i++) {
                    if (diffVal > 0) {
                        var tempId = tempArr[i].id;
                        var tempOrderNew = tempArr[i].order - 1;
                        this.updateTask({id:tempId,order:tempOrderNew});
                    } else {
                       
                        var tempId = tempArr[i].id;
                        var tempOrderNew = tempArr[i].order + 1;
                        this.updateTask({id:tempId,order:tempOrderNew});
                    }
                }
            }


        },
        checkChange: function (evt) {
            this.stateChange.curOrd = evt.oldIndex + 1;
            this.stateChange.newOrd = evt.newIndex + 1;
            this.toApplyChange();
        },
    }
}

</script>