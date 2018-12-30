// for rich notifications
chrome.runtime.onStartup.addListener()
{ notif();
  updateBadge();
}
function notif()
{ chrome.storage.sync.get({arr:[]},(detail)=>{
    let arr = detail.arr;
    let len = arr.length;
    let currentDate = new Date();
    currentDate=currentDate.getTime() + 86400000;
    let numberOfTask=0;
    let addO, endO;
    let txt=[];
    for(let i=0;i<len;i++)
    { if(arr[i].endTimeStamp<currentDate && arr[i].done==0)
      {   numberOfTask++;
          txt.push(arr[i].task);
          addO = arr[i].currentTimeString;
          endO = arr[i].endTimeString;
      }  
    }
    var notifOption = {
      type: 'basic',
      iconUrl: 'icon_128.png',
      title:'Reminder || To-Do List',
      message:''
    }
    if(numberOfTask==1)
    { notifOption.message='Task: \"'+ txt[0] + '\" \nAdded: '+ addO +' \nEnd: '+endO;
      chrome.notifications.create('limitNotif', notifOption);
      console.log(notifOption);
    }
    else if(numberOfTask>1)
    { let taskString="";
      for(let i=0;i<txt.length;i++)
      { taskString = taskString.concat(txt[i]," - ");
      }
      taskString=taskString.slice(0,-3);
      notifOption.message =  taskString;
      chrome.notifications.create('limitNotif', notifOption);
    }
  });
}

// setting badge value
function updateBadge(){
  chrome.storage.sync.get({arr:[]},(detail)=>{
    let len = detail.arr.length;
    chrome.browserAction.setBadgeText({text: len.toString()});
    chrome.browserAction.setBadgeBackgroundColor({ color: "#178b7a"});
  });
}