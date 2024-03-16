"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7944],{86339:function(M,d,e){e.d(d,{Z:function(){return o}});var u=e(52643),s=e(68136),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},i=c,r=e(91471),_=function(m,l){return s.createElement(r.Z,(0,u.Z)({},m,{ref:l,icon:i}))},o=s.forwardRef(_)},55772:function(M,d,e){e.d(d,{Z:function(){return o}});var u=e(52643),s=e(68136),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"},i=c,r=e(91471),_=function(m,l){return s.createElement(r.Z,(0,u.Z)({},m,{ref:l,icon:i}))},o=s.forwardRef(_)},63027:function(M,d,e){e.r(d);var u=e(34827),s=e.n(u),c=e(24991),i=e(4870),r=e(46665),_=e(41605),o=e(15621),O=e(30339),m=e(78491),l=e(10483),h=e(68136),g=e(49799),A=e(25223),j=e(88821),I=e(55772),R=e(86339),f=e(58703),L=e(81068),B=e(59743),n=e(33130),X=c.Z.Option,y=function(){var U=(0,h.useState)([]),x=s()(U,2),K=x[0],S=x[1],W=(0,h.useState)(!1),Z=s()(W,2),p=Z[0],v=Z[1],F=(0,h.useState)([]),C=s()(F,2),V=C[0],z=C[1],H=i.Z.useForm(),N=s()(H,1),T=N[0];(0,h.useEffect)(function(){P()},[]);var P=function(){(0,f.request)("video/get-list").then(function(t){S(t)})};function b(){T.resetFields(),v(!0)}var Y=function(){v(!1)};function $(a){(0,f.request)("video/delete/".concat(a),{method:"DELETE"}).then(function(t){t.succeeded?(r.ZP.success(t.message),P()):r.ZP.error(t.message)})}function G(a){z([{name:["id"],value:a.id},{name:["name"],value:a.name},{name:["thumbnail"],value:a.thumbnail},{name:["url"],value:a.url}]),v(!0)}var J=function(t){var E="";t.index=Number(t.index),t.type=Number(t.type),t.id?E="video/update":E="video/add",(0,f.request)(E,{method:"POST",data:t}).then(function(D){D.succeeded?r.ZP.success(D.message):r.ZP.error(D.message),P()}),v(!1)},Q=[{title:"#",valueType:"indexBorder"},{title:"Name",render:function(t){return(0,n.jsx)(f.Link,{to:"/video/item/".concat(t.id),children:t.name})}},{title:"Url",dataIndex:"url"},{title:"",render:function(t){return(0,n.jsxs)(_.Z,{children:[(0,n.jsx)(o.ZP,{size:"small",type:"primary",icon:(0,n.jsx)(g.Z,{}),onClick:function(){return G(t)}}),(0,n.jsx)(O.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return $(t.id)},children:(0,n.jsx)(o.ZP,{size:"small",type:"primary",danger:!0,icon:(0,n.jsx)(A.Z,{})})})]})},valueType:"option"}];return(0,n.jsxs)(L._z,{extra:(0,n.jsx)(o.ZP,{type:"primary",icon:(0,n.jsx)(j.Z,{}),onClick:function(){return b()},children:"Th\xEAm"}),children:[(0,n.jsx)(B.Z,{search:{layout:"vertical"},dataSource:K,columns:Q,rowKey:"id",rowSelection:{}}),(0,n.jsx)(m.Z,{title:"C\xE0i \u0111\u1EB7t",placement:"right",closable:!1,onClose:Y,open:p,width:700,children:(0,n.jsxs)(i.Z,{onFinish:J,layout:"vertical",fields:V,form:T,children:[(0,n.jsx)(i.Z.Item,{hidden:!0,name:"id"}),(0,n.jsx)(i.Z.Item,{label:"Name",name:"name",children:(0,n.jsx)(l.Z,{})}),(0,n.jsx)(i.Z.Item,{label:"Thumbnail",name:"thumbnail",children:(0,n.jsx)(l.Z,{})}),(0,n.jsx)(i.Z.Item,{label:"Youtube Video Id",name:"url",children:(0,n.jsx)(l.Z,{})}),(0,n.jsx)(i.Z.Item,{children:(0,n.jsxs)(_.Z,{children:[(0,n.jsx)(o.ZP,{type:"primary",htmlType:"submit",icon:(0,n.jsx)(I.Z,{}),children:"Save"}),(0,n.jsx)(o.ZP,{htmlType:"button",icon:(0,n.jsx)(R.Z,{}),onClick:function(){return v(!1)},children:"Close"})]})})]})})]})};d.default=y}}]);
