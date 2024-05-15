"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4708],{95306:function(b,f,e){var i=e(28730),s=e(57596),O=e(93236),D=e(13e3),M=e(62086),p=["fieldProps","min","proFieldProps","max"],T=function(n,o){var I=n.fieldProps,u=n.min,j=n.proFieldProps,P=n.max,L=(0,s.Z)(n,p);return(0,M.jsx)(D.Z,(0,i.Z)({valueType:"digit",fieldProps:(0,i.Z)({min:u,max:P},I),ref:o,filedConfig:{defaultProps:{width:"100%"}},proFieldProps:j},L))},c=O.forwardRef(T);f.Z=c},1536:function(b,f,e){var i=e(18534),s=e(28730),O=e(57596),D=e(65589),M=e(16941),p=e(42402),T=e(71770),c=e(93236),v=e(13e3),n=e(62086),o=["fieldProps","proFieldProps"],I=["fieldProps","proFieldProps"],u="text",j=function(r){var t=r.fieldProps,l=r.proFieldProps,a=(0,O.Z)(r,o);return(0,n.jsx)(v.Z,(0,s.Z)({valueType:u,fieldProps:t,filedConfig:{valueType:u},proFieldProps:l},a))},P=function(r){var t=(0,D.Z)(r.open||!1,{value:r.open,onChange:r.onOpenChange}),l=(0,i.Z)(t,2),a=l[0],x=l[1];return(0,n.jsx)(M.Z.Item,{shouldUpdate:!0,noStyle:!0,children:function(E){var m,h=E.getFieldValue(r.name||[]);return(0,n.jsx)(p.Z,(0,s.Z)((0,s.Z)({getPopupContainer:function(_){return _&&_.parentNode?_.parentNode:_},onOpenChange:x,content:(0,n.jsxs)("div",{style:{padding:"4px 0"},children:[(m=r.statusRender)===null||m===void 0?void 0:m.call(r,h),r.strengthText?(0,n.jsx)("div",{style:{marginTop:10},children:(0,n.jsx)("span",{children:r.strengthText})}):null]}),overlayStyle:{width:240},placement:"right"},r.popoverProps),{},{open:a,children:r.children}))}})},L=function(r){var t=r.fieldProps,l=r.proFieldProps,a=(0,O.Z)(r,I),x=(0,c.useState)(!1),Z=(0,i.Z)(x,2),E=Z[0],m=Z[1];return t!=null&&t.statusRender&&a.name?(0,n.jsx)(P,{name:a.name,statusRender:t==null?void 0:t.statusRender,popoverProps:t==null?void 0:t.popoverProps,strengthText:t==null?void 0:t.strengthText,open:E,onOpenChange:m,children:(0,n.jsx)(v.Z,(0,s.Z)({valueType:"password",fieldProps:(0,s.Z)((0,s.Z)({},(0,T.Z)(t,["statusRender","popoverProps","strengthText"])),{},{onBlur:function(W){var _;t==null||(_=t.onBlur)===null||_===void 0||_.call(t,W),m(!1)},onClick:function(W){var _;t==null||(_=t.onClick)===null||_===void 0||_.call(t,W),m(!0)}}),proFieldProps:l,filedConfig:{valueType:u}},a))}):(0,n.jsx)(v.Z,(0,s.Z)({valueType:"password",fieldProps:t,proFieldProps:l,filedConfig:{valueType:u}},a))},R=j;R.Password=L,R.displayName="ProFormComponent",f.Z=R},8019:function(b,f,e){var i=e(90228),s=e.n(i),O=e(87999),D=e.n(O),M=e(68110),p=e(93236),T=e(81384),c=e(37090),v=e(54885),n=e(62086),o=function(u){var j=v.A.useFormInstance(),P=(0,p.useRef)(null),L=function(){if(P.current){var d;j.setFieldValue(u.name,(d=P.current)===null||d===void 0?void 0:d.getContent())}};return(0,p.useEffect)(function(){!u.initialValue&&P.current&&P.current.setContent("")},[u.initialValue]),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)(v.A.Item,{hidden:!0,name:u.name}),(0,n.jsx)("div",{className:"mb-2",children:u.label}),(0,n.jsx)(T.M,{onChange:L,onInit:function(d,r){P.current=r},apiKey:"mn4nbwhddqp9jr1g1c3w17dkdu96ji7lr2fmolsncez1k3ng",init:{plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",toolbar:"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",file_picker_types:"file image media",file_picker_callback:function(d,r,t){if(t.filetype==="file"&&d("mypage.html",{text:"My text"}),t.filetype==="image"){var l=document.createElement("input");l.setAttribute("type","file"),l.setAttribute("accept","image/*"),l.addEventListener("change",function(){var a=D()(s()().mark(function x(Z){var E,m,h;return s()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return E=Z.target.files[0],m=new FormData,m.append("file",E),_.next=5,(0,c.request)("file/image/upload",{data:m,method:"POST"});case 5:h=_.sent,h&&(M.ZP.success("T\u1EA3i l\xEAn th\xE0nh c\xF4ng!"),d(h.url,{alt:"My alt text"}));case 7:case"end":return _.stop()}},x)}));return function(x){return a.apply(this,arguments)}}()),l.click()}t.filetype==="media"&&d("movie.mp4",{source2:"alt.ogg",poster:"image.jpg"})}},initialValue:u.initialValue})]})})};f.Z=o},432:function(b,f,e){e.r(f);var i=e(90228),s=e.n(i),O=e(87999),D=e.n(O),M=e(48305),p=e.n(M),T=e(8019),c=e(86857),v=e(69838),n=e(22717),o=e(21897),I=e(77097),u=e(98365),j=e(25283),P=e(1536),L=e(95306),R=e(37090),d=e(68110),r=e(55641),t=e(53739),l=e(93236),a=e(62086),x=function(){var E=(0,l.useRef)(),m=(0,l.useState)(!1),h=p()(m,2),W=h[0],_=h[1],S=(0,l.useRef)(),z=(0,l.useState)(),Q=p()(z,2),C=Q[0],$=Q[1],V=(0,R.useParams)(),N=V.id;(0,l.useEffect)(function(){if(C){var U;(U=E.current)===null||U===void 0||U.setFields([{name:"id",value:C.id},{name:"question",value:C.question},{name:"sortOrder",value:C.sortOrder},{name:"answer",value:C.answer}])}},[C]);var G=function(){var U=D()(s()().mark(function g(A){var F,y,H,B;return s()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:if(A.qaGroupId=N,!A.id){K.next=9;break}return K.next=4,(0,c.n_)(A);case 4:return d.ZP.success("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!"),(H=S.current)===null||H===void 0||H.reload(),_(!1),(B=E.current)===null||B===void 0||B.resetFields(),K.abrupt("return");case 9:return K.next=11,(0,c.zZ)(A);case 11:d.ZP.success("Th\xEAm th\xE0nh c\xF4ng!"),(F=S.current)===null||F===void 0||F.reload(),(y=E.current)===null||y===void 0||y.resetFields(),_(!1);case 15:case"end":return K.stop()}},g)}));return function(A){return U.apply(this,arguments)}}(),X=[{title:"#",valueType:"indexBorder",width:50,align:"center"},{title:"Ti\xEAu \u0111\u1EC1",dataIndex:"question"},{title:"Th\u1EE9 t\u1EF1",dataIndex:"sortOrder",width:100,align:"center",search:!1},{title:"Ng\xE0y t\u1EA1o",dataIndex:"createdDate",valueType:"dateTime",width:180,search:!1},{title:"Ng\xE0y c\u1EADp nh\u1EADt",dataIndex:"modifiedDate",valueType:"dateTime",width:180,search:!1},{title:"T\xE1c v\u1EE5",valueType:"option",render:function(g,A){return[(0,a.jsx)(r.ZP,{size:"small",icon:(0,a.jsx)(v.Z,{}),type:"primary",onClick:function(){$(A),_(!0)}},"edit"),(0,a.jsx)(t.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:D()(s()().mark(function F(){var y;return s()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,(0,c.kC)(A.id);case 2:d.ZP.success("X\xF3a th\xE0nh c\xF4ng!"),(y=S.current)===null||y===void 0||y.reload();case 4:case"end":return B.stop()}},F)})),children:(0,a.jsx)(r.ZP,{type:"primary",danger:!0,size:"small",icon:(0,a.jsx)(n.Z,{})})},"delete")]},width:120}];return(0,a.jsxs)(I._z,{extra:(0,a.jsx)(r.ZP,{type:"primary",icon:(0,a.jsx)(o.Z,{}),onClick:function(){var g;$(null),(g=E.current)===null||g===void 0||g.resetFields(),_(!0)},children:"T\u1EA1o c\xE2u h\u1ECFi"}),children:[(0,a.jsx)(u.Z,{request:function(g){return(0,c.$O)(g,N)},columns:X,actionRef:S,search:{layout:"vertical"}}),(0,a.jsxs)(j.Y,{open:W,onOpenChange:_,title:"C\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p",formRef:E,onFinish:G,children:[(0,a.jsx)(P.Z,{name:"id",hidden:!0}),(0,a.jsx)(P.Z,{name:"question",label:"N\u1ED9i dung c\xE2u h\u1ECFi",rules:[{required:!0}]}),(0,a.jsx)(T.Z,{label:"N\u1ED9i dung c\xE2u tr\u1EA3 l\u1EDDi",name:"answer",required:!0,initialValue:C==null?void 0:C.answer}),(0,a.jsx)(L.Z,{name:"sortOrder",label:"Th\u1EE9 t\u1EF1 hi\u1EC3n th\u1ECB"})]})]})};f.default=x},86857:function(b,f,e){e.d(f,{$O:function(){return p},Oo:function(){return D},eb:function(){return s},kC:function(){return v},n_:function(){return c},pk:function(){return M},s3:function(){return O},zZ:function(){return T}});var i=e(37090),s=function(o){return(0,i.request)("qa/add",{method:"POST",data:o})},O=function(o){return(0,i.request)("qa/update",{method:"POST",data:o})},D=function(o){return(0,i.request)("qa/delete/".concat(o),{method:"POST"})},M=function(o){return(0,i.request)("qa/list",{params:o})},p=function(o,I){return(0,i.request)("qa/item/list/".concat(I),{params:o})},T=function(o){return(0,i.request)("qa/item/add",{method:"POST",data:o})},c=function(o){return(0,i.request)("qa/item/update",{method:"POST",data:o})},v=function(o){return(0,i.request)("qa/item/delete/".concat(o),{method:"POST"})}}}]);
