<template>
  <div class="bg-black ml-56 flex-1 text-dark-white pt-10 px-10">
    <div class="mb-4">
      <h3 class="font-Oxygen text-2xl">{{$t('pages.dashboard.title')}}</h3>
    </div>

  
    <div class="mt-10 mb-4">
      <span class="font-Oxygen font-semibold text-xl pb-2 border-b border-grey">{{$t('pages.dashboard.statstitle')}}</span>
    </div>


    <div class="flex mt-10 mb-4">
      
      <div class="flex1 w-1/3 bg-dark text-dark-white font-Oxygen rounded p-6 mr-4">
          <div class="flex items-center px-2 py-3 p-4">
            <span class="w-12 h-12 object-cover rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 512 512" width="32px" class=""><g><path d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm-20-392h40v177c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20zm-101.320312 158.042969-52.367188-16.820313 12.234375-38.082031 52.363281 16.816406zm12.230468 74-52.363281 16.816406-12.230469-38.082031 52.363282-16.820313zm22.394532-210.507813 32.164062 44.613282-32.449219 23.390624-32.164062-44.613281zm259.382812 119.6875-52.367188 16.820313-12.230468-38.085938 52.363281-16.816406zm-54.542969-96.296875-32.164062 44.613281-32.449219-23.390624 32.164062-44.613282zm-138.144531 252.074219h40v55h-40zm-66.980469-34.539062 32.449219 23.390624-32.164062 44.613282-32.449219-23.390625zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g> </svg>
            </span>
            <div class="w-1/2 ml-auto text-right">
              <h2 class="text-xl font-semibold text-right mb-2">{{stats.inprogress_orders}}</h2>
              <p class="text-gray-600 text-sm">{{$t('pages.dashboard.ordersproccessing')}}</p>
            </div>
          </div>
          <div class="border-b-4 border-warning-text w-1/3"></div>
      </div>

      <div class="flex1 w-1/3 bg-dark text-dark-white font-Oxygen rounded p-6 mr-4">
          <div class="flex items-center px-2 py-3 p-4">
            <span class="w-12 h-12 object-cover rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" id="_x31_" enable-background="new 0 0 24 24" height="32px" viewBox="0 0 24 24" width="32px" class=""><g><g><path d="m17.5 24c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-12c-3.032 0-5.5 2.467-5.5 5.5s2.468 5.5 5.5 5.5 5.5-2.467 5.5-5.5-2.468-5.5-5.5-5.5z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g><g><path d="m13.265 22.235c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l8.471-8.47c.195-.195.512-.195.707 0s.195.512 0 .707l-8.471 8.47c-.097.097-.225.146-.353.146z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g><g><path d="m9.5 15h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g><g><path d="m8.5 18h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5s-.224.5-.5.5z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g><g><path d="m8.5 7c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3c-.552 0-1 .449-1 1s.448 1 1 1 1-.449 1-1-.448-1-1-1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g><g><path d="m12 12c-.276 0-.5-.224-.5-.5v-1c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-1.378 1.121-2.5 2.5-2.5h3c1.379 0 2.5 1.122 2.5 2.5v1c0 .276-.224.5-.5.5z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g><g><path d="m9.5 21h-7c-1.379 0-2.5-1.122-2.5-2.5v-16c0-1.378 1.121-2.5 2.5-2.5h12c1.379 0 2.5 1.122 2.5 2.5v6.06c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-6.06c0-.827-.673-1.5-1.5-1.5h-12c-.827 0-1.5.673-1.5 1.5v16c0 .827.673 1.5 1.5 1.5h7c.276 0 .5.224.5.5s-.224.5-.5.5z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g></g> </svg>
            </span>
            <div class="w-1/2 ml-auto text-right">
              <h2 class="text-xl font-semibold text-right mb-2">{{stats.rejected_orders}}</h2>
              <p class="text-gray-600 text-sm">{{$t('pages.dashboard.ordersrejected')}}</p>
            </div>
          </div>
          <div class="border-b-4 border-red w-1/3"></div>
      </div>

      <div class="flex1 w-1/3 bg-dark text-dark-white font-Oxygen rounded p-6 mr-4">
          <div class="flex items-center px-2 py-3 p-4">
            <span class="w-12 h-12 object-cover rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 512 512" width="32px" height="32px"><g><path d="M72,496H368a111.991,111.991,0,0,0,48-213.179V120a8,8,0,0,0-2.343-5.657l-96-96A8,8,0,0,0,312,16H72A40.045,40.045,0,0,0,32,56V456A40.045,40.045,0,0,0,72,496ZM464,384a96,96,0,1,1-96-96A96.108,96.108,0,0,1,464,384ZM320,43.313,388.687,112H344a24.027,24.027,0,0,1-24-24ZM48,56A24.028,24.028,0,0,1,72,32H304V88a40.045,40.045,0,0,0,40,40h56V276.666A111.983,111.983,0,0,0,310.369,480H72a24.028,24.028,0,0,1-24-24Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M160,168a8,8,0,0,0,8,8H360a8,8,0,0,0,0-16H168A8,8,0,0,0,160,168Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,224H248a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M280,256H216a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,320H232a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,176h48a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M360,208H280a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,272h96a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M216,400H184a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,416h64a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,368h48a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M88,128h96a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M216,352H168a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M325.657,402.343a8,8,0,0,0-11.314,11.314l32,32A8,8,0,0,0,352,448q.394,0,.789-.039a8,8,0,0,0,5.868-3.523l64-96a8,8,0,0,0-13.312-8.876l-58.587,87.881Z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g> </svg>
            </span>
            <div class="w-1/2 ml-auto text-right">
              <h2 class="text-xl font-semibold text-right mb-2">{{stats.completed_orders}}</h2>
              <p class="text-gray-600 text-sm">{{$t('pages.dashboard.orderscompleted')}}</p>
            </div>
          </div>
          <div class="border-b-4 border-green w-1/3"></div>
      </div>
      

    </div>

    <div class="mt-10 mb-4">
      <span class="font-Oxygen font-semibold text-xl pb-2 border-b border-grey">Account Stats</span>
    </div>


    <div class="flex mt-10 mb-4">
      
      <div class="flex1 w-1/3 bg-dark text-dark-white font-Oxygen rounded p-6 mr-4">
          <div class="flex items-center px-2 py-3 p-4">
            <span class="rounded-full">
              <svg class="mr-3" width="32px" height="32px" viewBox="0 0 469.341 469.341">
          <path d="M448.004,236.639v-65.965c0-22.368-17.35-40.559-39.271-42.323l-61.26-107c-5.677-9.896-14.844-16.969-25.813-19.906     c-10.917-2.917-22.333-1.385-32.104,4.302L79.553,128.007H42.67c-23.531,0-42.667,19.135-42.667,42.667v256     c0,23.531,19.135,42.667,42.667,42.667h362.667c23.531,0,42.667-19.135,42.667-42.667v-65.965     c12.389-4.418,21.333-16.147,21.333-30.035v-64C469.337,252.786,460.393,241.057,448.004,236.639z M383.944,128.007h-92.971     l69.729-40.596L383.944,128.007z M350.103,68.898l-101.529,59.109h-42.113l133.112-77.5L350.103,68.898z M300.295,24.184     c4.823-2.823,10.458-3.573,15.844-2.135c5.448,1.458,9.99,4.979,12.813,9.906l0.022,0.039l-164.91,96.013h-42.111L300.295,24.184     z M426.67,426.674c0,11.76-9.573,21.333-21.333,21.333H42.67c-11.76,0-21.333-9.573-21.333-21.333v-256     c0-11.76,9.573-21.333,21.333-21.333h362.667c11.76,0,21.333,9.573,21.333,21.333v64h-64c-35.292,0-64,28.708-64,64     c0,35.292,28.708,64,64,64h64V426.674z M448.004,330.674c0,5.885-4.781,10.667-10.667,10.667H362.67     c-23.531,0-42.667-19.135-42.667-42.667c0-23.531,19.135-42.667,42.667-42.667h74.667c5.885,0,10.667,4.781,10.667,10.667     V330.674z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="M362.67,277.341c-11.76,0-21.333,9.573-21.333,21.333c0,11.76,9.573,21.333,21.333,21.333     c11.76,0,21.333-9.573,21.333-21.333C384.004,286.914,374.431,277.341,362.67,277.341z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/>
        </svg>
            </span>
            <div class="w-1/2 ml-auto text-right">
              <h2 class="text-xl font-semibold mb-2">{{stats.currency_code}}{{stats.balance}}</h2>
              <p class="text-sm">{{$t('pages.dashboard.availablebalance')}}</p>
            </div>
          </div>
          <div class="border-b-4 border-info-text w-1/3"></div>
      </div>

      <div class="flex1 w-1/3 bg-dark text-dark-white font-Oxygen rounded p-6 mr-4">
          <div class="flex items-center px-2 py-3 p-4">
            <span class="w-12 h-12 object-cover rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 60 49" width="32px" class=""><g><g id="Page-1" fill="none" fill-rule="evenodd"><g id="037---Cash-Lock" fill="rgb(0,0,0)" fill-rule="nonzero"><path id="Shape" d="m28 9.5c0 .5522847.4477153 1 1 1s1-.4477153 1-1c-.0965423-2.24159872-1.7783513-4.09537268-4-4.409v-.091c0-.55228475-.4477153-1-1-1s-1 .44771525-1 1v.091c-2.2216487.31362732-3.9034577 2.16740128-4 4.409.0965423 2.2415987 1.7783513 4.0953727 4 4.409v4.937c-1.1128409-.2524624-1.9267959-1.2072317-2-2.346 0-.5522847-.4477153-1-1-1s-1 .4477153-1 1c.0965423 2.2415987 1.7783513 4.0953727 4 4.409v.091c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-.091c2.2216487-.3136273 3.9034577-2.1674013 4-4.409-.0965423-2.2415987-1.7783513-4.0953727-4-4.409v-4.937c1.1128409.25246244 1.9267959 1.20723172 2 2.346zm-6 0c.0732041-1.13876828.8871591-2.09353756 2-2.346v4.692c-1.1128409-.2524624-1.9267959-1.2072317-2-2.346zm6 7c-.0732041 1.1387683-.8871591 2.0935376-2 2.346v-4.692c1.1128409.2524624 1.9267959 1.2072317 2 2.346z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path id="Shape" d="m2 26h2v3c0 1.1045695.8954305 2 2 2h2v3c0 1.1045695.8954305 2 2 2h21c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-21v-3h21c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-25v-3h19c6.617 0 12-5.832 12-13 .0496733-4.37111431-2.0578731-8.48595462-5.634-11h16.634v13c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-13c0-1.1045695-.8954305-2-2-2h-37c-.5522847 0-1 .44771525-1 1s.4477153 1 1 1h7.634c-3.5761269 2.51404538-5.6836733 6.62888569-5.634 11-.0496733 4.3711143 2.0578731 8.4859546 5.634 11h-16.634v-22h4c.55228475 0 1-.44771525 1-1s-.44771525-1-1-1h-4c-1.1045695 0-2 .8954305-2 2v22c0 1.1045695.8954305 2 2 2zm13-13c0-6.065 4.486-11 10-11s10 4.935 10 11-4.486 11-10 11-10-4.935-10-11z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path id="Shape" d="m9 4h-4c-.55228475 0-1 .44771525-1 1v4c0 .55228475.44771525 1 1 1s1-.44771525 1-1v-3h3c.55228475 0 1-.44771525 1-1s-.44771525-1-1-1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path id="Shape" d="m45 10c.5522847 0 1-.44771525 1-1v-4c0-.55228475-.4477153-1-1-1h-4c-.5522847 0-1 .44771525-1 1s.4477153 1 1 1h3v3c0 .55228475.4477153 1 1 1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path id="Shape" d="m5 16c-.55228475 0-1 .4477153-1 1v4c0 .5522847.44771525 1 1 1h4c.55228475 0 1-.4477153 1-1s-.44771525-1-1-1h-3v-3c0-.5522847-.44771525-1-1-1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path id="Shape" d="m56 28h-1v-4c-.0033074-3.3123376-2.6876624-5.9966926-6-6h-4c-3.3123376.0033074-5.9966926 2.6876624-6 6v4h-1c-2.209139 0-4 1.790861-4 4v13c0 2.209139 1.790861 4 4 4h18c2.209139 0 4-1.790861 4-4v-13c0-2.209139-1.790861-4-4-4zm-15-4c0-2.209139 1.790861-4 4-4h4c2.209139 0 4 1.790861 4 4v4h-12zm17 21c0 1.1045695-.8954305 2-2 2h-18c-1.1045695 0-2-.8954305-2-2v-13c0-1.1045695.8954305-2 2-2h18c1.1045695 0 2 .8954305 2 2z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path id="Shape" d="m50.944 36.321c-.3470652-2.0526131-2.2104844-3.4958831-4.2846696-3.3185957-2.0741851.1772875-3.665642 1.9158572-3.6593304 3.9975957-.0027234.9162695.3117395 1.8052455.89 2.516l-.524 1.972c-.1589422.6001785-.0301363 1.2401377.3486216 1.7320923.378758.4919545.9645106.7801084 1.5853784.7799077h3.4c.6210961.0002831 1.2070756-.2880042 1.5858782-.7802125.3788026-.4922084.507433-1.1324706.3481218-1.7327875l-.524-1.97c.7268454-.8947278 1.0309766-2.0601997.834-3.196zm-2.911 3.165.667 2.514h-3.4l.667-2.514c.0974596-.3682308-.0227407-.7598512-.31-1.01-.4222111-.3737894-.6618352-.9121229-.657-1.476-.000569-.5934875.2624737-1.1565746.718-1.537.358849-.3015776.8132629-.4656912 1.282-.463.1311509.0002141.2620149.0122629.391.036.8064781.1611438 1.4330314.7980009 1.581 1.607.124378.6783906-.1135877 1.3725834-.628 1.832-.2880006.2501052-.4086359.6422667-.311 1.011z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g></g></g> </svg>
            </span>
            <div class="w-1/2 ml-auto text-right">
              <h2 class="text-xl font-semibold text-right mb-2">{{stats.currency_code}}{{stats.locked_amount}}</h2>
              <p class="text-gray-600 text-sm">{{$t('pages.dashboard.amountlocked')}}</p>
            </div>
          </div>
          <div class="border-b-4 border-danger-text w-1/3"></div>
      </div>

      <div class="flex1 w-1/3 bg-dark text-dark-white font-Oxygen rounded p-6 mr-4">
          <div class="flex items-center px-2 py-3 p-4">
            <span class="w-12 h-12 object-cover rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="-29 0 487 487.71902" width="32px" class=""><g><path d="m220.867188 266.175781c-.902344-.195312-1.828126-.230469-2.742188-.09375-9.160156-1.066406-16.070312-8.816406-16.085938-18.035156 0-4.417969-3.582031-8-8-8-4.417968 0-8 3.582031-8 8 .023438 15.394531 10.320313 28.878906 25.164063 32.953125v8c0 4.417969 3.582031 8 8 8s8-3.582031 8-8v-7.515625c17.132813-3.585937 28.777344-19.542969 26.976563-36.953125-1.804688-17.410156-16.472657-30.640625-33.976563-30.644531-10.03125 0-18.164063-8.132813-18.164063-18.164063s8.132813-18.164062 18.164063-18.164062 18.164063 8.132812 18.164063 18.164062c0 4.417969 3.582031 8 8 8 4.417968 0 8-3.582031 8-8-.023438-16.164062-11.347657-30.105468-27.164063-33.441406v-7.28125c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v7.769531c-16.507813 4.507813-27.132813 20.535157-24.859375 37.496094s16.746094 29.621094 33.859375 29.617187c9.898437 0 17.972656 7.925782 18.152344 17.820313.183593 9.894531-7.597657 18.113281-17.488281 18.472656zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="m104.195312 222.5c0 64.070312 51.9375 116.007812 116.007813 116.007812s116.007813-51.9375 116.007813-116.007812-51.9375-116.007812-116.007813-116.007812c-64.039063.070312-115.933594 51.96875-116.007813 116.007812zm116.007813-100.007812c55.234375 0 100.007813 44.773437 100.007813 100.007812s-44.773438 100.007812-100.007813 100.007812-100.007813-44.773437-100.007813-100.007812c.0625-55.207031 44.800782-99.945312 100.007813-100.007812zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="m375.648438 358.230469-62.667969 29.609375c-8.652344-16.09375-25.25-26.335938-43.515625-26.851563l-57.851563-1.589843c-9.160156-.261719-18.148437-2.582032-26.292969-6.789063l-5.886718-3.050781c-30.140625-15.710938-66.066406-15.671875-96.175782.101562l.367188-13.335937c.121094-4.417969-3.359375-8.097657-7.777344-8.21875l-63.4375-1.746094c-4.417968-.121094-8.09375 3.359375-8.214844 7.777344l-3.832031 139.210937c-.121093 4.417969 3.359375 8.097656 7.777344 8.21875l63.4375 1.746094h.21875c4.335937 0 7.882813-3.449219 8-7.78125l.183594-6.660156 16.480469-8.824219c6.46875-3.480469 14.03125-4.308594 21.097656-2.308594l98.414062 27.621094c.171875.050781.34375.089844.519532.128906 7.113281 1.488281 14.363281 2.234375 21.628906 2.230469 15.390625.007812 30.601562-3.308594 44.589844-9.730469.34375-.15625.675781-.339843.992187-.546875l142.691406-92.296875c3.554688-2.300781 4.703125-6.96875 2.621094-10.65625-10.59375-18.796875-34.089844-25.957031-53.367187-16.257812zm-359.070313 107.5625 3.390625-123.21875 47.441406 1.304687-3.390625 123.222656zm258.925781-2.09375c-17.378906 7.84375-36.789062 10.007812-55.46875 6.191406l-98.148437-27.550781c-11.046875-3.121094-22.871094-1.828125-32.976563 3.605468l-8.421875 4.511719 2.253907-81.925781c26.6875-17.75 60.914062-19.574219 89.335937-4.765625l5.886719 3.050781c10.289062 5.3125 21.636718 8.242188 33.210937 8.578125l57.855469 1.589844c16.25.46875 30.050781 12.039063 33.347656 27.960937l-86.175781-2.378906c-4.417969-.121094-8.09375 3.363282-8.21875 7.777344-.121094 4.417969 3.363281 8.097656 7.777344 8.21875l95.101562 2.617188h.222657c4.332031-.003907 7.875-3.453126 7.992187-7.78125.097656-3.476563-.160156-6.957032-.773437-10.378907l64.277343-30.371093c.0625-.027344.125-.058594.1875-.089844 9.117188-4.613282 20.140625-3.070313 27.640625 3.871094zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="m228.203125 84v-76c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v76c0 4.417969 3.582031 8 8 8s8-3.582031 8-8zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="m288.203125 84v-36c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v36c0 4.417969 3.582031 8 8 8s8-3.582031 8-8zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/><path d="m168.203125 84v-36c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v36c0 4.417969 3.582031 8 8 8s8-3.582031 8-8zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#d1d1e2"/></g> </svg>
            </span>
            <div class="w-1/2 ml-auto text-right">
              <h2 class="text-xl font-semibold text-right mb-2">{{stats.currency_code}}{{stats.receipt_amount}}</h2>
              <p class="text-gray-600 text-sm">{{$t('pages.dashboard.amountreceived')}}</p>
            </div>
          </div>
          <div class="border-b-4 border-success-text w-1/3"></div>
      </div>
      

    </div>

  </div>
</template>
<script>
import ApiService from '@/utils/services/api-service';
const storage = require('electron-json-storage');
export default {
  data:function(){
       return {
        stats:
        {
            inprogress_orders: 0,
            completed_orders: 0,
            rejected_orders: 0,
            locked_amount: 0,
            receipt_amount: 0,
            currency_code: '$',
            currency: 'USD',
            balance: 0.00,
        },
        isApiKeyExists:false,
        apikey:'',
        isMounted:false,
        loading:false,
        selectedOrderStatus:12,
        currentPage:0,
        perPage:5,
      }
    },
    methods:{
      changeOrderType(type){
        this.selectedOrderStatus = type;
      },
      fetchData(){
        if(this.isApiKeyExists == true){
        var ve = this;
         if(ve.apikey == ''){
                storage.get('apikey', (err, data) => {
                    ve.apikey = data;         
                })
            }
        ApiService.fetchDashboardStats(this.apikey).then(
                response => {
                    ve.loading = false;
                    if (!response.data.error) {
                        ve.ordersFeed = [];
                        var idx = response.data.response;
                        this.stats.inprogress_orders = new Intl.NumberFormat().format(idx.inprogress_orders)
                        this.stats.completed_orders = new Intl.NumberFormat().format(idx.completed_orders)
                        this.stats.rejected_orders = new Intl.NumberFormat().format(idx.rejected_orders)
                        this.stats.locked_amount = new Intl.NumberFormat().format(idx.locked_amount)
                        this.stats.receipt_amount = new Intl.NumberFormat().format(idx.receipt_amount)
                        this.stats.currency_code = idx.currency_code
                        this.stats.currency = idx.currency
                        this.stats.balance = new Intl.NumberFormat().format(idx.balance)
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
          this.$swal(this.$t('messages.error.apikeyerror'));
        }
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
