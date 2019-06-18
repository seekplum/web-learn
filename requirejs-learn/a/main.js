/**
 * Created by lcx on 16-7-1.
 */
require.config({
    paths: {
        jquery: '../jquery'
    }
});

require(['jquery'], function ($) {
    alert("jQuery版本：" + $().jquery);
});