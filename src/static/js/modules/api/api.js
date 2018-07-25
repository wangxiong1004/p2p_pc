layui.define(['layer'], function(exports) {
    var layer = layui.layer;

    /**
     * 获取域名
     * @param ''
     * @returns {*}
     */
    function getDomain() {
        var url = "",
            urlApi = "";
        switch (window.location.hostname) {
            case "www.dolabank.com":
                urlApi = 'https://www.dolabank.com/apigateway/';
                url = 'https://www.dolabank.com/';
                break;
            case "www.dolabank.top":
                urlApi = 'https://api.dolabank.top/';
                url = 'https://www.dolabank.top/';
                break;
            case "www.dolabank.club":
                urlApi = 'https://api.dolabank.club/';
                url = 'https://www.dolabank.club/';
                break;
            case "www.dola.dev":
                urlApi = 'https://api.dola.dev/';
                url = 'https://www.dola.dev/';
                urlApi = 'https://api.dolabank.club/';
                break;
            default:
                // urlApi = 'https://www.dolabank.com/apigateway/';
                // urlApi = 'https://api.dolabank.com/';
                // url = 'https://www.dolabank.com/';
                urlApi = 'https://api.dolabank.club/';
                url = 'https://www.dolabank.club/';
        }

        return {
            url: url,
            urlApi: urlApi
        };
    };

    var domain = getDomain();

    exports('api', {
        domain: domain,
        pcIndex: domain.urlApi + 'v1/homepage/getIndexData',    // pc首页
    });

});