require.config({
    baseUrl: 'b'
});

require(['selector'], function (query) {
    var els = query('#wrapper');
    console.log(els);
});