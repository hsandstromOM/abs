function component(e,t,i,r,c,n,a){t.params.service?(e.page=t.params.service,e.currentServiceProvided=t.params.service,e.selectedService=t.params.service.fields.pageTitle,e.serviceDesc=t.params.service.fields.pageSpecificMetaDescriptionSeo,i.set("services",e.selectedService)):i.get("selectedServices")&&(e.currentServiceProvided=i.get("selectedServices"),e.selectedService=e.currentServiceProvided.fields.pageTitle,e.serviceDesc=e.currentServiceProvided.fields.pageSpecificMetaDescriptionSeo),e.allServicesProvided=[],e.slide={serviceNav:!0},e.mainPage="services",t.params.service?(e.currentService=t.params.service,e.page=e.currentService.fields.pageTitle,e.email=e.currentService.fields.contactPerson):i.get("selectedService")&&(e.currentService=i.get("selectedService"),e.page=e.currentService.fields.pageTitle,e.email=e.currentService.fields.contactPerson,e.selectedService=e.currentService.fields.pageTitle,e.serviceDesc=e.currentService.fields.pageSpecificMetaDescriptionSeo),n.scrollTo(0,0),r.entries("content_type=serviceTypes").then(function(t){var i=t.data.items[0];if(document.title=e.selectedService,i.fields.pageSpecificMetaDescriptionSeo)for(var r=document.getElementsByTagName("meta"),c=0;c<r.length;c++)"description"===r[c].name.toLowerCase()&&(r[c].content=e.serviceDesc)})}function render(){return h("div#servicesPage",[h("title",{attributes:{"ng-bind":"PageTitle.title()"}},"Serivces Page"),h("div.page-container",[h("div",{"data-navheader":"","data-mainPage":"mainPage","data-slide":"slide"}),h("div",{"data-ng-if":'currentService.fields.pageTitle === "Architecture"'},[h("div#bloc-1.bloc.bgc-white.bg-Architecture-Header2.d-bloc",{style:"max-height:100vh;"},[h("img.honeycomb-left",{src:"img/honeycomb_pattern.png",style:"max-height:350px;z-index:1;margin-left:-50px !important;"}),h("img.honeycomb-right",{src:"img/honeycomb.png",style:"max-height:540px;z-index:1;margin-right:-50px !important;"}),h("div.row",[h("div.col-sm-12",{style:"margin-top:-240px;"},[h("h4.mg-md.text-center.tc-white","SERVICES:"),h("h1.mg-md.text-center.tc-white","{{currentService.fields.pageTitle}}",{style:"text-transform:uppercase"})])])])]),h("div",{"data-ng-if":'currentService.fields.pageTitle === "Forensic Consulting"'},[h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-ForensicConsulting.d-bloc",{style:"max-height:100vh;"},[h("img.honeycomb-left",{src:"img/honeycomb_pattern.png",style:"max-height:350px;z-index:1;margin-left:-50px !important;"}),h("img.honeycomb-right",{src:"img/honeycomb.png",style:"max-height:540px;z-index:1;margin-right:-50px !important;"}),h("div.row",[h("div.col-sm-12",{style:"margin-top:-240px;"},[h("h4.mg-md.text-center.tc-white","SERVICES:"),h("h1.mg-md.text-center.tc-white","{{currentService.fields.pageTitle}}",{style:"text-transform:uppercase"})])])])]),h("div",{"data-ng-if":'currentService.fields.pageTitle === "Engineering"'},[h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-Engineering.d-bloc",{style:"max-height:100vh;"},[h("img.honeycomb-left",{src:"img/honeycomb_pattern.png",style:"max-height:350px;z-index:1;margin-left:-50px !important;"}),h("img.honeycomb-right",{src:"img/honeycomb.png",style:"max-height:540px;z-index:1;margin-right:-50px !important;"}),h("div.row",[h("div.col-sm-12",{style:"margin-top:-240px;"},[h("h4.mg-md.text-center.tc-white","SERVICES:"),h("h1.mg-md.text-center.tc-white","{{currentService.fields.pageTitle}}",{style:"text-transform:uppercase"})])])])]),h("div",{"data-ng-if":'currentService.fields.pageTitle === "Life Safety & Human Factors"'},[h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-LifeSafety.d-bloc",{style:"max-height:100vh;"},[h("img.honeycomb-left",{src:"img/honeycomb_pattern.png",style:"max-height:350px;z-index:1;margin-left:-50px !important;"}),h("img.honeycomb-right",{src:"img/honeycomb.png",style:"max-height:540px;z-index:1;margin-right:-50px !important;"}),h("div.row",[h("div.col-sm-12",{style:"margin-top:-240px;"},[h("h4.mg-md.text-center.tc-white","SERVICES:"),h("h1.mg-md.text-center.tc-white","{{currentService.fields.pageTitle}}",{style:"text-transform:uppercase"})])])])]),h("div",{"data-ng-if":'currentService.fields.pageTitle === "Building Enclosure"'},[h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-BuildingEnclosure.d-bloc",{style:"max-height:100vh;"},[h("img.honeycomb-left",{src:"img/honeycomb_pattern.png",style:"max-height:350px;z-index:1;margin-left:-50px !important;"}),h("img.honeycomb-right",{src:"img/honeycomb.png",style:"max-height:540px;z-index:1;margin-right:-50px !important;"}),h("div.row",[h("div.col-sm-12",{style:"margin-top:-240px;"},[h("h4.mg-md.text-center.tc-white","SERVICES:"),h("h1.mg-md.text-center.tc-white","{{currentService.fields.pageTitle}}",{style:"text-transform:uppercase"})])])])]),h("div.closeNav",[h("div#bloc-2.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white",{style:"background-color:#F6F6F6;-webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05)"},[h("div.container.bloc-lg",[h("div.hexagon.row",[h("div.col-md-4.col-cd-offset-1.col-xs-12.serv",[h("div#over",[h("span.Centerer"),h("img.hxImg.Centered",{style:"margin-top:-70px;",src:"img/doubleHoney.png"}),h("div.gallery-text.serv",{style:"margin-top:95px;"},[h("img.cIcon",{src:"img/contact_icon.png"}),h("h4.hextitle",["INTERESTED IN",h("br"),"WORKING TOGETHER?"]),h("h5.hexname.tk-aaux-next","{{currentService.fields.contactPerson.fields.name}} {{currentService.fields.contactPerson.fields.lastName}},"),h("p","{{currentService.fields.contactPerson.fields.certificationsAndLicenses}}"),h("a.tk-aaux-next",{"data-ng-href":"mailto:{{currentService.fields.contactPerson.fields.emailAddress}}",style:"text-transform:uppercase"},"EMAIL {{currentService.fields.contactPerson.fields.name}}")])])]),h(".col-md-7.col-xs-12",[h("p.text-left",{"data-marked":"currentService.fields.description"}),h("br"),h("br")])])])])])]),h("div",{"data-footermenu":""})])}var h=require("hyperscript"),headerNav=require("./shared/headerNav"),footer=require("./shared/footer");module.exports={url:"/services/:slug",template:render().outerHTML,controller:["$scope","$state","store","contentful","$uibModal","$window",component],params:{service:null,slug:null}};
