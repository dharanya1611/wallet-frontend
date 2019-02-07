<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Token Administration</h4>
          </md-card-header>
          <div>
            <md-dialog :md-active.sync="supplyDialog" class="dialog">
              <md-dialog-title class="dialogtitle">INCREASE SUPPLY</md-dialog-title>
              <div class="supplyside">
                <form novalidate @submit.prevent="addcash" >
                  <div class="addec">
                    <md-field >
                      <label for="symbol">Total supply</label>
                      <md-input v-model="token.totalSupply" disabled/>
                    </md-field> 
                    <md-field :class="{error: errors.has('Supply')}">
                      <label>Additional Supply</label>
                      <md-input v-validate="'required'" name="Supply" id="Supply"
                        v-model="supply" required ></md-input>
                      <span class="error" v-if="errors.has('Supply')">{{errors.first('Supply')}}</span>
                    </md-field>
                    <md-field>
                      <label for="symbol">New total supply</label>
                      <md-input v-model="total" disabled/>
                    </md-field> 
                  </div>
                  <md-dialog-actions>
                    <md-button class="md-success" @click="pass(supply,token.totalSupply,token.id)" >Add supply</md-button>&emsp;&emsp;&emsp;&emsp;
                    <md-button class=" md-danger" @click="hideCash">Close</md-button>
                  </md-dialog-actions>
                </form>
              </div>
              <div class="history">
                <h4 class="tableheader">Total Supply Addition History</h4>
                <vue-good-table 
                  :columns="columnshistory" 
                  :rows="supplyhistory">
                </vue-good-table>
              </div>
            </md-dialog>
            <md-dialog :md-active.sync="showConfirm" class="confirmSupply">
              <md-dialog-title class="confirmation">Confirmation</md-dialog-title>
              <form novalidate @submit.prevent="update">
                <div>
                  <label for="symbol" class="question">Do you want to add supply?</label>
                </div>
                <md-dialog-actions>
                  <md-button class=" actionbtn md-success" type="submit">Confirm</md-button> &emsp;&emsp;
                  <md-button class="md-danger actionbtn" @click="hide">cancel</md-button>
                </md-dialog-actions>
              </form>
            </md-dialog>
          </div>
          <div class="tokenDetails">
            <span class="name"><strong> Name :</strong> {{token.name}}</span>
            <hr style="border-top: dashed 1px;">
            <span class="name"><strong>Symbol:</strong> {{token.symbol}}</span>
            <hr style="border-top: dashed 1px;">
            <span class="name"><strong> Address :</strong> {{token.contractAddress}}</span>
            <hr style="border-top: dashed 1px;">
            <span class="name"><strong> Supply : </strong>{{token.totalSupply}}</span>
            <hr style="border-top: dashed 1px;">
            <span class="name"><strong>Description :</strong> {{token.description}}</span>
          </div>
          <div class="table">
            <vue-good-table 
              :columns="columnsAdmin" 
              :rows="admin"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'remove'" @click="removeAdmin(props.row._id)"> 
                  <md-icon className="material-icons" class="close" >close</md-icon>
                </span>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </vue-good-table>&emsp;
            <md-button @click="addSupply" class="add">Add supply</md-button> &emsp;
            <md-button class="halt md-danger" @click="haltdialog=true">{{text}}</md-button> &emsp;
            <md-button class="addAdmin" @click="AdminCreater">Add Admin</md-button>
          </div>
          <md-dialog :md-active.sync="haltdialog" class="haltq">
            <form novalidate @submit.prevent="change">
              <div class="confirmhalt"> <br>
                <label for="symbol" class="question">Enter password to halt <strong>{{token.name}}</strong></label>
                <md-field :class="{error: errors.has('password')}">
                  <label >Password</label>
                  <md-input required v-validate="'required'" type="password" name="password" id="password"
                    v-model="password"></md-input>
                  <span class="error" v-if="errors.has('password')">{{errors.first('password')}}</span>
                </md-field> <br>
              </div>
              <md-dialog-actions>
                <md-button class="md-success actionbtn " type="submit">Confirm</md-button> &emsp;&emsp;
                <md-button class="md-danger actionbtn" @click="haltdialog=false, password = null">cancel</md-button>
              </md-dialog-actions>
            </form>
          </md-dialog>
          <md-dialog :md-active.sync="deleteConfirm" >
            <form novalidate @submit.prevent="del">
              <div class="delad"> <br>
                <label for="symbol">Do you want to remove admin?</label> <br><br><br>
              </div>
              <md-dialog-actions>
                <md-button class="md-info actionbtn md-success" type="submit">Confirm</md-button> &emsp;&emsp;
                <md-button class="md-danger actionbtn" @click="deleteConfirm=false">cancel</md-button>
              </md-dialog-actions>
            </form>
          </md-dialog>
          <div>
            <md-dialog :md-active.sync="create" class="search">
              <md-dialog-title>Add Admin
                <div class="x" @click="closeall">X</div>
              </md-dialog-title>
              <form novalidate @submit.prevent="searching" >
                <div class="addec">
                  <md-field :class="{error: errors.has('searchUser')}">
                    <label>Enter Email Id to Search!</label>
                    <md-input v-validate="'required|email'" name="searchUser" id="searchUser"
                      v-model="searchUser" required ></md-input> <br>
                    <div class="error" v-if="errors.has('searchUser')">{{errors.first('searchUser')}}</div>
                  </md-field>
                </div>
                <md-dialog-actions>
                  <md-button class="md-info actionbtn searchbtn" type="submit">Search</md-button>
                </md-dialog-actions>
              </form> <br>
              <div class="profile" v-if="status">
                <md-field>
                  <label>Wallet Address</label>
                  <md-input v-model="address" readonly></md-input>
                </md-field>
                <md-field>
                  <label>Name</label>
                  <md-input v-model="name" readonly></md-input>
                </md-field>
                <md-field v-if="role!='admin'">
                  <label >Account Type</label>
                  <md-input v-model="accountType" readonly></md-input>
                </md-field>
                <div class="alert alert-warning" v-else>
                  <strong>Info!</strong> This user is already an Admin
                </div>
                <md-button class=" actionbtn md-danger" @click="closes" type="submit">cancel</md-button>
                <md-button class=" actionbtn adminbtn md-success" v-if="role!='admin'" @click="makeadminconfirm=true,create=false" type="submit">Make admin</md-button>
              </div>
              <div class="alert alert-danger al" v-if="ustatus &&!status ">
                <strong>Warning!</strong> User not found.
              </div>
            </md-dialog>
            <md-dialog :md-active.sync="makeadminconfirm" class="finalpass" >
              <md-dialog-title class="confirmation">Confirmation</md-dialog-title>
              <form novalidate @submit.prevent="makeadmin">
                <div class="addpass">
                  <label for="symbol" >Enter password to make <strong> {{name}}</strong> an admin?</label>
                </div>
                <div class="modelpass">
                  <md-field :class="{error: errors.has('password')}">
                    <label >Password</label>
                    <md-input required v-validate="'required'" type="password" name="password" id="password"
                      v-model="password"></md-input>
                    <span class="error" v-if="errors.has('password')">{{errors.first('password')}}</span>
                  </md-field>
                </div>
                <md-dialog-actions>
                  <md-button class=" md-success actionbtn" type="submit">Confirm</md-button> &emsp;
                  <md-button class=" md-danger actionbtn" @click="makeadminconfirm=false,status =false,searchUser=null,ustatus=false">cancel</md-button>
                </md-dialog-actions>
              </form>
            </md-dialog> 
          </div>
        </md-card>
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Recent Transactions</h4>
          </md-card-header><br>
          <vue-good-table 
            :columns="columns" 
            :rows="rows" 
            :search-options="{
              enabled: true, 
              placeholder: 'Search'}"
            :pagination-options="paginationOption">
          </vue-good-table>
        </md-card> 
      </div> 
    </div>
  </div> 
</template>

<script>
  import axios from 'axios'
//   const params = require('../_helpers/params.js')
//   const CONFIG = params.params

  export default {
    data () { 
        return {
            role: null,
            ustatus: false,
            password: null,
            id: null,
            makeadminconfirm: false,
            status: false,
            accountType: null,
            name: null,
            address: null,
            value: null,
            total: null,
            haltdialog: false,
            Hname: null,
            token: {
                id: null,
                date: null,
                contractAddress: null,
                description: null,
                name: null,
                symbol: null,
                totalSupply: null
            },        
            user: {
                email: null,
                password: null,
                confirmPassword: null,
                accountType: 'admin'
            },
            deleteConfirm: false,
            create: false,
            admin: [],
            deleteId: null,
            supplyhistory: null,
            searchUser: null,
            rows: [],
            supplyDialog: false,
            showConfirm: false,
            supply: null,
            addts: null,
            ts: null,
            icash: null,
            text: 'Halt',
            transactName:[],
            columns: [
                {label: 'Full Name', field: this.getName},
                {label: 'Transaction Date',field: 'timestamp', formatFn:this.formatDate},
                {label: 'Sent', field: this.sent },
                {label: 'Received', field: this.receive}
              ],
            columnsAdmin: [
                {label: 'Full Name', field: this.getAName},
                {label: 'Email', field: 'email'},
                {label: 'Remove Admin', field:'remove', type: 'String'}  
              ],
            columnshistory: [
                {label: 'Date', field: 'date', formatFn: this.formatHDate},
                {label: 'Name', field: this.getHname},
                {label: 'Value', field: 'value'}
              ],
            paginationOption: {
                  enabled: true,
                  perPage: 10
            }
        }
    },
    watch: {
      supply() {
        this.total = +this.token.totalSupply + +this.supply
      }
    },
    created () {
      const token = window.localStorage.getItem('token')
      var app=this
      var id = app.$route.params.id

      axios.get("http://localhost:3201/api/ecash/"+id, { headers: { 'x-access-token': token } })
        .then(res => {
          app.token.date = res.data.data.date
          app.token.contractAddress = res.data.data.contractAddress
          app.token.description = res.data.data.description
          app.token.name = res.data.data.name
          app.token.totalSupply = res.data.data.totalSupply
          app.token.symbol = res.data.data.symbol
          app.token.id = res.data.data._id
        })
      axios.get("http://localhost:3201/api/recentTrans",{headers:{'x-access-token': token}})
        .then(response => {
          app.rows = response.data.data
        })
      axios.get("http://localhost:3201/api/admin",{headers:{'x-access-token': token}})
        .then(response => {
          app.admin = response.data.data
        })
      axios.get("http://localhost:3201/api/user",{headers:{'x-access-token': token}})
        .then(response => {
          app.supplyUser = response.data.data._id
        }) 
      axios.get("http://localhost:3201/api/supply",{headers:{'x-access-token': token}})
        .then(response => {
          app.supplyhistory = response.data.data
        }) 
    },
    methods: {
      closes () {
        this.status = false
        this.searchUser = null
        this.ustatus = false
        this.name = null
        this.address = null
      },
      closeall () {
        this.create = false
        this.status = false
        this.searchUser = null
        this.ustatus = false
      },
      makeadmin () {
        const token = window.localStorage.getItem('token')
        var app=this
        var data = {}
        data.password = app.password
        data.role = 'admin'

        axios.post("http://localhost:3201/api/makeadmin/"+app.id,data,{headers:{'x-access-token': token}})
          .then(res => {
            if(res.data.status === 200) {
              window.location.reload()
              app.$toasted.show('User changed to Admin', { 
                  fullWidth: false,
                  theme: 'bubble',
                  position: 'bottom-right',
                  duration: 10000
              })
            } else {
              app.$toasted.show('Something went wrong', { 
                  fullWidth: false,
                  theme: 'bubble',
                  position: 'bottom-right',
                  duration: 10000
              })
            }
        })
      },
      searching () {
        this.$validator.validateAll()
        .then(res =>{
          const token = window.localStorage.getItem('token')
          var app=this
          var data = {}
          data.email = app.searchUser

            axios.post("http://localhost:3201/api/userSearch",data,{headers:{'x-access-token': token}})
              .then(response => {
                if(response.data.data) {
                  app.status = true
                  app.id = response.data.data._id
                  app.role = response.data.data.role
                  app.address = response.data.data.address
                  app.accountType = response.data.data.accountType
                  if((response.data.data.firstName)||(response.data.data.lastName)) {
                    app.name = response.data.data.firstName + ' ' + response.data.data.lastName
                  } else {
                    app.name = response.data.data.companyName
                  }
                } else {
                  app.ustatus = true
                  app.status = false
                }
            }) 
        })
      },
      hideCreate () {
        this.create = false
      },
      AdminCreater () {
        this.create = true
        this.ustatus = false
      },
      change () {
        if (this.text === 'Halt') {
          this.text = 'Unhalt'
          this.haltdialog = false
          this.password = null
        } else {
          this.text = 'Halt'
          this.haltdialog = false
          this.password = null
        }
      },
      sent (result) {
        if (result.from !== this.add) {
          var sep = parseFloat(Math.round(result.value * 100) / 100).toFixed(2)
          var num = sep.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return num
        } else {
          return '-'
        }
      },
      addSupply () {
        this.supplyDialog = true
        this.supply = null,
        this.total = null
      },
      formatDate (str) {
        let datastr = this.$moment(parseInt(str))
        return datastr.format('DD-MM-YYYY')
      },
      formatHDate(value) {
        let datastr = this.$moment(value);
        return datastr.format("DD-MM-YYYY, h:mm:ss a")
      },
      receive (result) {
        if (this.add === result.from) {
          var sep = parseFloat(Math.round(result.value * 100) / 100).toFixed(2)
          var num = sep.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return num
        } else {
          return '-'
        }
      },
      hide () {
        this.showConfirm = false
        this.supply = null,
        this.total = null 
      },
      update () {
        let self = this
        var add = {}
        add.value = self.addts
        add.user = self.supplyUser
        add.totalSupply = eval(self.ts) + eval(self.addts)
        var token = window.localStorage.getItem('token')

        axios.post("http://localhost:3201/api/addSupply/" + self.icash, add, { headers: { 'x-access-token': token } })
          .then(res => {
            self.showConfirm = false
            window.location.reload()
        })
      },
      addcash () {
        this.$validator.validateAll()
        .then(res => {
          this.showConfirm = true
          this.supplyDialog = false
        })
      },
      getAName (value) {
        if ((value.firstName)||(value.lastName)) {
          return value.firstName + ' ' + value.lastName
        } else {
          return value.companyName
        }
      },
      getHname (val) {
        var token = window.localStorage.getItem('token')
        axios.get("http://localhost:3201/api/user/" + val.user, { headers: { 'x-access-token': token } })
          .then(res => {
            this.Hname = res.data.data.firstName + ' ' + res.data.data.lastName
          })
          return this.Hname
      },
      hideCash () {
        this.supplyDialog = false
        this.supply = null
        this.total = null
      },
      pass (vala, valts, id) {
        this.$validator.validateAll()
        .then(res => {
          this.addts = vala
          this.ts = valts
          this.icash = id
          this.showConfirm = true
          this.supplyDialog = false
        })
      },
      del () {
        var data = {}
        var app = this
        data.role = 'Company'
        var token = window.localStorage.getItem('token')
        axios.post("http://localhost:3201/api/changeadmin/"+app.deleteId, data, { headers: { 'x-access-token': token } })
          .then(res => {
            window.location.reload()
            app.showConfirm = false
              app.$toasted.show('Admin changed', {
              fullWidth: false,
              theme: 'bubble',
              position: 'bottom-right',
              duration: 10000
              })
          })
      },
      removeAdmin (id) {
        this.deleteConfirm = true
        this.deleteId = id
      },
      getName (rowObje) {
        let address
          if (this.add === rowObje.to) {
            address = rowObje.from
          } else {
            address = rowObje.to
          }
        let user = this.transactName[address]
          if (!user) {
            return address
          } else if ((user.accountType !== 'Company')) {
            return (user.firstName + ' ' + user.lastName)
          } else if (user.accountType === 'Company') {
            return user.companyName
          }
      },
    }
 }
</script>

<style scoped>
  .delad {
    padding-left: 4%;
    padding-right: 4%;
    font-size: 20px;
  }
  .confirmSupply {
    width: 37%;
  }
  .haltq {
    width: 40%;
  }
  .confirmhalt {
    padding-left: 6%; 
  }

  .confirmation {
    font-size: 25px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 100;
    font-family: sans-serif;
  }
  .x {
    cursor: pointer;
    float: right;
    width: 4%;
    padding-left: 1.1%;
    background: crimson;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: 800;
  }
  .al {
    width: 75%;
    margin-left: 14%;
  }
  .modelpass {
    padding-left: 4%;
  }
  .addpass {
    padding-left: 4%;
    font-size: 17px;
  }
  .finalpass {
    width: 38%;
  }
  .closesearch {
  background: red !important;
  }
  .adminbtn {
    float: left;
    margin-left: 30% !important;
    margin-right: 13% !important;
  }
  .profile {
    padding-left: 25%;
    padding-right: 25%;
  }

  .searchbtn {
    border-radius: 50px;
    width: 20%;
    margin-right: 45% !important;
    height: 37px;
  }
  .closebtn {
    background: red !important;
  }
  .search {
    width: 50%;
    height: 100%;
  }
  .question {
    font-size: 19px;
    padding-left: 5%;
  }
  .dialogtitle {
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    font-size: 22px;
  }
  .history {
    width: 53%;
    position:absolute;
    margin-left: 45%;
    margin-top: 14%;
  }
  .tableheader {
    color: white;
    background: linear-gradient(60deg, #000046, #1CB5E0) !important;
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2) !important;
    padding-top: 3%;
    padding-left: 3%;
    padding-bottom: 3%;
  }
  .supplyside {
  /* display: inline-block;
  width: 40%; */
    margin-top: 4%;
    margin-left: 4%;
    margin-bottom: 4%;
    height: fit-content;
    width: 40%;
    display: inline-block;
    border-right: 4px solid cadetblue;
  }
  .dialog {
    width: 55%;
    height: fit-content;
  }
  .addec {
    padding-left: 4%;
    padding-right: 4%;
    /* width: 46%; */
  }
  .textbtn {
    background: green !important;
  }
  .add {
    margin-right: 3%;
    border-radius: 50px;
    background: mediumvioletred!important;
  }
  .vgt-wrap{
    position: relative;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
  .table {
    float: right;
    margin-right: 2%;
    width: 53%;
    margin-top: 4%;
  }
  .buttons {
    margin-right: 1%;
    float: right;
    margin-top: -24%;
  }

  .addSupply {
    margin-top: 0%;
    border-radius: 50px;
  }
  .addAdmin {
    border-radius: 50px;
    margin-top:2%;
    background: darkslategrey!important;
  }
  .removeAdmin {
    border-radius: 50px;
  }
  .halt {
    border-radius: 50px;
  }
  .tokenDetails {
    margin-top: 4%;
    margin-left: 4%;
    margin-bottom: 4%;
    width: 40%;
    display: inline-block;
    border-right: 4px solid cadetblue;
    /* border-radius: 5px; */
  }
  .close {
    color: red !important;
    font-weight: bolder;
    cursor: pointer;
  }
  .name {
    font-size: 15px;
  }

</style>