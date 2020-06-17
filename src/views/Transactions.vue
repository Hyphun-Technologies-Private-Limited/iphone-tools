<template>
  <div class="bg-black ml-56 flex-1 text-dark-white pt-10 px-10">
    <div class="mb-4">
      <h3 class="font-Oxygen text-2xl">{{$t('pages.transactions.title')}}</h3>
    </div>

    <div class="mt-4 mb-4 font-Oxygen">
      <div class="inline-block mr-4 p-3 cursor-pointer" v-bind:value="item.id" :id="item.id" v-for="(item, index) in orderStatusTypes" :key="index" v-bind:class="{'border-b':(item.value === selectedOrderStatus)}" @click="changeOrderType(item.value)">{{item.label}}</div>
    </div>
    
    <div id="orderslist" class="h-600px pb-10 overflow-y-auto" v-if="txnFeed.length > 0">
      <div class="flex bg-dark text-dark-white rounded-sm font-Oxygen p-3 border-b border-black">
        <div class="w-1/1-2">{{$t('pages.transactions.item.date')}}</div>
        <div class="w-1/2">{{$t('pages.transactions.item.message')}}</div>
        <div class="w-1/1-2">{{$t('pages.transactions.item.debit')}}</div>
        <div class="w-1/1-2">{{$t('pages.transactions.item.credit')}}</div>
        <div class="w-1/1-2  text-center">{{$t('pages.transactions.item.balancebefore')}}</div>
        <div class="w-1/1-2  text-center">{{$t('pages.transactions.item.balanceafter')}}</div>
      </div>
      <div v-if="txnFeed.length > 0">
        <div class="flex bg-dark text-dark-white rounded-sm font-Oxygen p-4 mb-1"  v-bind:value="item.id" :id="item.id" v-for="(item, index) in txnFeed" :key="index">
          <div class="w-1/1-2">{{item.date}}</div>
          <div class="w-1/2 text-sm mb-3">
            <div class="mb-6 text-dark-white" >{{item.message}}</div>
            <div class="text-dark-white"><span class="bg-black rounded p-3">{{item.status}}</span></div>
          </div>
          <div class="w-1/1-2 text-sm text-dark-white  text-center">{{item.debit}}</div>
          <div class="w-1/1-2 text-sm text-dark-white  text-center">{{item.credit}}</div>
          <div class="w-1/1-2 text-sm text-dark-white  text-center">{{item.before_balance}}</div>
          <div class="w-1/1-2 text-sm text-dark-white  text-center">{{item.after_balance}}</div>
        </div>
      </div>
    </div>
    <div v-else>
          <div class="text-dark-white text-center mt-24" v-if="isLoading">{{$t('messages.fetching')}}</div>
          <div class="text-dark-white text-center mt-24" v-else>{{$t('messages.error.norecords')}}</div>
    </div>
  </div>
</template>
<script>
import ApiService from '@/utils/services/api-service';
const storage = require('electron-json-storage');
export default {
  data:function(){
       return {
        isLoading:false,
        apikey:'',
        txnFeed:[],
        txnItem:{},
        loading:false,
        orderStatusTypes:[
          {'label':this.$t('pages.transactions.completedtab'),'value':0},
          {'label':this.$t('pages.transactions.adjustedtab'),'value':15},
        ],
        selectedOrderStatus:0,
        currentPage:0,
        perPage:5,
      }
    },
    methods:{
      changeOrderType(type){
        this.selectedOrderStatus = type;
        this.fetchData();
      },
      fetchData(page = 0){
        var ve = this;
         ve.isLoading = true;
         if(ve.apikey == ''){
                storage.get('apikey', (err, data) => {
                    ve.apikey = data;         
                })
            }
        ApiService.fetchTransactions(this.perPage,page,this.selectedOrderStatus,this.apikey).then(
                response => {
                    if (!response.data.error) {
                        ve.txnFeed = [];
                        response.data.response.data.map(function(idx){
                        var feeddata = 
                        {
                            date: idx.date,
                            message: idx.message,
                            status: idx.status,
                            before_balance: idx.before_balance,
                            debit: idx.debit,
                            credit: idx.credit,
                            after_balance: idx.after_balance,
                        }
                        ve.txnFeed.push(feeddata) 
                        });
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
