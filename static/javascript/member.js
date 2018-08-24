$(document).ready(function(){
    var memberData, illustsData;
    $.ajax({
        url: memberUrl,
        async: false,
        success: function(response){
            memberData=structure(response, 'member');
        }
    });
    $.ajax({
        url: memberIllustUrl,
        async: false,
        success: function(response){
            illustsData=structure(response, 'member_illust');
        }
    });

    createUserInfo(memberData);
    if (pageInfo.page==1) createUserDetial(memberData);
    createPageInfo('head', pageInfo);
    createItemsList(illustsData);
    createPageInfo('tail', pageInfo);
})
