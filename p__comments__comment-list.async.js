"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[974],{96534:function(Y,a,t){t.r(a),t.d(a,{default:function(){return j}});var h=t(48305),v=t.n(h),d=t(68110),i=t(55641),D=t(14292),P=t(53739),x=t(89035),c=t(93236),E=t(22717),l=function(s){return s[s.PENDING=0]="PENDING",s[s.PUBLISHED=1]="PUBLISHED",s[s.DELETED=2]="DELETED",s}({}),g=t(11333),N=t.n(g),u=t(37090),r=t(62086);function j(){var s=(0,c.useState)([]),f=v()(s,2),I=f[0],L=f[1];(0,c.useEffect)(function(){o()},[]);function o(){(0,u.request)("comment/get-list").then(function(e){L(e)})}function T(e){(0,u.request)("comment/delete/".concat(e),{method:"DELETE"}).then(function(n){n.succeeded&&o()})}function Z(e){e.status=l.PUBLISHED,(0,u.request)("/api/comment/change-status",{method:"POST",data:e}).then(function(n){n.succeeded?(o(),d.ZP.success(n.message)):d.ZP.error(n.error)})}function y(e){switch(e){case l.PENDING:return"Pending";default:return"Published"}}var S=[{title:"Id",render:function(n,m,C){return C+1}},{title:"Status",render:function(n){return(0,r.jsx)(i.ZP,{size:"small",danger:n.status===0,disabled:n.status===1,onClick:function(){return Z(n)},children:y(n.status)})}},{title:"Date",render:function(n){return N()(n.createdDate).format("DD/MM/YYYY hh:mm:ss")}},{title:"Content",dataIndex:"content"},{title:"",render:function(n){return(0,r.jsx)(D.Z,{children:(0,r.jsx)(P.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return T(n.id)},children:(0,r.jsx)(i.ZP,{type:"primary",danger:!0,icon:(0,r.jsx)(E.Z,{})})})})}}];return(0,r.jsx)("div",{className:"p-4 rounded bg-white",children:(0,r.jsx)(x.Z,{dataSource:I,columns:S,rowSelection:{},rowKey:"id"})})}}}]);
