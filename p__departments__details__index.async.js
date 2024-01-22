"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[229],{69838:function(k,D,t){t.d(D,{Z:function(){return n}});var j=t(48063),o=t(93236),S={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},x=S,m=t(38782),s=function(I,p){return o.createElement(m.Z,(0,j.Z)({},I,{ref:p,icon:x}))},n=o.forwardRef(s)},8019:function(k,D,t){var j=t(90228),o=t.n(j),S=t(87999),x=t.n(S),m=t(16941),s=t(68110),n=t(93236),v=t(81384),I=t(37090),p=t(62086),T=function(F){var U=m.Z.useFormInstance(),i=(0,n.useRef)(null),a=function(){if(i.current){var r;U.setFieldValue(F.name,(r=i.current)===null||r===void 0?void 0:r.getContent())}};return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(v.M,{onChange:a,onInit:function(r,f){return i.current=f},apiKey:"mn4nbwhddqp9jr1g1c3w17dkdu96ji7lr2fmolsncez1k3ng",init:{plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",toolbar:"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",file_picker_types:"file image media",file_picker_callback:function(r,f,M){if(M.filetype=="file"&&r("mypage.html",{text:"My text"}),M.filetype=="image"){var g=document.createElement("input");g.setAttribute("type","file"),g.setAttribute("accept","image/*"),g.addEventListener("change",function(){var d=x()(o()().mark(function w(Y){var A,h,e;return o()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return A=Y.target.files[0],h=new FormData,h.append("file",A),B.next=5,(0,I.request)("file/image/upload",{data:h,method:"POST"});case 5:e=B.sent,e&&(s.ZP.success("T\u1EA3i l\xEAn th\xE0nh c\xF4ng!"),r(e.url,{alt:"My alt text"}));case 7:case"end":return B.stop()}},w)}));return function(w){return d.apply(this,arguments)}}()),g.click()}M.filetype=="media"&&r("movie.mp4",{source2:"alt.ogg",poster:"image.jpg"})}},initialValue:U.getFieldValue(F.name)})})};D.Z=T},632:function(k,D,t){t.r(D),t.d(D,{default:function(){return b}});var j=t(90228),o=t.n(j),S=t(87999),x=t.n(S),m=t(48305),s=t.n(m),n=t(16941),v=t(68110),I=t(14292),p=t(55641),T=t(53739),R=t(69534),F=t(97146),U=t(98659),i=t(19146),a=t(76477),O=t(95845),r=t(33122),f=t(53240),M=t(89035),g=t(47686),d=t(93236),w=t(69838),Y=t(22717),A=t(8019),h=t(37090),e=t(62086),_=function(G){var $=G.activeTab,J=G.fetchData,z=n.Z.useForm(),V=s()(z,1),L=V[0],Q=function(){var C=x()(o()().mark(function H(K){var X;return o()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,(0,h.request)("department/update-detail",{method:"POST",data:K});case 2:X=N.sent,X.succeeded&&v.ZP.success("Th\xE0nh c\xF4ng!");case 4:case"end":return N.stop()}},H)}));return function(K){return C.apply(this,arguments)}}();(0,d.useEffect)(function(){$&&(0,h.request)("department/detail/content/".concat($)).then(function(C){L.setFields([{name:"id",value:C.data.id},{name:"type",value:C.data.type},{name:"content",value:C.data.content}])})},[]);var W=function(){var C=x()(o()().mark(function H(){var K;return o()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.prev=0,E.next=3,(0,h.request)("department/detail/delete/".concat($),{method:"POST"});case 3:K=E.sent,K.data&&(v.ZP.success("Th\xE0nh c\xF4ng!"),J()),E.next=9;break;case 7:E.prev=7,E.t0=E.catch(0);case 9:case"end":return E.stop()}},H,null,[[0,7]])}));return function(){return C.apply(this,arguments)}}();return(0,e.jsxs)(n.Z,{form:L,layout:"vertical",onFinish:Q,children:[(0,e.jsx)(n.Z.Item,{name:"id",hidden:!0,children:(0,e.jsx)(a.Z,{})}),(0,e.jsx)(n.Z.Item,{name:"type",label:"Ti\xEAu \u0111\u1EC1",required:!0,children:(0,e.jsx)(a.Z,{})}),(0,e.jsx)(n.Z.Item,{name:"content",label:"N\u1ED9i dung",required:!0,children:(0,e.jsx)(A.Z,{name:"content"})}),(0,e.jsxs)("div",{className:"flex justify-end gap-4",children:[(0,e.jsx)(p.ZP,{type:"primary",htmlType:"submit",children:"L\u01B0u l\u1EA1i"}),(0,e.jsx)(T.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:function(){return W()},children:(0,e.jsx)(p.ZP,{type:"primary",danger:!0,children:"X\xF3a"})})]})]})},B=function(){var G=(0,h.useParams)(),$=G.id,J=(0,d.useState)(!1),z=s()(J,2),V=z[0],L=z[1],Q=(0,d.useState)([]),W=s()(Q,2),C=W[0],H=W[1],K=(0,d.useState)(),X=s()(K,2),E=X[0],N=X[1],de=n.Z.useForm(),ue=s()(de,1),ae=ue[0],ce=(0,d.useState)([]),ie=s()(ce,2),me=ie[0],fe=ie[1],he=(0,d.useState)([]),se=s()(he,2),ve=se[0],pe=se[1],ge=(0,d.useState)(),le=s()(ge,2),xe=le[0],oe=le[1],Ee=n.Z.useForm(),ye=s()(Ee,1),q=ye[0],re=function(){(0,h.request)("department/detail/".concat($)).then(function(l){H(l),l&&l.length>0&&oe(l[0].id)})},ee=function(){(0,h.request)("department/users-in-department/".concat($)).then(function(l){pe(l)})};(0,d.useEffect)(function(){(0,h.request)("department/".concat($)).then(function(u){N(u)}),re(),(0,h.request)("user/select").then(function(u){fe(u)}),ee()},[]);var je=function(){var u=x()(o()().mark(function l(c){var P;return o()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:if(c.departmentId=$,!c.id){Z.next=4;break}Z.next=8;break;case 4:return Z.next=6,(0,h.request)("department/add-detail",{method:"POST",data:c});case 6:P=Z.sent,P.succeeded&&(v.ZP.success("Th\xE0nh c\xF4ng!"),L(!1),re());case 8:case"end":return Z.stop()}},l)}));return function(c){return u.apply(this,arguments)}}(),Ce=function(){var u=x()(o()().mark(function l(c){var P,te;return o()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:if(y.prev=0,c.departmentId=$,!c.id){y.next=9;break}return y.next=5,(0,h.request)("department/update-user",{method:"POST",data:c});case 5:return P=y.sent,P.data&&(v.ZP.success("Th\xE0nh c\xF4ng!"),ee()),q.resetFields(),y.abrupt("return");case 9:return y.next=11,(0,h.request)("department/add-user",{method:"POST",data:c});case 11:te=y.sent,te&&(v.ZP.success("Th\xE0nh c\xF4ng!"),ee()),q.resetFields(),y.next=20;break;case 16:y.prev=16,y.t0=y.catch(0),console.log(y.t0),v.ZP.error("C\xF3 l\u1ED7i x\u1EA3y ra!");case 20:case"end":return y.stop()}},l,null,[[0,16]])}));return function(c){return u.apply(this,arguments)}}(),Pe=function(l,c){var P;return((P=c==null?void 0:c.label)!==null&&P!==void 0?P:"").toLowerCase().includes(l.toLowerCase())},Ze=function(){var u=x()(o()().mark(function l(c){var P;return o()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,(0,h.request)("department/remove-user/".concat(c),{method:"POST"});case 2:P=Z.sent,P.succeeded&&(v.ZP.success("Th\xE0nh c\xF4ng!"),ee());case 4:case"end":return Z.stop()}},l)}));return function(c){return u.apply(this,arguments)}}(),Te=function(l){q.setFields([{name:"id",value:l.id},{name:"userId",value:l.userId},{name:"rank",value:l.rank},{name:"type",value:l.type},{name:"jobTitle",value:l.jobTitle}])},Oe=[{title:"Rank",dataIndex:"rank"},{title:"H\u1ECD v\xE0 t\xEAn",dataIndex:"name"},{title:"Ch\u1EE9c danh",dataIndex:"jobTitle"},{title:"T\xE1c v\u1EE5",render:function(l,c){return(0,e.jsxs)(I.Z,{children:[(0,e.jsx)(p.ZP,{icon:(0,e.jsx)(w.Z,{}),onClick:function(){return Te(c)}}),(0,e.jsx)(T.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:function(){return Ze(c.id)},children:(0,e.jsx)(p.ZP,{type:"primary",danger:!0,icon:(0,e.jsx)(Y.Z,{})})})]})}}];return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(R.Z,{gutter:16,children:[(0,e.jsx)(F.Z,{span:16,children:(0,e.jsx)(U.Z,{title:E==null?void 0:E.name,extra:(0,e.jsx)(p.ZP,{type:"primary",onClick:function(){ae.resetFields(),L(!0)},children:"Th\xEAm m\u1EDBi"}),children:(0,e.jsx)(i.Z,{type:"card",onChange:function(l){oe(l)},items:C==null?void 0:C.map(function(u){return{label:u.type,key:u.id,children:(0,e.jsx)(_,{activeTab:xe,fetchData:re})}})})})}),(0,e.jsx)(F.Z,{span:8,children:(0,e.jsxs)(U.Z,{title:"C\u01A1 c\u1EA5u t\u1ED5 ch\u1EE9c",children:[(0,e.jsxs)(n.Z,{layout:"vertical",onFinish:Ce,form:q,children:[(0,e.jsx)(n.Z.Item,{name:"id",hidden:!0,children:(0,e.jsx)(a.Z,{})}),(0,e.jsx)(n.Z.Item,{name:"userId",label:"Th\xE0nh vi\xEAn",rules:[{required:!0,message:"Vui l\xF2ng ch\u1ECDn th\xE0nh vi\xEAn"}],children:(0,e.jsx)(O.Z,{options:me,showSearch:!0,filterOption:Pe})}),(0,e.jsxs)(R.Z,{gutter:8,children:[(0,e.jsx)(F.Z,{span:6,children:(0,e.jsx)(n.Z.Item,{name:"rank",label:"Rank",children:(0,e.jsx)(r.Z,{className:"w-full"})})}),(0,e.jsx)(F.Z,{span:9,children:(0,e.jsx)(n.Z.Item,{name:"type",required:!0,label:"Nh\xF3m",children:(0,e.jsx)(a.Z,{})})}),(0,e.jsx)(F.Z,{span:9,children:(0,e.jsx)(n.Z.Item,{name:"jobTitle",label:"Ch\u1EE9c danh",children:(0,e.jsx)(a.Z,{})})})]}),(0,e.jsx)(n.Z.Item,{children:(0,e.jsx)(p.ZP,{type:"primary",htmlType:"submit",className:"w-full",children:"L\u01B0u l\u1EA1i"})})]}),(0,e.jsx)(f.Z,{children:"Th\xE0nh vi\xEAn trong Vi\u1EC7n - Khoa"}),(0,e.jsx)(M.Z,{dataSource:ve,rowKey:"id",columns:Oe})]})})]}),(0,e.jsx)(g.Z,{title:"Khoa - Vi\u1EC7n",open:V,onCancel:function(){L(!1)},footer:!1,children:(0,e.jsxs)(n.Z,{layout:"vertical",onFinish:je,form:ae,children:[(0,e.jsx)(n.Z.Item,{name:"id",hidden:!0,children:(0,e.jsx)(a.Z,{})}),(0,e.jsx)(n.Z.Item,{label:"Nh\xF3m",name:"type",rules:[{required:!0,message:"Vui l\xF2ng nh\u1EADp t\xEAn nh\xF3m"}],children:(0,e.jsx)(a.Z,{})}),(0,e.jsx)(n.Z.Item,{label:"N\u1ED9i dung",name:"content",required:!0,children:(0,e.jsx)(A.Z,{name:"content"})}),(0,e.jsx)(n.Z.Item,{label:"Th\u1EE9 t\u1EF1",name:"sortOrder",required:!0,children:(0,e.jsx)(r.Z,{})}),(0,e.jsx)(n.Z.Item,{children:(0,e.jsx)(p.ZP,{type:"primary",htmlType:"submit",children:"L\u01B0u l\u1EA1i"})})]})})]})},b=B},50945:function(k,D,t){var j=t(93236),o=t(21916);function S(m,s,n){return typeof m=="boolean"?m:s===void 0?!!n:s!==!1&&s!==null}function x(m,s,n){let v=arguments.length>3&&arguments[3]!==void 0?arguments[3]:j.createElement(o.Z,null),I=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1;if(!S(m,s,I))return[!1,null];const T=typeof s=="boolean"||s===void 0||s===null?v:s;return[!0,n?n(T):T]}D.Z=x},53240:function(k,D,t){t.d(D,{Z:function(){return U}});var j=t(93236),o=t(82187),S=t.n(o),x=t(70785),m=t(63504),s=t(96654),n=t(23758),v=t(16585);const I=i=>{const{componentCls:a,sizePaddingEdgeHorizontal:O,colorSplit:r,lineWidth:f,textPaddingInline:M,orientationMargin:g,verticalMarginInline:d}=i;return{[a]:Object.assign(Object.assign({},(0,s.Wf)(i)),{borderBlockStart:`${(0,m.unit)(f)} solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:d,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,m.unit)(f)} solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,m.unit)(i.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${a}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,m.unit)(i.dividerHorizontalWithTextGutterMargin)} 0`,color:i.colorTextHeading,fontWeight:500,fontSize:i.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,m.unit)(f)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${a}-with-text-left`]:{"&::before":{width:`calc(${g} * 100%)`},"&::after":{width:`calc(100% - ${g} * 100%)`}},[`&-horizontal${a}-with-text-right`]:{"&::before":{width:`calc(100% - ${g} * 100%)`},"&::after":{width:`calc(${g} * 100%)`}},[`${a}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:M},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${(0,m.unit)(f)} 0 0`},[`&-horizontal${a}-with-text${a}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${a}-dashed`]:{borderInlineStartWidth:f,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${a}-with-text`]:{color:i.colorText,fontWeight:"normal",fontSize:i.fontSize},[`&-horizontal${a}-with-text-left${a}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${a}-inner-text`]:{paddingInlineStart:O}},[`&-horizontal${a}-with-text-right${a}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${a}-inner-text`]:{paddingInlineEnd:O}}})}},p=i=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:i.marginXS});var T=(0,n.I$)("Divider",i=>{const a=(0,v.TS)(i,{dividerHorizontalWithTextGutterMargin:i.margin,dividerHorizontalGutterMargin:i.marginLG,sizePaddingEdgeHorizontal:0});return[I(a)]},p,{unitless:{orientationMargin:!0}}),R=function(i,a){var O={};for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&a.indexOf(r)<0&&(O[r]=i[r]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var f=0,r=Object.getOwnPropertySymbols(i);f<r.length;f++)a.indexOf(r[f])<0&&Object.prototype.propertyIsEnumerable.call(i,r[f])&&(O[r[f]]=i[r[f]]);return O},U=i=>{const{getPrefixCls:a,direction:O,divider:r}=j.useContext(x.E_),{prefixCls:f,type:M="horizontal",orientation:g="center",orientationMargin:d,className:w,rootClassName:Y,children:A,dashed:h,plain:e,style:_}=i,B=R(i,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain","style"]),b=a("divider",f),[ne,G,$]=T(b),J=g.length>0?`-${g}`:g,z=!!A,V=g==="left"&&d!=null,L=g==="right"&&d!=null,Q=S()(b,r==null?void 0:r.className,G,$,`${b}-${M}`,{[`${b}-with-text`]:z,[`${b}-with-text${J}`]:z,[`${b}-dashed`]:!!h,[`${b}-plain`]:!!e,[`${b}-rtl`]:O==="rtl",[`${b}-no-default-orientation-margin-left`]:V,[`${b}-no-default-orientation-margin-right`]:L},w,Y),W=j.useMemo(()=>typeof d=="number"?d:/^\d+$/.test(d)?Number(d):d,[d]),C=Object.assign(Object.assign({},V&&{marginLeft:W}),L&&{marginRight:W});return ne(j.createElement("div",Object.assign({className:Q,style:Object.assign(Object.assign({},r==null?void 0:r.style),_)},B,{role:"separator"}),A&&M!=="vertical"&&j.createElement("span",{className:`${b}-inner-text`,style:C},A)))}},398:function(k,D,t){t.d(D,{H:function(){return m}});var j=t(96771),o=t(93236);function S(){}const x=o.createContext({add:S,remove:S});function m(n){const v=o.useContext(x),I=o.useRef();return(0,j.useEvent)(T=>{if(T){const R=n?T.querySelector(n):T;v.add(R),I.current=R}else v.remove(I.current)})}var s=null}}]);
