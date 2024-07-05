"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3659],{24706:function(W,p,e){var d=e(28730),s=e(57596),x=e(1253),i=e(93236),v=e(29984),l=e(23959),u=e(62086),C=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","showSearch","options"],m=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","options"],Z=function(c,O){var f=c.fieldProps,T=c.children,j=c.params,y=c.proFieldProps,B=c.mode,A=c.valueEnum,M=c.request,D=c.showSearch,F=c.options,I=(0,s.Z)(c,C),V=(0,i.useContext)(v.Z);return(0,u.jsx)(l.Z,(0,d.Z)((0,d.Z)({valueEnum:(0,x.h)(A),request:M,params:j,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,d.Z)({options:F,mode:B,showSearch:D,getPopupContainer:V.getPopupContainer},f),ref:O,proFieldProps:y},I),{},{children:T}))},G=i.forwardRef(function(h,c){var O=h.fieldProps,f=h.children,T=h.params,j=h.proFieldProps,y=h.mode,B=h.valueEnum,A=h.request,M=h.options,D=(0,s.Z)(h,m),F=(0,d.Z)({options:M,mode:y||"multiple",labelInValue:!0,showSearch:!0,suffixIcon:null,autoClearSearchValue:!0,optionLabelProp:"label"},O),I=(0,i.useContext)(v.Z);return(0,u.jsx)(l.Z,(0,d.Z)((0,d.Z)({valueEnum:(0,x.h)(B),request:A,params:T,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,d.Z)({getPopupContainer:I.getPopupContainer},F),ref:c,proFieldProps:j},D),{},{children:f}))}),U=i.forwardRef(Z),R=G,S=U;S.SearchSelect=R,S.displayName="ProFormComponent",p.Z=S},47781:function(W,p,e){e.r(p),e.d(p,{default:function(){return le}});var d=e(26068),s=e.n(d),x=e(48305),i=e.n(x),v=e(76477),l=e(68110),u=e(1904),C=e(14292),m=e(55641),Z=e(53739),G=e(29690),U=e(47686),R=e(16941),S=e(69534),h=e(97146),c=e(58925),O=e(43772),f=e(93236),T=e(35411),j=e(69838),y=e(22717),B=e(21897),A=e(48063),M={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},D=M,F=e(38782),I=function(Y,N){return f.createElement(F.Z,(0,A.Z)({},Y,{ref:N,icon:D}))},V=f.forwardRef(I),E=e(37090),re=e(77097),b=e(98365),oe=e(24706),K=e(42389),Q=e(24327),t=e(62086),se=v.Z.TextArea,ie=function(){var Y=(0,f.useState)(!1),N=i()(Y,2),$=N[0],w=N[1],de=(0,f.useState)(!1),k=i()(de,2),ce=k[0],L=k[1],ve=(0,f.useState)(0),q=i()(ve,2),_=q[0],me=q[1],he=(0,f.useState)(),ee=i()(he,2),n=ee[0],P=ee[1],fe=(0,f.useState)(!1),te=i()(fe,2),ne=te[0],X=te[1],z=(0,f.useRef)(),ae=(0,f.useRef)(),H=(0,E.useIntl)();function ge(o){(0,E.request)("category/update",{data:o,method:"POST"}).then(function(a){var r;l.ZP.success(a.message),(r=z.current)===null||r===void 0||r.reload(),L(!1)})}var pe=function(){n.language=(0,K.dK)(H.locale),n.isDisplayOnHome=ne,n.id?ge(n):(0,E.request)("category/add",{method:"POST",data:n}).then(function(a){if(a.succeeded){var r;l.ZP.success(a.message),(r=z.current)===null||r===void 0||r.reload(),L(!1)}else l.ZP.error(a.message)})},xe=function(){X(!1),L(!0),P({})},Pe=function(a){X(a.isDisplayOnHome),P(a),L(!0)};function Ce(o){(0,E.request)("category/delete/".concat(o),{method:"POST"}).then(function(a){if(a.succeeded){var r;(r=z.current)===null||r===void 0||r.reload(),l.ZP.success("Success!")}else l.ZP.error(a.message)})}function Ze(o,a){(0,E.request)("category/remove-post",{method:"POST",data:{categoryId:o,postId:a}}).then(function(r){r.succeeded&&l.ZP.success("succeeded!")})}function Ee(o,a){a?o.status=1:o.status=0,(0,E.request)("category/active",{method:"POST",data:o}).then(function(r){var g;l.ZP.success(r.message),(g=z.current)===null||g===void 0||g.reload()})}var je=[{title:"T\xEAn danh m\u1EE5c",dataIndex:"name"},{title:"S\u1ED1 b\xE0i \u0111\u0103ng",dataIndex:"count",search:!1,width:100,align:"right",valueType:"digit"},{title:"Tr\u1EA1ng th\xE1i",render:function(a){return(0,t.jsx)(u.Z,{size:"small",defaultChecked:a.status===1,onChange:function(g){return Ee(a,g)}})},width:100,align:"center",search:!1},{title:"T\xE1c v\u1EE5",valueType:"option",render:function(a,r){return(0,t.jsxs)(C.Z,{children:[(0,t.jsx)(m.ZP,{type:"primary",size:"small",icon:(0,t.jsx)(T.Z,{}),onClick:function(){var J;P(r),w(!0),(J=ae.current)===null||J===void 0||J.reload()}}),(0,t.jsx)(m.ZP,{size:"small",icon:(0,t.jsx)(j.Z,{}),onClick:function(){return Pe(r)}}),(0,t.jsx)(Z.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return Ce(r.id)},children:(0,t.jsx)(m.ZP,{type:"primary",size:"small",danger:!0,icon:(0,t.jsx)(y.Z,{})})})]})},width:100}],ye=[{title:"#",valueType:"indexBorder",width:50},{title:"B\xE0i \u0111\u0103ng",dataIndex:"title"},{title:"T\xE1c v\u1EE5",render:function(a,r){return[(0,t.jsx)(E.Link,{to:"/post/setting/".concat(r.id),children:(0,t.jsx)(m.ZP,{type:"primary",icon:(0,t.jsx)(j.Z,{}),size:"small"})},"edit"),(0,t.jsx)(Z.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:function(){return Ze(_,r.id)},children:(0,t.jsx)(m.ZP,{type:"primary",danger:!0,icon:(0,t.jsx)(y.Z,{}),size:"small"})},"delete")]},valueType:"option"}];return(0,t.jsxs)(re._z,{extra:(0,t.jsxs)(C.Z,{className:"mb-2",children:[(0,t.jsx)(m.ZP,{type:"primary",icon:(0,t.jsx)(B.Z,{}),onClick:xe,children:"T\u1EA1o m\u1EDBi"}),(0,t.jsx)(m.ZP,{icon:(0,t.jsx)(V,{}),onClick:function(){return me(0)},hidden:_===0,children:"Quay l\u1EA1i"})]}),children:[(0,t.jsx)(b.Z,{search:{layout:"vertical"},columns:je,rowKey:"id",request:function(a){return(0,Q.RQ)(s()(s()({},a),{},{language:(0,K.dK)(H.locale)}))}}),(0,t.jsx)(G.Z,{title:n==null?void 0:n.name,placement:"right",closable:!1,onClose:function(){return w(!$)},open:$,width:960,children:(0,t.jsx)(b.Z,{ghost:!0,search:{layout:"vertical"},actionRef:ae,request:function(a){return(0,Q.H5)(s()(s()({},a),{},{language:(0,K.dK)(H.locale),categoryId:n==null?void 0:n.id}))},columns:ye,rowKey:"id"})}),(0,t.jsx)(U.Z,{title:(n==null?void 0:n.name)||"Danh m\u1EE5c",open:ce,onOk:pe,onCancel:function(){return L(!1)},width:600,children:(0,t.jsx)(R.Z,{layout:"vertical",children:(0,t.jsxs)(S.Z,{gutter:16,children:[(0,t.jsxs)(h.Z,{span:12,children:[(0,t.jsx)("div",{children:"T\xEAn danh m\u1EE5c:"}),(0,t.jsx)(v.Z,{className:"mb-2",value:n==null?void 0:n.name,onChange:function(a){return P(function(r){return s()(s()({},r),{},{name:a.target.value})})}}),(0,t.jsx)("div",{children:"Icon:"}),(0,t.jsx)(v.Z,{className:"mb-2",value:n==null?void 0:n.icon,onChange:function(a){return P(function(r){return s()(s()({},r),{},{icon:a.target.value})})}}),(0,t.jsx)(R.Z.Item,{label:"Normalize Name",tooltip:"D\xF9ng l\xE0m key cho \u0111a ng\xF4n ng\u1EEF",rules:[{required:!0,message:"Vui l\xF2ng nh\u1EADp!"}],children:(0,t.jsx)(v.Z,{className:"mb-2",value:n==null?void 0:n.url,onChange:function(a){return P(function(r){return s()(s()({},r),{},{normalizeName:a.target.value})})}})}),(0,t.jsx)(oe.Z,{label:"Danh m\u1EE5c cha",name:"parentId",request:function(a){return(0,Q.rH)(s()(s()({},a),{},{language:(0,K.dK)(H.locale)}))}}),(0,t.jsx)("div",{children:"M\xF4 t\u1EA3:"}),(0,t.jsx)(se,{className:"mb-2",value:n==null?void 0:n.description,onChange:function(a){return P(function(r){return s()(s()({},r),{},{description:a.target.value})})}})]}),(0,t.jsxs)(h.Z,{span:12,children:[(0,t.jsx)("div",{children:"Thumbnail:"}),(0,t.jsx)(v.Z,{className:"mb-2",value:n==null?void 0:n.thumbnail,onChange:function(a){return P(function(r){return s()(s()({},r),{},{thumbnail:a.target.value})})}}),n!=null&&n.thumbnail?(0,t.jsx)("img",{src:n==null?void 0:n.thumbnail,alt:n==null?void 0:n.name,className:"w-full object-fit-cover",height:138}):(0,t.jsx)(c.Z,{}),(0,t.jsx)("div",{children:(0,t.jsx)(O.Z,{onChange:function(a){return X(a.target.checked)},checked:ne,children:"Hi\u1EC3n th\u1ECB tr\xEAn trang ch\u1EE7"})})]})]})})})]})},le=ie},24327:function(W,p,e){e.d(p,{H5:function(){return v},RQ:function(){return x},eW:function(){return s},rH:function(){return i}});var d=e(37090),s=function(u){return(0,d.request)("category/options",{params:u})},x=function(u){return(0,d.request)("category/list",{params:u})},i=function(u){return(0,d.request)("category/parent/options",{params:u})},v=function(u){return(0,d.request)("category/posts",{params:u})}},42389:function(W,p,e){e.d(p,{dK:function(){return s},gB:function(){return x}});function d(i){return i.trim()}function s(i){return i?i==="vi-VN"?1:2:1}function x(i){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,u=v?1e3:1024;if(Math.abs(i)<u)return i+" B";var C=v?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],m=-1,Z=Math.pow(10,l);do i/=u,++m;while(Math.round(Math.abs(i)*Z)/Z>=u&&m<C.length-1);return i.toFixed(l)+" "+C[m]}}}]);
