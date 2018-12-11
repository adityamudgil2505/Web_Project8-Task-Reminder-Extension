//StrikeThrough
$("ul").on("click","li",function(){
  $(this).toggleClass("update");
})

//Deletion
$("ul").on("click","span",function(event){
  $(this).parent().fadeOut(500,function(){
    $(this).remove();
  })
  event.stopPropagation();
})

//Adding
$("input").keypress(function(event){
  if(event.which===13)
  { var temp = $(this).val();
    $("ul").append("<li><span class='trash'><i class='fa fa-trash'></i></span>"+temp+"</li>");
    $("input").val("");
  }
});

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