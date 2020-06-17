<template>
   <div id="app" style="-webkit-app-region: drag" class="font-sans flex min-h-screen" v-if="!apikeySuccess && !isChecking">
    <div class="bg-black flex-1 px-5 h-screen text-white pt-5">
        <div class="container mx-auto h-full flex justify-center items-center">
            <div class="w-1/3">
                <h1 class="font-hairline mb-6 text-center"><img src="@/assets/logo-ipcs.png" alt="image" class="w-3/5"></h1>
                <h4 class="font-Oxygen mb-6 text-center text-white">Welcome To iPhoneChecks Services</h4>
                <div class="border-teal p-8 border-t-12 bg-dark mb-6 rounded-lg shadow-lg">
                    <div class="mb-4">
                        <label class="font-bold text-white block mb-2">Enter Your ApiKey</label>
                        <input type="text" class="block appearance-none w-full bg-grey-dark border border-grey-dark hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Apikey" v-model="apikey">
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-green-dark hover:bg-teal text-white font-bold py-2 px-4 rounded" @click="storeData">
                            Next
                        </button>
                    </div>                
                </div>
                <div class="mt-5 text-xs text-center w-full">App Version: 1.0.0 - Beta</div>
            </div>
        </div>
    </div>
  </div>
  <div id="app" style="-webkit-app-region: drag" class="font-sans flex min-h-screen" v-else-if="!apikeySuccess && isChecking">
    <div class="bg-black flex-1 px-5 h-screen text-white pt-5">
        <div class="container mx-auto h-full flex justify-center items-center">
            <div class="w-1/3">
                <h4 class="font-Oxygen mb-6 text-center text-white text-xs">Connnecting to server...</h4>
            </div>
        </div>
    </div>
  </div>
  <div id="app" style="-webkit-app-region: drag" class="font-sans flex min-h-screen"  v-else >
    <sidebar></sidebar>
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
  
 
</template>

<script>
const storage = require('electron-json-storage');
import Sidebar from '@/components/Sidebar.vue'
//import ApiService from '@/utils/services/api-service';
import 'animate.css/animate.css'
export default {
  components: {
    Sidebar,
  },
  data:function(){
    return {
      isChecking:true,
      apikeySuccess:false,
      apikey:''
    }
  },
      methods:{
         storeData(){
           var ve = this;
            if(this.apikey == ''){
                //alert();
                this.$swal('Please enter ApiKey');
            }else{
                storage.set('apikey',this.apikey,(err) => {
                    if (err){
                        this.$swal('Please enter ApiKey');
                    }else{
                        ve.isChecking = false;
                        ve.apikeySuccess = true;
                    }
                })
            }
        },
        fetchData(){
         
        },
    },
    mounted(){
        var ve = this;
        storage.get('apikey', (err, data) => {
          var lngth = Object.keys(data).length
          if(lngth > 0){
            ve.apikey = data;
            ve.apikeySuccess = true;     
            }
        })
        storage.get('locale', (err, data) => {
            ve.selectedlocale = data;    
            ve.$locale = data;
        })
        ve.isChecking = false;
        console.log(ve.isChecking)
        console.log(ve.apikey)
        console.log(ve.apikeySuccess)
    }
}
</script>
<style src="@/assets/main.css"></style>
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
</style>