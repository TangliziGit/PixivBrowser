function structure(data, type){
    var res;

    if (type in {"rank":''}){
        // v1
        res=data["response"]["0"];
        res["pagination"]=data["pagination"];
    }else if (type in {"search":'', "member_illust":''}){
        // v1
        res=data["response"];
        res["pagination"]=data["pagination"];
    }else if (type in {"illust":''})
        // v1
        res=data["response"]["0"];
    }else if (type in {"member":''}){
        // v2
        res=data;
    }else if (type in {"related":''}){
        // v2
        res=data["illusts"];
    }

    return res;
}

function createUserInfo(data){
    // v1
    var proxyUrl=config.proxyUrlWithArgs;
    var x=data['user'];
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
        'src': proxyUrl+x['profile_image_urls']['px_170x170']
    }).appendTo($("#userImgHref"));

    $("<p />", {
        'text': 'Author Name: '+x['name']+'('+x["account"]+')'
    }).appendTo($(divInfo_id));
    $("<p />", {
        'text': 'Author ID: '+x['id']
    }).appendTo($(divInfo_id));

    if (x['profile']){
        $("<p />", {
            'text': 'Introduction: '+x['profile']['introduction']
        }).appendTo($(divInfo_id));
    }
}

function createUserDetial(data){
    // v2
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

function createItemsList(data){
    var proxyUrl=config.proxyUrlWithArgs;
    if (data.length==0){
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
        return;
    }

    for (var key in data){
        var x=data[key]['work'];
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
            'class': 'image',
            'src': proxyUrl+x["image_urls"]["px_128x128"]
        }).appendTo($('#href_'+key));

        $("<p />", {
            'text': '#'+data[key]['rank']+'(Previous: '+data[key]['previous_rank']+')'
        }).appendTo($(divText_id));
        $("<p />", {
            'text': 'Title: '+x["title"]+'(id: '+x['id']+')'
        }).appendTo($(divText_id));

        $("<p />", {
            'text': 'Author: '+x["user"]['name']+'(id: '+ x['user']['id'] +')'
        }).appendTo($(divText_id));

        var tags='';
        for (var i=0; i<x['tags'].length && i<config.tagsLength; i++)
            tags+=x['tags'][i]+', ';
        tags=tags.slice(0, tags.length-2);
        $("<p />", {
            'text': 'Tags: '+tags
        }).appendTo($(divText_id));

        $("<p />", {
            'text': "PageNumber: "+x['page_count']
        }).appendTo($(divText_id));
        $("<p />", {
            'text': "CreatedTime: "+x['created_time']
        }).appendTo($(divText_id));
        // if (x['series']===null){
        //     $("<p />", {
        //         'text': "Series: "+"Null"
        //     }).appendTo($(divText_id));
        // }else{
        //     $("<p />", {
        //         'text': "Series: "+x['series']['title']+"(id: "+x['series']['id']+")"
        //     }).appendTo($(divText_id));
        // }
    }
}

function upperFirstChar(str){
    return str.substring(0,1).toUpperCase()+str.substring(1);
}

function createPageInfo(name, data){
    var divId="#"+name+"PageInfo";
    $("<div />", {
        'id': name+"PageInfo",
        'class': 'itemsRow'
    }).appendTo($("#container"));

    var info=''
    for (var key in data) if (data[key]!='')
        info+=upperFirstChar(key)+': '+data[key]+' - ';
    info=info.slice(0, info.length-3);

    $("<div />", {
        'text': info,
        'style': 'text-align:center'
    }).appendTo($(divId))
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

