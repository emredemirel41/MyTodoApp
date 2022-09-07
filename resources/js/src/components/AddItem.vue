<template>
    <div class="row ">
        <div class="mt-5 col-lg-8  mx-auto card p-5 shadow-lg">
            <form @submit.prevent="doSomething">
                <div class="input-group mb-3">
                    <div class="form-floating ">
                        <input :class="{ 'is-invalid': v$.text.$error }" type="text" v-model="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Bir Görev Gir</label>
                       
                    </div>
                    
                    <button class="btn btn-success">Ekle</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import Toast from '../helper/toastmessage';
import { mapActions } from 'vuex';
import useValidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'

export default {
    data(){
        return {
            v$: useValidate(),
            text : ""
        }
    },
    validations() {
        return {
            text: { required,maxLength: maxLength(250) },
        }
    },
    methods: {
        ...mapActions(['addTask']),
        doSomething() {
            this.v$.$validate()
            if (!this.v$.$error) {
                // if ANY fail validation
                this.addTask({text:this.text})
                this.text="";
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Validation Error'
                });
            }
            
        }
        
    }

}
</script>
