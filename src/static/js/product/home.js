layui.define(['jquery', 'layer', 'api', 'srbank', 'utils'], function(exports) {
//  var $ = layui.jquery;
//  var layer = layui.layer;
    var api = layui.api;
//  var srbank = layui.srbank;
    var utils = layui.utils;

    utils.getAjaxData({
        url: api.pcIndex,
        beforeSend: function(xhr) {
            console.log(xhr);
        },
        success: function(data) {
            console.log(data);
        },
        complete: function(xhr, type) {
            console.log(xhr, type)
        }
    });


    exports('home', {});
});