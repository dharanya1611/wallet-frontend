<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Card User Details</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Per page</label>
                <md-select v-model="pagination.perPage" name="pages">
                  <md-option
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 200px"
                  placeholder="Search records"
                  v-model="searchQuery"
                >
                </md-input>
              </md-field>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="First Name" md-sort-by="firstName">
                {{ item.user.firstName }}{{ item.user.lastName }}
              </md-table-cell>
              <md-table-cell md-label="Email" md-sort-by="email">{{
                item.user.email
              }}</md-table-cell>
              <md-table-cell md-label="Card Number">{{ item.cardNumber }}</md-table-cell>
              <md-table-cell md-label="Print Status">{{ item.status }}</md-table-cell>
              <md-table-cell md-label="Actions">
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="handleLike(item)"
                >
                  <md-icon>favorite</md-icon>
                </md-button>
                <md-button
                  class="md-just-icon md-warning md-simple"
                  @click.native="handleEdit(item)"
                >
                  <md-icon>dvr</md-icon>
                </md-button>
                <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="handleDelete(item)"
                >
                  <md-icon>close</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>


          <md-dialog :md-active.sync="showCard" class="cardToken" >
                    <div id="printMe">
                      <div class="logo-img">
                        <img :src="imgLogo" alt="">
                      </div>
                <!-- <div class="cardholder">Name : {{name}}</div> -->
                      <div class= "cashBox">
                        <div class="cardAddress">
                          <p class= "cardValue">{{address}}</p>
                        </div>
                        <div class="qrcode">
                          <qrcode :value="encryptedkey" :options="{ size: 200 }" tag="img"></qrcode>
                        </div><br>
                      </div>
                    </div>   
                    <div class="md-layout-item md-size-100 text-right">
                      <md-button @click="print" >Print </md-button>
                    </div>             
                  </md-dialog> 
          <!-- <div class="footer-table md-table">
            <table>
              <tfoot>
                <tr>
                  <th
                    v-for="item in footerTable"
                    :key="item.name"
                    class="md-table-head"
                  >
                    <div class="md-table-head-container md-ripple md-disabled">
                      <div class="md-table-head-label">
                        {{ item }}
                      </div>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div> -->

          
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import swal from "sweetalert2";
import axios from 'axios';
// const params = require('../_helpers/params.js');
// const CONFIG = params.params; 

export default {
data() {
        return {
            
            cardName:[],
            id: null,
            showCard: false,
            address: null,
            name: null,
            encryptedkey: null,
            
             }
        }, 
 props: {
          // imgLogo: {
          //   type: String,
          //   default: require('/public/img/logo.png')
          //   }
      },
        

  components: {
    Pagination
  },
  created () {
            const token = window.localStorage.getItem('token');        
            let user = JSON.parse(localStorage.getItem('user'));
            var app=this;
                axios.get("http://localhost:3201/api/cardList",{headers:{'x-access-token': token}})
                    .then((response) => {
                console.log(response.data)             
                app.tableData = response.data.data;               
            })
            .catch((error) => {
                console.log("error");
            });
       },

  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      currentSort: "name",
      currentSortOrder: "asc",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
    //   footerTable: ["Name", "Date", "Received", "Sent", "Actions"],
      searchQuery: "",
      propsToSearch: ["firstName", "email"],
      tableData: [],
       transactName:[],
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    handleLike(item) {
      swal({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success"
      });
    },
      handleEdit(item) {
      console.log('p',item)
            this.encryptedkey = item.data
             this.address = item.address 
            if(this.encryptedkey) {
                 this.showCard = true
                 this.id = item._id
                if(item.accountType != 'Company') {
                    this.name = item.firstName + ' ' + item.lastName
                }
                else if(item.accountType == 'Company') {
                    this.name = item.companyName
                }
            }
    },
    handleDelete(item) {
      swal({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(item);
          swal({
            title: "Deleted!",
            text: `You deleted ${item.name}`,
            type: "success",
            confirmButtonClass: "md-button md-success btn-fill",
            buttonsStyling: false
          });
        }
      });
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },



    print() {
            this.$htmlToPaper('printMe');
            const token = window.localStorage.getItem('token')
            console.log('id',this.id)
            let data = {} 
            data.status = 'Printed'
            data.data = this.encryptedkey
            axios.post("http://localhost:3201/api/delivered/"+this.id,data,{headers:{'x-access-token': token}})          
            .then((response) => {
            console.log("Delivered",response.data)
//         this.$router.push('/card')

//         window.matchMedia('print').addListener(function (media) {

//       if(media.matches){

//       }
//       else{
//            window.location.reload(true);
//             //location.reload();
//       }
//    });

    })
    .catch((error) => {
      console.log("error",error);
    });
        }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions{
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}


  .cardAddress {
    position: relative;
    top: 228px;
    width: 77% !important;
    margin-left: auto;
    margin-right: auto;
  }

  .qrcode {
    position: relative;
    bottom: 42px;
}

  .cardValue {
    word-wrap: break-word !important;
  }
  .cashBox {
    position: relative;
    /* border: double; */
    height: 82% !important;
    margin-left: auto;
    margin-right: auto;
    width: 71%;
  }
  .logo-img {
    width: 90px;
    margin-left: auto;
    margin-right: auto;
}
  .cardholder {
      text-align: center;
  }
</style>
