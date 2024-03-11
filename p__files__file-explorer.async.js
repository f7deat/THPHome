"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2557],{14613:function(ee,L,e){e.r(L),e.d(L,{default:function(){return N}});var C=e(34827),T=e.n(C),o=e(46665),p=e(24657),X=e(62380),k=e(78491),b=e(41605),Y=e(10483),G=e(15621),q=e(13762),y=e(2537),W=e(67036),l=e(30339),t=e(68136),s=e(83294),v=e(54619),h=e(47485),m=e(1820),B=e(34180),K=e(55772),i=e(87358),D=e(13755),M=e(46555),_=e.n(M),O=e(58703),n=e(33130);function N(P){var J,c,x=(0,t.useState)([]),r=T()(x,2),f=r[0],d=r[1],g=(0,t.useState)(""),a=T()(g,2),$=a[0],j=a[1];(0,t.useEffect)(function(){P.visible&&S()},[P.visible]);function S(){(0,O.request)("file/directories").then(function(E){d(E)})}var A=function(){if(!$)return o.ZP.warning("Please choose a file!");P.onOk($)};function I(E){}function H(E){j(E)}var F=function(u){var R=u.file.status;R!=="uploading"&&console.log(u.file,u.fileList),R==="done"?(o.ZP.success("".concat(u.file.name," file uploaded successfully.")),S()):R==="error"&&o.ZP.error("".concat(u.file.name," file upload failed."))};function Z(E){(0,O.request)("/api/file/delete",{method:"POST",data:{fullName:E}}).then(function(u){u.data.succeeded?(S(),o.ZP.success(u.data.message)):o.ZP.error(u.data.message)})}function U(E){var u,R=["jpeg","jpg","png","gif","bmp"],z=((u=E.split(".").pop())===null||u===void 0?void 0:u.toLowerCase())||"";return R.includes(z)}function w(E){return U(E.name)?(0,n.jsx)("div",{children:(0,n.jsx)(p.Z,{src:E.fullName,width:200})}):(0,n.jsx)(X.Z,{})}return(0,n.jsxs)(k.Z,{title:"File Explorer",placement:"right",closable:!1,visible:P.visible,width:900,children:[(0,n.jsx)("div",{className:"mb-4",children:(0,n.jsxs)(D.Z,{action:"/api/file/upload",onChange:F,children:[(0,n.jsx)("p",{className:"ant-upload-drag-icon",children:(0,n.jsx)(s.Z,{})}),(0,n.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"}),(0,n.jsx)("p",{className:"ant-upload-hint",children:"Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files"})]})}),(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsxs)(b.Z,{className:"mb-2",children:[(0,n.jsx)(Y.Z,{}),(0,n.jsx)(G.ZP,{type:"primary",icon:(0,n.jsx)(v.Z,{})})]}),(0,n.jsxs)("div",{className:"border",style:{minHeight:"calc(100vh - 360px)"},children:[f==null||(J=f.folders)===null||J===void 0?void 0:J.map(function(E,u){return(0,n.jsxs)("div",{className:"px-2 py-1 hover:bg-gray-100 cursor-pointer",onDoubleClick:function(){return void 0},children:[(0,n.jsx)(h.Z,{className:"mr-2"}),E.name]},u)}),f==null||(c=f.files)===null||c===void 0?void 0:c.map(function(E,u){return(0,n.jsx)("button",{className:"px-2 py-1 hover:bg-gray-100 w-full text-left bg-white focus:bg-gray-100",onClick:function(){return H(E)},children:(0,n.jsxs)(q.Z,{className:"items-center",children:[(0,n.jsx)(y.Z,{span:12,children:(0,n.jsxs)(W.Z,{content:w(E),title:"Preview",children:[(0,n.jsx)(m.Z,{className:"mr-2"}),E.name]})}),(0,n.jsx)(y.Z,{span:6,children:_()(E.lastWriteTime).format("MM/DD/YYYY h:mm:ss A")}),(0,n.jsxs)(y.Z,{span:3,children:[E.length," KB"]}),(0,n.jsx)(y.Z,{span:3,className:"text-right",children:(0,n.jsx)(l.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return Z(E.fullName)},children:(0,n.jsx)(B.Z,{twoToneColor:"red"})})})]})},u)})]})]}),(0,n.jsxs)(b.Z,{children:[(0,n.jsx)(G.ZP,{onClick:A,icon:(0,n.jsx)(K.Z,{}),type:"primary",children:"Ok"}),(0,n.jsx)(G.ZP,{onClick:P.onCancel,icon:(0,n.jsx)(i.Z,{}),children:"Close"})]})]})}},2537:function(ee,L,e){var C=e(30577);L.Z=C.Z},62380:function(ee,L,e){e.d(L,{Z:function(){return K}});var C=e(91150),T=e.n(C),o=e(68136),p=e(80822),X=e(18955),k=e(1359),b=e(8673),G=()=>{const[,i]=(0,b.ZP)(),M=new k.C(i.colorBgBase).toHsl().l<.5?{opacity:.65}:{};return o.createElement("svg",{style:M,width:"184",height:"152",viewBox:"0 0 184 152",xmlns:"http://www.w3.org/2000/svg"},o.createElement("g",{fill:"none",fillRule:"evenodd"},o.createElement("g",{transform:"translate(24 31.67)"},o.createElement("ellipse",{fillOpacity:".8",fill:"#F5F5F7",cx:"67.797",cy:"106.89",rx:"67.797",ry:"12.668"}),o.createElement("path",{d:"M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",fill:"#AEB8C2"}),o.createElement("path",{d:"M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",fill:"url(#linearGradient-1)",transform:"translate(13.56)"}),o.createElement("path",{d:"M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",fill:"#F5F5F7"}),o.createElement("path",{d:"M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",fill:"#DCE0E6"})),o.createElement("path",{d:"M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",fill:"#DCE0E6"}),o.createElement("g",{transform:"translate(149.65 15.383)",fill:"#FFF"},o.createElement("ellipse",{cx:"20.654",cy:"3.167",rx:"2.849",ry:"2.815"}),o.createElement("path",{d:"M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"}))))},y=()=>{const[,i]=(0,b.ZP)(),{colorFill:D,colorFillTertiary:M,colorFillQuaternary:_,colorBgContainer:O}=i,{borderColor:n,shadowColor:N,contentColor:P}=(0,o.useMemo)(()=>({borderColor:new k.C(D).onBackground(O).toHexShortString(),shadowColor:new k.C(M).onBackground(O).toHexShortString(),contentColor:new k.C(_).onBackground(O).toHexShortString()}),[D,M,_,O]);return o.createElement("svg",{width:"64",height:"41",viewBox:"0 0 64 41",xmlns:"http://www.w3.org/2000/svg"},o.createElement("g",{transform:"translate(0 1)",fill:"none",fillRule:"evenodd"},o.createElement("ellipse",{fill:N,cx:"32",cy:"33",rx:"32",ry:"7"}),o.createElement("g",{fillRule:"nonzero",stroke:n},o.createElement("path",{d:"M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"}),o.createElement("path",{d:"M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",fill:P}))))},W=e(29029),l=e(46075);const t=i=>{const{componentCls:D,margin:M,marginXS:_,marginXL:O,fontSize:n,lineHeight:N}=i;return{[D]:{marginInline:_,fontSize:n,lineHeight:N,textAlign:"center",[`${D}-image`]:{height:i.emptyImgHeight,marginBottom:_,opacity:i.opacityImage,img:{height:"100%"},svg:{maxWidth:"100%",height:"100%",margin:"auto"}},[`${D}-description`]:{color:i.colorText},[`${D}-footer`]:{marginTop:M},"&-normal":{marginBlock:O,color:i.colorTextDisabled,[`${D}-description`]:{color:i.colorTextDisabled},[`${D}-image`]:{height:i.emptyImgHeightMD}},"&-small":{marginBlock:_,color:i.colorTextDisabled,[`${D}-image`]:{height:i.emptyImgHeightSM}}}}};var s=(0,W.I$)("Empty",i=>{const{componentCls:D,controlHeightLG:M,calc:_}=i,O=(0,l.TS)(i,{emptyImgCls:`${D}-img`,emptyImgHeight:_(M).mul(2.5).equal(),emptyImgHeightMD:M,emptyImgHeightSM:_(M).mul(.875).equal()});return[t(O)]}),v=function(i,D){var M={};for(var _ in i)Object.prototype.hasOwnProperty.call(i,_)&&D.indexOf(_)<0&&(M[_]=i[_]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var O=0,_=Object.getOwnPropertySymbols(i);O<_.length;O++)D.indexOf(_[O])<0&&Object.prototype.propertyIsEnumerable.call(i,_[O])&&(M[_[O]]=i[_[O]]);return M};const h=o.createElement(G,null),m=o.createElement(y,null),B=i=>{var{className:D,rootClassName:M,prefixCls:_,image:O=h,description:n,children:N,imageStyle:P,style:J}=i,c=v(i,["className","rootClassName","prefixCls","image","description","children","imageStyle","style"]);const{getPrefixCls:x,direction:r,empty:f}=o.useContext(p.E_),d=x("empty",_),[g,a,$]=s(d),[j]=(0,X.Z)("Empty"),S=typeof n!="undefined"?n:j==null?void 0:j.description,A=typeof S=="string"?S:"empty";let I=null;return typeof O=="string"?I=o.createElement("img",{alt:A,src:O}):I=O,g(o.createElement("div",Object.assign({className:T()(a,$,d,f==null?void 0:f.className,{[`${d}-normal`]:O===m,[`${d}-rtl`]:r==="rtl"},D,M),style:Object.assign(Object.assign({},f==null?void 0:f.style),J)},c),o.createElement("div",{className:`${d}-image`,style:P},I),S&&o.createElement("div",{className:`${d}-description`},S),N&&o.createElement("div",{className:`${d}-footer`},N)))};B.PRESENTED_IMAGE_DEFAULT=h,B.PRESENTED_IMAGE_SIMPLE=m;var K=B},54417:function(ee,L,e){var C=e(68136);const T=(0,C.createContext)({});L.Z=T},30577:function(ee,L,e){var C=e(68136),T=e(91150),o=e.n(T),p=e(80822),X=e(54417),k=e(25144),b=function(y,W){var l={};for(var t in y)Object.prototype.hasOwnProperty.call(y,t)&&W.indexOf(t)<0&&(l[t]=y[t]);if(y!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(y);s<t.length;s++)W.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(y,t[s])&&(l[t[s]]=y[t[s]]);return l};function Y(y){return typeof y=="number"?`${y} ${y} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(y)?`0 0 ${y}`:y}const G=["xs","sm","md","lg","xl","xxl"],q=C.forwardRef((y,W)=>{const{getPrefixCls:l,direction:t}=C.useContext(p.E_),{gutter:s,wrap:v}=C.useContext(X.Z),{prefixCls:h,span:m,order:B,offset:K,push:i,pull:D,className:M,children:_,flex:O,style:n}=y,N=b(y,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),P=l("col",h),[J,c,x]=(0,k.cG)(P);let r={};G.forEach(g=>{let a={};const $=y[g];typeof $=="number"?a.span=$:typeof $=="object"&&(a=$||{}),delete N[g],r=Object.assign(Object.assign({},r),{[`${P}-${g}-${a.span}`]:a.span!==void 0,[`${P}-${g}-order-${a.order}`]:a.order||a.order===0,[`${P}-${g}-offset-${a.offset}`]:a.offset||a.offset===0,[`${P}-${g}-push-${a.push}`]:a.push||a.push===0,[`${P}-${g}-pull-${a.pull}`]:a.pull||a.pull===0,[`${P}-${g}-flex-${a.flex}`]:a.flex||a.flex==="auto",[`${P}-rtl`]:t==="rtl"})});const f=o()(P,{[`${P}-${m}`]:m!==void 0,[`${P}-order-${B}`]:B,[`${P}-offset-${K}`]:K,[`${P}-push-${i}`]:i,[`${P}-pull-${D}`]:D},M,r,c,x),d={};if(s&&s[0]>0){const g=s[0]/2;d.paddingLeft=g,d.paddingRight=g}return O&&(d.flex=Y(O),v===!1&&!d.minWidth&&(d.minWidth=0)),J(C.createElement("div",Object.assign({},N,{style:Object.assign(Object.assign({},d),n),className:f,ref:W}),_))});L.Z=q},36035:function(ee,L,e){var C=e(68136),T=e(91150),o=e.n(T),p=e(79880),X=e(80822),k=e(54417),b=e(25144),Y=function(l,t){var s={};for(var v in l)Object.prototype.hasOwnProperty.call(l,v)&&t.indexOf(v)<0&&(s[v]=l[v]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var h=0,v=Object.getOwnPropertySymbols(l);h<v.length;h++)t.indexOf(v[h])<0&&Object.prototype.propertyIsEnumerable.call(l,v[h])&&(s[v[h]]=l[v[h]]);return s};const G=null,q=null;function y(l,t){const[s,v]=C.useState(typeof l=="string"?l:""),h=()=>{if(typeof l=="string"&&v(l),typeof l=="object")for(let m=0;m<p.c4.length;m++){const B=p.c4[m];if(!t[B])continue;const K=l[B];if(K!==void 0){v(K);return}}};return C.useEffect(()=>{h()},[JSON.stringify(l),t]),s}const W=C.forwardRef((l,t)=>{const{prefixCls:s,justify:v,align:h,className:m,style:B,children:K,gutter:i=0,wrap:D}=l,M=Y(l,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:_,direction:O}=C.useContext(X.E_),[n,N]=C.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[P,J]=C.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),c=y(h,P),x=y(v,P),r=C.useRef(i),f=(0,p.ZP)();C.useEffect(()=>{const w=f.subscribe(E=>{J(E);const u=r.current||0;(!Array.isArray(u)&&typeof u=="object"||Array.isArray(u)&&(typeof u[0]=="object"||typeof u[1]=="object"))&&N(E)});return()=>f.unsubscribe(w)},[]);const d=()=>{const w=[void 0,void 0];return(Array.isArray(i)?i:[i,void 0]).forEach((u,R)=>{if(typeof u=="object")for(let z=0;z<p.c4.length;z++){const V=p.c4[z];if(n[V]&&u[V]!==void 0){w[R]=u[V];break}}else w[R]=u}),w},g=_("row",s),[a,$,j]=(0,b.VM)(g),S=d(),A=o()(g,{[`${g}-no-wrap`]:D===!1,[`${g}-${x}`]:x,[`${g}-${c}`]:c,[`${g}-rtl`]:O==="rtl"},m,$,j),I={},H=S[0]!=null&&S[0]>0?S[0]/-2:void 0;H&&(I.marginLeft=H,I.marginRight=H),[,I.rowGap]=S;const[F,Z]=S,U=C.useMemo(()=>({gutter:[F,Z],wrap:D}),[F,Z,D]);return a(C.createElement(k.Z.Provider,{value:U},C.createElement("div",Object.assign({},M,{className:A,style:Object.assign(Object.assign({},I),B),ref:t}),K)))});L.Z=W},25144:function(ee,L,e){e.d(L,{VM:function(){return y},cG:function(){return W}});var C=e(90130),T=e(29029),o=e(46075);const p=l=>{const{componentCls:t}=l;return{[t]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around":{justifyContent:"space-around"},"&-space-evenly":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},X=l=>{const{componentCls:t}=l;return{[t]:{position:"relative",maxWidth:"100%",minHeight:1}}},k=(l,t)=>{const{componentCls:s,gridColumns:v}=l,h={};for(let m=v;m>=0;m--)m===0?(h[`${s}${t}-${m}`]={display:"none"},h[`${s}-push-${m}`]={insetInlineStart:"auto"},h[`${s}-pull-${m}`]={insetInlineEnd:"auto"},h[`${s}${t}-push-${m}`]={insetInlineStart:"auto"},h[`${s}${t}-pull-${m}`]={insetInlineEnd:"auto"},h[`${s}${t}-offset-${m}`]={marginInlineStart:0},h[`${s}${t}-order-${m}`]={order:0}):(h[`${s}${t}-${m}`]=[{["--ant-display"]:"block",display:"block"},{display:"var(--ant-display)",flex:`0 0 ${m/v*100}%`,maxWidth:`${m/v*100}%`}],h[`${s}${t}-push-${m}`]={insetInlineStart:`${m/v*100}%`},h[`${s}${t}-pull-${m}`]={insetInlineEnd:`${m/v*100}%`},h[`${s}${t}-offset-${m}`]={marginInlineStart:`${m/v*100}%`},h[`${s}${t}-order-${m}`]={order:m});return h},b=(l,t)=>k(l,t),Y=(l,t,s)=>({[`@media (min-width: ${(0,C.unit)(t)})`]:Object.assign({},b(l,s))}),G=()=>({}),q=()=>({}),y=(0,T.I$)("Grid",p,G),W=(0,T.I$)("Grid",l=>{const t=(0,o.TS)(l,{gridColumns:24}),s={"-sm":t.screenSMMin,"-md":t.screenMDMin,"-lg":t.screenLGMin,"-xl":t.screenXLMin,"-xxl":t.screenXXLMin};return[X(t),b(t,""),b(t,"-xs"),Object.keys(s).map(v=>Y(t,s[v],v)).reduce((v,h)=>Object.assign(Object.assign({},v),h),{})]},q)},13762:function(ee,L,e){var C=e(36035);L.Z=C.Z},53919:function(ee,L,e){e.r(L),e.d(L,{Circle:function(){return P},Line:function(){return y},default:function(){return J}});var C=e(52643),T=e(37986),o=e(23575),p=e(68136),X=e(91150),k=e.n(X),b={percent:0,prefixCls:"rc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,trailColor:"#D9D9D9",trailWidth:1,gapPosition:"bottom"},Y=function(){var x=(0,p.useRef)([]),r=(0,p.useRef)(null);return(0,p.useEffect)(function(){var f=Date.now(),d=!1;x.current.forEach(function(g){if(g){d=!0;var a=g.style;a.transitionDuration=".3s, .3s, .3s, .06s",r.current&&f-r.current<100&&(a.transitionDuration="0s, 0s")}}),d&&(r.current=Date.now())}),x.current},G=["className","percent","prefixCls","strokeColor","strokeLinecap","strokeWidth","style","trailColor","trailWidth","transition"],q=function(x){var r=(0,T.Z)((0,T.Z)({},b),x),f=r.className,d=r.percent,g=r.prefixCls,a=r.strokeColor,$=r.strokeLinecap,j=r.strokeWidth,S=r.style,A=r.trailColor,I=r.trailWidth,H=r.transition,F=(0,o.Z)(r,G);delete F.gapPosition;var Z=Array.isArray(d)?d:[d],U=Array.isArray(a)?a:[a],w=Y(),E=j/2,u=100-j/2,R="M ".concat($==="round"?E:0,",").concat(E,`
         L `).concat($==="round"?u:100,",").concat(E),z="0 0 100 ".concat(j),V=0;return p.createElement("svg",(0,C.Z)({className:k()("".concat(g,"-line"),f),viewBox:z,preserveAspectRatio:"none",style:S},F),p.createElement("path",{className:"".concat(g,"-line-trail"),d:R,strokeLinecap:$,stroke:A,strokeWidth:I||j,fillOpacity:"0"}),Z.map(function(te,re){var Q=1;switch($){case"round":Q=1-j/100;break;case"square":Q=1-j/2/100;break;default:Q=1;break}var ie={strokeDasharray:"".concat(te*Q,"px, 100px"),strokeDashoffset:"-".concat(V,"px"),transition:H||"stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear"},ne=U[re]||U[U.length-1];return V+=te,p.createElement("path",{key:re,className:"".concat(g,"-line-path"),d:R,strokeLinecap:$,stroke:ne,strokeWidth:j,fillOpacity:"0",ref:function(ce){w[re]=ce},style:ie})}))},y=q,W=e(71486),l=e(31693),t=e(66398),s=0,v=(0,t.Z)();function h(){var c;return v?(c=s,s+=1):c="TEST_OR_SSR",c}var m=function(c){var x=p.useState(),r=(0,l.Z)(x,2),f=r[0],d=r[1];return p.useEffect(function(){d("rc_progress_".concat(h()))},[]),c||f},B=function(x){var r=x.bg,f=x.children;return p.createElement("div",{style:{width:"100%",height:"100%",background:r}},f)};function K(c,x){return Object.keys(c).map(function(r){var f=parseFloat(r),d="".concat(Math.floor(f*x),"%");return"".concat(c[r]," ").concat(d)})}var i=p.forwardRef(function(c,x){var r=c.prefixCls,f=c.color,d=c.gradientId,g=c.radius,a=c.style,$=c.ptg,j=c.strokeLinecap,S=c.strokeWidth,A=c.size,I=c.gapDegree,H=f&&(0,W.Z)(f)==="object",F=H?"#FFF":void 0,Z=A/2,U=p.createElement("circle",{className:"".concat(r,"-circle-path"),r:g,cx:Z,cy:Z,stroke:F,strokeLinecap:j,strokeWidth:S,opacity:$===0?0:1,style:a,ref:x});if(!H)return U;var w="".concat(d,"-conic"),E=I?"".concat(180+I/2,"deg"):"0deg",u=K(f,(360-I)/360),R=K(f,1),z="conic-gradient(from ".concat(E,", ").concat(u.join(", "),")"),V="linear-gradient(to ".concat(I?"bottom":"top",", ").concat(R.join(", "),")");return p.createElement(p.Fragment,null,p.createElement("mask",{id:w},U),p.createElement("foreignObject",{x:0,y:0,width:A,height:A,mask:"url(#".concat(w,")")},p.createElement(B,{bg:V},p.createElement(B,{bg:z}))))}),D=i,M=100,_=function(x,r,f,d,g,a,$,j,S,A){var I=arguments.length>10&&arguments[10]!==void 0?arguments[10]:0,H=f/100*360*((360-a)/360),F=a===0?0:{bottom:0,top:180,left:90,right:-90}[$],Z=(100-d)/100*r;S==="round"&&d!==100&&(Z+=A/2,Z>=r&&(Z=r-.01));var U=M/2;return{stroke:typeof j=="string"?j:void 0,strokeDasharray:"".concat(r,"px ").concat(x),strokeDashoffset:Z+I,transform:"rotate(".concat(g+H+F,"deg)"),transformOrigin:"".concat(U,"px ").concat(U,"px"),transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",fillOpacity:0}},O=["id","prefixCls","steps","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","style","className","strokeColor","percent"];function n(c){var x=c!=null?c:[];return Array.isArray(x)?x:[x]}var N=function(x){var r=(0,T.Z)((0,T.Z)({},b),x),f=r.id,d=r.prefixCls,g=r.steps,a=r.strokeWidth,$=r.trailWidth,j=r.gapDegree,S=j===void 0?0:j,A=r.gapPosition,I=r.trailColor,H=r.strokeLinecap,F=r.style,Z=r.className,U=r.strokeColor,w=r.percent,E=(0,o.Z)(r,O),u=M/2,R=m(f),z="".concat(R,"-gradient"),V=u-a/2,te=Math.PI*2*V,re=S>0?90+S/2:-90,Q=te*((360-S)/360),ie=(0,W.Z)(g)==="object"?g:{count:g,space:2},ne=ie.count,ge=ie.space,ce=n(w),se=n(U),he=se.find(function(fe){return fe&&(0,W.Z)(fe)==="object"}),_e=he&&(0,W.Z)(he)==="object",de=_e?"butt":H,Ce=_(te,Q,0,100,re,S,A,I,de,a),Ee=Y(),Oe=function(){var ue=0;return ce.map(function(oe,ae){var pe=se[ae]||se[se.length-1],le=_(te,Q,ue,oe,re,S,A,pe,de,a);return ue+=oe,p.createElement(D,{key:ae,color:pe,ptg:oe,radius:V,prefixCls:d,gradientId:z,style:le,strokeLinecap:de,strokeWidth:a,gapDegree:S,ref:function(ve){Ee[ae]=ve},size:M})}).reverse()},Pe=function(){var ue=Math.round(ne*(ce[0]/100)),oe=100/ne,ae=0;return new Array(ne).fill(null).map(function(pe,le){var me=le<=ue-1?se[0]:I,ve=me&&(0,W.Z)(me)==="object"?"url(#".concat(z,")"):void 0,ye=_(te,Q,ae,oe,re,S,A,me,"butt",a,ge);return ae+=(Q-ye.strokeDashoffset+ge)*100/Q,p.createElement("circle",{key:le,className:"".concat(d,"-circle-path"),r:V,cx:u,cy:u,stroke:ve,strokeWidth:a,opacity:1,style:ye,ref:function(xe){Ee[le]=xe}})})};return p.createElement("svg",(0,C.Z)({className:k()("".concat(d,"-circle"),Z),viewBox:"0 0 ".concat(M," ").concat(M),style:F,id:f,role:"presentation"},E),!ne&&p.createElement("circle",{className:"".concat(d,"-circle-trail"),r:V,cx:u,cy:u,stroke:I,strokeLinecap:de,strokeWidth:$||a,style:Ce}),ne?Pe():Oe())},P=N,J={Line:y,Circle:P}}}]);
