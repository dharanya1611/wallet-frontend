
<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>store</md-icon>
          </div>
          <p class="category">Balance</p>
          <h3 class="title">{{balance}} e-cash</h3> 
        </template>

        <template slot="footer">
          <div class="stats">
            Total balance in network
            <!-- <md-icon>date_range</md-icon>
            Last <animated-number :value="24"></animated-number> Hours -->
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <i class="fab fa-twitter"></i>
          </div>
          <p class="category">Folowers</p>
          <h3 class="title">
            +<animated-number :value="245"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>update</md-icon>
            Just Updated
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="rose">
        <template slot="header">
          <div class="card-icon">
            <md-icon>equalizer</md-icon>
          </div>
          <p class="category">Website Visits</p>
          <h3 class="title">
            <animated-number :value="75"></animated-number>.<animated-number
              :value="521"
            ></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>local_offer</md-icon>
            Tracked from Google Analytics
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>weekend</md-icon>
          </div>
          <p class="category">Bookings</p>
          <h3 class="title">
            <animated-number :value="184"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon class="text-danger">warning</md-icon>
            <a href="#pablo">Get More Space...</a>
          </div>
        </template>
      </stats-card>
    </div>





    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <chart-card
        header-animation="true"
        :chart-data="emailsSubscriptionChart.data"
        :chart-options="emailsSubscriptionChart.options"
        :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
        chart-type="Bar"
        chart-inside-header
        background-color="rose"
      >
        <md-icon slot="fixed-button">build</md-icon>
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>
        <template slot="content">
          <h4 class="title">Website Views</h4>
          <p class="category">
            Last Campaign Performance
          </p>
        </template>
        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated <animated-number :value="10"></animated-number> days ago
          </div>
        </template>
      </chart-card>
    </div> -->
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    > -->
      <!-- <chart-card
        :chart-data="dailySalesChart.data"
        :chart-options="dailySalesChart.options"
        chart-type="Line"
        chart-inside-header
        background-color="green"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>
        <template slot="content">
          <h4 class="title">Daily Sales</h4>
          <p class="category">
            <span class="text-success"
              ><i class="fas fa-long-arrow-alt-up"></i>
              <animated-number :value="55"></animated-number>%
            </span>
            increase in today sales.
          </p>
        </template>
        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated <animated-number :value="4"></animated-number> minutes ago
          </div>
        </template>
      </chart-card> -->
    <!-- </div> -->
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <chart-card
        :chart-data="dataCompletedTasksChart.data"
        :chart-options="dataCompletedTasksChart.options"
        chart-type="Line"
        chart-inside-header
        background-color="blue"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>
        <template slot="content">
          <h4 class="title">Completed Tasks</h4>
          <p class="category">
            Last Campaign Performance
          </p>
        </template>
        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            campaign sent
            <animated-number :value="26"></animated-number> minutes ago
          </div>
        </template>
      </chart-card>
    </div> -->
    <!-- <div class="md-layout-item md-size-100">
      <global-sales-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>language</md-icon>
          </div>
          <h4 class="title">Global Sales by Top Locations</h4>
        </template>
        <template slot="content">
          <div class="md-layout">
            <div class="md-layout-item md-size-50">
              <global-sales-table></global-sales-table>
            </div>
            <div class="md-layout-item md-size-50">
              <async-world-map class="map" :data="mapData"></async-world-map>
            </div>
          </div>
        </template>
      </global-sales-card>
    </div> -->
    <div class="md-layout-item md-size-50 md-small-size-100">
        <chart-card
          header-animation="false"
          :chart-data="colouredBarsChart.data"
          :chart-options="colouredBarsChart.options"
          chart-type="Line"
          header-icon
          chart-inside-content
          no-footer
          background-color="warning"
        >
          <template slot="chartInsideHeader">
            <div class="card-icon">
              <md-icon>timeline</md-icon>
            </div>
            <h4 class="title">
              Coloured Line Chart
              <small> - Rounded</small>
            </h4>
          </template>
        </chart-card>
      </div>
      <!--  -->
      <!--  -->

      <!--   -->
<div class="md-layout-item md-size-50 md-small-size-100">
        <chart-card
          header-animation="false"
          :chart-data="pieChart.data"
          :chart-options="pieChart.options"
          chart-type="Pie"
          header-icon
          chart-inside-content
          background-color="green"
        >
          <template slot="chartInsideHeader">
            <div class="card-icon">
              <md-icon>pie_chart</md-icon>
            </div>
            <h4 class="title">
              Pie Chart
            </h4>
          </template>


          
          <template slot="footer">
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <h6 class="category">Legend</h6>
              </div>
              <div class="md-layout-item">
                <i class="fa fa-circle text-info"></i> User Balance
                <i class="fa fa-circle text-warning"></i> Total
                <i class="fa fa-circle text-danger"></i> Withdrawl
              </div>
            </div>
          </template>
        </chart-card>
      </div>



<div class="md-layout-item md-size-100 md-small-size-100">
        

<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Recent Transactions</h4>
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
              <md-table-cell md-label="Name" md-sort-by="name">
               {{ transactName[item.to].firstName}}    {{ transactName[item.to].lastName}} 
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



      </div>




      <!--  -->

      

    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product1" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">Cozy 5 Stars Apartment</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main night life in
          Barcelona.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>$899/night</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Barcelona, Spain
            </p>
          </div>
        </template>
      </product-card>
    </div> -->
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product2" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">Office Studio</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Metro Station and bus stop just 2 min by walk
          and near to "Naviglio" where you can enjoy the night life in London,
          UK.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>$1.119/night</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              London, UK
            </p>
          </div>
        </template>
      </product-card>
    </div> -->
    <!-- <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
    >
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="product3" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">Beautiful Castle</a>
        </h4>
        <div slot="description" class="card-description">
          The place is close to Metro Station and bus stop just 2 min by walk
          and near to "Naviglio" where you can enjoy the main night life in
          Milan.
        </div>
        <template slot="footer">
          <div class="price">
            <h4>$459/night</h4>
          </div>
          <div class="stats">
            <p class="category">
              <md-icon>place</md-icon>
              Milan, Italy
            </p>
          </div>
        </template>
      </product-card>
    </div> -->
  </div>
</template>

<script>

import { Pagination } from "@/components";
// import users from "./users";
import Fuse from "fuse.js";
import swal from "sweetalert2";
import axios from 'axios';
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";

// import { constants } from 'http2';
export default {
  components: {
    StatsCard,
    ChartCard,
    AnimatedNumber,
    ProductCard,
    GlobalSalesCard,
    GlobalSalesTable,
    AsyncWorldMap,
    Pagination
  },

created () {
            const token = window.localStorage.getItem('token');        
            let user = JSON.parse(localStorage.getItem('user'));
            var app=this;
                axios.get("http://localhost:3201/api/user",{headers:{'x-access-token': token}})
                    .then(res => {
                        app.add = res.data.data.address
                        console.log('user',res.data.data.address)
                        app.userArray();
            })



            const {
                    dispatch
                } = this.$store;
                dispatch('user/balance')
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
    },

      balance() {



                return this.$store.state.user.balance
            }
  },


  data() {
    return {

     
      product1: "./img/card-2.jpg",
      product2: "./img/card-3.jpg",
      product3: "./img/card-1.jpg",
      seq2: 0,
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
       colouredBarsChart: {
        data: {
          labels: [
            "'06",
            "'07",
            "'08",
            "'09",
            "'10",
            "'11",
            "'12",
            "'13",
            "'14",
            "'15"
          ],
          series: [
            [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
            [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647],
            [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509]
          ]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 10
          }),
          axisY: {
            showGrid: true,
            offset: 40
          },
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          showPoint: true,
          height: "300px"
        }
      },
      pieChart: {
        data: {
          labels: [ "1200","1000","6783"],


          series: [1200,1000,6783]

          
        },
        options: {
          height: "230px"
        }
      },
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
      fuseSearch: null,



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
                     console.log( 'hdgw',res.data.data.address)
                     self.transactName = res.data.data         
                     console.log(self.transactName ,"gydut")           
                     axios.get("http://localhost:3201/api/recentTrans",{headers:{'x-access-token': token}})
                        .then(res => {


                            console.log('TRANS',res)
                             self.tableData = res.data.data

                
                            
//                                this.pieChart.data.labels[2]=this.res.data.data
// this.pieChart.data.series[2]=this.res.data.data 


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
//   created () {
//             const {
//                     dispatch
//                 } = this.$store;
//                 dispatch('user/balance')
//     },
    // computed: {
    //    balance() {
    //             return this.$store.state.user.balance
    //         }
    // }
};
</script>

<style scoped>
.category {
  margin: 0;
}
.md-card-actions .md-layout-item {
  padding: 0;
}
.md-layout-item.md-size-50 {
    min-width: 50%;
    max-width: 50%;
    flex: 0 1 50%;
}
.md-card .md-card-actions{
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
