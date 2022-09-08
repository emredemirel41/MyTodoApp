<template>
    <div class="container mt-5">
        <div class="row mt-5">
            <div class="col">
                <draggable class="border p-3 " v-model="tasks" item-key="id" @end="checkChange" :move="checkMove">
                    <template class="" #item="{element}">
                        <div class="card p-3 m-3">{{element.text}} - order: {{element.order}}</div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },
    data() {
        return {
            drag: true,
            tasks: [
                { id: 1, text: "Test 1", order: 1 },
                { id: 2, text: "Test 2", order: 2 },
                { id: 3, text: "Test 3", order: 3 },
                { id: 4, text: "Test 4", order: 4 },
                { id: 5, text: "Test 5", order: 5 },
            ],
            stateChange: {
                id: 0,
                curOrd: 0,
                newOrd: 0,
            }
        }
    },
    methods: {
        checkMove: function (evt) {
            this.stateChange.id = evt.draggedContext.element.id;

        },
        toApplyChange: function () {
            var selectedItemId = this.stateChange.id;
            var selectedItem = this.tasks.find(element => element.id == selectedItemId);
            //Change This İtem Order
            var diffVal = (this.stateChange.newOrd - this.stateChange.curOrd)
            if (diffVal != 0) {
                    var tempArr = [];
                    if (diffVal > 0) {
                        for (let i = 0; i < Math.abs(diffVal); i++) {
                            var tempItem = this.tasks.find(element => element.order == this.stateChange.curOrd + i + 1 &&  element.id != selectedItemId);
                            tempArr.push(tempItem);
                        }
                    } else {
                        
                        for (let i = 0; i < Math.abs(diffVal); i++) {
                            var tempItem = this.tasks.find(element => element.order == this.stateChange.newOrd + i   &&  element.id != selectedItemId );
                            tempArr.push(tempItem);
                        }
                    }
                    selectedItem.order = this.stateChange.newOrd;
                    for (let i = 0; i < tempArr.length; i++) {
                        if (diffVal > 0) {
                            tempArr[i].order = tempArr[i].order - 1;
                        }else{
                            tempArr[i].order = tempArr[i].order + 1;
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



