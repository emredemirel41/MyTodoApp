<template>
    <div class="d-flex justify-content-between mb-2 alert"
        :class="{ doneTaskStyle: status, 'alert-secondary': !status, 'alert-success': status }" role="alert">
        <div class="">
            <input type="text" class="form-control-plaintext" id="staticEmail" v-model="text">
        </div>
        <div>
            <button @click="updateThisTask" class="btn mx-1 btn-sm float-right"
                :class="{ 'btn-warning': status, 'btn-success': !status }">
                {{ status ? '&#9741;' : '&#10003;' }}</button>
            <button @click="removeTask" class="btn mx-1 btn-sm btn-danger float-right">&#10005;</button>
        </div>
    </div>
</template>

<script>
import Toast from '../helper/toastmessage';
import { mapActions } from 'vuex';
export default {
    props: ['item'],
    data() {
        return {
            id: this.item.id,
            text: this.item.text,
            status: this.item.status
        }
    },
    methods: {
        ...mapActions(['updateTask','deleteTask']),
        updateThisTask() {
            console.log(!this.status);
            this.updateTask({id:this.id,text:null,status:!this.status});
            this.status = !this.status;

        },
        removeTask() {
            this.deleteTask({id:this.id});
        }
    },
    computed: {

    },


}
</script>

<style>
.doneTaskStyle {
    text-decoration: line-through;
}
</style>