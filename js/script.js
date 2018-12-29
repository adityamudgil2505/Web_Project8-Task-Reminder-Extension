// On start of browser window
intialize();
function intialize(){
  let elemUL = $('#list');
  chrome.storage.sync.get({arr:[]},(detail)=>{
    let arr = detail.arr;
    let len = arr.length;
    for(let i=len-1;i>=0;i--)
    { if(arr[i].done)
      { elemUL.append("<li class='update'><span class='trash 'data-timeStamp='"+arr[i].timeStamp.toString()+"'><i class='fa fa-trash'></i></span>"+arr[i].task+"</li>");
      }
      else
      { elemUL.append("<li><span class='trash 'data-timeStamp='"+arr[i].timeStamp.toString()+"'><i class='fa fa-trash'></i></span>"+arr[i].task+"</li>");
      }
    }
    console.log(arr);
  });
}

//StrikeThrough
$("ul").on("click","li",function(e){
  let done=0;
  let timeStamp=$(this)["0"].firstChild.dataset.timestamp;
  if($(e.target).css('color')=='rgb(0, 0, 0)'){
    done=1;
  }
  $(this).toggleClass("update");
  changeDone(done, timeStamp);
})
function changeDone(done,timeStamp)
{ chrome.storage.sync.get({arr:[]},(detail)=>{
    let arr= detail.arr;
    let i, len =arr.length;
    for(i=0;i<len;i++)
    { if(arr[i].timeStamp==timeStamp){break;}
    }
    arr[i].done=done;
    chrome.storage.sync.set({arr:arr},()=>{
    })
  });
}

//Deletion
$("ul").on("click","span",function(event){
  let timeStamp = $(this)["0"].dataset.timestamp;
  $(this).parent().fadeOut(500,function(){
    deleteFromStorage(timeStamp);
    $(this).remove();
  })
  event.stopPropagation();
})
// deleting from storage
function deleteFromStorage(timeStamp)
{ 
  chrome.storage.sync.get({arr:[]},(file)=>{
    let arr = file.arr;
    let i, len=arr.length;
    for(i=0;i<len;i++)
    { if(arr[i].timeStamp == timeStamp){break;}
    }
    arr.splice(i,1);
    chrome.storage.sync.set({arr:arr},()=>{
      console.log(file.arr);
    });
  });
}

//Adding
$("input").keypress(function(event){
  if(event.which===13)
  { var temp = $(this).val();
    var timeStamp = Math.floor(Date.now()/1000);
    storeVal(temp, timeStamp);
    $("ul").prepend("<li><span class='trash 'data-timeStamp='"+timeStamp.toString()+"'><i class='fa fa-trash'></i></span>"+temp+"</li>");
    $("input").val("");
  }
});

//store value in chrome store
function storeVal(val, timeStamp)
{ chrome.storage.sync.get({arr:[]},(detail)=>{
    let temp = detail.arr;
    console.log('before');
    console.log(temp);
    temp.push({timeStamp:timeStamp, task: val, done:0});
    chrome.storage.sync.set({arr:temp},()=>{
      console.log('after adding');
      console.log(detail.arr);
    });
  });
}

//AddFunctionality
$("#add").click(function(){
  $("input").fadeToggle(0,function(){
    var className = $("#add i").attr('class');
    if(className=="fa fa-plus")
    { $("#add i").removeClass();
      $("#add i").addClass('fa fa-minus');
    }
    else
    { $("#add i").removeClass();
      $("#add i").addClass('fa fa-plus');
    }
  })
});
