<template>
    <div class="bg-black ml-56 flex-1 text-dark-white pt-10 px-10">
        <div class="mb-4">
            <h3 class="font-Oxygen text-2xl">{{pageTitle}}</h3>
        </div>
        <div class="flex font-Oxygen w-full container mx-auto mt-32 justify-center items-center">
            <div class="w-full">
                <div class="border-teal p-8 border-t-12 bg-dark mb-6 rounded-lg shadow-lg">
                    <div class="mb-4">
                        <label class="font-bold text-white block mb-2">Your Api Key</label>
                        <input type="text" v-model="apikey" class="block appearance-none w-full bg-grey-dark border border-grey-dark hover:border-grey px-2 py-2 rounded shadow" placeholder="Your ApiKey">
                    </div>
                    <div class="flex items-center justify-between">
                        <button @click="updateSettings" class="bg-red-dark hover:bg-teal text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    </div>                
                </div>
            </div>
        </div>

        <div class="flex font-Oxygen w-full container mx-auto mt-10 justify-center items-center">
            <div class="w-full">
                <div class="border-teal p-8 border-t-12 bg-dark mb-6 rounded-lg shadow-lg">
                    <div class="mb-4">
                        <label class="font-bold text-white block mb-2">Select Language</label>
                        <select class="form-control block appearance-none w-full bg-grey-dark border border-grey-dark hover:border-grey px-2 py-2 rounded shadow" v-on:change="selectLanguage"  v-model="selectedlocale">
                                <option v-for="(item,index) in languagearray" :value="item.value" :key="index">
                                {{ item.label }}
                                </option>
                            </select>
                    </div>
                                  
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>
const storage = require('electron-json-storage');
export default {
    data:function(){
       return {
        apikey:'',
        pageTitle:'Settings',
        selectedlocale:'cns',
        languagearray:[
          {'label':'English','value':'en'},
          {'label':'Chinese Simplified','value':'cns'},
          {'label':'Chinese Traditional','value':'cnt'},
        ],
      }
    },
    methods:{
         storeData(sdata){
            if(sdata == ''){
                //alert();
                this.$swal('Please enter ApiKey');
            }else{
                storage.set('apikey',sdata,(err) => {
                    if (err){
                        this.$swal('Please enter ApiKey');
                    }else{
                        this.$swal('Updated Successfully');
                    }
                })
            }
        },
        LogoutData(){
            storage.clear(function(error) {
            if (error) throw error;
            });
        },
        updateSettings(){
            //alert(this.apikey);
            this.storeData(this.apikey);
        },
        selectLanguage(){
            var ve = this;
            storage.set('locale',ve.selectedlocale,() => {
                ve.$locale = ve.selectedlocale; 
                ve.$i18n.locale = ve.$locale;
            });
        }
    },
    mounted(){
        var ve = this;
        storage.get('apikey', (err, data) => {
            var lngth = Object.keys(data).length
            if(lngth > 0){
            ve.apikey = data;
            }else{
                ve.apikey = '';         
            }
        })
        storage.get('locale', (err, data) => {
            //console.log(data);
            ve.selectedlocale = data;    
            ve.$locale = data;      
        })
    }
}
</script>