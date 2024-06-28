"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[770],{95306:function(b,p,e){var s=e(28730),i=e(57596),m=e(93236),c=e(13e3),D=e(62086),E=["fieldProps","min","proFieldProps","max"],d=function(t,_){var M=t.fieldProps,f=t.min,L=t.proFieldProps,U=t.max,j=(0,i.Z)(t,E);return(0,D.jsx)(c.Z,(0,s.Z)({valueType:"digit",fieldProps:(0,s.Z)({min:f,max:U},M),ref:_,filedConfig:{defaultProps:{width:"100%"}},proFieldProps:L},j))},T=m.forwardRef(d);p.Z=T},1536:function(b,p,e){var s=e(18534),i=e(28730),m=e(57596),c=e(65589),D=e(16941),E=e(42402),d=e(71770),T=e(93236),v=e(13e3),t=e(62086),_=["fieldProps","proFieldProps"],M=["fieldProps","proFieldProps"],f="text",L=function(a){var n=a.fieldProps,l=a.proFieldProps,r=(0,m.Z)(a,_);return(0,t.jsx)(v.Z,(0,i.Z)({valueType:f,fieldProps:n,filedConfig:{valueType:f},proFieldProps:l},r))},U=function(a){var n=(0,c.Z)(a.open||!1,{value:a.open,onChange:a.onOpenChange}),l=(0,s.Z)(n,2),r=l[0],K=l[1];return(0,t.jsx)(D.Z.Item,{shouldUpdate:!0,noStyle:!0,children:function(u){var P,B=u.getFieldValue(a.name||[]);return(0,t.jsx)(E.Z,(0,i.Z)((0,i.Z)({getPopupContainer:function(o){return o&&o.parentNode?o.parentNode:o},onOpenChange:K,content:(0,t.jsxs)("div",{style:{padding:"4px 0"},children:[(P=a.statusRender)===null||P===void 0?void 0:P.call(a,B),a.strengthText?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("span",{children:a.strengthText})}):null]}),overlayStyle:{width:240},placement:"right"},a.popoverProps),{},{open:r,children:a.children}))}})},j=function(a){var n=a.fieldProps,l=a.proFieldProps,r=(0,m.Z)(a,M),K=(0,T.useState)(!1),y=(0,s.Z)(K,2),u=y[0],P=y[1];return n!=null&&n.statusRender&&r.name?(0,t.jsx)(U,{name:r.name,statusRender:n==null?void 0:n.statusRender,popoverProps:n==null?void 0:n.popoverProps,strengthText:n==null?void 0:n.strengthText,open:u,onOpenChange:P,children:(0,t.jsx)(v.Z,(0,i.Z)({valueType:"password",fieldProps:(0,i.Z)((0,i.Z)({},(0,d.Z)(n,["statusRender","popoverProps","strengthText"])),{},{onBlur:function(W){var o;n==null||(o=n.onBlur)===null||o===void 0||o.call(n,W),P(!1)},onClick:function(W){var o;n==null||(o=n.onClick)===null||o===void 0||o.call(n,W),P(!0)}}),proFieldProps:l,filedConfig:{valueType:f}},r))}):(0,t.jsx)(v.Z,(0,i.Z)({valueType:"password",fieldProps:n,proFieldProps:l,filedConfig:{valueType:f}},r))},Z=L;Z.Password=j,Z.displayName="ProFormComponent",p.Z=Z},48851:function(b,p,e){e.r(p);var s=e(90228),i=e.n(s),m=e(87999),c=e.n(m),D=e(48305),E=e.n(D),d=e(86857),T=e(35411),v=e(69838),t=e(22717),_=e(21897),M=e(77097),f=e(98365),L=e(25283),U=e(1536),j=e(95306),Z=e(37090),A=e(68110),a=e(55641),n=e(53739),l=e(93236),r=e(62086),K=function(){var u=(0,l.useRef)(),P=(0,l.useState)(!1),B=E()(P,2),W=B[0],o=B[1],S=(0,l.useRef)(),N=(0,l.useState)(),H=E()(N,2),F=H[0],$=H[1];(0,l.useEffect)(function(){if(F){var C;(C=u.current)===null||C===void 0||C.setFields([{name:"id",value:F.id},{name:"title",value:F.title},{name:"sortOrder",value:F.sortOrder}])}},[F]);var z=function(){var C=c()(i()().mark(function R(O){var x,g,Q,h;return i()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:if(!O.id){I.next=8;break}return I.next=3,(0,d.s3)(O);case 3:return A.ZP.success("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!"),(Q=S.current)===null||Q===void 0||Q.reload(),o(!1),(h=u.current)===null||h===void 0||h.resetFields(),I.abrupt("return");case 8:return I.next=10,(0,d.eb)(O);case 10:A.ZP.success("Th\xEAm th\xE0nh c\xF4ng!"),(x=S.current)===null||x===void 0||x.reload(),(g=u.current)===null||g===void 0||g.resetFields(),o(!1);case 14:case"end":return I.stop()}},R)}));return function(O){return C.apply(this,arguments)}}(),G=[{title:"#",valueType:"indexBorder",width:50,align:"center"},{title:"Nh\xF3m c\xE2u h\u1ECFi",dataIndex:"title"},{title:"Th\u1EE9 t\u1EF1",dataIndex:"sortOrder",width:100,align:"center",search:!1},{title:"Ng\xE0y t\u1EA1o",dataIndex:"createdDate",valueType:"dateTime",width:180,search:!1},{title:"Ng\xE0y c\u1EADp nh\u1EADt",dataIndex:"modifiedDate",valueType:"dateTime",width:180,search:!1},{title:"T\xE1c v\u1EE5",valueType:"option",render:function(R,O){return[(0,r.jsx)(a.ZP,{type:"primary",size:"small",icon:(0,r.jsx)(T.Z,{}),onClick:function(){return Z.history.push("/post/qa/item/".concat(O.id))}},"detail"),(0,r.jsx)(a.ZP,{size:"small",icon:(0,r.jsx)(v.Z,{}),onClick:function(){$(O),o(!0)}},"edit"),(0,r.jsx)(n.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:c()(i()().mark(function x(){var g;return i()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,(0,d.Oo)(O.id);case 2:A.ZP.success("X\xF3a th\xE0nh c\xF4ng!"),(g=S.current)===null||g===void 0||g.reload();case 4:case"end":return h.stop()}},x)})),children:(0,r.jsx)(a.ZP,{type:"primary",danger:!0,size:"small",icon:(0,r.jsx)(t.Z,{})})},"delete")]},width:120}];return(0,r.jsxs)(M._z,{extra:(0,r.jsx)(a.ZP,{type:"primary",icon:(0,r.jsx)(_.Z,{}),onClick:function(){var R;$(null),(R=u.current)===null||R===void 0||R.resetFields(),o(!0)},children:"T\u1EA1o nh\xF3m c\xE2u h\u1ECFi"}),children:[(0,r.jsx)(f.Z,{request:d.pk,columns:G,actionRef:S,search:{layout:"vertical"}}),(0,r.jsxs)(L.Y,{open:W,onOpenChange:o,title:"C\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p",formRef:u,onFinish:z,children:[(0,r.jsx)(U.Z,{name:"id",hidden:!0}),(0,r.jsx)(U.Z,{name:"title",label:"Ti\xEAu \u0111\u1EC1",rules:[{required:!0}]}),(0,r.jsx)(j.Z,{name:"sortOrder",label:"Th\u1EE9 t\u1EF1 hi\u1EC3n th\u1ECB"})]})]})};p.default=K},86857:function(b,p,e){e.d(p,{$O:function(){return E},Oo:function(){return c},eb:function(){return i},kC:function(){return v},n_:function(){return T},pk:function(){return D},s3:function(){return m},zZ:function(){return d}});var s=e(37090),i=function(_){return(0,s.request)("qa/add",{method:"POST",data:_})},m=function(_){return(0,s.request)("qa/update",{method:"POST",data:_})},c=function(_){return(0,s.request)("qa/delete/".concat(_),{method:"POST"})},D=function(_){return(0,s.request)("qa/list",{params:_})},E=function(_,M){return(0,s.request)("qa/item/list/".concat(M),{params:_})},d=function(_){return(0,s.request)("qa/item/add",{method:"POST",data:_})},T=function(_){return(0,s.request)("qa/item/update",{method:"POST",data:_})},v=function(_){return(0,s.request)("qa/item/delete/".concat(_),{method:"POST"})}}}]);