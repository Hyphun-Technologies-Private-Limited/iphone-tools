<template>
    <div class="bg-black ml-56 flex-1 text-dark-white pt-10 px-10">
        <div class="mb-4">
            <h3 class="font-Oxygen text-2xl">{{$t('pages.neworder.title')}}</h3>
        </div>
        <div class="flex font-Oxygen w-full">
            <div class="w-2/3 border-r border-black-light">
                <h4 class="mb-3 pl-2">{{$t('pages.neworder.selectservice')}}</h4>
                    <div class="h-200px  overflow-y-auto">
                        <div class="mb-3 pl-2"  v-bind:value="item.id" :id="item.id" v-for="(item, index) in servicesFeed" :key="index">
                            <input type="radio" :checked="index == 0" class="radio-button" :value="item.id" :name="item.name" @click="selectService(index,item.id)" v-model="selectedService"> &nbsp;&nbsp;{{item.name}} &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="text-red">{{item.currency_code}}{{item.amount}}</span>
                        </div>
                    </div>
            </div>
            <div class="w-1/3 ml-4">
                <div class="">
                    <h4 class="mb-3 pl-2">{{$t('pages.neworder.selectcategory')}}</h4>
                    <div class="flex font-Oxygen  ml-5 w-full text-center">
                        <span class="w-full  mr-4 text-dark rounded p-3">
                            <select class="form-control" v-on:change="selectCategory" v-model="selectedCategory">
                                <option v-for="(item,index) in categoriesFeed" :value="item.id" :key="index">
                                {{ item.name }}
                                </option>
                            </select>
                        </span>
                    </div>
                    <div class="flex font-Oxygen  ml-5  mb-5 w-full text-center">
                        <button :disabled='loading' @click="submitOrder()" class="w-1/2 mr-4 button-small text-dark rounded bg-white p-3">{{$t('pages.neworder.submitbutton')}}</button>
                        <span class="w-1/2  mr-4  button-small text-dark rounded bg-white p-3 cursor-pointer" @click="show">{{$t('pages.neworder.importbutton')}}</span>
                    </div>
                    <div class="flex font-Oxygen ml-5 w-full text-center">
                        <span @click="reset()" class="w-1/2 mr-4 button-small text-dark rounded bg-white p-3 cursor-pointer">{{$t('pages.neworder.cancelbutton')}}</span>
                        <download-csv class="w-1/2  mr-4  button-small text-dark rounded bg-white p-3" 
                            :data   = "orderresults">
                            <span class="cursor-pointer">{{$t('pages.neworder.exportbutton')}}</span>
                        </download-csv>
                    </div>

                    <div class="w-full mt-4">
                        <div class="mt-4">
                            <div class="flex font-Oxygen text-center" v-if="totalimported == 0">
                                {{$t('pages.neworder.imeiimported')}} &nbsp;<strong>{{totalimported}}</strong>/<strong>2500</strong>
                            </div>
                            <div class="flex font-Oxygen w-full text-center text-green" v-else>
                                {{$t('pages.neworder.imeiimported')}} &nbsp;<strong>{{totalimported}}</strong>/<strong>2500</strong>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="flex font-Oxygen text-center" v-if="orderstatus == 0">
                                {{$t('pages.neworder.orderstatus')}} &nbsp;<strong>{{$t('pages.neworder.submitread')}}</strong>
                            </div>
                            <div class="flex font-Oxygen text-center text-yellow" v-else-if="orderstatus == 1">
                                {{$t('pages.neworder.orderstatus')}} &nbsp;<strong>{{$t('pages.neworder.processing')}}</strong> &nbsp;&nbsp;<span class="loader"></span>
                            </div>
                            <div class="flex font-Oxygen text-center text-green" v-else-if="orderstatus == 2">
                                {{$t('pages.neworder.orderstatus')}} &nbsp;<strong>{{$t('pages.neworder.completed')}}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-950px min-h-200 max-w-full mt-10 h-400px overflow-y-auto overflow-x-auto">
            <perfect-scrollbar>
                <grid :data="gridData" :columns="settings.colHeaders" class="max-w-full"></grid>
            </perfect-scrollbar>
        </div>
        <modal name="topup-popup" @before-open="beforeOpen" >
            <div class="p-4">
                <textarea class="w-full h-200px border" v-model="importedImei" :placeholder="placeholder" ></textarea>
                <div class="right-align mt-4">
                    <span @click="importImei()"  class="button-small text-dark-white rounded bg-info-text text-white p-3">Import</span>
                    <span @click="hide()" class="button-small text-dark-white rounded bg-red text-white p-3">Cancel</span>
                </div>
            </div>
        </modal>
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage"></loading>
    </div>
</template>
<script>
const storage = require('electron-json-storage');
import ApiService from '@/utils/services/api-service';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Grid from '@/components/GridView';
export default {
    data:function(){
       return {
        apikey:'',
        isMounted:false,
        isApiKeyExists:false,
        orderProcessing:false,
        socketToken:'',
        placeholder:this.$t('pages.neworder.imeiboxmessage'),
        submitBtnText:'Submit Order',
        isLoading:false,
        loading:false,
        fullPage: true,
        orderPlaced:true,
        isProcessing:false,
        categoriesFeed:[],
        servicesFeed:[],
        completedQueue:[],
        completedRawQueue:[],
        selectedCategory:1,
        selectedService:0,
        count:0,
        importedImei:'',
        orderResponseFeed:[],
        totalimported:0,
        orderstatus:0,
        imeiLoadedList:[],
        processingImeis:[],
        selectedthreds:1,
        tableheads:[],
        imeis:[],
        settings:{
          data: [[]],
          minCols: 4,
          colHeaders: [],
          rowHeaders: true,
          readOnly: true,
          stretchH: 'all',
          licenseKey: 'non-commercial-and-evaluation'
        },
        orderresults:[],
        gridData: [],
        gridExportData: [],
        gridColumns: [],
      }
    },
    components: {
      Loading,
      Grid
    },
    sockets: {
        connect() {
        },
        disconnect() {
            //this.isConnected = false;
        },
        orderstatus(data) {
            this.updateOrderGrid(data);    
        }
    },
    methods:{
        storeData(key,sdata){
            storage.set(key,sdata,(err) => {
                if (err)  alert(err);
            })
            this.socketToken = sdata;
        },
        fetchData(key){
            var ve = this;
            storage.get(key, (err, data) => {
                ve.socketToken = data;                
            })
        },
        show (){
            this.$modal.show('topup-popup');
        },
        hide (){
            this.$modal.hide('topup-popup');
        },
        beforeOpen(){
            //this.importedImei = '';
        },
        importImei(){
            if(this.isApiKeyExists){
                this.$socket.client.emit('fetchtoken');
                var imeis = this.importedImei.split('\n');
                if(imeis.length <= 2500){
                    this.settings.data = [];
                    this.imeiLoadedList = [];
                    for(var i = 0; i<imeis.length;i++){
                        if(imeis[i].toString() != ''){
                            this.settings.data.push([imeis[i].toString()]);
                            this.imeiLoadedList.push(imeis[i].toString());
                        }
                    }
                    this.totalimported = this.imeiLoadedList.length;
                    this.hide();
                }else{
                    this.hide();
                   this.$swal(this.$t('messages.error.maxlimit')); 
                }
            }else{
                this.$swal(this.$t('messages.error.apikeyerror'));
            }
        },
        selectCategory(){
           this.fetchServices();
        },
        selectService(selected,id){
            if(this.orderstatus != 0){
                this.reset();
            }
          var serviceItem = this.servicesFeed[selected];
          var masks = serviceItem.custom_heads.split('@@');
          var headws = [];
          var headwos = [];
          masks.map(function(gval){
               var temphead = gval.split('_');
                headws.push(temphead[0]);
                headwos.push(temphead[1]);
          });
          this.settings.colHeaders = headwos;
          this.tableheads = headws;
          this.selectedService = id;
        },
        fetchServices(){
            if(this.isApiKeyExists){
            var ve = this;
            ve.isLoading = true;
            if(ve.apikey == ''){
                storage.get('apikey', (err, data) => {
                    ve.apikey = data;         
                })
            }
            ApiService.fetchServices(ve.selectedCategory,ve.apikey).then(
                response => {
                    if (!response.data.error) {
                        var tempfeed = [];
                        response.data.response.map(function(idx){
                        var feeddata = 
                        {
                            id: idx.id,
                            category: idx.category,
                            name: idx.name,
                            code: idx.code,
                            service_id: idx.service_id,
                            amount: idx.amount,
                            currency: idx.currency,
                            currency_code: idx.currency_code,
                            instant: idx.instant,
                            type: idx.type,
                            custom_heads: idx.custom_data,
                            user_access: idx.user_access,
                        }
                        tempfeed.push(feeddata) 
                        });
                        ve.servicesFeed = [];
                        ve.servicesFeed = tempfeed;
                        ve.isLoading = false;
                    } else {
                      //console.log(response.data.error);
                    }
                }//,
                // (err) => {
                //     //console.log(err);
                //     //ve.$router.push({ path: '/user/logout' })
                // }
            );
            }else{
                if(this.isMounted){
                    this.$swal(this.$t('messages.error.apikeyerror'));
                }
            }
        },
        fetchCatrgories(){
            var ve = this;
            ve.isLoading = true;
            ApiService.fetchCategories().then(
                response => {
                    if (!response.data.error) {
                        var tempfeed = [];
                        response.data.response.map(function(idx){
                        var feeddata = 
                        {
                            id: idx.id,
                            name: idx.name,
                        }
                        tempfeed.push(feeddata) 
                        });
                        ve.categoriesFeed = [];
                        ve.categoriesFeed = tempfeed;
                        ve.isLoading = false;
                    } else {
                      //console.log(response.data.error);
                    }
                }
                //,
                // (err) => {
                //     //console.log(err);
                //     //ve.$router.push({ path: '/user/logout' })
                // }
            );
        },
        submitOrder(){
            if(this.isApiKeyExists){
                var ve = this;
                if(this.orderstatus != 1){
                    if(this.selectedService == 0 || this.selectedService == ''){
                        alert(ve.$t('messages.error.serviceerror'));
                        return false;
                    }
                    if(this.imeiLoadedList.length == 0){
                        alert(ve.$t('messages.error.imeierror'));
                        return false;
                    }
                     if(ve.apikey == ''){
                        storage.get('apikey', (err, data) => {
                            ve.apikey = data;         
                        })
                    }

                    if(ve.apikey == ''){
                        alert(ve.$t('messages.error.apikeyerror'));
                        return false;
                    }
                    
                    //ve.loading = true;
                    //ve.isLoading = true;
                    this.orderstatus = 1;
                    ve.submitBtnText = 'Processing...';
                        ApiService.placeOrder(ve.imeiLoadedList,this.selectedService,this.socketToken,this.apikey).then(
                            response => {
                                if (response) {
                                    //console.log(response);
                                    //response
                                }
                            },
                            (err) => {
                                alert(err);
                            }
                        );
                }else{
                    this.$swal(this.$t('messages.error.orderprocessing')); 
                }
            }else{
                this.$swal(this.$t('messages.error.apikeyerror'));
            }
        },
        redrawTable() {
            if(this.completedQueue.length == this.imeiLoadedList.length){
                this.loading = false;
                this.isLoading = false;
                this.submitBtnText = 'Submit Order';
                this.orderresults = this.filter_array(this.gridExportData);
                //this.orderresults = this.filter_array(this.gridData);
                //console.log(this.orderresults);
                //this.gridData = this.completedRawQueue;
                this.loading = false;
                this.orderstatus = 2;
                this.imeiLoadedList = [];
                this.importedImei = '';
                this.gridExportData = [];
            }
        },
        updateOrderGrid(data){
            //alert(JSON.stringify(data));
                if(data.eventType == 100){
                    this.storeData('socket_token',data.socketid);
                }else if(data.eventtype == 200){
                    var responseData = data.data;
                    var ve = this;
                    //var colvals = [];
                    var imei = responseData[0]['imei'];
                    this.completedQueue.push(imei);
                    this.completedRawQueue.push(responseData[0]['result']);
                    //console.log(responseData[0]);
                    responseData[0]['result']["#"] = this.gridData.length+1;
                    ve.gridData.push(responseData[0]['result']);

                    var temp = [];
                    var fk = Object.keys(responseData[0]['result']);
                    for (var x of fk) {
                        if(responseData[0]['result'][x]  != ''){
                            temp.push(responseData[0]['result'][x]);
                        }else{
                            temp.push('-');
                        }   
                    }
                    //console.log(temp);
                    ve.gridExportData.push(temp);


                    // if(responseData[0]['status'] == 'success'){
                    //     responseData[0]['result']["#"] = this.gridData.length+1;
                    //     ve.gridData.push(responseData[0]['result']);
                    //     //ve.gridExportData.push(responseData[0]['result']);
                    // }else{

                    //     //console.log(this.settings.colHeaders);
                       
                        
                    //     console.log(temp)

                    //     ve.gridData.push(temp);

                    //     // var tmp1 = {"#":this.gridExportData.length+1,ky1:responseData[0]['imei'],ky2:responseData[0]['result']['MESSAGE']};
                    //     // ve.gridExportData.push(tmp1);
                    // }
                    this.redrawTable();
                }
        },
        checkApiKey(){
            storage.get('apikey', (err, data) => {
            if(data == ''){
                this.$swal(this.$t('messages.error.apikeyerror'));
            }else{
                this.apikey = data; 
                this.isApiKeyExists = true; 
                this.fetchServices();
                this.isMounted = true;
            }
            })
        },
        filter_array(test_array) {
            var filteredArray = []
            filteredArray.push(this.tableheads);
            test_array.map(function(val){
                var temp = [];
                var keyobj = val;
                var fk = Object.keys(keyobj);
                //var i = 1;
                for (var x of fk) {
                    if(val[x] != ''){
                        if(Number.isInteger(val[x])){
                            temp = [val[x]].concat(temp);
                        }else{
                            var text = val[x];
                            temp.push(text);
                        }
                    }
                }
                if(temp.length > 0){
                    filteredArray.push(temp);
                }
            }); 
            return filteredArray;
        },
        reset(){
            var ve = this;
            this.$swal({
            title: ve.$t('messages.confirm.title'),
            text: ve.$t('messages.confirm.message'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ve.$t('messages.confirm.agree'),
            cancelButtonText: ve.$t('messages.confirm.deny')
            }).then((result) => {
            if (result.value) {
                ve.selectedService = '';
                ve.settings.data = [[]];
                ve.gridData = [];
                ve.gridExportData = [];
                ve.completedQueue = [];
                ve.imeiLoadedList = [];
                ve.importedImei = '';
                ve.settings.colHeaders = [];
                ve.tableheads = [];
                ve.orderstatus = 0;
                ve.totalimported = 0;
            }
            });
        }
    },
    mounted(){
        this.fetchCatrgories();
        this.checkApiKey();
        this.$socket.client.emit('fetchtoken');
    }
}
</script>
<style>
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ps {
    height: 400px;
    max-width: 950px;
}
</style>
