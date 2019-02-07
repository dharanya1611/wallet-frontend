<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <nav-tabs-card>
            <template slot="content">
              <div class="tabWidth">
                <span class="md-nav-tabs-title">User:</span>
                <md-tabs md-sync-route class="md-info" md-alignment="left">
                  <md-tab id="tab-home" md-label="Basic Info" md-icon="info">
                    <div class="userdetails">
                      <div class="row1">
                        <div class="md-layout-item md-small-size-100 md-medium-size-50">
                          <md-field>
                            <label for="email">Email</label>
                            <md-input name="email" id="email" v-model="user.email" disabled />
                          </md-field>
                        </div>
                      </div>
                      <div class ="row2">
                        <div class="md-layout-item md-small-size-100 md-medium-size-50">
                          <md-field >
                            <label for="address">Wallet Address</label>
                            <md-input name="address" id="address" v-model="user.address" disabled />
                          </md-field>
                        </div>
                      </div>
                      <div class="column1">
                        <div  v-if="user.accountType != 'Company'">
                          <div class="md-layout-item md-small-size-100 md-medium-size-50">
                            <md-field>
                              <label for="firstname">First Name</label>
                              <md-input name="firstname" id="firstname" v-model="user.firstName" />                                                    
                            </md-field>
                          </div>
                        </div>
                        <div  v-if="user.accountType == 'Company'">
                        <div class="md-layout-item md-small-size-100 md-medium-size-50">
                          <md-field>
                            <label for="companyName">Company Name</label>
                            <md-input name="companyName" id="companyName" v-model="user.companyName" />                                                    
                          </md-field>
                        </div>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-medium-size-50">
                        <md-field>
                          <label for="status">Status</label>
                          <md-input name="status" type="text" id="status" v-model="user.status" disabled/>   
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-medium-size-50">
                        <md-field >
                          <label for="country">Country</label>
                          <md-select v-model="user.country" name="country" id="country" placeholder="country">
                            <md-option v-for="item in country" :key="item.name" :value="item.name">{{item.name}}</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>
                      <div class="column2">
                        <div v-if="user.accountType != 'Company'">
                          <div class="md-layout-item md-small-size-100 md-medium-size-50">
                            <md-field>
                              <label for="lastname">Last Name</label>
                              <md-input name="lastname"  id="lastname" v-model="user.lastName" />                                    
                            </md-field>
                          </div>
                        </div>
                        <div  v-if="user.accountType == 'Company'">
                          <div class="md-layout-item md-small-size-100 md-medium-size-50">
                            <md-field>
                              <label for="companyCrn">Register No</label>
                              <md-input name="companyCrn"  id="companyCrn" v-model="user.companyCrn" />                                    
                            </md-field>
                          </div>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-medium-size-50">
                          <md-field>
                            <label for="physicaladdress">Address</label>
                            <md-input name="physicaladdress" type="text" id="physicaladdress" v-model="user.physicaladdress" />   
                          </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-medium-size-50">
                          <md-field >
                            <label for="phoneNumber">Phone Number</label>
                            <md-input name="phoneNumber" type="text" id="phoneNumber" v-model="user.phoneNumber" /> 
                          </md-field>
                        </div>
                      </div>
                      <div class="column3">
                        <div class="qrcode">
                          &emsp;&emsp;&emsp;
                          <qrcode :value="user.address" :options="{ size: 200 }"></qrcode>
                        </div>
                      </div>
                      <div class="column4" >
                        <div class="md-layout-item md-size-100 text-right">                      
                          <md-button class="md-info actionbtn cash" @click="updateProfile"> Update </md-button>
                        </div><br>
                        <div class="md-layout-item md-size-100 text-right">                      
                          <md-button class="md-info actionbtn token" @click="box"> Transfer </md-button>
                        </div><br>
                        <div class="md-layout-item md-size-100 text-right">
                          <md-button class="md-info actionbtn close" @click="closeTab" > Close </md-button> 
                        </div>
                      </div>
                      <div class="column5">
                        <div class="md-layout-item md-size-100 text-right">
                          <md-button class="md-success actionbtn " @click="approveKyc"> Approve </md-button>
                        </div><br>
                        <div class="md-layout-item md-size-100 text-right">
                          <md-button class="md-danger actionbtn remove " @click="rejectKyc"> Reject </md-button> 
                        </div><br>
                        <div  class="md-layout-item md-size-100 text-right">                      
                          <md-button v-if="user.status == 'Active'" class="md-info actionbtn suspend" @click="suspendUser"> Suspend </md-button>                  
                          <md-button v-if="user.status == 'Suspended'" class="md-info actionbtn active" @click="activate"> Activate </md-button>
                        </div><br>
                        <div class="md-layout-item md-size-100 text-right">                      
                          <md-button class="md-danger actionbtn" @click="deleteUser"> Remove </md-button>
                        </div>
                      </div>
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

                  <md-tab id="tab-pages" md-label="KYC" md-icon="description">
                    <md-card-content>
                      <div class="contentsize">
                        <div class="addcaption">
                          <strong>Address Proof:</strong>
                        </div>                     
                        <md-card class="md-cardd addproof md-theme-default">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="idtitle">{{user.addproofType}}</div>
                              <div class="md-subhead">{{user.addproofDocNo}}</div>
                            </md-card-header-text>
                            <md-card-media>
                              <div v-if="user.addproofTypefile" @click="showImg(user.addproofTypefile)">
                                <img :src="getImage(user.addproofTypefile)" class="addimg">
                              </div>
                            </md-card-media>
                          </md-card-header>
                          <md-dialog :md-active.sync="showImgModel" >
                            <img v-if="selectedImg" :src="selectedImg">
                          </md-dialog>
                        </md-card>

                        <div class="idcaption">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Id Proof:</strong><br>
                        </div>
                        <md-card class="md-cardd idproof md-theme-default">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="idtitle">{{user.idProoftype}}</div>
                              <div class="md-subhead">{{user.idproofDocNo}}</div>
                            </md-card-header-text>
                            <md-card-media>
                              <div v-if="user.idProoftypefile" @click="showImg(user.idProoftypefile)">
                                <img :src="getImage(user.idProoftypefile)" class="idimg">
                              </div>
                            </md-card-media>
                          </md-card-header>
                          <md-dialog :md-active.sync="showImgModel" >
                            <img v-if="selectedImg" :src="selectedImg">
                          </md-dialog>
                        </md-card>
                      </div>
                    </md-card-content>
                  </md-tab>

                  <md-tab id="tab-posts" md-label="Transaction" md-icon="transfer_within_a_station">
                    <div class="balance">
                      <h4>Balance: &nbsp;<strong>{{userBalance}} e-cash</strong></h4>
                    </div>
                    <!-- <div class="tabHead">
                      <span class="tabFrom">From</span>
                      <span class="tabTo">To</span>
                      <span class="tabTime">Date</span>
                      <span class="tabValue">Value</span>
                    </div> -->
                    <div class="tableLayout">
                        <vue-good-table 
                          :rows="rows"
                          @on-row-click="onRowClick"
                          :columns="columns"
                        > 
                        </vue-good-table>
                    </div>
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
    created: function () {
        const token = window.localStorage.getItem('token');
        // console.log(token)
        var app=this;
        let id=this.$route.params.id
          axios.get("http://localhost:3201/api/user/"+id,{headers:{'x-access-token': token}})          
            .then((response) => {
                console.log("created",response.data)  
                this.user.email = response.data.data.email;
                this.user.status = response.data.data.status; 
                this.user.firstName = response.data.data.firstName;
                this.user.lastName = response.data.data.lastName;
                this.user.limit = response.data.data.limit;
                this.user.phoneNumber = response.data.data.phoneNumber;
                this.user.physicaladdress = response.data.data.physicaladdress;
                this.user.country = response.data.data.country; 
                this.user.companyName = response.data.data.companyName;
                this.user.companyCrn = response.data.data.companyCrn;
                this.user.country = response.data.data.country;
                this.user.addproofType = response.data.data.addproofType;
                this.user.addproofTypefile = response.data.data.addproofTypefile;
                this.user.addproofDocNo = response.data.data.addproofDocNo;
                this.user.idProoftype = response.data.data.idProoftype;
                this.user.idProoftypefile = response.data.data.idProoftypefile;
                this.user.idproofDocNo = response.data.data.idproofDocNo;  
                this.user.id = response.data.data._id;
                this.user.address = response.data.data.address;
                this.user.accountType = response.data.data.accountType;
                this.add = response.data.data.address;
                // this.user.balance = response.data.data.balance;
                app.userTxn();
                axios.get("http://localhost:3201/api/balance",{headers:{'x-access-token': token}})
                  .then(res => {
                    console.log('BALANCE',res)
                    this.balance = res.data.data
                  }) 
                let timestamp = 1540452235460;
                let datastr = this.$moment(parseInt(timestamp));
                datastr = datastr.format("YYYY-MM-DD")
                console.log(datastr)                   
            })
            .catch((error) => {
                console.log("error");
            })
          let self = this
          const { dispatch } = self.$store;
            dispatch('user/getuser');
            dispatch('user/getCountry');
    },
    methods: {
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
    width: 50%;
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
    width: 20%;
    bottom: 136px;
    left: 1%;
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
    height: 550px;
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

</style>