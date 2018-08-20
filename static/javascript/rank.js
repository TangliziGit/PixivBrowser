function createItemsRows(data, key){
    var proxyUrl=config.proxyUrlWithArgs;
    if (data['illusts'].length==0){
        $("<div />", {
            'id': "div_"+key,
            'class': 'itemsRow'
        }).appendTo($("#container"));

    }
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
            'href': config.paintUrlWithArgs+x['id']
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

function genRankUrl(mode, page, date){
    var url=config.rankUrl;

    if (mode=='') mode=pageInfo.mode;
    if (page=='') page=pageInfo.page;
    if (date=='') date=pageInfo.date;

    url+="?mode="+mode;
    url+="&page="+page;
    url+="&date="+date;
    return url;
}

function createPageInfo(name){
    var divId="#"+name+"PageInfo";

    $("<div />", {
        'id': name+"PageInfo",
        'class': 'itemsRow'
    }).appendTo($("#container"));

    $("<div />", {
        'text': "Mode: "+pageInfo.mode+" - Page: "+pageInfo.page,
        'style': 'text-align:center'
    }).appendTo($(divId))
    $("<a />", {
        'id': name+"PrevHref",
        'style': 'float: left',
        'href': genRankUrl(pageInfo.mode, parseInt(pageInfo.page)-1, pageInfo.date)
    }).appendTo($(divId));
    $("<a />", {
        'id': name+"PostHref",
        'style': 'float: right',
        'href': genRankUrl(pageInfo.mode, parseInt(pageInfo.page)+1, pageInfo.date)
    }).appendTo($(divId));

    $("<button />", {
        'id': name+'PrevButton',
        'class': 'jumpButton',
        'text': '<< Prev'
    }).appendTo($("#"+name+'PrevHref'));
    $("<button />", {
        'id': name+'PostButton',
        'class': 'jumpButton',
        'text': 'Post >>'
    }).appendTo($("#"+name+'PostHref'));

    if (pageInfo.page<=1){
        $("#"+name+"PrevButton").attr("disabled", "true");
    }
}

function createJumpBox(){
    var divId='#jumpBox';

    $("<div />", {
        'id': 'jumpBox',
        'class': 'jumpBox itemsRow',
    }).appendTo($("#container"));

    $("<span />", {
        'text': 'Mode: '
    }).appendTo($(divId));
    $("<select />", {
        'id': 'modeBox'
    }).appendTo($(divId));

    $("<span />", {
        'text': 'Page: '
    }).appendTo($(divId));
    $("<input />", {
        'id': 'pageBox',
        'value': ''
    }).appendTo($(divId));

    $("<span />", {
        'text': 'Date: '
    }).appendTo($(divId));
    $("<input />", {
        'id': 'dateBox',
        'value': ''
    }).appendTo($(divId));

    $("<button />", {
        'text': "Jump",
        'id': 'jumpButton'
    }).appendTo($(divId));
    $("#jumpButton").click(function (){
        window.location.href=genRankUrl($("#modeBox").val(),
                       $("#pageBox").val(),
                       $("#dateBox").val());
    });

    var modeList=["year", "day", "week", "month", "week_rookie",
        "week_original", "day_male", "day_female"];
    for (var i=0; i<modeList.length; i++){
        $("<option />", {
            "value": modeList[i],
            "text": modeList[i]
        }).appendTo($("#modeBox"));
    }
}

$(document).ready(function(){
    var data;
    $.ajax({
        url: rankAPI,
        async: false,
        success: function(response){
            data=response;
        }
    });

    console.log(pageInfo);
    createPageInfo('head');
    createJumpBox();
    createItemsRows(data);
    createPageInfo('tail');
})
