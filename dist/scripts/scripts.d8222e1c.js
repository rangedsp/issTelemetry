"use strict";function data(a,b,c,d,e){return{id:a,name:b,min:c,max:d,value:e}}angular.module("clientApp",["ngAnimate","ngRoute","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/game",{templateUrl:"views/game.html",controller:"GameCtrl"}).otherwise({redirectTo:"/"})}]).run(["$route",function(){$(document.body).on("dragstart","img",function(a){a.preventDefault()}),$(document.body).on("mousedown",'[data-tapeffect="true"]',function(){$(this).addClass("tapped")}),$(document.body).on("mouseup",'[data-tapeffect="true"]',function(){$(this).removeClass("tapped")}),$(document.body).on("mouseleave",'[data-tapeffect="true"]',function(){$(this).removeClass("tapped")})}]),angular.module("clientApp").controller("MainCtrl",["$location",function(a){var b=this;b.play=function(){a.path("/game")}}]);var dataToTrack=[data("USLAB000035","Velocity X"),data("USLAB000036","Velocity Y"),data("USLAB000037","Velocity Z")];require(["LightstreamerClient","Subscription"],function(a,b){var c=new a("https://push.lightstreamer.com","ISSLIVE");c.connect();for(var d=[],e=0;e<dataToTrack.length;e++)d.push(dataToTrack[e].id);var f=new b("MERGE",d,["Value"]);c.subscribe(f),f.addListener({onItemUpdate:function(a){var b,c,d=$("#"+a.getItemName()).highcharts();d&&(b=d.series[0].points[0],c=parseFloat(a.getValue("Value")),(-1e4>c||c>1e4)&&(c=b.y),b.update(Math.round(100*c)/100))}})}),angular.module("clientApp").controller("GameCtrl",["$location",function(a){var b=this;b.gotoMap=function(){console.log("goto map")},b.speedDetails=dataToTrack,b.isShowingLivingQuarters=!1,b.isShowingProfile=!1,b.showLivingQuarters=function(){b.isShowingLivingQuarters=!0},b.hideLivingQuarters=function(){b.isShowingLivingQuarters=!1};for(var c={chart:{type:"solidgauge"},title:null,pane:{center:["50%","85%"],size:"140%",startAngle:-90,endAngle:90,background:{backgroundColor:Highcharts.theme&&Highcharts.theme.background2||"#EEE",innerRadius:"60%",outerRadius:"100%",shape:"arc"}},tooltip:{enabled:!1},yAxis:{stops:[[.1,"#55BF3B"],[.5,"#DDDF0D"],[.9,"#DF5353"]],lineWidth:0,minorTickInterval:null,tickPixelInterval:400,tickWidth:0,title:{y:-70},labels:{y:16}},plotOptions:{solidgauge:{dataLabels:{y:5,borderWidth:0,useHTML:!0}}}},d=0;d<dataToTrack.length;d++)$("#"+dataToTrack[d].id).highcharts(Highcharts.merge(c,{yAxis:{min:-1e4,max:1e4,title:{text:"Velocity X"}},credits:{enabled:!1},series:[{name:"Speed",data:[80],dataLabels:{format:'<div style="text-align:center"><span style="font-size:25px;color:'+(Highcharts.theme&&Highcharts.theme.contrastTextColor||"black")+'">{y}</span><br/><span style="font-size:12px;color:silver">m/s</span></div>'},tooltip:{valueSuffix:" m/s"}}]}))}]),angular.module("clientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);