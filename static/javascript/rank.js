function createItemsRows(data, key){
    var proxyUrl=config.proxyUrl;
    for (var key in data['illusts']){
        var x=data['illusts'][key];
        var total_id="#div_"+key,
            divImg_id="#divImg_"+key,
            divText_id="#divText_"+key;

        $("<div />", {
            'id': "div_"+key,
            'class': 'itemsRow'
        }).appendTo($("#container"));

        $("<div />", {
            'id': "divImg_"+key,
            'class': 'itemsImg'
        }).appendTo($(total_id));
        $("<div />", {
            'id': "divText_"+key,
            'class': 'itemsText'
        }).appendTo($(total_id));

        $("<a />", {
            'id': "a_"+key,
            'href': config.paintUrl+x['id']
        }).appendTo($(divImg_id));
        $("<img />", {
            'id': "img_"+key,
            'class': 'image',
            'src': proxyUrl+x["image_urls"]["square_medium"]
        }).appendTo($('#a_'+key));

        $("<p />", {
            'id': "p_title_"+key,
            'text': 'Title: '+x["title"]+'(id: '+x['id']+')'
        }).appendTo($(divText_id));
        $("<p />", {
            'id': "p_author_"+key,
            'text': 'Author: '+x["user"]['name']+'(id: '+ x['user']['id'] +')'
        }).appendTo($(divText_id));

        var tags='';
        for (var i=0; i<x['tags'].length && i<config.tagsLength; i++)
            tags+=x['tags'][i]['name']+', ';
        tags=tags.slice(0, tags.length-2);
        $("<p />", {
            'id': "p_"+key,
            'text': 'Tags: '+tags
        }).appendTo($(divText_id));
    }
}

$(document).ready(function(){
    var data;
    $.ajax({
        // url: "https://api.imjad.cn/pixiv/v2/?type=rank&mode=week",
        url: server.rankUrl,
        async: false,
        success: function(response){
            data=response;
        }
    })
    createItemsRows(data);
})
