<template>
    <div class="bg-black flex-1 px-5 h-screen text-white pt-5">
        <div class="mb-4">
            <h3 class="font-Oxygen text-2xl">{{pageTitle}}</h3>
        </div>
        <div class="container mx-auto flex justify-center items-center">
                    <a href="#" @click="openWin"><span>PayPal</span></a>
                    <vue-friendly-iframe :src="url" :target="target"  @load="onLoad"></vue-friendly-iframe>
        </div>
        
    </div>
</template>
<script>
//import ApiService from '@/utils/services/api-service';

export default {
    data:function(){
       return {
      url:'https://unlockingiphone.co.uk/desktopappapi/chk.html',
      //url:'https://hyphun.com',
      pageTitle:'Add Funds',
      allow:'allowfullscreen',
      target:'_blank'
    }
  },
  components: {
   
  },
  methods:{
      openWin(){
          window.open('https://unlockingiphone.co.uk/desktopappapi/chk.html', '_blank', 'nodeIntegration=yes&javascript=yes&contextIsolation=false')
          //require('electron').shell.openExternal('http://google.com');
      },
      onLoad(){
        console.log('loaded');
      }
  },
  
}
</script>