<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Recent transaction</h4>
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
                  style="width: 200px,
                  height:2px"
                  placeholder="Search records"
                  v-model="searchQuery"
                >
                </md-input>
              </md-field>
            </md-table-toolbar>
 
            <md-table-row slot="md-table-row" slot-scope="{ item }"  style="height:2px;">
              
              <md-table-cell md-label="Name" md-sort-by="name" >
               {{ transactName.address}}    {{ transactName[item.to].lastName}} 
              </md-table-cell>
              <md-table-cell md-label="Date" md-sort-by="email">{{
                (item.timestamp * 1)  | moment('YYYY-MM-DD')
              }}</md-table-cell>
              <md-table-cell md-label="Received">{{ item.value }}</md-table-cell>
              <md-table-cell md-label="Sent">{{ item.value }}</md-table-cell>
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
          <div class="footer-table md-table">
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
          </div>
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
// import users from "./users";
import Fuse from "fuse.js";
import swal from "sweetalert2";
import axios from 'axios';
// const params = require('../_helpers/params.js');
// const CONFIG = params.params; 

export default {
  components: {
    Pagination
  },
  created () {
            const token = window.localStorage.getItem('token');        
            let user = JSON.parse(localStorage.getItem('user'));
            var app=this;
                axios.get("http://localhost:3201/api/user",{headers:{'x-access-token': token}})
                    .then(res => {
                        app.add = res.data.data.address
                        app.userArray();
            })
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
      propsToSearch: ["name"],
      tableData: [],
       transactName:[],
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
    userArray () {
            let self = this
            const token = window.localStorage.getItem('token');
            let user = JSON.parse(localStorage.getItem('user'));

            axios.get("http://localhost:3201/api/userData",{headers:{'x-access-token': token}})
                .then(res => {
                     console.log(res)
                     console.log(res.data.data.address)
                     self.transactName = res.data.data         
                     console.log(self.transactName ,"gydut")           
                     axios.get("http://localhost:3201/api/recentTrans",{headers:{'x-access-token': token}})
                        .then(res => {
                            console.log('TRANS',res)
                            self.tableData = res.data.data
                         })
            })
        },


         getName (item) {
            let address;
              if(this.add === item.to){
                address = item.from;
              }else{
                address = item.to
              }

            let user =  this.transactName[address];
            //  console.log("user", user.companyName)
              if(!user){
                return address;
              }
              else if((user.firstName)||(user.lastName)) {
                return (user.firstName +' '+user.lastName)
              }
              else if (user.companyName) {
                return user.companyName
              } 
        },
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
  console.log(item)


  var finalhash = item.hash
            popupCenter(
               "http://explorer.evenscoin.io/tx/"+finalhash,'myPop1',850,500
            );
            function popupCenter(url, title, w, h) {
				var left = (screen.width/2)-(w/2);
				var top = (screen.height/2)-(h/2);
				return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
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
.md-table-row{
  height:2px;
}

</style>
