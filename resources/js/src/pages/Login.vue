<template>
    <div class="container mt-5">
        <div class="row mt-5">
            <div class="mt-5 col-lg-4  mx-auto card p-5 shadow-lg">
                <h3 class="text-center">Giriş Yap</h3>
                <form class="mt-3" @submit.prevent="onSubmit">

                    <div class="form-floating mb-3">
                        <input :class="{ 'is-invalid': v$.email.$error }" type="email" class="form-control"
                            id="floatingInput" placeholder="name@example.com" v-model="email">
                        <label for="floatingInput">Email</label>
                        <small class="text-danger" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </small>
                    </div>

                    <div class="form-floating mb-3">
                        <input :class="{ 'is-invalid': v$.password.$error }" type="password" class="form-control"
                            id="floatingInput2" placeholder="****" v-model="password">
                        <label for="floatingInput2">Şifre</label>
                        <small class="text-danger" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }}
                        </small>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary ">Giriş Yap</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>

import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import { mapActions } from 'vuex';

import Toast from '../helper/toastmessage';

export default {
    data() {
        return {
            v$: useValidate(),
            email: '',
            password: '',
        }
    },
    validations() {
        return {
            email: { required, email },
            password: { required, }

        }
    },
    methods: {
        ...mapActions(['setLogin']),
        onSubmit() {
            this.v$.$validate()
            if (!this.v$.$error) {
                // if ANY fail validation
                this.setLogin({email:this.email,password:this.password});
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