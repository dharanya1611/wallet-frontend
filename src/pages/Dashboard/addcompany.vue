<template>
  <form>
    <md-card>
      <md-card-header class="md-card-header-text md-card-header-green">
        <div class="card-text">
          <h4 class="title">Add Company</h4>
        </div>
      </md-card-header>

      <md-card-content>


          <div class="row2">
    


        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
            Email
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('email') },
                { 'md-valid': !errors.has('email') && touched.email }
              ]"
            >
              <md-input
                v-model="company.email"
                data-vv-name="email"
                type="text"
                v-validate="modelValidations.email"
                required
                 name="email" id="email"
              >
              </md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('email')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('email') && touched.email"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
          
        </div>


            <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
            Company Name
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('company') },
                { 'md-valid': !errors.has('company') && touched.company }
              ]"
            >
              <md-input
                v-model="company.name"
                data-vv-name="company"
                type="text"
                v-validate="modelValidations.company"
                company
                name="name" id="name"
              >
              </md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('company')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('company') && touched.company"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
          
        </div>

        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
            Address
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('address') },
                { 'md-valid': !errors.has('address') && touched.address }
              ]"
            >
              <md-input
                v-model="company.physicaladdress"
                data-vv-name="address"
                type="text"
                v-validate="modelValidations.address"
                required

                name="physicaladdress" id="physicaladdress"
              >
              </md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('address')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('address') && touched.address"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
          
        </div>

          <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
          Phone  Number
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('number') },
                { 'md-valid': !errors.has('number') && touched.number }
              ]"
            >
              <md-input
                v-model="company.phone"
                data-vv-name="number"
                type="number"
                v-validate="modelValidations.number"
                required
                name="phone" id="phone"
              >
              </md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('number')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('number') && touched.number"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
        
        </div>
       





        </div>


        <div class="row2">
       <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
            AccountType
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('accounttype') },
                { 'md-valid': !errors.has('accounttype') && touched.accounttype }
              ]"
            >
              <md-select v-model="company.accountType" name="accountType" id="accountType">
                          <md-option value="Company"> Company</md-option>
                          <md-option value="individual"> Individual</md-option>                                                 
                        </md-select>  
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('accounttype')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('accounttype') && touched.accounttype"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
         
        </div>



          <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
          Register  Number
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('register') },
                { 'md-valid': !errors.has('register') && touched.number }
              ]"
            >
              <md-input
                v-model="company.crn" 
                data-vv-name="register"
                type="number"
                v-validate="modelValidations.register"
                required
                name="crn" id="crn"
              >
              </md-input>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('register')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('register') && touched.register"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
        
        </div>
<div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
            country
          </label>
          <div class="md-layout-item">
            <md-field
              :class="[
                { 'md-error': errors.has('accounttype') },
                { 'md-valid': !errors.has('accounttype') && touched.accounttype }
              ]"
            >
             <md-select v-model="company.country" name="country" id="country" placeholder="country">
                          <md-option v-for="item in country" :key="item.name" :value="item.name">{{item.name}}</md-option>
                        </md-select>
              <slide-y-down-transition>
                <md-icon class="error" v-show="errors.has('accounttype')"
                  >close</md-icon
                >
              </slide-y-down-transition>
              <slide-y-down-transition>
                <md-icon
                  class="success"
                  v-show="!errors.has('accounttype') && touched.accounttype"
                  >done</md-icon
                >
              </slide-y-down-transition>
            </md-field>
          </div>
         
        </div>



        <div class="md-layout">
          <label class="md-layout-item md-size-20 md-form-label">
Password          </label>
          <div class="md-layout-item">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-field
                  :class="[
                    { 'md-error': errors.has('password') },
                    {
                      'md-valid':
                        !errors.has('password') && touched.password
                    }
                  ]"
                >
                  
                  <md-input
                    v-model="company.password" 
                    data-vv-name="password"
                    ref="password"
                    type="password"
                    v-validate="modelValidations.password"
                    required

                    name="password" id="password" 
                  >
                  </md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="errors.has('password')"
                      >close</md-icon
                    >
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon
                      class="success"
                      v-show="
                        !errors.has('password') && touched.password
                      "
                      >done</md-icon
                    >
                  </slide-y-down-transition>
                </md-field>
              </div>
              
            </div>
          </div>
          
        </div>
        </div>
      </md-card-content>

      <md-card-actions class="text-center">
        <md-button
          native-type="submit"
          @click="addcompany"
          class="md-success"
          >submit</md-button
        >
      </md-card-actions>
    </md-card>
  </form>
</template>
<script>

import axios from 'axios';
import { SlideYDownTransition } from "vue2-transitions";
export default {
  components: {
    SlideYDownTransition
  },
  data() {
    return {
      register: "",
      equalToDest: "",
      company: "",
      email: "",
      number: "",
      address: "",
      password: "",
      accounttype:"",
      touched: {
        company: false,
        email: false,
        number: false,
        address: false,
        register: false,
        equalToDest: false,
        password: false,
        accounttype:false,
              },
      modelValidations: {
        company: {
          required: true
        },
        accounttype:{
            required: true
        },
        password: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        number: {
          required: true,
          numeric: true
        },
        address: {
          required: true,
          url: true
        },
        register: {
          required: true
        },
        equalToDest: {
          required: true,
          confirmed: "equalToSource"
        }
      },

      company: {
                    email: null,
                    name: null,
                    crn: null,
                    country: null,
                    phone: null,
                    accountType: null,
                    password: null,
                    physicaladdress: null                   
              },  
    };
  },

   computed: {
            user() {
                return this.$store.state.user.user
            },
            alert() {
                return this.$store.state.alert
            },
            loading() {
                return this.$store.state.user.loading
            },
            country() {
                return this.$store.state.user.country
            }
        },
  methods: {
    addcompany() {
      this.$validator.validateAll().then(isValid => {
        this.$emit("on-submit", this.registerForm, isValid);
   
 const token = window.localStorage.getItem('token');
          console.log(token)
          var app=this;

          let data = {}
          data.email = this.company.email
          data.companyCrn = this.company.crn
          data.country = this.company.country
          data.companyName = this.company.name
          data.phoneNumber = this.company.phone
          data.accountType = this.company.accountType
          data.password = this.company.password
          data.physicaladdress = this.company.physicaladdress
          console.log(data)

          axios.post("http://localhost:3201/api/addCompany",data,{headers:{'x-access-token': token}})          
            .then((response) => {
                console.log("addCompany",response.data)
                app.$router.push('/companyList')  
                                         
            })
            .catch((error) => {
                console.log("error",error);
            });

   });
    }
  },
  watch: {
    required() {
      this.touched.required = true;
    },
    email() {
      this.touched.email = true;
    },
    number() {
      this.touched.number = true;
    },
    url() {
      this.touched.url = true;
    },
    equalToSource() {
      this.touched.equalToSource = true;
    },
    password() {
      this.touched.password = true;
    }
  },


   created: function(){
          let self = this;
          const {dispatch} = self.$store;
          dispatch('user/getCountry')
        }   
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.text-center {
  justify-content: center !important;
}

.row2{

    float:left;
    width:50%
}
.row3{
    float:right;
    width:50%
}
</style>
