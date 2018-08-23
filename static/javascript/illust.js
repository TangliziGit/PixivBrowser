function createUserInfo(data){
    console.log(data)
    var proxyUrl=config.proxyUrlWithArgs;
    var x=data['illust'];
    var total_id="#divUserTotal",
        divUserImg_id="#divUserImg",
        divInfo_id="#divUserInfo";

    $("<div />", {
        'id': "divUserTotal",
        'class': 'itemsRow'
    }).appendTo($("#container"));

    $("<div />", {
        'id': "divUserImg",
        'class': 'itemsImg'
    }).appendTo($(total_id));
    $("<div />", {
        'id': "divUserInfo",
        'class': 'itemsText'
    }).appendTo($(total_id));

    $("<a />", {
        'id': "userImgHref",
        'href': config.memberUrl+"?id="+x['user']['id']
    }).appendTo($(divUserImg));
    $("<img />", {
        'id': "userImg",
        'class': 'image',
        'src': proxyUrl+x['user']['profile_image_urls']['medium']
    }).appendTo($("#userImgHref"));

    $("<p />", {
        'text': 'Author Name: '+x["user"]['name']+'('+x["user"]["account"]+')'
    }).appendTo($(divInfo_id));
    $("<p />", {
        'text': 'Author ID: '+x["user"]['id']
    }).appendTo($(divInfo_id));
}

function loadPicture(url, imgId){
    var windowUrl = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        // console.log(this);
        if (this.status == 200) {
            var blob = this.response;
            $(imgId).load(function (e) {
                windowUrl.revokeObjectURL(imgId.src);
            }).attr("src", windowUrl.createObjectURL(blob));
        }
    }
    xhr.send();
}

function createImageInfo(data){
    var proxyUrl=config.proxyUrlWithArgs;
    var x=data['illust'];
    var divImgId='#divImg',
        divImgInfoId='#divImgInfo';

    $("<div />", {
        'id': "divImgInfo",
        'class': "itemsRow"
    }).appendTo($("#container"));
    $("<div />", {
        'id': "divImg",
        'class': "itemsRow",
    }).appendTo($("#container"));

    $("<p />", {
        'text': 'Title: '+x['title']
    }).appendTo($(divImgInfo));
    $("<p />", {
        'text': 'ID: '+x['id']
    }).appendTo($(divImgInfo));

    if (x['series']===null){
        $("<p />", {
            'text': "Series: "+"Null"
        }).appendTo($(divImgInfo));
    }else{
        $("<p />", {
            'text': "Series: "+x['series']['title']+"(id: "+x['series']['id']+")"
        }).appendTo($(divImgInfo));
    }

    var number=0;
    if (Array.isArray(x['meta_single_page']))
        number=x['meta_pages'].length;
    else 
        number=1;
    $("<p />", {
        // 'id'
        'text': "PageNumber: "+number
    }).appendTo($(divImgInfo));

    $("<p />", {
        'text': 'Viewed: '+x['total_view']
    }).appendTo($(divImgInfo));
    $("<p />", {
        'text': 'Bookmarks: '+x['total_bookmarks']
    }).appendTo($(divImgInfo));
    $("<p />", {
        'text': 'Comments: '+x['total_comments']
    }).appendTo($(divImgInfo));


    var tags='';
    for (var key in x['tags'])
        tags+=x['tags'][key]['name']+', ';
    tags=tags.slice(0, tags.length-2);
    if (tags=='') tags='Null';
    $("<p />", {
        'text': 'Tags: '+tags
    }).appendTo($(divImgInfo));

    var tools='';
    for (var key in x['tools'])
        tools+=x['tools'][key]+', ';
    tools=tools.slice(0, tools.length-2);
    if (tools=='') tools='Null';
    $("<p />", {
        'text': 'Tools: '+tools
    }).appendTo($(divImgInfo));

    $("<p />", {
        'text': 'Upload Date: '+x['create_date']
    }).appendTo($(divImgInfo));

    if (x['meta_single_page'].length!=0){
        $("<img />", {
            'id': 'illust',
            'class': 'illust',
            'src': server.loadingPicture 
        }).appendTo($(divImgId));

        loadPicture(proxyUrl+x['meta_single_page']['original_image_url'], '#illust');
    }else{
        for (var key in x['meta_pages']){
            $("<img />", {
                'id': 'illust_'+key,
                'class': 'illust',
                'src': server.loadingPicture 
            }).appendTo($(divImgId));

            loadPicture(proxyUrl+x['meta_pages'][key]['image_urls']['original'], '#illust_'+key);
        }
    }
}

function genUrl(id, page){
    var url=config.illustUrl;

    console.log(pageInfo);
    if (id=='') id=pageInfo.id;
    if (page=='') page=pageInfo.page;

    url+="?id="+id;
    url+="&page="+page;
    return url;
}

function getValue(value){
    if (value=='')
        return 'Null';
    return value;
}

function createPageInfo(name){
    var divId="#"+name+"PageInfo";

    $("<div />", {
        'id': name+"PageInfo",
        'class': 'itemsRow'
    }).appendTo($("#container"));

    $("<div />", {
        'text': "Related - Page: "+pageInfo.page,
        'style': 'text-align:center'
    }).appendTo($(divId))
    $("<a />", {
        'id': name+"PrevHref",
        'style': 'float: left',
        'href': genUrl('', parseInt(pageInfo.page)-1)
    }).appendTo($(divId));
    $("<a />", {
        'id': name+"PostHref",
        'style': 'float: right',
        'href': genUrl('', parseInt(pageInfo.page)+1)
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
        'text': 'Page: '
    }).appendTo($(divId));
    $("<input />", {
        'id': 'pageBox',
        'value': ''
    }).appendTo($(divId));

    $("<button />", {
        'text': "Jump",
        'id': 'jumpButton'
    }).appendTo($(divId));
    $("#jumpButton").click(function (){
        window.location.href=genUrl('', $("#pageBox").val());
    });
}

function createRelated(data){
    var proxyUrl=config.proxyUrlWithArgs;
    if (data['illusts'].length==0){
        $("<div />", {
            'id': "divInfo",
            'class': 'itemsRow',
        }).appendTo($("#container"));

        $("<div />", {
            'style': 'text-align: center',
            'text': 'No items.'
        }).appendTo($("#divInfo"));
        $("<div />", {
            'style': 'text-align: center',
            'text': 'Maybe server is calculating ranking, or page not found.'
        }).appendTo($("#divInfo"));

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
            'id': "href_"+key,
            'href': genUrl(x['id'], 1)
        }).appendTo($(divImg_id));
        $("<img />", {
            // 'id': "img_"+key,
            'class': 'image',
            'src': proxyUrl+x["image_urls"]["square_medium"]
        }).appendTo($('#href_'+key));

        $("<p />", {
            // 'id': "p_title_"+key,
            'text': 'Title: '+x["title"]+'(id: '+x['id']+')'
        }).appendTo($(divText_id));

        $("<p />", {
            // 'id': "p_author_"+key,
            'text': 'Author: '+x["user"]['name']+'(id: '+ x['user']['id'] +')'
        }).appendTo($(divText_id));

        var tags='';
        for (var i=0; i<x['tags'].length && i<config.tagsLength; i++)
            tags+=x['tags'][i]['name']+', ';
        tags=tags.slice(0, tags.length-2);
        $("<p />", {
            // 'id': "p_tags"+key,
            'text': 'Tags: '+tags
        }).appendTo($(divText_id));

        if (x['series']===null){
            $("<p />", {
                'text': "Series: "+"Null"
            }).appendTo($(divText_id));
        }else{
            $("<p />", {
                'text': "Series: "+x['series']['title']+"(id: "+x['series']['id']+")"
            }).appendTo($(divText_id));
        }

        var number=0;
        if (Array.isArray(x['meta_single_page']))
            number=x['meta_pages'].length;
        else 
            number=1;
        $("<p />", {
            // 'id'
            'text': "PageNumber: "+number
        }).appendTo($(divText_id));
    }
}

$(document).ready(function(){
    var data, relatedData;
    $.ajax({
        url: server.illustUrl,
        async: false,
        success: function(response){
            data=response;
        }
    });
    $.ajax({
        url: server.relatedUrl,
        async: false,
        success: function(response){
            relatedData=response;
        }
    });

    if (pageInfo.page==1) createUserInfo(data);
    if (pageInfo.page==1) createImageInfo(data);
    createPageInfo('head');
    createJumpBox(relatedData);
    createRelated(relatedData);
    createPageInfo('tail');
})
