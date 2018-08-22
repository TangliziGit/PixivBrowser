function createItemsRows(data){
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
            'href': config.illustUrlWithArgs+x['id']
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

function genRankUrl(page){
    var url=config.memberUrl;

    console.log(pageInfo);
    if (page=='') page=pageInfo.page;

    url+="?id="+pageInfo.id;
    url+="&page="+page;
    return url;
}

function getValue(value){
    if (value=='')
        return 'Null';
    return value;
}

function createUserDetial(data){
    var x=data['profile'];
    var divUserDetailId='#divUserDetail';

    $("<div />", {
        'id': "divUserDetail",
        'class': "itemsRow"
    }).appendTo($("#container"));

    $("<p />", {
        'text': 'Gender: '+getValue(x['gender'])
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'Birth: '+getValue(x['birth'])
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': "Region: "+getValue(x['region'])
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'Job: '+getValue(x['job'])
    }).appendTo($(divUserDetailId));
    
    if (x['webpage']===null){
        $("<span />", {
            'text': 'Webpage: Null'
        }).appendTo($(divUserDetailId));
        $("<p />", {
            'text': ""
        }).appendTo($(divUserDetailId));
    }else{
        $("<span />", {
            'text': 'Webpage: '
        }).appendTo($(divUserDetailId));
        $("<a />", {
            'text': x['webpage'],
            'href': x['webpage']
        }).appendTo($(divUserDetailId));
        $("<p />", {
            'text': ""
        }).appendTo($(divUserDetailId));
    }

    if (x['twitter_url']===null){
        $("<span />", {
            'text': "Twitter: Null"
        }).appendTo($(divUserDetailId));
        $("<p />", {
            'text': ""
        }).appendTo($(divUserDetailId));
    }else{
        $("<span />", {
            'text': 'Twitter: '
        }).appendTo($(divUserDetailId));
        $("<a />", {
            'text': x['twitter_url'],
            'href': x['twitter_url']
        }).appendTo($(divUserDetailId));
        $("<p />", {
            'text': ""
        }).appendTo($(divUserDetailId));
    }


    if (x['pawoo_url']===null){
        $("<span />", {
            'text': "Pawoo: Null"
        }).appendTo($(divUserDetailId));
    }else{
        $("<span />", {
            'text': 'Pawoo: '
        }).appendTo($(divUserDetailId));
        $("<a />", {
            'text': x['pawoo_url'],
            'href': x['pawoo_url']
        }).appendTo($(divUserDetailId));
    }

    $("<p />", {
        'text': 'Follower: '+x['total_follower']
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'Illusts: '+x['total_illusts']
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'Manga: '+x['total_manga']
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'Novels: '+x['novels']
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'TotalBookmarks: '+x['total_illust_bookmarks_public']
    }).appendTo($(divUserDetailId));
    $("<p />", {
        'text': 'TotalSeries: '+x['total_illust_series']
    }).appendTo($(divUserDetailId));
}

function createPageInfo(name){
    var divId="#"+name+"PageInfo";

    $("<div />", {
        'id': name+"PageInfo",
        'class': 'itemsRow'
    }).appendTo($("#container"));

    $("<div />", {
        'text': "Page: "+pageInfo.page,
        'style': 'text-align:center'
    }).appendTo($(divId))
    $("<a />", {
        'id': name+"PrevHref",
        'style': 'float: left',
        'href': genRankUrl(parseInt(pageInfo.page)-1)
    }).appendTo($(divId));
    $("<a />", {
        'id': name+"PostHref",
        'style': 'float: right',
        'href': genRankUrl(parseInt(pageInfo.page)+1)
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
        window.location.href=genRankUrl($("#pageBox").val());
    });
}

function createUserInfo(memberData){
    var proxyUrl=config.proxyUrlWithArgs;
    var x=memberData['user'];
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
        'href': config.memberUrl+"?id="+x['id']
    }).appendTo($(divUserImg));
    $("<img />", {
        'id': "userImg",
        'class': 'image',
        'src': proxyUrl+x['profile_image_urls']['medium']
    }).appendTo($("#userImgHref"));

    $("<p />", {
        'text': 'Author Name: '+x['name']+'('+x["account"]+')'
    }).appendTo($(divInfo_id));
    $("<p />", {
        'text': 'Author ID: '+x['id']
    }).appendTo($(divInfo_id));
    $("<p />", {
        'text': 'Comment: '+x['comment']
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

$(document).ready(function(){
    var memberData, illustsData;
    $.ajax({
        url: memberUrl,
        async: false,
        success: function(response){
            memberData=response;
        }
    });
    $.ajax({
        url: memberIllustUrl,
        async: false,
        success: function(response){
            illustsData=response;
        }
    });

    createUserInfo(memberData);
    if (pageInfo.page==1) createUserDetial(memberData);
    createPageInfo('head');
    createJumpBox();
    createItemsRows(illustsData);
    createPageInfo('tail');
})
