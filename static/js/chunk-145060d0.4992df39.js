(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-145060d0"],{"6c9a":function(e,t,l){"use strict";l.r(t);var o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[l("el-form-item",{attrs:{label:"帳戶"}},[l("el-select",{attrs:{placeholder:"請選擇帳戶"},model:{value:e.form.nmae,callback:function(t){e.$set(e.form,"nmae",t)},expression:"form.nmae"}},[l("el-option",{attrs:{label:"現金(TWD)",value:"money"}}),l("el-option",{attrs:{label:"信用卡(TWD)",value:"card"}})],1)],1),l("el-form-item",{attrs:{label:"金額"}},[l("el-input",{staticStyle:{width:"280px"},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}})],1),l("el-form-item",{attrs:{label:"分類"}},[l("el-select",{attrs:{placeholder:"請選擇分類"},model:{value:e.form.region1,callback:function(t){e.$set(e.form,"region1",t)},expression:"form.region1"}},[l("el-option",{attrs:{label:"分類1",value:"abc1"}}),l("el-option",{attrs:{label:"分類2",value:"abc2"}})],1)],1),l("el-form-item",{attrs:{label:"子分類"}},[l("el-select",{attrs:{placeholder:"請選擇子分類"},model:{value:e.form.region2,callback:function(t){e.$set(e.form,"region2",t)},expression:"form.region2"}},[l("el-option",{attrs:{label:"子分類1",value:"abcd1"}}),l("el-option",{attrs:{label:"子分類2",value:"abcd2"}})],1)],1),l("el-form-item",{attrs:{label:"專案"}},[l("el-select",{attrs:{placeholder:"請選擇專案"},model:{value:e.form.row,callback:function(t){e.$set(e.form,"row",t)},expression:"form.row"}},[l("el-option",{attrs:{label:"row1",value:"money"}}),l("el-option",{attrs:{label:"row2",value:"card"}}),l("el-option",{attrs:{label:"row3",value:"card"}}),l("el-option",{attrs:{label:"row4",value:"card"}})],1)],1),l("el-form-item",{attrs:{label:"發票號碼"}},[l("el-col",{attrs:{span:1}},[l("el-input",{attrs:{placeholder:"xx"},model:{value:e.input6,callback:function(t){e.input6=t},expression:"input6"}})],1),l("el-col",{attrs:{span:1.5}},[l("el-tag",[e._v("-")])],1),l("el-col",{attrs:{span:3}},[l("el-input",{attrs:{placeholder:"00000000 "},model:{value:e.input7,callback:function(t){e.input7=t},expression:"input7 "}})],1)],1),l("el-form-item",{attrs:{label:"備註 "}},[l("el-input",{staticStyle:{width:"280px"},attrs:{type:"textarea"},model:{value:e.form.word,callback:function(t){e.$set(e.form,"word",t)},expression:"form.word "}})],1),l("el-form-item",[l("el-button",{attrs:{type:"primary "},on:{click:e.onSubmit}},[e._v("儲存")]),l("el-button",[e._v("取消")])],1)],1)],1)},a=[],r=(l("cadf"),l("551c"),l("097d"),{data:function(){return{form:{name:"",money:"",region1:"",region2:"",row:"",number:"",word:""}}},methods:{onSubmit:function(){console.log("submit!")}}}),n=r,i=l("2877"),s=l("9ef3"),c=Object(i["a"])(n,o,a,!1,null,null,null);"function"===typeof s["default"]&&Object(s["default"])(c),c.options.__file="index.vue";t["default"]=c.exports},"9ef3":function(e,t,l){"use strict";var o=l("a6f7"),a=l.n(o);t["default"]=a.a},a6f7:function(e,t){}}]);