<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
        <!-- <div> -->
          <form @submit.prevent="onSubmit()">
      <login-card header-color="green">
        <h4 slot="title" class="title">Log in</h4>
        <md-button
          slot="buttons"
          href="#facebook"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-facebook-square"></i>
        </md-button>
        <md-button
          slot="buttons"
          href="#twitter"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-twitter"></i>
        </md-button>
        <md-button
          slot="buttons"
          href="#google"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-google-plus-g"></i>
        </md-button>
        <div slot ="description">
        <p slot="description" class="description">Or Be Classical</p>

        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>

        </div>
        <!-- <md-field class="md-form-group" slot="inputs">


          <md-icon>face</md-icon>
          <label>First Name...</label>
          <md-input v-model="firstname"></md-input>
        </md-field> -->
        
          <md-field class="md-form-group" slot="inputs" :class="{error: errors.has('email')}">
            <md-icon>email</md-icon>
            <label>Email...</label>
            <md-input autocomplete="email" type="email" name="email" class="input" v-validate="'required|email'" v-model="user.email"></md-input>
          </md-field>
        <div class="error" v-if="errors.has('email')">&emsp; {{errors.first('email')}}</div>
          <md-field class="md-form-group" slot="inputs" :class="{error: errors.has('password')}">
            <md-icon>lock_outline</md-icon>
            <label>Password...</label>                       
            <md-input autocomplete="email" v-validate="'required'" name="password" v-model="user.password" type="password" class="input"></md-input>
          </md-field>
        <!-- <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="user.email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Password...</label>
          <md-input v-model="user.password"></md-input>
        </md-field> -->
        
        <md-button slot="footer" class="md-simple md-success md-lg" type = "submit">
          Login
        </md-button>
      </login-card>
          </form>
      <!-- <md-button  type="submit" class=" pos2 ">
                    <strong>LOGIN</strong>
                  </md-button> -->
      
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  data() {
    return {
      user: {
          email: '',
          password: '',
          submitted: false,
          msg: 'fdr'
        }
    };
  },
  methods: {
      onSubmit() {
        let self = this;
        this.$validator.validateAll()
        .then( res =>{
          if(res) {
          const { dispatch } = self.$store;
          const data  ={
            email: self.user.email,
            password: self.user.password
          }
          dispatch('authentication/login',data);
          // this.$router.push({path:'/dashboard'})
          }
          else {
            console.log('false res')
          }
        },
        err => {
          console.log("err",err)
        })
        // if (!this.errors.any()) {
        //   window.location.href = 'http://localhost:8080/#/dashboard'
        // }
        // else {
        //   console.log('stayyy')
        // }
      },
      signup: function() {
       this.$router.push({path:'/signup'})
      },
      submitForm() {
        this.submitted = true
      }
    },
    computed: {
      alert () {
            return this.$store.state.alert
        }
    }
};
</script>

<style scoped>
  .error {
    color: red;
    padding-left: 5%;
  }
  </style>
