"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4870],{4870:function(on,Qe,m){m.d(Qe,{Z:function(){return nn}});var G=m(63017),Je=m(91150),Q=m.n(Je),xe=m(24663),l=m(68136),$e=m(74273),w=m(51962);function de(e){const[t,n]=l.useState(e);return l.useEffect(()=>{const r=setTimeout(()=>{n(e)},e.length?0:10);return()=>{clearTimeout(r)}},[e]),t}var ae=m(90130),Se=m(63293),Ie=m(81317),ke=m(76741),_e=m(46075),Ee=m(29029),et=e=>{const{componentCls:t}=e,n=`${t}-show-help`,r=`${t}-show-help-item`;return{[n]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[r]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${r}-appear, &${r}-enter`]:{transform:"translateY(-5px)",opacity:0,["&-active"]:{transform:"translateY(0)",opacity:1}},[`&${r}-leave-active`]:{transform:"translateY(-5px)"}}}}};const tt=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${(0,ae.unit)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},[`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]:{outline:0,boxShadow:`0 0 0 ${(0,ae.unit)(e.controlOutlineWidth)} ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Fe=(e,t)=>{const{formItemCls:n}=e;return{[n]:{[`${n}-label > label`]:{height:t},[`${n}-control-input`]:{minHeight:t}}}},nt=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},(0,Se.Wf)(e)),tt(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Fe(e,e.controlHeightSM)),"&-large":Object.assign({},Fe(e,e.controlHeightLG))})}},rt=e=>{const{formItemCls:t,iconCls:n,componentCls:r,rootPrefixCls:o,labelRequiredMarkColor:i,labelColor:a,labelFontSize:s,labelHeight:d,labelColonMarginInlineStart:u,labelColonMarginInlineEnd:b,itemMarginBottom:p}=e;return{[t]:Object.assign(Object.assign({},(0,Se.Wf)(e)),{marginBottom:p,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden.${o}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:e.lineHeight,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:d,color:a,fontSize:s,[`> ${n}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:i,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:u,marginInlineEnd:b},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{["--ant-display"]:"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:Ie.kr,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},ot=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-horizontal`]:{[`${n}-label`]:{flexGrow:0},[`${n}-control`]:{flex:"1 1 0",minWidth:0},[`${n}-label[class$='-24'], ${n}-label[class*='-24 ']`]:{[`& + ${n}-control`]:{minWidth:"unset"}}}}},lt=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[n]:{flex:"none",marginInlineEnd:e.margin,marginBottom:0,"&-row":{flexWrap:"nowrap"},[`> ${n}-label,
        > ${n}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${n}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${n}-has-feedback`]:{display:"inline-block"}}}}},se=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),it=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${n} ${n}-label`]:se(e),[`${t}:not(${t}-inline)`]:{[n]:{flexWrap:"wrap",[`${n}-label, ${n}-control`]:{[`&:not([class*=" ${r}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},at=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${t}-vertical`]:{[n]:{"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"},[`${t}-item-control`]:{width:"100%"}}},[`${t}-vertical ${n}-label,
      .${r}-col-24${n}-label,
      .${r}-col-xl-24${n}-label`]:se(e),[`@media (max-width: ${(0,ae.unit)(e.screenXSMax)})`]:[it(e),{[t]:{[`.${r}-col-xs-24${n}-label`]:se(e)}}],[`@media (max-width: ${(0,ae.unit)(e.screenSMMax)})`]:{[t]:{[`.${r}-col-sm-24${n}-label`]:se(e)}},[`@media (max-width: ${(0,ae.unit)(e.screenMDMax)})`]:{[t]:{[`.${r}-col-md-24${n}-label`]:se(e)}},[`@media (max-width: ${(0,ae.unit)(e.screenLGMax)})`]:{[t]:{[`.${r}-col-lg-24${n}-label`]:se(e)}}}},st=e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0}),we=(e,t)=>(0,_e.TS)(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t});var fe=(0,Ee.I$)("Form",(e,t)=>{let{rootPrefixCls:n}=t;const r=we(e,n);return[nt(r),rt(r),et(r),ot(r),lt(r),at(r),(0,ke.Z)(r),Ie.kr]},st,{order:-1e3}),ge=m(17233);const Oe=[];function pe(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${r}`,error:e,errorStatus:n}}var Me=e=>{let{help:t,helpStatus:n,errors:r=Oe,warnings:o=Oe,className:i,fieldId:a,onVisibleChanged:s}=e;const{prefixCls:d}=l.useContext(w.Rk),u=`${d}-item-explain`,b=(0,ge.Z)(d),[p,j,I]=fe(d,b),v=(0,l.useMemo)(()=>(0,$e.Z)(d),[d]),E=de(r),O=de(o),S=l.useMemo(()=>t!=null?[pe(t,"help",n)]:[].concat((0,G.Z)(E.map((f,g)=>pe(f,"error","error",g))),(0,G.Z)(O.map((f,g)=>pe(f,"warning","warning",g)))),[t,n,E,O]),c={};return a&&(c.id=`${a}_help`),p(l.createElement(xe.default,{motionDeadline:v.motionDeadline,motionName:`${d}-show-help`,visible:!!S.length,onVisibleChanged:s},f=>{const{className:g,style:h}=f;return l.createElement("div",Object.assign({},c,{className:Q()(u,g,I,b,i,j),style:h,role:"alert"}),l.createElement(xe.CSSMotionList,Object.assign({keys:S},(0,$e.Z)(d),{motionName:`${d}-show-help-item`,component:!1}),$=>{const{key:L,error:M,errorStatus:z,className:H,style:A}=$;return l.createElement("div",{key:L,className:Q()(H,{[`${u}-${z}`]:z}),style:A},M)}))}))},oe=m(78094),he=m(80822),Ne=m(68435),ct=m(58978),dt=m(77336);const Pe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,je=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",be=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return je(n.overflowY,t)||je(n.overflowX,t)||(r=>{const o=(i=>{if(!i.ownerDocument||!i.ownerDocument.defaultView)return null;try{return i.ownerDocument.defaultView.frameElement}catch(a){return null}})(r);return!!o&&(o.clientHeight<r.scrollHeight||o.clientWidth<r.scrollWidth)})(e)}return!1},me=(e,t,n,r,o,i,a,s)=>i<e&&a>t||i>e&&a<t?0:i<=e&&s<=n||a>=t&&s>=n?i-e-r:a>t&&s<n||i<e&&s>n?a-t+o:0,mt=e=>{const t=e.parentElement;return t==null?e.getRootNode().host||null:t},Re=(e,t)=>{var n,r,o,i;if(typeof document=="undefined")return[];const{scrollMode:a,block:s,inline:d,boundary:u,skipOverflowHiddenElements:b}=t,p=typeof u=="function"?u:R=>R!==u;if(!Pe(e))throw new TypeError("Invalid target");const j=document.scrollingElement||document.documentElement,I=[];let v=e;for(;Pe(v)&&p(v);){if(v=mt(v),v===j){I.push(v);break}v!=null&&v===document.body&&be(v)&&!be(document.documentElement)||v!=null&&be(v,b)&&I.push(v)}const E=(r=(n=window.visualViewport)==null?void 0:n.width)!=null?r:innerWidth,O=(i=(o=window.visualViewport)==null?void 0:o.height)!=null?i:innerHeight,{scrollX:S,scrollY:c}=window,{height:f,width:g,top:h,right:$,bottom:L,left:M}=e.getBoundingClientRect(),{top:z,right:H,bottom:A,left:K}=(R=>{const y=window.getComputedStyle(R);return{top:parseFloat(y.scrollMarginTop)||0,right:parseFloat(y.scrollMarginRight)||0,bottom:parseFloat(y.scrollMarginBottom)||0,left:parseFloat(y.scrollMarginLeft)||0}})(e);let V=s==="start"||s==="nearest"?h-z:s==="end"?L+A:h+f/2-z+A,x=d==="center"?M+g/2-K+H:d==="end"?$+H:M-K;const T=[];for(let R=0;R<I.length;R++){const y=I[R],{height:D,width:te,top:ne,right:B,bottom:X,left:Y}=y.getBoundingClientRect();if(a==="if-needed"&&h>=0&&M>=0&&L<=O&&$<=E&&h>=ne&&L<=X&&M>=Y&&$<=B)return T;const k=getComputedStyle(y),_=parseInt(k.borderLeftWidth,10),W=parseInt(k.borderTopWidth,10),C=parseInt(k.borderRightWidth,10),N=parseInt(k.borderBottomWidth,10);let F=0,Z=0;const q="offsetWidth"in y?y.offsetWidth-y.clientWidth-_-C:0,U="offsetHeight"in y?y.offsetHeight-y.clientHeight-W-N:0,re="offsetWidth"in y?y.offsetWidth===0?0:te/y.offsetWidth:0,ee="offsetHeight"in y?y.offsetHeight===0?0:D/y.offsetHeight:0;if(j===y)F=s==="start"?V:s==="end"?V-O:s==="nearest"?me(c,c+O,O,W,N,c+V,c+V+f,f):V-O/2,Z=d==="start"?x:d==="center"?x-E/2:d==="end"?x-E:me(S,S+E,E,_,C,S+x,S+x+g,g),F=Math.max(0,F+c),Z=Math.max(0,Z+S);else{F=s==="start"?V-ne-W:s==="end"?V-X+N+U:s==="nearest"?me(ne,X,D,W,N+U,V,V+f,f):V-(ne+D/2)+U/2,Z=d==="start"?x-Y-_:d==="center"?x-(Y+te/2)+q/2:d==="end"?x-B+C+q:me(Y,B,te,_,C+q,x,x+g,g);const{scrollLeft:P,scrollTop:le}=y;F=ee===0?0:Math.max(0,Math.min(le+F/ee,y.scrollHeight-D/ee+U)),Z=re===0?0:Math.max(0,Math.min(P+Z/re,y.scrollWidth-te/re+q)),V+=le-F,x+=P-Z}T.push({el:y,top:F,left:Z})}return T},ut=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function ft(e,t){if(!e.isConnected||!(o=>{let i=o;for(;i&&i.parentNode;){if(i.parentNode===document)return!0;i=i.parentNode instanceof ShadowRoot?i.parentNode.host:i.parentNode}return!1})(e))return;const n=(o=>{const i=window.getComputedStyle(o);return{top:parseFloat(i.scrollMarginTop)||0,right:parseFloat(i.scrollMarginRight)||0,bottom:parseFloat(i.scrollMarginBottom)||0,left:parseFloat(i.scrollMarginLeft)||0}})(e);if((o=>typeof o=="object"&&typeof o.behavior=="function")(t))return t.behavior(Re(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:o,top:i,left:a}of Re(e,ut(t))){const s=i-n.top+n.bottom,d=a-n.left+n.right;o.scroll({top:s,left:d,behavior:r})}}const gt=["parentNode"],pt="form_item";function ce(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function Le(e,t){if(!e.length)return;const n=e.join("_");return t?`${t}_${n}`:gt.includes(n)?`${pt}_${n}`:n}function Ve(e,t,n,r,o,i){let a=r;return i!==void 0?a=i:n.validating?a="validating":e.length?a="error":t.length?a="warning":(n.touched||o&&n.validated)&&(a="success"),a}function Te(e){return ce(e).join("_")}function We(e){const[t]=(0,oe.cI)(),n=l.useRef({}),r=l.useMemo(()=>e!=null?e:Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>i=>{const a=Te(o);i?n.current[a]=i:delete n.current[a]}},scrollToField:function(o){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=ce(o),s=Le(a,r.__INTERNAL__.name),d=s?document.getElementById(s):null;d&&ft(d,Object.assign({scrollMode:"if-needed",block:"nearest"},i))},getFieldInstance:o=>{const i=Te(o);return n.current[i]}}),[e,t]);return[r]}var ht=m(59794),bt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const vt=(e,t)=>{const n=l.useContext(Ne.Z),{getPrefixCls:r,direction:o,form:i}=l.useContext(he.E_),{prefixCls:a,className:s,rootClassName:d,size:u,disabled:b=n,form:p,colon:j,labelAlign:I,labelWrap:v,labelCol:E,wrapperCol:O,hideRequiredMark:S,layout:c="horizontal",scrollToFirstError:f,requiredMark:g,onFinishFailed:h,name:$,style:L,feedbackIcons:M,variant:z}=e,H=bt(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons","variant"]),A=(0,ct.Z)(u),K=l.useContext(ht.Z),V=(0,l.useMemo)(()=>g!==void 0?g:S?!1:i&&i.requiredMark!==void 0?i.requiredMark:!0,[S,g,i]),x=j!=null?j:i==null?void 0:i.colon,T=r("form",a),R=(0,ge.Z)(T),[y,D,te]=fe(T,R),ne=Q()(T,`${T}-${c}`,{[`${T}-hide-required-mark`]:V===!1,[`${T}-rtl`]:o==="rtl",[`${T}-${A}`]:A},te,R,D,i==null?void 0:i.className,s,d),[B]=We(p),{__INTERNAL__:X}=B;X.name=$;const Y=(0,l.useMemo)(()=>({name:$,labelAlign:I,labelCol:E,labelWrap:v,wrapperCol:O,vertical:c==="vertical",colon:x,requiredMark:V,itemRef:X.itemRef,form:B,feedbackIcons:M}),[$,I,E,O,c,x,V,B,M]);l.useImperativeHandle(t,()=>B);const k=(W,C)=>{if(W){let N={block:"nearest"};typeof W=="object"&&(N=W),B.scrollToField(C,N)}},_=W=>{if(h==null||h(W),W.errorFields.length){const C=W.errorFields[0].name;if(f!==void 0){k(f,C);return}i&&i.scrollToFirstError!==void 0&&k(i.scrollToFirstError,C)}};return y(l.createElement(w.pg.Provider,{value:z},l.createElement(Ne.n,{disabled:b},l.createElement(dt.Z.Provider,{value:A},l.createElement(w.RV,{validateMessages:K},l.createElement(w.q3.Provider,{value:Y},l.createElement(oe.ZP,Object.assign({id:$},H,{name:$,onFinishFailed:_,form:B,style:Object.assign(Object.assign({},i==null?void 0:i.style),L),className:ne}))))))))};var yt=l.forwardRef(vt),Ct=m(92532),Ze=m(88321),He=m(75879),xt=m(75984),$t=m(90433);function St(e){if(typeof e=="function")return e;const t=(0,$t.Z)(e);return t.length<=1?t[0]:t}const ze=()=>{const{status:e,errors:t=[],warnings:n=[]}=(0,l.useContext)(w.aM);return{status:e,errors:t,warnings:n}};ze.Context=w.aM;var It=ze,Ae=m(99751);function Et(e){const[t,n]=l.useState(e),r=(0,l.useRef)(null),o=(0,l.useRef)([]),i=(0,l.useRef)(!1);l.useEffect(()=>(i.current=!1,()=>{i.current=!0,Ae.Z.cancel(r.current),r.current=null}),[]);function a(s){i.current||(r.current===null&&(o.current=[],r.current=(0,Ae.Z)(()=>{r.current=null,n(d=>{let u=d;return o.current.forEach(b=>{u=b(u)}),u})})),o.current.push(s))}return[t,a]}function Ft(){const{itemRef:e}=l.useContext(w.q3),t=l.useRef({});function n(r,o){const i=o&&typeof o=="object"&&o.ref,a=r.join("_");return(t.current.name!==a||t.current.originRef!==i)&&(t.current.name=a,t.current.originRef=i,t.current.ref=(0,Ze.sQ)(e(r),i)),t.current.ref}return n}var wt=m(13503),Ot=m(41647),Mt=m(99173),Nt=m(36035),De=m(30577);const Pt=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}};var jt=(0,Ee.bk)(["Form","item-item"],(e,t)=>{let{rootPrefixCls:n}=t;const r=we(e,n);return[Pt(r)]}),Rt=e=>{const{prefixCls:t,status:n,wrapperCol:r,children:o,errors:i,warnings:a,_internalItemRender:s,extra:d,help:u,fieldId:b,marginBottom:p,onErrorVisibleChanged:j}=e,I=`${t}-item`,v=l.useContext(w.q3),E=r||v.wrapperCol||{},O=Q()(`${I}-control`,E.className),S=l.useMemo(()=>Object.assign({},v),[v]);delete S.labelCol,delete S.wrapperCol;const c=l.createElement("div",{className:`${I}-control-input`},l.createElement("div",{className:`${I}-control-input-content`},o)),f=l.useMemo(()=>({prefixCls:t,status:n}),[t,n]),g=p!==null||i.length||a.length?l.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},l.createElement(w.Rk.Provider,{value:f},l.createElement(Me,{fieldId:b,errors:i,warnings:a,help:u,helpStatus:n,className:`${I}-explain-connected`,onVisibleChanged:j})),!!p&&l.createElement("div",{style:{width:0,height:p}})):null,h={};b&&(h.id=`${b}_extra`);const $=d?l.createElement("div",Object.assign({},h,{className:`${I}-extra`}),d):null,L=s&&s.mark==="pro_table_render"&&s.render?s.render(e,{input:c,errorList:g,extra:$}):l.createElement(l.Fragment,null,c,g,$);return l.createElement(w.q3.Provider,{value:S},l.createElement(De.Z,Object.assign({},E,{className:O}),L),l.createElement(jt,{prefixCls:t}))},Lt=m(55843),Vt=m(2016),Tt=m(18955),Wt=m(20782),Zt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function Ht(e){return e?typeof e=="object"&&!l.isValidElement(e)?e:{title:e}:null}var zt=e=>{let{prefixCls:t,label:n,htmlFor:r,labelCol:o,labelAlign:i,colon:a,required:s,requiredMark:d,tooltip:u}=e;var b;const[p]=(0,Tt.Z)("Form"),{vertical:j,labelAlign:I,labelCol:v,labelWrap:E,colon:O}=l.useContext(w.q3);if(!n)return null;const S=o||v||{},c=i||I,f=`${t}-item-label`,g=Q()(f,c==="left"&&`${f}-left`,S.className,{[`${f}-wrap`]:!!E});let h=n;const $=a===!0||O!==!1&&a!==!1;$&&!j&&typeof n=="string"&&n.trim()!==""&&(h=n.replace(/[:|：]\s*$/,""));const M=Ht(u);if(M){const{icon:K=l.createElement(Lt.Z,null)}=M,V=Zt(M,["icon"]),x=l.createElement(Wt.Z,Object.assign({},V),l.cloneElement(K,{className:`${t}-item-tooltip`,title:"",onClick:T=>{T.preventDefault()},tabIndex:null}));h=l.createElement(l.Fragment,null,h,x)}const z=d==="optional",H=typeof d=="function";H?h=d(h,{required:!!s}):z&&!s&&(h=l.createElement(l.Fragment,null,h,l.createElement("span",{className:`${t}-item-optional`,title:""},(p==null?void 0:p.optional)||((b=Vt.Z.Form)===null||b===void 0?void 0:b.optional))));const A=Q()({[`${t}-item-required`]:s,[`${t}-item-required-mark-optional`]:z||H,[`${t}-item-no-colon`]:!$});return l.createElement(De.Z,Object.assign({},S,{className:g}),l.createElement("label",{htmlFor:r,className:A,title:typeof n=="string"?n:""},h))},At=m(57308),Dt=m(8014),Bt=m(7901),Xt=m(16840);const qt={success:At.Z,warning:Bt.Z,error:Dt.Z,validating:Xt.Z};function Be(e){let{children:t,errors:n,warnings:r,hasFeedback:o,validateStatus:i,prefixCls:a,meta:s,noStyle:d}=e;const u=`${a}-item`,{feedbackIcons:b}=l.useContext(w.q3),p=Ve(n,r,s,null,!!o,i),{isFormItemInput:j,status:I,hasFeedback:v,feedbackIcon:E}=l.useContext(w.aM),O=l.useMemo(()=>{var S;let c;if(o){const g=o!==!0&&o.icons||b,h=p&&((S=g==null?void 0:g({status:p,errors:n,warnings:r}))===null||S===void 0?void 0:S[p]),$=p&&qt[p];c=h!==!1&&$?l.createElement("span",{className:Q()(`${u}-feedback-icon`,`${u}-feedback-icon-${p}`)},h||l.createElement($,null)):null}const f={status:p||"",errors:n,warnings:r,hasFeedback:!!o,feedbackIcon:c,isFormItemInput:!0};return d&&(f.status=(p!=null?p:I)||"",f.isFormItemInput=j,f.hasFeedback=!!(o!=null?o:v),f.feedbackIcon=o!==void 0?f.feedbackIcon:E),f},[p,o,d,j,I]);return l.createElement(w.aM.Provider,{value:O},t)}var Gt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function Kt(e){const{prefixCls:t,className:n,rootClassName:r,style:o,help:i,errors:a,warnings:s,validateStatus:d,meta:u,hasFeedback:b,hidden:p,children:j,fieldId:I,required:v,isRequired:E,onSubItemMetaChange:O}=e,S=Gt(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),c=`${t}-item`,{requiredMark:f}=l.useContext(w.q3),g=l.useRef(null),h=de(a),$=de(s),L=i!=null,M=!!(L||a.length||s.length),z=!!g.current&&(0,wt.Z)(g.current),[H,A]=l.useState(null);(0,Ot.Z)(()=>{if(M&&g.current){const R=getComputedStyle(g.current);A(parseInt(R.marginBottom,10))}},[M,z]);const K=R=>{R||A(null)},x=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const y=R?h:u.errors,D=R?$:u.warnings;return Ve(y,D,u,"",!!b,d)}(),T=Q()(c,n,r,{[`${c}-with-help`]:L||h.length||$.length,[`${c}-has-feedback`]:x&&b,[`${c}-has-success`]:x==="success",[`${c}-has-warning`]:x==="warning",[`${c}-has-error`]:x==="error",[`${c}-is-validating`]:x==="validating",[`${c}-hidden`]:p});return l.createElement("div",{className:T,style:o,ref:g},l.createElement(Nt.Z,Object.assign({className:`${c}-row`},(0,Mt.Z)(S,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),l.createElement(zt,Object.assign({htmlFor:I},e,{requiredMark:f,required:v!=null?v:E,prefixCls:t})),l.createElement(Rt,Object.assign({},e,u,{errors:h,warnings:$,prefixCls:t,status:x,help:i,marginBottom:H,onErrorVisibleChanged:K}),l.createElement(w.qI.Provider,{value:O},l.createElement(Be,{prefixCls:t,meta:u,errors:u.errors,warnings:u.warnings,hasFeedback:b,validateStatus:x},j)))),!!H&&l.createElement("div",{className:`${c}-margin-offset`,style:{marginBottom:-H}}))}const Yt="__SPLIT__",mn=null;function Ut(e,t){const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(o=>{const i=e[o],a=t[o];return i===a||typeof i=="function"||typeof a=="function"})}const Qt=l.memo(e=>{let{children:t}=e;return t},(e,t)=>Ut(e.control,t.control)&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((n,r)=>n===t.childProps[r]));function Xe(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function Jt(e){const{name:t,noStyle:n,className:r,dependencies:o,prefixCls:i,shouldUpdate:a,rules:s,children:d,required:u,label:b,messageVariables:p,trigger:j="onChange",validateTrigger:I,hidden:v,help:E}=e,{getPrefixCls:O}=l.useContext(he.E_),{name:S}=l.useContext(w.q3),c=St(d),f=typeof c=="function",g=l.useContext(w.qI),{validateTrigger:h}=l.useContext(oe.zb),$=I!==void 0?I:h,L=t!=null,M=O("form",i),z=(0,ge.Z)(M),[H,A,K]=fe(M,z),V=(0,xt.ln)("Form.Item"),x=l.useContext(oe.ZM),T=l.useRef(),[R,y]=Et({}),[D,te]=(0,Ct.Z)(()=>Xe()),ne=C=>{const N=x==null?void 0:x.getKey(C.name);if(te(C.destroy?Xe():C,!0),n&&E!==!1&&g){let F=C.name;if(C.destroy)F=T.current||F;else if(N!==void 0){const[Z,q]=N;F=[Z].concat((0,G.Z)(q)),T.current=F}g(C,F)}},B=(C,N)=>{y(F=>{const Z=Object.assign({},F),U=[].concat((0,G.Z)(C.name.slice(0,-1)),(0,G.Z)(N)).join(Yt);return C.destroy?delete Z[U]:Z[U]=C,Z})},[X,Y]=l.useMemo(()=>{const C=(0,G.Z)(D.errors),N=(0,G.Z)(D.warnings);return Object.values(R).forEach(F=>{C.push.apply(C,(0,G.Z)(F.errors||[])),N.push.apply(N,(0,G.Z)(F.warnings||[]))}),[C,N]},[R,D.errors,D.warnings]),k=Ft();function _(C,N,F){return n&&!v?l.createElement(Be,{prefixCls:M,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:D,errors:X,warnings:Y,noStyle:!0},C):l.createElement(Kt,Object.assign({key:"row"},e,{className:Q()(r,K,z,A),prefixCls:M,fieldId:N,isRequired:F,errors:X,warnings:Y,meta:D,onSubItemMetaChange:B}),C)}if(!L&&!f&&!o)return H(_(c));let W={};return typeof b=="string"?W.label=b:t&&(W.label=String(t)),p&&(W=Object.assign(Object.assign({},W),p)),H(l.createElement(oe.gN,Object.assign({},e,{messageVariables:W,trigger:j,validateTrigger:$,onMetaChange:ne}),(C,N,F)=>{const Z=ce(t).length&&N?N.name:[],q=Le(Z,S),U=u!==void 0?u:!!(s&&s.some(P=>{if(P&&typeof P=="object"&&P.required&&!P.warningOnly)return!0;if(typeof P=="function"){const le=P(F);return le&&le.required&&!le.warningOnly}return!1})),re=Object.assign({},C);let ee=null;if(Array.isArray(c)&&L)ee=c;else if(!(f&&(!(a||o)||L))){if(!(o&&!f&&!L))if((0,He.l$)(c)){const P=Object.assign(Object.assign({},c.props),re);if(P.id||(P.id=q),E||X.length>0||Y.length>0||e.extra){const ie=[];(E||X.length>0)&&ie.push(`${q}_help`),e.extra&&ie.push(`${q}_extra`),P["aria-describedby"]=ie.join(" ")}X.length>0&&(P["aria-invalid"]="true"),U&&(P["aria-required"]="true"),(0,Ze.Yr)(c)&&(P.ref=k(Z,c)),new Set([].concat((0,G.Z)(ce(j)),(0,G.Z)(ce($)))).forEach(ie=>{P[ie]=function(){for(var Ge,Ke,ve,Ye,ye,Ue=arguments.length,Ce=new Array(Ue),ue=0;ue<Ue;ue++)Ce[ue]=arguments[ue];(ve=re[ie])===null||ve===void 0||(Ge=ve).call.apply(Ge,[re].concat(Ce)),(ye=(Ye=c.props)[ie])===null||ye===void 0||(Ke=ye).call.apply(Ke,[Ye].concat(Ce))}});const rn=[P["aria-required"],P["aria-invalid"],P["aria-describedby"]];ee=l.createElement(Qt,{control:re,update:c,childProps:rn},(0,He.Tm)(c,P))}else f&&(a||o)&&!L?ee=c(F):ee=c}return _(ee,q,U)}))}const qe=Jt;qe.useStatus=It;var kt=qe,_t=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n},en=e=>{var{prefixCls:t,children:n}=e,r=_t(e,["prefixCls","children"]);const{getPrefixCls:o}=l.useContext(he.E_),i=o("form",t),a=l.useMemo(()=>({prefixCls:i,status:"error"}),[i]);return l.createElement(oe.aV,Object.assign({},r),(s,d,u)=>l.createElement(w.Rk.Provider,{value:a},n(s.map(b=>Object.assign(Object.assign({},b),{fieldKey:b.key})),d,{errors:u.errors,warnings:u.warnings})))};function tn(){const{form:e}=(0,l.useContext)(w.q3);return e}const J=yt;J.Item=kt,J.List=en,J.ErrorList=Me,J.useForm=We,J.useFormInstance=tn,J.useWatch=oe.qo,J.Provider=w.RV,J.create=()=>{};var nn=J}}]);
