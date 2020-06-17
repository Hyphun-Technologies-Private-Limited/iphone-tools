<template>
  <div class="bg-black ml-56 flex-1 text-dark-white pt-10 px-10">
    <div class="mb-4">
      <h3 class="font-Oxygen text-2xl">{{$t('pages.orderhistory.title')}}</h3>
    </div>

    <div class="flex font-Oxygen">
    <div class="flex  mt-2 mb-4 font-Oxygen">
      <div class="inline-block mr-4 p-3 cursor-pointer" v-bind:value="item.id" :id="item.id" v-for="(item, index) in orderStatusTypes" :key="index" v-bind:class="{'border-b':(item.value === selectedOrderStatus)}" @click="changeOrderType(item.value)">{{item.label}}
      </div>
    </div>
    
    </div>
    
    <div id="orderslist" class="h-550px overflow-y-auto"  v-if="ordersFeed.length > 0">
      <div class="flex bg-dark text-dark-white rounded-sm font-Oxygen p-3 border-b border-black">
        <div class="w-1/1-2">{{$t('pages.orderhistory.order.orderid')}}</div>
        <div class="w-1/2">{{$t('pages.orderhistory.order.servicetitle')}}</div>
        <div class="w-1/1-2  text-center">{{$t('pages.orderhistory.order.amount')}}</div>
        <div class="w-1/1-2  text-center">{{$t('pages.orderhistory.order.status')}}</div>
        <div class="w-1/1-2  text-center">{{$t('pages.orderhistory.order.date')}}</div>
      </div>
      <div v-if="ordersFeed.length > 0">
        <div class="flex bg-dark text-dark-white rounded-sm font-Oxygen p-4 mb-1"  v-bind:value="item.id" :id="item.id" v-for="(item, index) in ordersFeed" :key="index">
          <div class="w-1/1-2">{{item.id}}</div>
          <div class="w-1/2 text-sm mb-3">
            <div class="mb-6 text-dark-white" >{{item.service}}</div>
            <div class="text-dark-white" @click="show(item.response)">
              <span class="bg-black rounded p-3">IMEI / SN: {{item.imei}}</span>
            </div>
            
          </div>
          <div class="w-1/1-2 text-sm text-dark-white  text-center">{{item.amount}}</div>
          <div class="w-1/1-2 p-2 text-sm text-left">
            <div class="bg-soft-success rounded p-2 text-dark-white text-center" v-if="item.status == 'Completed'"><span class="text-success-text">{{item.status}}</span></div>

            <div class="bg-soft-danger rounded p-2 text-dark-white text-center" v-else-if="item.status =='Rejected'"><span class="text-danger-text">{{item.status}}</span></div>

            <div class="bg-soft-danger rounded p-2 text-dark-white text-center" v-else><span class="text-info-text">{{item.status}}</span></div>
            
          </div>
          <div class="w-1/1-2 mb-4 mt-2 ml-4 text-sm text-dark-white">{{item.added_on}}</div>
        </div>
        <!-- <pagination :data="ordersItem" :size="small" @pagination-change-page="fetchData"></pagination> -->
      </div>
    </div>
    <div v-else>
          <div class="text-dark-white text-center mt-24" v-if="isLoading">{{$t('messages.fetching')}}</div>
          <div class="text-dark-white text-center mt-24" v-else>{{$t('messages.error.norecords')}}</div>
    </div>
    <modal name="topup-popup">
            <div class="p-4">
                <div class="h-200px overflow-y-auto text-dark" v-html="orderresult"></div>
                <div class="right-align mt-4">
                    <span @click="hide()" class="button-small text-dark-white rounded bg-red text-white p-3">Hide</span>
                </div>
            </div>
        </modal>
  </div>
</template>
<script>
import ApiService from '@/utils/services/api-service';
const storage = require('electron-json-storage');
//import pagination from 'laravel-vue-pagination';
export default {
  components:{
      //'pagination':pagination
  },
  data:function(){
       return {
        isLoading:false,
        ordersFeed:[],
        ordersItem:{},
        loading:false,
        orderresult:'',
        orderStatusTypes:[
          {'label':this.$t('pages.orderhistory.completedtab'),'value':13},
          {'label':this.$t('pages.orderhistory.rejectedtab'),'value':14},
        ],
        selectedOrderStatus:13,
        perPage:5,
        totalPages:1,
        apikey: ''
      }
    },
    methods:{
      changeOrderType(type){
        this.selectedOrderStatus = type;
        this.fetchData();
      },
      show (response){
          //this.orderresult = response;
          var str = '';
          var fk = Object.keys(response);
             for (var x of fk) {
                  if(response[x] != ''){
                      str = str+'<div class="mt-1">'+x+': <strong>'+ response[x]+'</strong></div>';
                  }
            }
          this.orderresult = str;
          this.$modal.show('topup-popup');
      },
      hide (){
          this.$modal.hide('topup-popup');
          this.orderresult = '';
      },
      fetchData(page = 0){
        var ve = this;
        ve.isLoading = true;
        if(ve.apikey == ''){
          storage.get('apikey', (err, data) => {
            ve.apikey = data;         
          })
        }
        ApiService.fetchOrders(this.perPage,page,this.selectedOrderStatus,this.apikey).then(
                response => {
                    if (!response.data.error) {
                        var tempfeed = [];
                        response.data.response.data.map(function(idx){
                        var feeddata = 
                        {
                            id: idx.request_id,
                            imei: idx.imei_sn,
                            service: idx.service,
                            service_id: idx.service_id,
                            amount: idx.amount,
                            status: idx.status,
                            response: idx.response,
                            added_on: idx.added_on,
                            updated_on: idx.updated_on,
                        }
                        tempfeed.push(feeddata) 
                        });
                        ve.ordersFeed = [];
                        ve.ordersFeed = tempfeed;
                        ve.ordersItem = response.data.response;
                        ve.isLoading = false;

                    } else {
                      console.log(response.data.error);
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
      },
      checkApiKey(){
        storage.get('apikey', (err, data) => {
           if(data == ''){
             this.$swal(this.$t('messages.error.apikeyerror'));
           }else{
             this.apikey = data; 
              this.isApiKeyExists = true; 
              this.fetchData();
              this.isMounted = true;
           }
        })
      }
    },
    mounted(){
      this.checkApiKey();
      //this.fetchData();
    }
}
</script>

