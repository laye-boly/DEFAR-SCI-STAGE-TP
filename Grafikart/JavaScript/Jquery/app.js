jQuery(function($){
    $.get("https://jsonplaceholder.typicode.com/users",  {})
    .done(function(data, textStatus, jqXHR) {
      //traiter les donnes retournées par le serveurs
    })
    .fail(function(jqHHR, textStatus, errorThrown) {
    //   traiter en cas d'erreur
    })
    .always(function() {
      // ce code sera tjrs effectué succes ou non
    });

})