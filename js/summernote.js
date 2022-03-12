$(function(){
  $('#summernote').summernote({
    placeholder: '내용',
    tabsize: 2,
    height: 300,
    minHeight: null,
    maxHeight: null,
    focus: true,
    callbacks:{
      onImageUpload: function(files){
        sendFile(files[0], this);
      }
    }
  });
});

function sendFile(file, editor){
  data = new FormData()
  data.append("img", file)
  $.ajax({
    data: data,
    type: "POST",
    url: "/api/insertImage",
    cache: false,
    contentType: false,
    enctype: "multipart/form-data",
    processData: false,
    success: function (response) {
      var imgurl = $('<img>').attr({
        'src': response,
        'crossorigin': 'anonymous',
        'class': 'img-fluid',
        'width': '100%',
        'height': '100%'
    });
      $("#summernote").summernote("insertNode", imgurl[0]);
    },
  })
}