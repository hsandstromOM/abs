function controller(){}function render(){return h("#honeyHex",[h(".homeHoneyThree",[h("a.honeyCombHome",{href:"/services/building-enclosure"},[h("img.overlayer",{src:"img/ABS-HomeHex-building-enclosure-green.png",style:"position:absolute;"}),h("img.honeyThumb",{src:"img/ABS-HomeHex-building-enclosure-hover.png"}),h("div.hexText",{style:"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"},[h("p",{style:"font-weight:bold;color:white;text-transform: uppercase"},"{{contentfulData.fields.services[0].fields.pageTitle}}")])]),h("a.honeyCombHome",{href:"/services/forensic-consulting"},[h("img.overlayer",{src:"img/ABS-HomeHex-forensic-consulting-green.png",style:"position:absolute;"}),h("img.honeyThumb",{src:"img/ABS-HomeHex-forensic-consulting-hover.png"}),h("div.hexText",{style:"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"},[h("p",{style:"font-weight:bold;color:white;text-transform: uppercase"},"{{contentfulData.fields.services[1].fields.pageTitle}}")])]),h("a.honeyCombHome",{href:"/services/life-safety-and-human-factors"},[h("img.overlayer",{src:"img/ABS-HomeHex-life-safety-human-factors-green.png",style:"position:absolute;"}),h("img.honeyThumb",{src:"img/ABS-HomeHex-life-safety-human-factors-hover.png"}),h("div.hexText",{style:"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"},[h("p",{style:"font-weight:bold;color:white;text-transform: uppercase"},"{{contentfulData.fields.services[2].fields.pageTitle}}")])])]),h(".homeHoneyTwo",[h("a.honeyCombHome",{href:"/services/architecture"},[h("img.overlayer",{src:"img/ABS-HomeHex-architecture-green.png",style:"position:absolute;"}),h("img.honeyThumb",{src:"img/ABS-HomeHex-architecture-hover.png"}),h("div.hexText",{style:"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"},[h("p",{style:"font-weight:bold;color:white;text-transform: uppercase;padding-top:17px"},"{{contentfulData.fields.services[3].fields.pageTitle}}")])]),h("a.honeyCombHome",{href:"/services/engineering"},[h("img.overlayer",{src:"img/ABS-HomeHex-engineering-green.png",style:"position:absolute;"}),h("img.honeyThumb",{src:"img/ABS-HomeHex-engineering-hover.png"}),h("div.hexText",{style:"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"},[h("p",{style:"font-weight:bold;color:white;text-transform: uppercase;padding-top:17px"},"{{contentfulData.fields.services[4].fields.pageTitle}}")])])])])}var h=require("hyperscript");module.exports=function(){return{template:render().outerHTML,controller:["$scope","contentful","store",controller]}};
