"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6341],{24706:function(J,y,e){var o=e(28730),u=e(57596),M=e(1253),p=e(93236),x=e(29984),E=e(23959),L=e(62086),c=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","showSearch","options"],h=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","options"],d=function(m,U){var s=m.fieldProps,l=m.children,t=m.params,i=m.proFieldProps,f=m.mode,A=m.valueEnum,S=m.request,F=m.showSearch,O=m.options,T=(0,u.Z)(m,c),C=(0,p.useContext)(x.Z);return(0,L.jsx)(E.Z,(0,o.Z)((0,o.Z)({valueEnum:(0,M.h)(A),request:S,params:t,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,o.Z)({options:O,mode:f,showSearch:F,getPopupContainer:C.getPopupContainer},s),ref:U,proFieldProps:i},T),{},{children:l}))},_=p.forwardRef(function(v,m){var U=v.fieldProps,s=v.children,l=v.params,t=v.proFieldProps,i=v.mode,f=v.valueEnum,A=v.request,S=v.options,F=(0,u.Z)(v,h),O=(0,o.Z)({options:S,mode:i||"multiple",labelInValue:!0,showSearch:!0,suffixIcon:null,autoClearSearchValue:!0,optionLabelProp:"label"},U),T=(0,p.useContext)(x.Z);return(0,L.jsx)(E.Z,(0,o.Z)((0,o.Z)({valueEnum:(0,M.h)(f),request:A,params:l,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,o.Z)({getPopupContainer:T.getPopupContainer},O),ref:m,proFieldProps:t},F),{},{children:s}))}),r=p.forwardRef(d),Z=_,j=r;j.SearchSelect=Z,j.displayName="ProFormComponent",y.Z=j},14123:function(J,y,e){var o=e(28730),u=e(57596),M=e(93236),p=e(23959),x=e(62086),E=["fieldProps","proFieldProps"],L=function(h,d){var _=h.fieldProps,r=h.proFieldProps,Z=(0,u.Z)(h,E);return(0,x.jsx)(p.Z,(0,o.Z)({ref:d,valueType:"textarea",fieldProps:_,proFieldProps:r},Z))};y.Z=M.forwardRef(L)},1536:function(J,y,e){var o=e(18534),u=e(28730),M=e(57596),p=e(65589),x=e(16941),E=e(42402),L=e(71770),c=e(93236),h=e(23959),d=e(62086),_=["fieldProps","proFieldProps"],r=["fieldProps","proFieldProps"],Z="text",j=function(l){var t=l.fieldProps,i=l.proFieldProps,f=(0,M.Z)(l,_);return(0,d.jsx)(h.Z,(0,u.Z)({valueType:Z,fieldProps:t,filedConfig:{valueType:Z},proFieldProps:i},f))},v=function(l){var t=(0,p.Z)(l.open||!1,{value:l.open,onChange:l.onOpenChange}),i=(0,o.Z)(t,2),f=i[0],A=i[1];return(0,d.jsx)(x.Z.Item,{shouldUpdate:!0,noStyle:!0,children:function(F){var O,T=F.getFieldValue(l.name||[]);return(0,d.jsx)(E.Z,(0,u.Z)((0,u.Z)({getPopupContainer:function(P){return P&&P.parentNode?P.parentNode:P},onOpenChange:A,content:(0,d.jsxs)("div",{style:{padding:"4px 0"},children:[(O=l.statusRender)===null||O===void 0?void 0:O.call(l,T),l.strengthText?(0,d.jsx)("div",{style:{marginTop:10},children:(0,d.jsx)("span",{children:l.strengthText})}):null]}),overlayStyle:{width:240},placement:"right"},l.popoverProps),{},{open:f,children:l.children}))}})},m=function(l){var t=l.fieldProps,i=l.proFieldProps,f=(0,M.Z)(l,r),A=(0,c.useState)(!1),S=(0,o.Z)(A,2),F=S[0],O=S[1];return t!=null&&t.statusRender&&f.name?(0,d.jsx)(v,{name:f.name,statusRender:t==null?void 0:t.statusRender,popoverProps:t==null?void 0:t.popoverProps,strengthText:t==null?void 0:t.strengthText,open:F,onOpenChange:O,children:(0,d.jsx)(h.Z,(0,u.Z)({valueType:"password",fieldProps:(0,u.Z)((0,u.Z)({},(0,L.Z)(t,["statusRender","popoverProps","strengthText"])),{},{onBlur:function(C){var P;t==null||(P=t.onBlur)===null||P===void 0||P.call(t,C),O(!1)},onClick:function(C){var P;t==null||(P=t.onClick)===null||P===void 0||P.call(t,C),O(!0)}}),proFieldProps:i,filedConfig:{valueType:Z}},f))}):(0,d.jsx)(h.Z,(0,u.Z)({valueType:"password",fieldProps:t,proFieldProps:i,filedConfig:{valueType:Z}},f))},U=j;U.Password=m,U.displayName="ProFormComponent",y.Z=U},71606:function(J,y,e){var o=e(15558),u=e.n(o),M=e(90228),p=e.n(M),x=e(87999),E=e.n(x),L=e(48305),c=e.n(L),h=e(77642),d=e(23318),_=e(40292),r=e(68110),Z=e(47686),j=e(53240),v=e(76477),m=e(38844),U=e(93236),s=e(62086),l=function(i){var f=(0,U.useState)(""),A=c()(f,2),S=A[0],F=A[1],O=(0,U.useState)([]),T=c()(O,2),C=T[0],P=T[1],w=(0,U.useState)(!1),a=c()(w,2),k=a[0],X=a[1];function q(g){var n;try{n=new URL(g)}catch(B){return!1}return n.protocol==="https:"}var ee=function(){var g=E()(p()().mark(function n(){var B,I;return p()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:if(!(C.length>0)){D.next=15;break}return B=new FormData,C.forEach(function(K){B.append("file",K)}),X(!0),D.next=6,(0,h.IO)(B);case 6:if(I=D.sent,X(!1),I.succeeded){D.next=11;break}return r.ZP.error(I.message),D.abrupt("return");case 11:return P([]),i.onFinish(I),i.onCancel(),D.abrupt("return");case 15:if(q(S)){D.next=18;break}return r.ZP.error("Sorry, URL failed to upload."),D.abrupt("return");case 18:i.onFinish({url:S,succeeded:!0}),F(""),i.onCancel();case 21:case"end":return D.stop()}},n)}));return function(){return g.apply(this,arguments)}}();return(0,s.jsxs)(Z.Z,{open:i.open,onCancel:function(){return i.onCancel()},centered:!0,title:"Upload",onOk:ee,confirmLoading:k,children:[(0,s.jsx)("div",{className:"mb-4",children:(0,s.jsxs)(m.Z,{fileList:C,onRemove:function(n){var B=C.indexOf(n),I=C.slice();I.splice(B,1),P(I)},beforeUpload:function(n){return P([].concat(u()(C),[n])),!1},maxCount:1,children:[(0,s.jsx)("p",{className:"ant-upload-drag-icon",children:(0,s.jsx)(d.Z,{})}),(0,s.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"}),(0,s.jsx)("p",{className:"ant-upload-hint",children:"Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files."})]})}),(0,s.jsx)("div",{className:"text-center",children:(0,s.jsxs)("div",{className:"font-medium flex items-center gap-2 justify-center text-blue-500 text-base",children:[" ",(0,s.jsx)(_.Z,{})," Choose from your computer"]})}),(0,s.jsx)(j.Z,{children:"or"}),(0,s.jsx)(v.Z,{placeholder:"Paste image or URL",onChange:function(n){return F(n.currentTarget.value)}})]})};y.Z=l},87716:function(J,y,e){e.r(y),e.d(y,{default:function(){return ee}});var o=e(26068),u=e.n(o),M=e(48305),p=e.n(M),x=e(68110),E=e(55641),L=e(53739),c=e(93236),h=e(69838),d=e(22717),_=e(21897),r=e(77097),Z=e(98365),j=e(37090),v=function(n){return(0,j.request)("partner/".concat(n))},m=function(n){return(0,j.request)("partner/list",{params:n})},U=function(n){return(0,j.request)("partner/".concat(n),{method:"DELETE"})},s=function(n){return(0,j.request)("partner/add",{method:"POST",data:n})},l=function(n){return(0,j.request)("partner/update",{method:"POST",data:n})},t=e(90228),i=e.n(t),f=e(87999),A=e.n(f),S=e(71606),F=e(38444),O=e(88512),T=e(1536),C=e(14123),P=e(24706),w=e(19991),a=e(62086),k=function(n){var B=n.open,I=n.setOpen,b=n.id,D=n.actionRef,K=(0,c.useRef)(),te=(0,c.useState)(""),Q=p()(te,2),z=Q[0],Y=Q[1],re=(0,c.useState)(!1),V=p()(re,2),H=V[0],G=V[1];(0,c.useEffect)(function(){if(b)v(b).then(function(R){var W;(W=K.current)===null||W===void 0||W.setFields([{name:"id",value:R.id},{name:"name",value:R.name},{name:"logo",value:R.logo},{name:"description",value:R.description},{name:"url",value:R.url},{name:"status",value:R.status}]),Y(R.logo)});else{var N;(N=K.current)===null||N===void 0||N.resetFields(),Y("")}},[b]);var ne=function(){var N=A()(i()().mark(function R(W){var ae,oe;return i()().wrap(function($){for(;;)switch($.prev=$.next){case 0:if(!b){$.next=5;break}return $.next=3,l(W);case 3:$.next=7;break;case 5:return $.next=7,s(W);case 7:(ae=K.current)===null||ae===void 0||ae.resetFields(),I(!1),x.ZP.success("Th\xE0nh c\xF4ng!"),(oe=D.current)===null||oe===void 0||oe.reload(),Y("");case 12:case"end":return $.stop()}},R)}));return function(W){return N.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(O.a,{open:B,onOpenChange:I,title:"C\xE0i \u0111\u1EB7t",width:700,formRef:K,onFinish:ne,children:[(0,a.jsx)(T.Z,{hidden:!0,name:"id"}),(0,a.jsx)(T.Z,{label:"T\xEAn \u0111\u1ED1i t\xE1c",name:"name",rules:[{required:!0}]}),z&&(0,a.jsx)("div",{className:"flex justify-center mb-4",children:(0,a.jsx)(w.Z,{src:z,width:150})}),(0,a.jsx)(T.Z,{label:"Logo",name:"logo",rules:[{required:!0}],fieldProps:{addonAfter:(0,a.jsx)(E.ZP,{icon:(0,a.jsx)(F.Z,{}),type:"text",size:"small",onClick:function(){return G(!0)},children:" Upload"})}}),(0,a.jsx)(C.Z,{label:"Description",name:"description"}),(0,a.jsx)(T.Z,{label:"Li\xEAn k\u1EBFt",name:"url"}),(0,a.jsx)(P.Z,{name:"status",label:"Tr\u1EA1ng th\xE1i",rules:[{required:!0}],options:[{label:"Draft",value:0},{label:"Active",value:1}]})]}),(0,a.jsx)(S.Z,{open:H,onCancel:function(){return G(!1)},onFinish:function(R){var W;(W=K.current)===null||W===void 0||W.setFieldValue("logo",R.url),Y(R.url)}})]})},X=k,q=function(){var n=(0,c.useState)(!1),B=p()(n,2),I=B[0],b=B[1],D=(0,c.useState)(),K=p()(D,2),te=K[0],Q=K[1],z=(0,c.useRef)();function Y(V){U(V).then(function(H){if(H.succeeded){var G;x.ZP.success(H.message),(G=z.current)===null||G===void 0||G.reload()}else x.ZP.error(H.errors[0].description)})}var re=[{title:"STT",valueType:"indexBorder",width:50,align:"center"},{title:"\u0110\u1ED1i t\xE1c",dataIndex:"name"},{title:"Li\xEAn k\u1EBFt",dataIndex:"url",search:!1},{title:"Tr\u1EA1ng th\xE1i",dataIndex:"status",valueEnum:{0:{text:"Draft",status:"Default"},1:{text:"Active",status:"Processing"}},width:100},{title:"Ng\xE0y c\u1EADp nh\u1EADt",dataIndex:"modifiedDate",valueType:"dateTime",width:200,search:!1},{title:"Ng\u01B0\u1EDDi c\u1EADp nh\u1EADt",dataIndex:"modifiedBy",width:200,search:!1},{title:"",render:function(H,G){return[(0,a.jsx)(E.ZP,{size:"small",type:"primary",icon:(0,a.jsx)(h.Z,{}),onClick:function(){Q(G.id),b(!0)}},"edit"),(0,a.jsx)(L.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return Y(G.id)},children:(0,a.jsx)(E.ZP,{size:"small",type:"primary",danger:!0,icon:(0,a.jsx)(d.Z,{})})},"delete")]},valueType:"option",width:100,align:"center"}];return(0,a.jsxs)(r._z,{extra:(0,a.jsx)(E.ZP,{type:"primary",icon:(0,a.jsx)(_.Z,{}),onClick:function(){Q(void 0),b(!0)},children:"Th\xEAm m\u1EDBi"}),children:[(0,a.jsx)(Z.Z,{search:{layout:"vertical"},actionRef:z,request:function(H){return m(u()(u()({},H),{},{pageIndex:H.current}))},columns:re,rowKey:"id",rowSelection:{}}),(0,a.jsx)(X,{open:I,setOpen:b,id:te,actionRef:z})]})},ee=q},77642:function(J,y,e){e.d(y,{IO:function(){return u},NR:function(){return c},TD:function(){return h},cI:function(){return L},ib:function(){return d},kd:function(){return E},pA:function(){return x},t4:function(){return M},vs:function(){return p}});var o=e(37090),u=function(r){return(0,o.request)("file/upload",{method:"POST",data:r,headers:{"Content-Type":"multipart/form-data"}})},M=function(r){return(0,o.request)("file/list",{params:r})},p=function(r){return(0,o.request)("gallery/photo/list",{params:r})},x=function(r){return(0,o.request)("gallery/photo/add",{method:"POST",data:r})},E=function(r){return(0,o.request)("gallery/photo/".concat(r),{method:"DELETE"})},L=function(r){return(0,o.request)("gallery/list",{params:r})},c=function(r){return(0,o.request)("gallery",{method:"POST",data:r})},h=function(r){return(0,o.request)("gallery",{method:"PUT",data:r})},d=function(r){return(0,o.request)("gallery/".concat(r),{method:"DELETE"})}}}]);
