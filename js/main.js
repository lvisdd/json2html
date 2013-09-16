$(function(){

  //HTMLを初期化
  $('div.navbar-collapse').html("");
  $("table.table thead").html("");
  $("table.table tbody").html("");

  //HTMLを生成
  $.getJSON("json/project.json", function(project){
    // alert(project.project_name);
    $('head title').text(project.project_name);
    $('a.navbar-brand').text(project.project_name);
  })

  $.getJSON("json/data.json", function(data){
    $(data.thead).each(function(){
      $('<tr>' +
        '<th>' + this.id    + '</th>' +
        '<th>' + this.title + '</th>' +
        '</tr>'
        ).appendTo('table.table thead');
    })

    $(data.tbody).each(function(){
      $('<tr>' +
        '<td>' + this.id + '</td>' +
        '<td>' + '<a href="' + this.url + '" target="' + this.target + '">' + this.title + '</a>' + '</td>' +
        '</tr>'
        ).appendTo('table.table tbody');
    })
  })
});
