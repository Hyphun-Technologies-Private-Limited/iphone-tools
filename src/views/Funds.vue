<template>
  <div class="bg-black ml-56 flex-1 text-dark-white pt-10 px-10">
    <div class="mb-4">
      <h3 class="font-Oxygen text-2xl">{{$t('pages.funds.title')}}</h3>
    </div>

    <div class="flex font-Oxygen">
    <div class="flex  mt-2 mb-4 font-Oxygen">
      <div class="inline-block mr-4 p-3 cursor-pointer" v-bind:value="item.id" :id="item.id" v-for="(item, index) in orderStatusTypes" :key="index" v-bind:class="{'border-b':(item.value === selectedOrderStatus)}" @click="changeOrderType(item.value)">{{item.label}}
      </div>
    </div>
    <div class="flex1 ml-auto cursor-pointer right-align">
        <span class="button-small text-dark-white rounded bg-teal text-white p-3" @click="show">{{$t('pages.funds.addbutton')}}</span>
    </div>
    </div>
    
    <div id="orderslist" v-if="ordersFeed.length > 0">
      <div class="flex bg-dark text-dark-white rounded-sm font-Oxygen p-3 border-b border-black">
        <div class="w-1/1">{{$t('pages.funds.request.txnid')}}</div>
        <div class="w-1/2">{{$t('pages.funds.request.perticular')}}</div>
        <div class="w-1/1  text-center">{{$t('pages.funds.request.tax')}}</div>
        <div class="w-1/1  text-center">{{$t('pages.funds.request.total')}}</div>
        <div class="w-1/1  text-center">{{$t('pages.funds.request.status')}}</div>
        <div class="w-1/1  text-center">{{$t('pages.funds.request.date')}}</div>
      </div>
      <div v-if="ordersFeed.length > 0">
        <div class="flex bg-dark text-dark-white rounded-sm font-Oxygen p-4 mb-1"  v-bind:value="item.id" :id="item.id" v-for="(item, index) in ordersFeed" :key="index">
          <div class="w-1/1">{{item.id}}</div>
          <div class="w-1/2 text-sm mb-3">
            <div class="mb-6 text-dark-white" >{{item.type}}</div>
            <div class="text-dark-white"><span class="bg-black rounded p-3">Amount: {{item.amount}}</span></div>
          </div>
          <div class="w-1/1 text-sm text-dark-white text-center">{{item.tax}}</div>
          <div class="w-1/1 text-sm text-dark-white text-center">{{item.total}}</div>
          <div class="w-1/1 text-sm text-left">
            <div class="bg-soft-success rounded p-2 text-dark-white text-center" v-if="item.status == 'Paid'"><span class="text-success-text">{{item.status}}</span></div>

            <div class="bg-soft-danger rounded p-2 text-dark-white text-center" v-else-if="item.status =='Failed'"><span class="text-danger-text">{{item.status}}</span></div>

            <div class="bg-soft-danger rounded p-2 text-dark-white text-center" v-else><span class="text-info-text">{{item.status}}</span></div>
            
          </div>
          <div class="w-1/1 mb-4 mt-2 ml-4 text-sm text-dark-white">{{item.date}}</div>
        </div>
        <!-- <pagination :data="ordersItem" @pagination-change-page="fetchData"></pagination> -->
      </div>
    </div>
    <div v-else>
          <div class="text-dark-white text-center mt-24" v-if="isLoading">{{$t('messages.fetching')}}</div>
          <div class="text-dark-white text-center mt-24" v-else>{{$t('messages.error.norecords')}}</div>
    </div>
    <modal name="import-popup" >
            <div class="p-4">
               <h5 class="text-dark text-center mt-24">{{$t('pages.funds.errors.featurenotavailable')}}</h5>
                <div class="right-align mt-4 text-center mt-10">
                    <span @click="openWin()"  class="button-small text-dark-white rounded bg-info-text text-white p-3">{{$t('general.continuebutton')}}</span>
                    <span @click="hide()" class="button-small text-dark-white rounded bg-red text-white p-3">{{$t('general.cancelbutton')}}</span>
                </div>
            </div>
    </modal>
  </div>
</template>
<script>
import ApiService from '@/utils/services/api-service';
const storage = require('electron-json-storage');
//  import pagination from 'laravel-vue-pagination';
export default {
  components:{
      //'pagination':pagination
  },
  data:function(){
       return {
        isApiKeyExists:false,
        apikey:'',
        isMounted:false,
        isLoading:false,
        ordersFeed:[],
        ordersItem:{},
        loading:false,
        orderStatusTypes:[
          {'label':this.$t('pages.funds.paidtab'),'value':0},
          {'label':this.$t('pages.funds.failedtab'),'value':18},
        ],
        selectedOrderStatus:0,
        perPage:5,
        totalPages:1,
      }
    },
    methods:{
      changeOrderType(type){
        this.selectedOrderStatus = type;
        this.fetchData();
      },
      fetchData(page = 0){
        if(this.isApiKeyExists){
        var ve = this;
        ve.isLoading = true;
         if(ve.apikey == ''){
                storage.get('apikey', (err, data) => {
                    ve.apikey = data;         
                })
            }
        ApiService.fetchTopups(this.perPage,page,this.selectedOrderStatus,this.apikey).then(
                response => {
                    ve.loading = false;
                    if (!response.data.error) {
                        var tempfeed = [];
                        response.data.response.data.map(function(idx){
                        var feeddata = 
                        {
                            id: idx.transaction_code,
                            type: idx.type,
                            amount: idx.amount,
                            tax: idx.tax,
                            total: idx.total,
                            status: idx.status,
                            date: idx.date,
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
                    //ve.$router.push({ path: '/user/logout' })
                }
            );
        }else{
          if(this.isMounted){
             this.$swal(this.$t('messages.error.apikeyerror'));
          }
        }
      },
      show () {
            this.$modal.show('import-popup');
      },
      hide () {
            this.$modal.hide('import-popup');
      },
      openWin(){
        require('electron').shell.openExternal('http://iphonetools.io');
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
    }
}
</script>
