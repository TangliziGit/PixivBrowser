function createUserInfo(data){
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

    $("<img />", {
        'id': "userImg",
        'class': 'image',
        'src': proxyUrl+x['user']['profile_image_urls']['medium']
    }).appendTo($(divUserImg));

    $("<p />", {
        'text': 'Author Name: '+x["user"]['name']
    }).appendTo($(divInfo_id));
    $("<p />", {
        'text': 'Author Account: '+x["user"]['account']
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
    $("<p />", {
        'text': 'Tags: '+tags
    }).appendTo($(divImgInfo));

    var tools='';
    for (var key in x['tools'])
        tools+=x['tools'][key]+', ';
    tools=tools.slice(0, tools.length-2);
    $("<p />", {
        'text': 'Tags: '+tools
    }).appendTo($(divImgInfo));

    $("<p />", {
        'text': 'Upload Date: '+x['create_date']
    }).appendTo($(divImgInfo));

    if (x['meta_single_page'].length!=0){
        $("<img />", {
            'id': 'paint',
            'class': 'paint',
            'src': server.loadingPicture 
        }).appendTo($(divImgId));

        loadPicture(proxyUrl+x['meta_single_page']['original_image_url'], '#paint');
    }else{
        for (var key in x['meta_pages']){
            $("<img />", {
                'id': 'paint_'+key,
                'class': 'paint',
                'src': server.loadingPicture 
            }).appendTo($(divImgId));

            loadPicture(proxyUrl+x['meta_pages'][key]['image_urls']['original'], '#paint_'+key);
        }
    }
}

$(document).ready(function(){
    var data;
    $.ajax({
        url: server.paintUrl,
        async: false,
        success: function(response){
            data=response;
        }
    });
    createUserInfo(data);
    createImageInfo(data);
})
