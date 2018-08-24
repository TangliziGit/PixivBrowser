$(document).ready(function(){
    var data;
    $.ajax({
        url: rankAPI,
        async: false,
        success: function(response){
            data=structure(response, 'rank');
        }
    });

    console.log(data);
    createPageInfo('head', pageInfo);
    createItemsList(data['works']);
    createPageInfo('tail', pageInfo);
})
