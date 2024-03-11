"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6341],{86339:function(V,p,t){t.d(p,{Z:function(){return T}});var i=t(52643),f=t(68136),d={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},g=d,y=t(91471),_=function(h,M){return f.createElement(y.Z,(0,i.Z)({},h,{ref:M,icon:g}))},T=f.forwardRef(_)},55772:function(V,p,t){t.d(p,{Z:function(){return T}});var i=t(52643),f=t(68136),d={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"},g=d,y=t(91471),_=function(h,M){return f.createElement(y.Z,(0,i.Z)({},h,{ref:M,icon:g}))},T=f.forwardRef(_)},15820:function(V,p,t){t.r(p);var i=t(34827),f=t.n(i),d=t(4870),g=t(46665),y=t(67036),_=t(24657),T=t(61993),j=t(41605),h=t(15621),M=t(30339),X=t(78491),B=t(10483),L=t(18801),Q=t(50775),R=t(96216),D=t(68136),N=t(49799),Y=t(25223),ne=t(63687),G=t(55772),J=t(86339),$=t(58703),w=t(81068),k=t(56244),n=t(33130),q=function(){var ee=(0,D.useState)([]),U=f()(ee,2),te=U[0],e=U[1],l=(0,D.useState)(!1),s=f()(l,2),o=s[0],a=s[1],v=(0,D.useState)([]),u=f()(v,2),P=u[0],C=u[1],I=d.Z.useForm(),E=f()(I,1),Z=E[0];(0,D.useEffect)(function(){x()},[]);var x=function(){(0,$.request)("partner/get-list").then(function(r){e(r)})};function S(){Z.resetFields(),a(!0)}var W=function(){a(!1)};function K(c){(0,$.request)("partner/delete/".concat(c),{method:"DELETE"}).then(function(r){r.succeeded?(g.ZP.success(r.message),x()):g.ZP.error(r.message)})}function O(c){C([{name:["id"],value:c.id},{name:["createdBy"],value:c.createdBy},{name:["createdDate"],value:c.createdDate},{name:["name"],value:c.name},{name:["logo"],value:c.logo},{name:["description"],value:c.description},{name:["url"],value:c.url},{name:["status"],value:c.status===1},{name:["index"],value:c.index}]),a(!0)}var z=function(r){var b="";r.status===!0?r.status=1:r.status=0,r.index=Number(r.index),r.id?b="partner/update":b="partner/add",(0,$.request)(b,{method:"POST",data:r}).then(function(m){m.succeeded?g.ZP.success(m.message):g.ZP.error(m.message),x()}),a(!1)},F=[{title:"STT",valueType:"indexBorder",width:40},{title:"T\xEAn \u0111\u1ED1i t\xE1c",render:function(r){return(0,n.jsx)(y.Z,{content:(0,n.jsx)(_.Z,{src:r.logo,width:200}),title:"Logo",children:(0,n.jsx)("a",{href:r.url,target:"_blank",children:r.name})})}},{title:"Tr\u1EA1ng th\xE1i",render:function(r){return r.status===1?(0,n.jsx)(T.Z,{color:"green",children:"\u0110ang k\xEDch ho\u1EA1t"}):(0,n.jsx)(T.Z,{color:"red",children:"Kh\xF4ng ho\u1EA1t \u0111\u1ED9ng"})}},{title:"",render:function(r){return(0,n.jsxs)(j.Z,{children:[(0,n.jsx)(h.ZP,{size:"small",icon:(0,n.jsx)(N.Z,{}),onClick:function(){return O(r)}}),(0,n.jsx)(M.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return K(r.id)},children:(0,n.jsx)(h.ZP,{size:"small",type:"primary",danger:!0,icon:(0,n.jsx)(Y.Z,{})})})]})},valueType:"option"}],H=function(r){r.file.status!=="uploading"&&console.log(r.file,r.fileList),r.file.status==="done"?(Z.setFieldsValue({logo:r.file.response.fileUrl}),g.ZP.success("".concat(r.file.name," file uploaded successfully"))):r.file.status==="error"&&g.ZP.error("".concat(r.file.name," file upload failed."))};return(0,n.jsxs)(w._z,{children:[(0,n.jsx)(k.Z,{search:{layout:"vertical"},dataSource:te,columns:F,rowKey:"id",rowSelection:{}}),(0,n.jsx)(X.Z,{title:"C\xE0i \u0111\u1EB7t",placement:"right",closable:!1,onClose:W,open:o,width:700,children:(0,n.jsxs)(d.Z,{onFinish:z,layout:"vertical",fields:P,form:Z,children:[(0,n.jsx)(d.Z.Item,{hidden:!0,name:"id"}),(0,n.jsx)(d.Z.Item,{hidden:!0,name:"createdBy"}),(0,n.jsx)(d.Z.Item,{hidden:!0,name:"createdDate"}),(0,n.jsx)(d.Z.Item,{hidden:!0,name:"modifiedBy"}),(0,n.jsx)(d.Z.Item,{label:"Name",name:"name",children:(0,n.jsx)(B.Z,{})}),(0,n.jsx)(d.Z.Item,{label:"Logo",children:(0,n.jsxs)("div",{className:"flex",children:[(0,n.jsx)(d.Z.Item,{name:"logo",className:"flex-grow mb-0",children:(0,n.jsx)(B.Z,{})}),(0,n.jsx)(L.Z,{action:"/api/partner/upload",onChange:H,maxCount:1,showUploadList:!1,children:(0,n.jsx)(h.ZP,{icon:(0,n.jsx)(ne.Z,{}),children:"Click to Upload"})})]})}),(0,n.jsx)(d.Z.Item,{label:"Description",name:"description",children:(0,n.jsx)(B.Z.TextArea,{})}),(0,n.jsx)(d.Z.Item,{label:"Li\xEAn k\u1EBFt",name:"url",children:(0,n.jsx)(B.Z,{})}),(0,n.jsxs)(j.Z,{size:40,children:[(0,n.jsx)(d.Z.Item,{label:"S\u1ED1 th\u1EE9 t\u1EF1",name:"index",children:(0,n.jsx)(Q.Z,{})}),(0,n.jsx)(d.Z.Item,{label:"Tr\u1EA1ng th\xE1i",name:"status",valuePropName:"checked",children:(0,n.jsx)(R.Z,{})})]}),(0,n.jsx)(d.Z.Item,{children:(0,n.jsxs)(j.Z,{children:[(0,n.jsx)(h.ZP,{type:"primary",htmlType:"submit",icon:(0,n.jsx)(G.Z,{}),children:"Save"}),(0,n.jsx)(h.ZP,{htmlType:"button",icon:(0,n.jsx)(J.Z,{}),onClick:function(){return a(!1)},children:"Close"})]})})]})})]})};p.default=q},61993:function(V,p,t){t.d(p,{Z:function(){return te}});var i=t(68136),f=t(87358),d=t(91150),g=t.n(d),y=t(85636),_=t(5858),T=t(24924),j=t(80822),h=t(90130),M=t(1359),X=t(63293),B=t(46075),L=t(29029);const Q=e=>{const{paddingXXS:l,lineWidth:s,tagPaddingHorizontal:o,componentCls:a,calc:v}=e,u=v(o).sub(s).equal(),P=v(l).sub(s).equal();return{[a]:Object.assign(Object.assign({},(0,X.Wf)(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:u,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${(0,h.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${a}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${a}-close-icon`]:{marginInlineStart:P,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${a}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},["&-checkable"]:{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${a}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},["&-hidden"]:{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:u}}),[`${a}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}},R=e=>{const{lineWidth:l,fontSizeIcon:s,calc:o}=e,a=e.fontSizeSM;return(0,B.TS)(e,{tagFontSize:a,tagLineHeight:(0,h.unit)(o(e.lineHeightSM).mul(a).equal()),tagIconSize:o(s).sub(o(l).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.colorFillTertiary})},D=e=>({defaultBg:new M.C(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText});var N=(0,L.I$)("Tag",e=>{const l=R(e);return Q(l)},D),Y=function(e,l){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&l.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)l.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(s[o[a]]=e[o[a]]);return s},G=i.forwardRef((e,l)=>{const{prefixCls:s,style:o,className:a,checked:v,onChange:u,onClick:P}=e,C=Y(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:I,tag:E}=i.useContext(j.E_),Z=z=>{u==null||u(!v),P==null||P(z)},x=I("tag",s),[S,W,K]=N(x),O=g()(x,`${x}-checkable`,{[`${x}-checkable-checked`]:v},E==null?void 0:E.className,a,W,K);return S(i.createElement("span",Object.assign({},C,{ref:l,style:Object.assign(Object.assign({},o),E==null?void 0:E.style),className:O,onClick:Z})))}),J=t(75011);const $=e=>(0,J.Z)(e,(l,s)=>{let{textColor:o,lightBorderColor:a,lightColor:v,darkColor:u}=s;return{[`${e.componentCls}${e.componentCls}-${l}`]:{color:o,background:v,borderColor:a,"&-inverse":{color:e.colorTextLightSolid,background:u,borderColor:u},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}});var w=(0,L.bk)(["Tag","preset"],e=>{const l=R(e);return $(l)},D);function k(e){return typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1)}const n=(e,l,s)=>{const o=k(s);return{[`${e.componentCls}${e.componentCls}-${l}`]:{color:e[`color${s}`],background:e[`color${o}Bg`],borderColor:e[`color${o}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}};var q=(0,L.bk)(["Tag","status"],e=>{const l=R(e);return[n(l,"success","Success"),n(l,"processing","Info"),n(l,"error","Error"),n(l,"warning","Warning")]},D),oe=function(e,l){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&l.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)l.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(s[o[a]]=e[o[a]]);return s};const ee=(e,l)=>{const{prefixCls:s,className:o,rootClassName:a,style:v,children:u,icon:P,color:C,onClose:I,closeIcon:E,closable:Z,bordered:x=!0}=e,S=oe(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","closeIcon","closable","bordered"]),{getPrefixCls:W,direction:K,tag:O}=i.useContext(j.E_),[z,F]=i.useState(!0);i.useEffect(()=>{"visible"in S&&F(S.visible)},[S.visible]);const H=(0,y.o2)(C),c=(0,y.yT)(C),r=H||c,b=Object.assign(Object.assign({backgroundColor:C&&!r?C:void 0},O==null?void 0:O.style),v),m=W("tag",s),[se,ie,ce]=N(m),de=g()(m,O==null?void 0:O.className,{[`${m}-${C}`]:r,[`${m}-has-color`]:C&&!r,[`${m}-hidden`]:!z,[`${m}-rtl`]:K==="rtl",[`${m}-borderless`]:!x},o,a,ie,ce),ae=A=>{A.stopPropagation(),I==null||I(A),!A.defaultPrevented&&F(!1)},[,ue]=(0,_.Z)(Z,E,A=>A===null?i.createElement(f.Z,{className:`${m}-close-icon`,onClick:ae}):i.createElement("span",{className:`${m}-close-icon`,onClick:ae},A),null,!1),me=typeof S.onClick=="function"||u&&u.type==="a",re=P||null,ge=re?i.createElement(i.Fragment,null,re,u&&i.createElement("span",null,u)):u,le=i.createElement("span",Object.assign({},S,{ref:l,className:de,style:b}),ge,ue,H&&i.createElement(w,{key:"preset",prefixCls:m}),c&&i.createElement(q,{key:"status",prefixCls:m}));return se(me?i.createElement(T.Z,{component:"Tag"},le):le)},U=i.forwardRef(ee);U.CheckableTag=G;var te=U}}]);
