<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <nav-tabs-card>
            <template slot="content">
              <div class="tabWidth">
                <span class="md-nav-tabs-title">Company:</span>
                <md-tabs md-sync-route class="md-info" md-alignment="left">
                  <md-tab id="tab-home" md-label="Basic Info" md-icon="info">
                    <div class="userdetails">
                      <div class="column1">
                        <div class="md-layout-item md-small-size-50 md-medium-size-50">
                           <md-field>
                          <label for="name"> Company Name</label>
                          <md-input name="name" id="name" v-model="company.name" />
                         <!-- <label for="email">  Email</label>
                         <md-input name="email" id="email" v-model="company.email" disabled />                                                     -->
                        </md-field>
                        </div>
                         <div class="md-layout-item md-small-size-50 md-medium-size-50">
                          <md-field>
                        <label for="crn">Reg number</label>
                        <md-input name="crn" id="crn" v-model="company.crn" />                                                     
                      </md-field>
                        </div>
                      </div>
                      <div class ="column2">
                        <div class="md-layout-item md-small-size-50 md-medium-size-50">
                        <md-field>
                        <label for="address">Address</label>
                        <md-input name="address" id="address" v-model="company.physicaladdress" />
                        <!-- <label for="crn">Reg number</label>
                        <md-input name="crn" id="crn" v-model="company.crn" />                                                     -->
                      </md-field>
                        </div>
                       <div class="md-layout-item md-small-size-50 md-medium-size-50">
                          <md-field>
                        <label for="country">Country</label>
                        <md-select v-model="company.country" name="country" id="country" placeholder="country">
                          <md-option v-for="item in country" :key="item.name" :value="item.name">{{item.name}}</md-option>
                        </md-select>
                        <!-- <label for="address">Address</label>
                        <md-input name="address" id="address" v-model="company.physicaladdress" />                                                     -->
                      </md-field>
                        </div>
                      </div>
                      
                    <div class ="column3">
                        <div class="md-layout-item md-small-size-50 md-medium-size-50">
                          <md-field>
                       <label for="phone">Phone number</label>
                       <md-input name="phone" id="phone" v-model="company.phone" /> 
                      <!-- <label for="country">Country</label>
                      <md-select v-model="company.country" name="country" id="country" placeholder="country">
                        <md-option v-for="item in country" :key="item.name" :value="item.name">{{item.name}}</md-option>
                      </md-select> -->
                     </md-field>
                        </div>
                       <div class="md-layout-item md-small-size-50 md-medium-size-50">
                           <md-field>
                      <label for="address">Wallet Address</label>
                      <md-input name="address" id="address" v-model="company.address" disabled/> 
                     </md-field>
                        </div>
                      </div>
                     
                   <md-button class="md-info"
         style="float:right"
         native-type="submit"
         @click="updateCompany"
         >
                <span class="md-label">
                  <md-icon class="material-icons">priority_high</md-icon>
                </span>
                update
              </md-button>
                      
                    </div>                       
   <!-- end         -->
                    <md-dialog :md-active.sync="deleteConfirm" >
                      <form novalidate @submit.prevent="del">
                        <div class="addec"><br>
                          <label for="symbol">Do you want to delete?</label> <br><br>
                        </div>
                        <md-dialog-actions>
                          <md-button class="md-danger actionbtn" @click="deleteConfirm=false">cancel</md-button>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          <md-button class="md-info actionbtn cash" type="submit">Confirm</md-button>
                        </md-dialog-actions>
                      </form>
                    </md-dialog>
<!-- 2 -->
                    <div class="box" v-if="showTrans">
                      <div class="top"><br>
                        <md-field >
                          <label for="symbol">Balance</label>
                          <md-input name="balance" v-model="balance" disabled/>
                        </md-field>
                        <md-field :class="{error: errors.has('supply')}">
                          <label>Supply</label>
                          <md-input required v-validate="'required|min:1|numeric'" @change="change(supply,balance)" 
                            type="number" name="supply" id="supply" v-model="supply"></md-input>
                          <span class="error" v-if="errors.has('supply')">{{errors.first('supply')}}</span> <hr>
                          <span class="error" v-if="msgsss">{{msg}}</span>
                        </md-field>
                      </div>
                      <md-button class="md-danger actionbtn textbtn" @click="close">Close</md-button>
                      <md-button class="md-info actionbtn cash1 textbtn " v-if="supply" @click="transfer(supply)" >Transfer</md-button>
                    </div>
<!-- 3 -->
                    <md-dialog :md-active.sync="showConfirm" >
                      <form novalidate @submit.prevent="update">
                        <div class="addec">
                          <label for="symbol">Enter password to confirm transfer</label>
                        </div>
                        <div class="modelpass">
                          <md-field  :class="{error: errors.has('password')}">
                            <label >Password</label>
                            <md-input required v-validate="'required'"  type="password" name="password" 
                              id="password" v-model="password"></md-input>
                            <span class="error" v-if="errors.has('password')">{{errors.first('password')}}</span>
                          </md-field>
                        </div>
                        <md-dialog-actions>
                          <md-button class="  md-danger actionbtn" @click="hide">cancel</md-button>
                          <md-button class="  md-success actionbtn" type="submit">Confirm</md-button>
                        </md-dialog-actions>
                      </form>
                    </md-dialog>
                  </md-tab>



                </md-tabs>
              </div>
            </template>
          </nav-tabs-card>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { NavTabsCard } from "@/components"
// const params = require('../_helpers/params.js');
// const CONFIG = params.params; 

export default {  
    components: {
      NavTabsCard        
    },
    data () {
      return {
          add: null,
          showConfirm : false,
          deleteConfirm: false,
          balance: null,
          supply: null,
          msg: null,
          from: null,
          addrs:null,
          userBal: null,
          msgsss: false,
          showTrans: false,
          password: null,
          id: null,
          rows: [],
          transactList:[],
          columns: [
              {label: 'From', type: 'String', field:this.sender},
              {label: 'To', type: 'String', field:this.getName},
              {label: 'Transaction Date', field: 'timestamp', formatFn:this.formatDate},
              {label: 'Value', field:'value'}              
            ],
          user: {
              email: null,
              accountType: null,
              firstName: null,
              lastName: null,
              token: null,
              physicaladdress: null,
              city: null,
              country: null,
              pincode: null,
              status: null,
              phoneNumber: null,
              limit: null,
              companyName: null,
              companyCrn: null,
              country: null,
              addproofDocNo: null,
              addproofType: null,
              addproofTypefile: null,
              idProoftypefile: null,
              idProoftype: null,
              idproofDocNo : null,
              id: null,
              address: null,
              balance: null,             
            },

             company:{

        
      equalToSource: "",
      equalToDest: "",
      required: "",
      email: "",
      number: "",
      address: "",
      country: "",
      phonenumber: "",
      walletaddress:"",
        },
          selectedImg: null,
          showImgModel: false
        }
    },
    computed: {
        // user() {
        //     return this.$store.state.user.user
        // },
        alert() {
          return this.$store.state.alert
        },
        loading() {
          return this.$store.state.user.loading
        },
        country() {
          return this.$store.state.user.country
        },
        userBalance () {
          const token = window.localStorage.getItem('token');
          // console.log(token)
          var app=this;
          
         let id=this.$route.params.id
         axios.get("http://localhost:3201/api/balance/"+id,{headers:{'x-access-token': token}})          
          .then((response) => {
            this.userBal = response.data.data
          })
            return this.userBal
        }
    },

  created () {
            let id = this.$route.params.id
            const token = window.localStorage.getItem('token')
            var app = this;
 
            axios.get("http://localhost:3201/api/company/"+id,{headers:{'x-access-token': token}})    
            .then(res => {
                console.log("company",res)
                this.company.address = res.data.data.address
                this.company.name = res.data.data.companyName
                this.company.crn = res.data.data.companyCrn
                this.company.country = res.data.data.country
                this.company.email = res.data.data.email
                this.company.phone = res.data.data.phoneNumber
                this.company.accountType = res.data.data.accountType
                this.company.physicaladdress = res.data.data.physicaladdress
                // this.company.password = res.data.data.password
            }) 
            .catch((error) => {
                console.log("error",error);
            }); 

            let self = this
            const { dispatch } = self.$store;
              dispatch('user/getuser');
              dispatch('user/getCountry');
        },
    methods: {



        
   
         updateCompany() {
            let id=this.$route.params.id
            const token = window.localStorage.getItem('token');
            console.log(token)
            var app=this;

            var update = {}
            update.companyCrn = this.company.crn;
            update.companyName = this.company.name;
            update.phoneNumber = this.company.phone;
            update.country = this.company.country;
            update.physicaladdress = this.company.physicaladdress;
          
            var final = JSON.stringify(update)
            console.log("update", final)

            axios.post("http://localhost:3201/api/updateCompany/"+id, final,  {"headers":{'x-access-token':token,  'Content-Type' : 'application/json' }})
              .then((response) => {
                console.log(response)
                app.$router.push('/companyList')
            })       
              .catch((error) => {
                console.log(error);
        }); 
     },




  
        onRowClick (params) {
            console.log(params)
            var finalhash = params.row.hash
            window.open(
              "http://explorer.evenscoin.io/tx/"+finalhash,
              '_blank' // <- This is what makes it open in a new window.
            );
        },
        userTxn () {
            const token = window.localStorage.getItem('token');
            var app=this;
            let id=this.$route.params.id              
            axios.get("http://localhost:3201/api/userTrans/"+id,{headers:{'x-access-token': token}})
              .then(response => {
                  console.log('TRANS',response)
                  app.rows = response.data.data      
              })
            axios.get("http://localhost:3201/api/userData/",{headers:{'x-access-token': token}})
              .then(response => {
                  console.log('TRANS',response)
                  app.transactList = response.data.data
                  console.log('Txnlist',app.transactList)      
              })
        },
        getName (rowObje) {
            //console.log('USER',rowObje.to,rowObje.from)
            let address = rowObje.to
            let user =  this.transactList[address];
            //console.log('nnn',user)
            if(!user){
              return (address.substring(0, 25) + '...');
            }
            else if((user.firstName)||(user.lastName)) {
              return (user.firstName +' '+user.lastName)
            }
            else if (user.companyName) {
              return user.companyName
            }  
        },
        sender (rowObje) {
            //console.log('USER',rowObje.to,rowObje.from)
            let address = rowObje.from
            let user =  this.transactList[address];
            //console.log('nnn',user)
            if(!user){
              return address.substring(0, 10);
            }
            else if((user.firstName)||(user.lastName)) {
              return (user.firstName +' '+user.lastName)
            }
            else if (user.companyName) {
              return user.companyName
            }  
        },
        separator(x) {
            var sep = parseFloat(Math.round(x * 100) / 100).toFixed(2);
            var num3 = sep.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num3
        },
        formatDate (str) {
            let datastr = this.$moment(parseInt(str) );
            return datastr.format("YYYY-MM-DD")
        },
        change (supp,bal) {
            console.log(supp,bal)
              if(supp>bal) {
                this.msg = 'Insufficient balance'              
                this.msgsss = true
                this.showConfirm = false
                console.log('Insufficient balance')
              } else if(supp == null) {
                this.msg= ''
                this.msgsss = false
              }else {
              console.log('errorrrrrrrrrr')
              }
        },
        update () {
            console.log('transferred')
            const token = window.localStorage.getItem('token');
            console.log(token)
            var app=this;
            let id=this.$route.params.id
            var data = {}

              app.$validator.validateAll()
                .then(res => {
                  axios.get("http://localhost:3201/api/user",{headers:{'x-access-token': token}})
                    .then(res => {
                      app.addrs = res.data.data.address
                      data.from = app.addrs
                      console.log('hello',app.addrs)
                      data.to = app.user.address
                      // data.firstName = app.user.firstName
                      // data.lastName = app.user.lastName
                      data.token = app.user.token 
                      data.value = app.supply
                      data.company = app.user.id
                      data.password = app.password
                      console.log(data)
                      axios.post("http://localhost:3201/api/transfer",data, {headers:{'x-access-token': token}})
                        .then(res => {
                          console.log(res.data)
                            this.showConfirm = false
                            if(res.data.status == '400') {
                              this.showConfirm = false
                                    app.$toasted.show('Transaction failed',{ 
                                    fullWidth:false,
                                    theme: "bubble", 
                                    position: "bottom-right",
                                    duration : 10000
                              })
                                return 
                            }
                            if(res.data.status == '401') {
                              this.showConfirm = false
                                    app.$toasted.show('Incorrect password',{ 
                                    fullWidth:false,
                                    theme: "bubble", 
                                    position: "bottom-right",
                                    duration : 10000
                              })
                                return 
                            }
                          app.$toasted.show('Transfered successfully',{ 
                                fullWidth:false,
                                theme: "bubble", 
                                position: "bottom-right",
                                duration : 10000
                          })
                        }).catch(err => {
                          app.$toasted.show('Transaction failed',{ 
                                fullWidth:false,
                                theme: "bubble", 
                                position: "bottom-right",
                                duration : 3000
                            })
                        })
                })  
          })  
        },
        suspendUser() {
            console.log("inside suspend")

          const token = window.localStorage.getItem('token');
          let id=this.$route.params.id
          var app=this;
        
        axios.get("http://localhost:3201/api/user/"+id,{headers:{'x-access-token': token}})          
            .then((response) => {
                console.log(response.data)             
                this.user.status = response.data.data.status;

                if(this.user.status == 'Active') {
                    const url="http://localhost:3201/api/suspendUser/"+id
                    console.log(url)

                    axios.post(url,{},{headers:{'x-access-token': token }})
                        .then(res => {   
                        console.log(res)
                            app.$toasted.show('User is suspended',{ 
                            fullWidth:false,
                            theme: "bubble", 
                            position: "bottom-right",
                            duration: 3000 
                        })
                        window.location.reload();
                        }).catch(function(err) {
                          console.log('error in suspending user')
                            app.$toasted.show('Not suspended.Try again',{ 
                            fullWidth:false,
                            theme: "bubble", 
                            position: "bottom-right",
                            duration : 3000
                        })
                    })
                }
            })
            .catch((error) => {
                console.log("error");
            });      
        },
        activate() {
            console.log("inside active")

          const token = window.localStorage.getItem('token');
          let id=this.$route.params.id
          var app=this;
        
        axios.get("http://localhost:3201/api/user/"+id,{headers:{'x-access-token': token}})          
            .then((response) => {
                console.log(response.data)             
                this.user.status = response.data.data.status;

                if(this.user.status == 'Suspended') {
                    const url="http://localhost:3201/api/makeActiveUser/"+id
                    console.log(url)

                    axios.post(url,{},{headers:{'x-access-token': token }})
                        .then(res => {   
                        console.log(res)
                            app.$toasted.show('User is activated',{ 
                            fullWidth:false,
                            theme: "bubble", 
                            position: "bottom-right",
                            duration: 3000 
                        })
                        window.location.reload();
                        }).catch(function(err) {
                          console.log('error in activating user')
                            app.$toasted.show('Not suspended.Try again',{ 
                            fullWidth:false,
                            theme: "bubble", 
                            position: "bottom-right",
                            duration : 3000
                        })
                    })
                }
            })
            .catch((error) => {
                console.log("error");
            });      
        },
        del() {
            this.deleteConfirm = false
            const token = window.localStorage.getItem('token');
            let id = this.$route.params.id
            var app = this;          

            axios.post("http://localhost:3201/api/deleteUser/"+id, {},{"headers":{'x-access-token':token}})
              .then((response) => {
                console.log(response.data)
                if(response.data.status == '400') {
                    app.$toasted.show('Not removed.Try again',{ 
                    fullWidth:false,
                    theme: "bubble", 
                    position: "bottom-right",
                    duration : 10000
            })
              return 
             }

                if(response.data.status == '500') {
                    app.$toasted.show('User not found',{ 
                    fullWidth:false,
                    theme: "bubble", 
                    position: "bottom-right",
                    duration : 10000
              })
              return 
             }
                app.$toasted.show('User Removed',{ 
                    fullWidth:false,
                    theme: "bubble", 
                    position: "bottom-right",
                    duration : 5000
              })
                   app.$router.push('/userDetails')
            })  
              .catch((error) => {
                console.log(error);
                  app.$toasted.show('Not removed.Try again',{ 
                    fullWidth:false,
                    theme: "bubble", 
                    position: "bottom-right",
                    duration : 3000
                })
        });    

          },
          transfer (supply) {
            this.showTrans = false
            console.log(supply)
            if(supply < this.balance) {
            this.showConfirm = true
            } else {
              this.showConfirm = false
              
            }
            //this.showTrans = false
          },
          box () {
            this.showTrans = true

          },
          deleteUser () {
            this.deleteConfirm = true
          },
          close () {
            this.showTrans = false
          },
          hide () {
            this.showConfirm = false
          },
          getImage(img) {
            return "http://localhost:3201/static/img/"+img
          },
          showImg(img) {
            let self = this;
            self.selectedImg = "http://localhost:3201/static/img/"+img
            self.showImgModel = true
          },  
          updateProfile () {
            let id=this.$route.params.id
            const token = window.localStorage.getItem('token');
            var app=this;

            if(this.user.accountType != 'Company') {
              var value = {}
              value.firstName = this.user.firstName;
              value.lastName = this.user.lastName;
              value.country = this.user.country;
              // value.limit = this.user.limit;
              value.companyName = this.user.companyName;
              value.phoneNumber = this.user.phoneNumber;
              value.physicaladdress = this.user.physicaladdress;       
              
              var update = JSON.stringify(value)
              console.log("update", update)
                axios.post("http://localhost:3201/api/updateUser/"+id, update,  {headers:{'x-access-token':token,  'Content-Type' : 'application/json' }})
                  .then((response) => {
                    console.log(response)
                    app.$toasted.show('Updated successfully',{ 
                        fullWidth:false,
                        theme: "bubble", 
                        position: "bottom-right",
                        duration : 5000
                    })
                    // app.$router.push('/userDetails')
                })       
                  .catch((error) => {
                    console.log(error);
                    app.$toasted.show('Coudnot update',{ 
                        fullWidth:false,
                        theme: "bubble", 
                        position: "bottom-right",
                        duration : 5000
                    })
                });  
            } 
            else if (this.user.accountType == 'Company') {
              var entity = {}
              entity.companyName = this.user.companyName;
              entity.companyCrn = this.user.companyCrn;
              entity.country = this.user.country;
              entity.phoneNumber = this.user.phoneNumber;
              entity.physicaladdress = this.user.physicaladdress;       
          
              var save = JSON.stringify(entity)
              console.log("update", save)
              axios.post("http://localhost:3201/api/savecompany"+id, save,  {headers:{'x-access-token':token,  'Content-Type' : 'application/json' }})
                .then((response) => {
                  console.log(response)
                  app.$toasted.show('Updated successfully',{ 
                        fullWidth:false,
                        theme: "bubble", 
                        position: "bottom-right",
                        duration : 5000
                  })
                // app.$router.push('/userDetails')
              })       
                .catch((error) => {
                  console.log(error);
                  app.$toasted.show('Coudnot update',{ 
                      fullWidth:false,
                      theme: "bubble", 
                      position: "bottom-right",
                      duration : 5000
                  })
              });  
            }            
          },
          closeTab() {
            var app = this
            app.$router.push('/userDetails')
          },
          rejectKyc() {
            const token = window.localStorage.getItem('token');
            let id = this.$route.params.id
            var app = this;          

            axios.post("http://localhost:3201/api/rejectKyc/"+id, {},{"headers":{'x-access-token':token}})
              .then((response) => {
                console.log(response.data)
                  // app.$router.push('/userDetails')
                  app.$toasted.show('KYC rejected',{ 
                      fullWidth:false,
                      theme: "bubble", 
                      position: "bottom-right",
                      duration : 5000
                  })
            })  
              .catch((error) => {
                console.log(error);
                  app.$toasted.show('Not rejected.Try again',{ 
                      fullWidth:false,
                      theme: "bubble", 
                      position: "bottom-right",
                      duration : 3000
                  })
              });    
          },
          approveKyc() {
            const token = window.localStorage.getItem('token');
            let id = this.$route.params.id
            var app = this;          

            axios.post("http://localhost:3201/api/approveKyc/"+id, {},{"headers":{'x-access-token':token}})
              .then((response) => {
                console.log(response.data)
                app.$toasted.show('KYC approved',{ 
                      fullWidth:false,
                      theme: "bubble", 
                      position: "bottom-right",
                      duration : 5000
                  })
                // app.$router.push('/userDetails')
              })  
              .catch((error) => {
                console.log(error);
                  app.$toasted.show('Not approved.Try again',{ 
                      fullWidth:false,
                      theme: "bubble", 
                      position: "bottom-right",
                      duration : 3000
                  })
              });    
          },
   }
}
</script>

<style scoped>

  .md-card [data-background-color="orange"], .md-card .md-tabs.md-success .md-tabs-navigation {
    background: linear-gradient(60deg, #000046, #1CB5E0);
    box-shadow: 0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
  }

  .token {
    background:linear-gradient(60deg,#bc4e97,#f80759) !important;
    color: #FFFFFF !important;
  }


  .md-card .md-card-header .title {
    color: #ffffffc9;
  }

  .error {
    color: red;
  }
 
   .column1 {
    float: left;
    right: 9px;
    width: 100%;
    padding: 10px;
  }

  .textbtn {
    float:right !important;
  }

  .column2 {
    float: left;
    width: 50%;
    padding: 10px;
  }

  .w3-container {
    position: relative;
    left: 40%;
    bottom: 5%;
  }

  .box {
    background: white;
    width: 35%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    bottom: 25%;
    position: absolute;
    margin-left: 62.256666%;
    z-index: 10;
    height: 54%; 
    font-size:136%;
    color: black;
  }

  .md-field {
    width: 100%;
    min-height: 48px;
    margin: 0px 0 4px !important;
    padding-top: 16px;
    display: flex;
    position: relative;
    font-family: inherit;
  }

  .actionbtn {
    margin: 0px !important;    
    margin-left: 3%!important;
  }

  .addec {
    padding: 30px
  }

  .kyc_box {
    position: relative;
    bottom: 44px !important;
  }

  /* .userdetails {
    height: 196px;
  } */

  .top {
    padding-left: 3%;
    padding-bottom: 4%;
  }
  .modelpass {
    padding-left:3% !important;
  }

  .md-card .md-card-header {
    background-color: #9e9e9e47;
  }

  .idproof {
    width: 386px;
    height: 115px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: 30px;
  }

  .addproof {
    width: 386px;
    height: 115px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: 30px;
  }

  .idcaption {
    /* border: double; */
    width: 92px;
    position: relative;
    left: 58%;
    bottom: 59%;
  }

  .idtitle {
    font-weight: bold;
  }

  .contentsize {
    height: 250px;
  }

  .md-tabs.md-theme-default .md-tabs-navigation {
    background-color: #00BCD4;
  }

  .suspend {
    background:linear-gradient(60deg,#bdc3c7,#2c3e50) !important;
    color: #FFFFFF !important;
  }

  .active {
    background: #673AB7 !important;
    color: #FFFFFF !important;
  }

  .remove {
    background: linear-gradient(60deg,#FDC830,#F37335) !important;
    color: #FFFFFF !important;
  }

  .close {
    background: linear-gradient(60deg,#6D6027,#D3CBB8) !important;
    color: #FFFFFF !important;
  }

  .row1 {
    width: 50%;
    position: relative;
    top: 20px;
  }

  .row2[data-v-3984c662] {
    width: 50%;
    position: relative;
    top: 20px;
  }

  .column1, .column2, .column3, .column4, .column5 {
    float: left;
    padding: 10px;
    position: relative;
  }

  .column1 {
    width: 25%;
    top: 21px;
  }

  .column2 {
    width: 25%;
    top: 21px;
  }

  .column3 {
    width: 40%;
    top: 21px;
  }

  .column4 {
    left: 11px;
    width: 15%;
    bottom: 104px;
  }

  .column5 {
    left: 12px;
    width: 13%;
    bottom: 104px;
  }

  .tableLayout {
    overflow-y: scroll!important;
    position: relative;
    height: 400px!important;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .md-card.md-theme-default {
    width: 97%;
  }

  .md-card.md-cardd.addproof.md-theme-default.md-theme-default {
    width: 34%;
  }

  .md-card.md-cardd.idproof.md-theme-default.md-theme-default {
    position: relative;
    width: 34%;
    left: 58%;
    top: -115px;
  }

  .tabWidth {
    height: 318px;
  }

  .vgt-responsive {
    width: 100%;
    overflow-y: scroll!important;
    position: relative;
    height: 450px!important;
  }

  .tabFrom, .tabTo, .tabTime, .tabValue {
    font-weight: 400;
    position: relative;
    color: #ff9800 !important;
  }

  .tabFrom {
    left: 11px;
  }

  .tabValue {
    left: 80%;
  } 

  .tabTo {
    left: 26%;
  } 

  .tabTIme {
    left: 66.5%;
  }

  .tabHead {
    border: 1px solid #9e9e9e;
    line-height: 2;
    width: 100%;
  }

  .balance {
    position: relative;
    left: 94px;
  }

  md-card .md-card-header-blue .card-icon, .md-card .md-card-header-blue .card-text, .md-card .md-card-header-blue:not(.md-card-header-icon):not(.md-card-header-text), .md-card [data-background-color="blue"], .md-card .md-tabs.md-info .md-tabs-navigation {
    background: linear-gradient(60deg, #ff9800, #ff9800);
}

</style>