<template>
    <div class="container mt-5">
        <div class="row mt-5">
            <div class="mt-5 col-lg-4  mx-auto card p-5 shadow-lg">
                <h3 class="text-center">Kayıt Ol</h3>
                <form class="mt-3" @submit.prevent="onSubmit">
                    <div class="form-floating mb-3">
                        <input :class="{'is-invalid' :v$.name.$error }" type="text" class="form-control" id="floatingInput4" placeholder="Emre Demirel"
                            v-model="name">
                        <label for="floatingInput4">İsim Soyisim</label>
                        <small class="text-danger" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }} </small>
                    </div>
                    <div class="form-floating mb-3">
                        <input :class="{'is-invalid' :v$.email.$error }" type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                            v-model="email">
                        <label for="floatingInput">Email</label>
                        <small class="text-danger" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </small>
                    </div>
                    
                    <div class="form-floating mb-3">
                        <input :class="{'is-invalid' :v$.password.$error }" type="password" class="form-control" id="floatingInput2" placeholder="****"
                            v-model="password">
                        <label for="floatingInput2">Şifre</label>
                        <small class="text-danger" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }} </small>
                    </div>
                    <div class="form-floating mb-3">
                        <input :class="{'is-invalid' :v$.password_confirmation.$error }" type="password" class="form-control" id="floatingInput3" placeholder="****"
                            v-model="password_confirmation">
                        <label for="floatingInput3">Şifre Tekrar</label>
                        <small class="text-danger" v-if="v$.password_confirmation.$error"> {{ v$.password_confirmation.$errors[0].$message }} </small>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary ">Kaydol</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>

import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength } from '@vuelidate/validators'
import { mapActions } from 'vuex';
import Toast from '../helper/toastmessage';

export default {
    data() {
        return {
            v$: useValidate(),
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
        }
    },
    validations() {
        return {
            name: { required,minLength: minLength(6),maxLength: maxLength(150) },
            email: { required,email },
            password: { required,minLength: minLength(6),maxLength: maxLength(50) },
            password_confirmation : { required, sameAs: sameAs(this.password)}
        }
    },
    methods: {
        ...mapActions(['setRegister']),
        onSubmit() {
            this.v$.$validate()
            if (!this.v$.$error) {
                // if ANY fail validation
                this.setRegister({name:this.email,email:this.email,password:this.password,password_confirmation:this.password_confirmation});
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