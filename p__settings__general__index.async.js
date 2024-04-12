"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8093],{78837:function(H,v,n){var a=n(60430),E=n.n(a),p=n(53939),g=n.n(p),P=n(83134),y=n.n(P),c=n(34827),C=n.n(c),T=n(41641),j=n(83294),l=n(26494),u=n(46665),i=n(18186),t=n(62960),e=n(10483),r=n(13755),s=n(68136),o=n(33130),h=function(d){var M=(0,s.useState)(""),Z=C()(M,2),w=Z[0],L=Z[1],S=(0,s.useState)([]),U=C()(S,2),f=U[0],R=U[1],b=(0,s.useState)(!1),A=C()(b,2),B=A[0],W=A[1];function I(_){var O;try{O=new URL(_)}catch(K){return!1}return O.protocol==="https:"}var m=function(){var _=y()(g()().mark(function O(){var K,D;return g()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:if(!(f.length>0)){x.next=15;break}return K=new FormData,f.forEach(function(F){K.append("file",F)}),W(!0),x.next=6,(0,T.IO)(K);case 6:if(D=x.sent,W(!1),D.succeeded){x.next=11;break}return u.ZP.error(D.message),x.abrupt("return");case 11:return R([]),d.onFinish(D),d.onCancel(),x.abrupt("return");case 15:if(I(w)){x.next=18;break}return u.ZP.error("Sorry, URL failed to upload."),x.abrupt("return");case 18:d.onFinish({url:w,succeeded:!0}),L(""),d.onCancel();case 21:case"end":return x.stop()}},O)}));return function(){return _.apply(this,arguments)}}();return(0,o.jsxs)(i.Z,{open:d.open,onCancel:function(){return d.onCancel()},centered:!0,title:"Upload",onOk:m,confirmLoading:B,children:[(0,o.jsx)("div",{className:"mb-4",children:(0,o.jsxs)(r.Z,{fileList:f,onRemove:function(O){var K=f.indexOf(O),D=f.slice();D.splice(K,1),R(D)},beforeUpload:function(O){return R([].concat(E()(f),[O])),!1},maxCount:1,children:[(0,o.jsx)("p",{className:"ant-upload-drag-icon",children:(0,o.jsx)(j.Z,{})}),(0,o.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"}),(0,o.jsx)("p",{className:"ant-upload-hint",children:"Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files."})]})}),(0,o.jsx)("div",{className:"text-center",children:(0,o.jsxs)("div",{className:"font-medium flex items-center gap-2 justify-center text-blue-500 text-base",children:[" ",(0,o.jsx)(l.Z,{})," Choose from your computer"]})}),(0,o.jsx)(t.Z,{children:"or"}),(0,o.jsx)(e.Z,{placeholder:"Paste image or URL",onChange:function(O){return L(O.currentTarget.value)}})]})};v.Z=h},28931:function(H,v,n){n.r(v);var a=n(53939),E=n.n(a),p=n(78095),g=n.n(p),P=n(83134),y=n.n(P),c=n(34827),C=n.n(c),T=n(78837),j=n(70308),l=n(63687),u=n(81068),i=n(79392),t=n(58703),e=n(46665),r=n(13762),s=n(2537),o=n(15621),h=n(24657),$=n(68136),d=n(33130),M=function(){var w=(0,$.useState)(),L=C()(w,2),S=L[0],U=L[1],f=(0,$.useState)(!1),R=C()(f,2),b=R[0],A=R[1],B=(0,t.useIntl)(),W=function(){(0,j.tr)(B.locale).then(function(_){U(_)})};(0,$.useEffect)(function(){W()},[]);var I=function(){var m=y()(E()().mark(function _(O){return E()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,(0,j.VY)(g()(g()({},S),{},{image:O.url}));case 2:e.ZP.success("Thay \u0111\u1ED5i th\xE0nh c\xF4ng!"),W();case 4:case"end":return D.stop()}},_)}));return function(O){return m.apply(this,arguments)}}();return(0,d.jsxs)(u._z,{children:[(0,d.jsx)(r.Z,{gutter:16,children:(0,d.jsx)(s.Z,{md:6,children:(0,d.jsx)(i.Z,{title:"Logo",headerBordered:!0,extra:(0,d.jsx)(o.ZP,{type:"primary",icon:(0,d.jsx)(l.Z,{}),onClick:function(){return A(!0)},children:(0,d.jsx)("span",{children:(0,d.jsx)(t.FormattedMessage,{id:"general.change"})})}),children:(0,d.jsx)(h.Z,{src:S==null?void 0:S.image})})})}),(0,d.jsx)(T.Z,{open:b,onCancel:function(){return A(!1)},onFinish:I})]})};v.default=M},41641:function(H,v,n){n.d(v,{IO:function(){return E},NR:function(){return C},TD:function(){return T},cI:function(){return c},ib:function(){return j},kd:function(){return y},pA:function(){return P},t4:function(){return p},vs:function(){return g}});var a=n(58703),E=function(u){return(0,a.request)("file/upload",{method:"POST",data:u,headers:{"Content-Type":"multipart/form-data"}})},p=function(u){return(0,a.request)("file/list",{params:u})},g=function(u){return(0,a.request)("gallery/photo/list",{params:u})},P=function(u){return(0,a.request)("gallery/photo/add",{method:"POST",data:u})},y=function(u){return(0,a.request)("gallery/photo/".concat(u),{method:"DELETE"})},c=function(u){return(0,a.request)("gallery/list",{params:u})},C=function(u){return(0,a.request)("gallery",{method:"POST",data:u})},T=function(u){return(0,a.request)("gallery",{method:"PUT",data:u})},j=function(u){return(0,a.request)("gallery/".concat(u),{method:"DELETE"})}},70308:function(H,v,n){n.d(v,{VY:function(){return g},_Q:function(){return p},sD:function(){return E},tr:function(){return P}});var a=n(58703),E=function(c){return(0,a.request)("banner/list",{params:c})},p=function(c){return(0,a.request)("banner/active/".concat(c),{method:"POST"})},g=function(c){return(0,a.request)("banner/update",{method:"POST",data:c})},P=function(c){return(0,a.request)("banner/logo",{params:{locale:c}})}},62960:function(H,v,n){n.d(v,{Z:function(){return t}});var a=n(68136),E=n(91150),p=n.n(E),g=n(80822),P=n(90130),y=n(63293),c=n(29029),C=n(46075);const T=e=>{const{componentCls:r,sizePaddingEdgeHorizontal:s,colorSplit:o,lineWidth:h,textPaddingInline:$,orientationMargin:d,verticalMarginInline:M}=e;return{[r]:Object.assign(Object.assign({},(0,y.Wf)(e)),{borderBlockStart:`${(0,P.unit)(h)} solid ${o}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:M,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,P.unit)(h)} solid ${o}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,P.unit)(e.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${r}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,P.unit)(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${o}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,P.unit)(h)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${r}-with-text-left`]:{"&::before":{width:`calc(${d} * 100%)`},"&::after":{width:`calc(100% - ${d} * 100%)`}},[`&-horizontal${r}-with-text-right`]:{"&::before":{width:`calc(100% - ${d} * 100%)`},"&::after":{width:`calc(${d} * 100%)`}},[`${r}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:$},"&-dashed":{background:"none",borderColor:o,borderStyle:"dashed",borderWidth:`${(0,P.unit)(h)} 0 0`},[`&-horizontal${r}-with-text${r}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${r}-dashed`]:{borderInlineStartWidth:h,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${r}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${r}-with-text-left${r}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${r}-inner-text`]:{paddingInlineStart:s}},[`&-horizontal${r}-with-text-right${r}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${r}-inner-text`]:{paddingInlineEnd:s}}})}},j=e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS});var l=(0,c.I$)("Divider",e=>{const r=(0,C.TS)(e,{dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG,sizePaddingEdgeHorizontal:0});return[T(r)]},j,{unitless:{orientationMargin:!0}}),u=function(e,r){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&r.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var h=0,o=Object.getOwnPropertySymbols(e);h<o.length;h++)r.indexOf(o[h])<0&&Object.prototype.propertyIsEnumerable.call(e,o[h])&&(s[o[h]]=e[o[h]]);return s},t=e=>{const{getPrefixCls:r,direction:s,divider:o}=a.useContext(g.E_),{prefixCls:h,type:$="horizontal",orientation:d="center",orientationMargin:M,className:Z,rootClassName:w,children:L,dashed:S,plain:U,style:f}=e,R=u(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain","style"]),b=r("divider",h),[A,B,W]=l(b),I=d.length>0?`-${d}`:d,m=!!L,_=d==="left"&&M!=null,O=d==="right"&&M!=null,K=p()(b,o==null?void 0:o.className,B,W,`${b}-${$}`,{[`${b}-with-text`]:m,[`${b}-with-text${I}`]:m,[`${b}-dashed`]:!!S,[`${b}-plain`]:!!U,[`${b}-rtl`]:s==="rtl",[`${b}-no-default-orientation-margin-left`]:_,[`${b}-no-default-orientation-margin-right`]:O},Z,w),D=a.useMemo(()=>typeof M=="number"?M:/^\d+$/.test(M)?Number(M):M,[M]),z=Object.assign(Object.assign({},_&&{marginLeft:D}),O&&{marginRight:D});return A(a.createElement("div",Object.assign({className:K,style:Object.assign(Object.assign({},o==null?void 0:o.style),f)},R,{role:"separator"}),L&&$!=="vertical"&&a.createElement("span",{className:`${b}-inner-text`,style:z},L)))}},54417:function(H,v,n){var a=n(68136);const E=(0,a.createContext)({});v.Z=E},30577:function(H,v,n){var a=n(68136),E=n(91150),p=n.n(E),g=n(80822),P=n(54417),y=n(25144),c=function(l,u){var i={};for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&u.indexOf(t)<0&&(i[t]=l[t]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,t=Object.getOwnPropertySymbols(l);e<t.length;e++)u.indexOf(t[e])<0&&Object.prototype.propertyIsEnumerable.call(l,t[e])&&(i[t[e]]=l[t[e]]);return i};function C(l){return typeof l=="number"?`${l} ${l} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(l)?`0 0 ${l}`:l}const T=["xs","sm","md","lg","xl","xxl"],j=a.forwardRef((l,u)=>{const{getPrefixCls:i,direction:t}=a.useContext(g.E_),{gutter:e,wrap:r}=a.useContext(P.Z),{prefixCls:s,span:o,order:h,offset:$,push:d,pull:M,className:Z,children:w,flex:L,style:S}=l,U=c(l,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),f=i("col",s),[R,b,A]=(0,y.cG)(f);let B={};T.forEach(m=>{let _={};const O=l[m];typeof O=="number"?_.span=O:typeof O=="object"&&(_=O||{}),delete U[m],B=Object.assign(Object.assign({},B),{[`${f}-${m}-${_.span}`]:_.span!==void 0,[`${f}-${m}-order-${_.order}`]:_.order||_.order===0,[`${f}-${m}-offset-${_.offset}`]:_.offset||_.offset===0,[`${f}-${m}-push-${_.push}`]:_.push||_.push===0,[`${f}-${m}-pull-${_.pull}`]:_.pull||_.pull===0,[`${f}-${m}-flex-${_.flex}`]:_.flex||_.flex==="auto",[`${f}-rtl`]:t==="rtl"})});const W=p()(f,{[`${f}-${o}`]:o!==void 0,[`${f}-order-${h}`]:h,[`${f}-offset-${$}`]:$,[`${f}-push-${d}`]:d,[`${f}-pull-${M}`]:M},Z,B,b,A),I={};if(e&&e[0]>0){const m=e[0]/2;I.paddingLeft=m,I.paddingRight=m}return L&&(I.flex=C(L),r===!1&&!I.minWidth&&(I.minWidth=0)),R(a.createElement("div",Object.assign({},U,{style:Object.assign(Object.assign({},I),S),className:W,ref:u}),w))});v.Z=j},36035:function(H,v,n){var a=n(68136),E=n(91150),p=n.n(E),g=n(79880),P=n(80822),y=n(54417),c=n(25144),C=function(i,t){var e={};for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&t.indexOf(r)<0&&(e[r]=i[r]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(i);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(i,r[s])&&(e[r[s]]=i[r[s]]);return e};const T=null,j=null;function l(i,t){const[e,r]=a.useState(typeof i=="string"?i:""),s=()=>{if(typeof i=="string"&&r(i),typeof i=="object")for(let o=0;o<g.c4.length;o++){const h=g.c4[o];if(!t[h])continue;const $=i[h];if($!==void 0){r($);return}}};return a.useEffect(()=>{s()},[JSON.stringify(i),t]),e}const u=a.forwardRef((i,t)=>{const{prefixCls:e,justify:r,align:s,className:o,style:h,children:$,gutter:d=0,wrap:M}=i,Z=C(i,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:w,direction:L}=a.useContext(P.E_),[S,U]=a.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[f,R]=a.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),b=l(s,f),A=l(r,f),B=a.useRef(d),W=(0,g.ZP)();a.useEffect(()=>{const N=W.subscribe(V=>{R(V);const G=B.current||0;(!Array.isArray(G)&&typeof G=="object"||Array.isArray(G)&&(typeof G[0]=="object"||typeof G[1]=="object"))&&U(V)});return()=>W.unsubscribe(N)},[]);const I=()=>{const N=[void 0,void 0];return(Array.isArray(d)?d:[d,void 0]).forEach((G,k)=>{if(typeof G=="object")for(let X=0;X<g.c4.length;X++){const J=g.c4[X];if(S[J]&&G[J]!==void 0){N[k]=G[J];break}}else N[k]=G}),N},m=w("row",e),[_,O,K]=(0,c.VM)(m),D=I(),z=p()(m,{[`${m}-no-wrap`]:M===!1,[`${m}-${A}`]:A,[`${m}-${b}`]:b,[`${m}-rtl`]:L==="rtl"},o,O,K),x={},F=D[0]!=null&&D[0]>0?D[0]/-2:void 0;F&&(x.marginLeft=F,x.marginRight=F),[,x.rowGap]=D;const[Y,Q]=D,q=a.useMemo(()=>({gutter:[Y,Q],wrap:M}),[Y,Q,M]);return _(a.createElement(y.Z.Provider,{value:q},a.createElement("div",Object.assign({},Z,{className:z,style:Object.assign(Object.assign({},x),h),ref:t}),$)))});v.Z=u},25144:function(H,v,n){n.d(v,{VM:function(){return l},cG:function(){return u}});var a=n(90130),E=n(29029),p=n(46075);const g=i=>{const{componentCls:t}=i;return{[t]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around":{justifyContent:"space-around"},"&-space-evenly":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},P=i=>{const{componentCls:t}=i;return{[t]:{position:"relative",maxWidth:"100%",minHeight:1}}},y=(i,t)=>{const{componentCls:e,gridColumns:r}=i,s={};for(let o=r;o>=0;o--)o===0?(s[`${e}${t}-${o}`]={display:"none"},s[`${e}-push-${o}`]={insetInlineStart:"auto"},s[`${e}-pull-${o}`]={insetInlineEnd:"auto"},s[`${e}${t}-push-${o}`]={insetInlineStart:"auto"},s[`${e}${t}-pull-${o}`]={insetInlineEnd:"auto"},s[`${e}${t}-offset-${o}`]={marginInlineStart:0},s[`${e}${t}-order-${o}`]={order:0}):(s[`${e}${t}-${o}`]=[{["--ant-display"]:"block",display:"block"},{display:"var(--ant-display)",flex:`0 0 ${o/r*100}%`,maxWidth:`${o/r*100}%`}],s[`${e}${t}-push-${o}`]={insetInlineStart:`${o/r*100}%`},s[`${e}${t}-pull-${o}`]={insetInlineEnd:`${o/r*100}%`},s[`${e}${t}-offset-${o}`]={marginInlineStart:`${o/r*100}%`},s[`${e}${t}-order-${o}`]={order:o});return s},c=(i,t)=>y(i,t),C=(i,t,e)=>({[`@media (min-width: ${(0,a.unit)(t)})`]:Object.assign({},c(i,e))}),T=()=>({}),j=()=>({}),l=(0,E.I$)("Grid",g,T),u=(0,E.I$)("Grid",i=>{const t=(0,p.TS)(i,{gridColumns:24}),e={"-sm":t.screenSMMin,"-md":t.screenMDMin,"-lg":t.screenLGMin,"-xl":t.screenXLMin,"-xxl":t.screenXXLMin};return[P(t),c(t,""),c(t,"-xs"),Object.keys(e).map(r=>C(t,e[r],r)).reduce((r,s)=>Object.assign(Object.assign({},r),s),{})]},j)},95179:function(H,v,n){n.d(v,{Z:function(){return E}});var a=n(89370);function E(p,g,P,y){var c=a.unstable_batchedUpdates?function(T){a.unstable_batchedUpdates(P,T)}:P;return p!=null&&p.addEventListener&&p.addEventListener(g,c,y),{remove:function(){p!=null&&p.removeEventListener&&p.removeEventListener(g,c,y)}}}},66e3:function(H,v,n){n.d(v,{g1:function(){return l},os:function(){return i}});var a=/margin|padding|width|height|max|min|offset/,E={left:!0,top:!0},p={cssFloat:1,styleFloat:1,float:1};function g(t){return t.nodeType===1?t.ownerDocument.defaultView.getComputedStyle(t,null):{}}function P(t,e,r){if(e=e.toLowerCase(),r==="auto"){if(e==="height")return t.offsetHeight;if(e==="width")return t.offsetWidth}return e in E||(E[e]=a.test(e)),E[e]?parseFloat(r)||0:r}function y(t,e){var r=arguments.length,s=g(t);return e=p[e]?"cssFloat"in t.style?"cssFloat":"styleFloat":e,r===1?s:P(t,e,s[e]||t.style[e])}function c(t,e,r){var s=arguments.length;if(e=p[e]?"cssFloat"in t.style?"cssFloat":"styleFloat":e,s===3)return typeof r=="number"&&a.test(e)&&(r="".concat(r,"px")),t.style[e]=r,r;for(var o in e)e.hasOwnProperty(o)&&c(t,o,e[o]);return g(t)}function C(t){return t===document.body?document.documentElement.clientWidth:t.offsetWidth}function T(t){return t===document.body?window.innerHeight||document.documentElement.clientHeight:t.offsetHeight}function j(){var t=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);return{width:t,height:e}}function l(){var t=document.documentElement.clientWidth,e=window.innerHeight||document.documentElement.clientHeight;return{width:t,height:e}}function u(){return{scrollLeft:Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),scrollTop:Math.max(document.documentElement.scrollTop,document.body.scrollTop)}}function i(t){var e=t.getBoundingClientRect(),r=document.documentElement;return{left:e.left+(window.pageXOffset||r.scrollLeft)-(r.clientLeft||document.body.clientLeft||0),top:e.top+(window.pageYOffset||r.scrollTop)-(r.clientTop||document.body.clientTop||0)}}}}]);
