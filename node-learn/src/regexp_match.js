// var input = "/a/b xxx sdf c/d/g";
// var regex = /(\w+)\/(\w+)/g;
var input = `    <div class="any-creator-content">
<div data-ga-category="新年红包" id="root" style="width: 600px;height: 400px;overflow: hidden;position: relative"><div data-ga-event="高级版新年红包" data-ga-category="新年红包" style="display: flex;align-items: center;justify-content: center;position: absolute;left: 0px;top: 0px;width: 600px;height: 400px"><img style="width:100%;height:100%" src="&period;&sol;images&sol;1&period;png&quest;t&equals;1577671606229" /></div><div data-ga-event="高级版新年红包" data-ga-category="新年红包" style="display: flex;align-items: center;justify-content: center;position: absolute;left: 40px;top: 167px;width: 250px;height: 233px"><a class="anchor-mask" href="https://www.google.com" target="_blank" rel="noopenner noreferer"></a><img style="width:100%;height:100%" src="&period;&sol;images&sol;2&period;png&quest;t&equals;1577671606229" /></div><div data-ga-event="尊享版新年红包" data-ga-category="新年红包" style="display: flex;align-items: center;justify-content: center;position: absolute;left: 310px;top: 167px;width: 250px;height: 233px"><a class="anchor-mask" href="https://cn.bing.com/" target="_blank" rel="noopenner noreferer"></a><img style="width:100%;height:100%" src="&period;&sol;images&sol;3&period;png&quest;t&equals;1577671606229" /></div></div>
</div><!--content-->
<div class="any-creator-fixed-content">
<div id="fixedRoot" style="width: 600px;overflow: hidden;left: 0px;top: 0px"></div>
</div><!--fixed-content-->
%`;
var regex = /data-ga-event="(\S+)"\s+data-ga-category="(\S+)"\s+.*?href="(\S+)"/g;

var matches = regex.exec(input);
while (matches) {
    console.log(matches[1], matches[2], matches[3]);
    matches = regex.exec(input);
}
