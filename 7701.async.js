"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7701],{27701:function($n,en,e){e.d(en,{Z:function(){return da}});var l=e(28730),a=e(20237),Q=e(64634),P=e(18534),D=e(57596),ln=e(91569),cn=e(55588),X=e(72772),dn=e(32822);function sn(){return(0,dn.Z)()}var vn={useBreakpoint:sn},Y=e(19146),q=e(82187),y=e.n(q),gn=e(71770),un=e(65589),g=e(93236),Z=e(22222),C=function(n){var o=n.componentCls,i=n.antCls;return(0,a.Z)({},"".concat(o,"-actions"),(0,a.Z)((0,a.Z)({marginBlock:0,marginInline:0,paddingBlock:0,paddingInline:0,listStyle:"none",display:"flex",gap:n.marginXS,background:n.colorBgContainer,borderBlockStart:"".concat(n.lineWidth,"px ").concat(n.lineType," ").concat(n.colorSplit),minHeight:42},"& > *",{alignItems:"center",justifyContent:"center",flex:1,display:"flex",cursor:"pointer",color:n.colorTextSecondary,transition:"color 0.3s","&:hover":{color:n.colorPrimaryHover}}),"& > li > div",{flex:1,width:"100%",marginBlock:n.marginSM,marginInline:0,color:n.colorTextSecondary,textAlign:"center",a:{color:n.colorTextSecondary,transition:"color 0.3s","&:hover":{color:n.colorPrimaryHover}},div:(0,a.Z)((0,a.Z)({position:"relative",display:"block",minWidth:32,fontSize:n.fontSize,lineHeight:n.lineHeight,cursor:"pointer","&:hover":{color:n.colorPrimaryHover,transition:"color 0.3s"}},"a:not(".concat(i,`-btn),
            > .anticon`),{display:"inline-block",width:"100%",color:n.colorTextSecondary,lineHeight:"22px",transition:"color 0.3s","&:hover":{color:n.colorPrimaryHover}}),".anticon",{fontSize:n.cardActionIconSize,lineHeight:"22px"}),"&:not(:last-child)":{borderInlineEnd:"".concat(n.lineWidth,"px ").concat(n.lineType," ").concat(n.colorSplit)}}))};function h(r){return(0,Z.Xj)("ProCardActions",function(n){var o=(0,l.Z)((0,l.Z)({},n),{},{componentCls:".".concat(r),cardActionIconSize:16});return[C(o)]})}var t=e(62086),pn=function(n){var o=n.actions,i=n.prefixCls,u=h(i),s=u.wrapSSR,x=u.hashId;return Array.isArray(o)&&o!==null&&o!==void 0&&o.length?s((0,t.jsx)("ul",{className:y()("".concat(i,"-actions"),x),children:o.map(function(m,S){return(0,t.jsx)("li",{style:{width:"".concat(100/o.length,"%"),padding:0,margin:0},className:y()("".concat(i,"-actions-item"),x),children:m},"action-".concat(S))})})):s((0,t.jsx)("ul",{className:y()("".concat(i,"-actions"),x),children:o}))},H=pn,E=e(69534),f=e(97146),B=e(63504),k=new B.Keyframes("card-loading",{"0%":{backgroundPosition:"0 50%"},"50%":{backgroundPosition:"100% 50%"},"100%":{backgroundPosition:"0 50%"}}),hn=function(n){return(0,a.Z)({},n.componentCls,(0,a.Z)((0,a.Z)({"&-loading":{overflow:"hidden"},"&-loading &-body":{userSelect:"none"}},"".concat(n.componentCls,"-loading-content"),{width:"100%",p:{marginBlock:0,marginInline:0}}),"".concat(n.componentCls,"-loading-block"),{height:"14px",marginBlock:"4px",background:"linear-gradient(90deg, rgba(54, 61, 64, 0.2), rgba(54, 61, 64, 0.4), rgba(54, 61, 64, 0.2))",backgroundSize:"600% 600%",borderRadius:n.borderRadius,animationName:k,animationDuration:"1.4s",animationTimingFunction:"ease",animationIterationCount:"infinite"}))};function R(r){return(0,Z.Xj)("ProCardLoading",function(n){var o=(0,l.Z)((0,l.Z)({},n),{},{componentCls:".".concat(r)});return[hn(o)]})}var L=function(n){var o=n.style,i=n.prefix,u=R(i||"ant-pro-card"),s=u.wrapSSR;return s((0,t.jsxs)("div",{className:"".concat(i,"-loading-content"),style:o,children:[(0,t.jsx)(E.Z,{gutter:8,children:(0,t.jsx)(f.Z,{span:22,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})})}),(0,t.jsxs)(E.Z,{gutter:8,children:[(0,t.jsx)(f.Z,{span:8,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})}),(0,t.jsx)(f.Z,{span:15,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})})]}),(0,t.jsxs)(E.Z,{gutter:8,children:[(0,t.jsx)(f.Z,{span:6,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})}),(0,t.jsx)(f.Z,{span:18,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})})]}),(0,t.jsxs)(E.Z,{gutter:8,children:[(0,t.jsx)(f.Z,{span:13,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})}),(0,t.jsx)(f.Z,{span:9,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})})]}),(0,t.jsxs)(E.Z,{gutter:8,children:[(0,t.jsx)(f.Z,{span:4,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})}),(0,t.jsx)(f.Z,{span:3,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})}),(0,t.jsx)(f.Z,{span:16,children:(0,t.jsx)("div",{className:"".concat(i,"-loading-block")})})]})]}))},fn=L,_=e(91420),A=e(13763),Fn=e(12868),Kn=e(14224),Vn=["tab","children"],Un=["key","tab","tabKey","disabled","destroyInactiveTabPane","children","className","style","cardProps"];function Jn(r){return r.filter(function(n){return n})}function Qn(r,n,o){if(r)return r.map(function(u){return(0,l.Z)((0,l.Z)({},u),{},{children:(0,t.jsx)(O,(0,l.Z)((0,l.Z)({},o==null?void 0:o.cardProps),{},{children:u.children}))})});(0,Fn.ET)(!o,"Tabs.TabPane is deprecated. Please use `items` directly.");var i=(0,A.Z)(n).map(function(u){if(g.isValidElement(u)){var s=u.key,x=u.props,m=x||{},S=m.tab,j=m.children,N=(0,D.Z)(m,Vn),T=(0,l.Z)((0,l.Z)({key:String(s)},N),{},{children:(0,t.jsx)(O,(0,l.Z)((0,l.Z)({},o==null?void 0:o.cardProps),{},{children:j})),label:S});return T}return null});return Jn(i)}var Yn=function(n){var o=(0,g.useContext)(X.ZP.ConfigContext),i=o.getPrefixCls;if(_.Z.startsWith("5"))return(0,t.jsx)(t.Fragment,{});var u=n.key,s=n.tab,x=n.tabKey,m=n.disabled,S=n.destroyInactiveTabPane,j=n.children,N=n.className,T=n.style,W=n.cardProps,F=(0,D.Z)(n,Un),w=i("pro-card-tabpane"),nn=y()(w,N);return(0,t.jsx)(Y.Z.TabPane,(0,l.Z)((0,l.Z)({tabKey:x,tab:s,className:nn,style:T,disabled:m,destroyInactiveTabPane:S},F),{},{children:(0,t.jsx)(O,(0,l.Z)((0,l.Z)({},W),{},{children:j}))}),u)},qn=Yn,In=function(n){return{backgroundColor:n.controlItemBgActive,borderColor:n.controlOutline}},kn=function(n){var o=n.componentCls;return(0,a.Z)((0,a.Z)((0,a.Z)({},o,(0,l.Z)((0,l.Z)({position:"relative",display:"flex",flexDirection:"column",boxSizing:"border-box",width:"100%",marginBlock:0,marginInline:0,paddingBlock:0,paddingInline:0,backgroundColor:n.colorBgContainer,borderRadius:n.borderRadius},Z.Wf===null||Z.Wf===void 0?void 0:(0,Z.Wf)(n)),{},(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({"&-box-shadow":{boxShadow:"0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017",borderColor:"transparent"},"&-col":{width:"100%"},"&-border":{border:"".concat(n.lineWidth,"px ").concat(n.lineType," ").concat(n.colorSplit)},"&-hoverable":(0,a.Z)({cursor:"pointer",transition:"box-shadow 0.3s, border-color 0.3s","&:hover":{borderColor:"transparent",boxShadow:"0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017"}},"&".concat(o,"-checked:hover"),{borderColor:n.controlOutline}),"&-checked":(0,l.Z)((0,l.Z)({},In(n)),{},{"&::after":{position:"absolute",insetBlockStart:2,insetInlineEnd:2,width:0,height:0,border:"6px solid ".concat(n.colorPrimary),borderBlockEnd:"6px solid transparent",borderInlineStart:"6px solid transparent",borderStartEndRadius:2,content:'""'}}),"&:focus":(0,l.Z)({},In(n)),"&&-ghost":(0,a.Z)({backgroundColor:"transparent"},"> ".concat(o),{"&-header":{paddingInlineEnd:0,paddingBlockEnd:n.padding,paddingInlineStart:0},"&-body":{paddingBlock:0,paddingInline:0,backgroundColor:"transparent"}}),"&&-split > &-body":{paddingBlock:0,paddingInline:0},"&&-contain-card > &-body":{display:"flex"}},"".concat(o,"-body-direction-column"),{flexDirection:"column"}),"".concat(o,"-body-wrap"),{flexWrap:"wrap"}),"&&-collapse",(0,a.Z)({},"> ".concat(o),{"&-header":{paddingBlockEnd:n.padding,borderBlockEnd:0},"&-body":{display:"none"}})),"".concat(o,"-header"),{display:"flex",alignItems:"center",justifyContent:"space-between",paddingInline:n.paddingLG,paddingBlock:n.padding,paddingBlockEnd:0,"&-border":{"&":{paddingBlockEnd:n.padding},borderBlockEnd:"".concat(n.lineWidth,"px ").concat(n.lineType," ").concat(n.colorSplit)},"&-collapsible":{cursor:"pointer"}}),"".concat(o,"-title"),{color:n.colorText,fontWeight:500,fontSize:n.fontSizeLG,lineHeight:n.lineHeight}),"".concat(o,"-extra"),{color:n.colorText}),"".concat(o,"-type-inner"),(0,a.Z)({},"".concat(o,"-header"),{backgroundColor:n.colorFillAlter})),"".concat(o,"-collapsible-icon"),{marginInlineEnd:n.marginXS,color:n.colorIconHover,":hover":{color:n.colorPrimaryHover},"& svg":{transition:"transform ".concat(n.motionDurationMid)}}),"".concat(o,"-body"),{display:"block",boxSizing:"border-box",height:"100%",paddingInline:n.paddingLG,paddingBlock:n.padding,"&-center":{display:"flex",alignItems:"center",justifyContent:"center"}}),"&&-size-small",(0,a.Z)((0,a.Z)({},o,{"&-header":{paddingInline:n.paddingSM,paddingBlock:n.paddingXS,paddingBlockEnd:0,"&-border":{paddingBlockEnd:n.paddingXS}},"&-title":{fontSize:n.fontSize},"&-body":{paddingInline:n.paddingSM,paddingBlock:n.paddingSM}}),"".concat(o,"-header").concat(o,"-header-collapsible"),{paddingBlock:n.paddingXS})))),"".concat(o,"-col"),(0,a.Z)((0,a.Z)({},"&".concat(o,"-split-vertical"),{borderInlineEnd:"".concat(n.lineWidth,"px ").concat(n.lineType," ").concat(n.colorSplit)}),"&".concat(o,"-split-horizontal"),{borderBlockEnd:"".concat(n.lineWidth,"px ").concat(n.lineType," ").concat(n.colorSplit)})),"".concat(o,"-tabs"),(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},"".concat(n.antCls,"-tabs-top > ").concat(n.antCls,"-tabs-nav"),(0,a.Z)({marginBlockEnd:0},"".concat(n.antCls,"-tabs-nav-list"),{marginBlockStart:n.marginXS,paddingInlineStart:n.padding})),"".concat(n.antCls,"-tabs-bottom > ").concat(n.antCls,"-tabs-nav"),(0,a.Z)({marginBlockEnd:0},"".concat(n.antCls,"-tabs-nav-list"),{paddingInlineStart:n.padding})),"".concat(n.antCls,"-tabs-left"),(0,a.Z)({},"".concat(n.antCls,"-tabs-content-holder"),(0,a.Z)({},"".concat(n.antCls,"-tabs-content"),(0,a.Z)({},"".concat(n.antCls,"-tabs-tabpane"),{paddingInlineStart:0})))),"".concat(n.antCls,"-tabs-left > ").concat(n.antCls,"-tabs-nav"),(0,a.Z)({marginInlineEnd:0},"".concat(n.antCls,"-tabs-nav-list"),{paddingBlockStart:n.padding})),"".concat(n.antCls,"-tabs-right"),(0,a.Z)({},"".concat(n.antCls,"-tabs-content-holder"),(0,a.Z)({},"".concat(n.antCls,"-tabs-content"),(0,a.Z)({},"".concat(n.antCls,"-tabs-tabpane"),{paddingInlineStart:0})))),"".concat(n.antCls,"-tabs-right > ").concat(n.antCls,"-tabs-nav"),(0,a.Z)({},"".concat(n.antCls,"-tabs-nav-list"),{paddingBlockStart:n.padding})))},Pn=24,_n=function(n,o){var i=o.componentCls;return n===0?(0,a.Z)({},"".concat(i,"-col-0"),{display:"none"}):(0,a.Z)({},"".concat(i,"-col-").concat(n),{flexShrink:0,width:"".concat(n/Pn*100,"%")})},na=function(n){return Array(Pn+1).fill(1).map(function(o,i){return _n(i,n)})};function aa(r){return(0,Z.Xj)("ProCard",function(n){var o=(0,l.Z)((0,l.Z)({},n),{},{componentCls:".".concat(r)});return[kn(o),na(o)]})}var oa=["className","style","bodyStyle","headStyle","title","subTitle","extra","tip","wrap","layout","loading","gutter","tooltip","split","headerBordered","bordered","boxShadow","children","size","actions","ghost","hoverable","direction","collapsed","collapsible","collapsibleIconRender","defaultCollapsed","onCollapse","checked","onChecked","tabs","type"],ta=g.forwardRef(function(r,n){var o,i=r.className,u=r.style,s=r.bodyStyle,x=r.headStyle,m=r.title,S=r.subTitle,j=r.extra,N=r.tip,T=r.wrap,W=T===void 0?!1:T,F=r.layout,w=r.loading,nn=r.gutter,sa=nn===void 0?0:nn,va=r.tooltip,K=r.split,Bn=r.headerBordered,ga=Bn===void 0?!1:Bn,Nn=r.bordered,ua=Nn===void 0?!1:Nn,Tn=r.boxShadow,pa=Tn===void 0?!1:Tn,xn=r.children,zn=r.size,En=r.actions,An=r.ghost,ha=An===void 0?!1:An,wn=r.hoverable,fa=wn===void 0?!1:wn,xa=r.direction,Gn=r.collapsed,Mn=r.collapsible,ma=Mn===void 0?!1:Mn,Rn=r.collapsibleIconRender,Ln=r.defaultCollapsed,ya=Ln===void 0?!1:Ln,ba=r.onCollapse,Ca=r.checked,mn=r.onChecked,G=r.tabs,yn=r.type,V=(0,D.Z)(r,oa),Za=(0,g.useContext)(X.ZP.ConfigContext),Sa=Za.getPrefixCls,an=vn.useBreakpoint()||{lg:!0,md:!0,sm:!0,xl:!1,xs:!1,xxl:!1},ja=(0,un.Z)(ya,{value:Gn,onChange:ba}),Wn=(0,P.Z)(ja,2),on=Wn[0],Ia=Wn[1],tn=["xxl","xl","lg","md","sm","xs"],Pa=Qn(G==null?void 0:G.items,xn,G),Ba=function(d){var v=[0,0],M=Array.isArray(d)?d:[d,0];return M.forEach(function(b,I){if((0,Q.Z)(b)==="object")for(var U=0;U<tn.length;U+=1){var J=tn[U];if(an[J]&&b[J]!==void 0){v[I]=b[J];break}}else v[I]=b||0}),v},bn=function(d,v){return d?v:{}},Na=function(d){var v=d;if((0,Q.Z)(d)==="object")for(var M=0;M<tn.length;M+=1){var b=tn[M];if(an!=null&&an[b]&&(d==null?void 0:d[b])!==void 0){v=d[b];break}}var I=bn(typeof v=="string"&&/\d%|\dpx/i.test(v),{width:v,flexShrink:0});return{span:v,colSpanStyle:I}},c=Sa("pro-card"),Dn=aa(c),Xn=Dn.wrapSSR,z=Dn.hashId,Ta=Ba(sa),Hn=(0,P.Z)(Ta,2),Cn=Hn[0],Zn=Hn[1],Sn=!1,jn=g.Children.toArray(xn),za=jn.map(function(p,d){var v;if(p!=null&&(v=p.type)!==null&&v!==void 0&&v.isProCard){Sn=!0;var M=p.props.colSpan,b=Na(M),I=b.span,U=b.colSpanStyle,J=y()(["".concat(c,"-col")],z,(0,a.Z)((0,a.Z)((0,a.Z)({},"".concat(c,"-split-vertical"),K==="vertical"&&d!==jn.length-1),"".concat(c,"-split-horizontal"),K==="horizontal"&&d!==jn.length-1),"".concat(c,"-col-").concat(I),typeof I=="number"&&I>=0&&I<=24)),Ga=Xn((0,t.jsx)("div",{style:(0,l.Z)((0,l.Z)((0,l.Z)({},U),bn(Cn>0,{paddingInlineEnd:Cn/2,paddingInlineStart:Cn/2})),bn(Zn>0,{paddingBlockStart:Zn/2,paddingBlockEnd:Zn/2})),className:J,children:g.cloneElement(p)}));return g.cloneElement(Ga,{key:"pro-card-col-".concat((p==null?void 0:p.key)||d)})}return p}),Ea=y()("".concat(c),i,z,(o={},(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)(o,"".concat(c,"-border"),ua),"".concat(c,"-box-shadow"),pa),"".concat(c,"-contain-card"),Sn),"".concat(c,"-loading"),w),"".concat(c,"-split"),K==="vertical"||K==="horizontal"),"".concat(c,"-ghost"),ha),"".concat(c,"-hoverable"),fa),"".concat(c,"-size-").concat(zn),zn),"".concat(c,"-type-").concat(yn),yn),"".concat(c,"-collapse"),on),(0,a.Z)(o,"".concat(c,"-checked"),Ca))),Aa=y()("".concat(c,"-body"),z,(0,a.Z)((0,a.Z)((0,a.Z)({},"".concat(c,"-body-center"),F==="center"),"".concat(c,"-body-direction-column"),K==="horizontal"||xa==="column"),"".concat(c,"-body-wrap"),W&&Sn)),wa=s,On=g.isValidElement(w)?w:(0,t.jsx)(fn,{prefix:c,style:(s==null?void 0:s.padding)===0||(s==null?void 0:s.padding)==="0px"?{padding:24}:void 0}),rn=ma&&Gn===void 0&&(Rn?Rn({collapsed:on}):(0,t.jsx)(ln.Z,{rotate:on?void 0:90,className:"".concat(c,"-collapsible-icon ").concat(z).trim()}));return Xn((0,t.jsxs)("div",(0,l.Z)((0,l.Z)({className:Ea,style:u,ref:n,onClick:function(d){var v;mn==null||mn(d),V==null||(v=V.onClick)===null||v===void 0||v.call(V,d)}},(0,gn.Z)(V,["prefixCls","colSpan"])),{},{children:[(m||j||rn)&&(0,t.jsxs)("div",{className:y()("".concat(c,"-header"),z,(0,a.Z)((0,a.Z)({},"".concat(c,"-header-border"),ga||yn==="inner"),"".concat(c,"-header-collapsible"),rn)),style:x,onClick:function(){rn&&Ia(!on)},children:[(0,t.jsxs)("div",{className:"".concat(c,"-title ").concat(z).trim(),children:[rn,(0,t.jsx)(cn.G,{label:m,tooltip:va||N,subTitle:S})]}),j&&(0,t.jsx)("div",{className:"".concat(c,"-extra ").concat(z).trim(),onClick:function(d){return d.stopPropagation()},children:j})]}),G?(0,t.jsx)("div",{className:"".concat(c,"-tabs ").concat(z).trim(),children:(0,t.jsx)(Y.Z,(0,l.Z)((0,l.Z)({onChange:G.onChange},G),{},{items:Pa,children:w?On:xn}))}):(0,t.jsx)("div",{className:Aa,style:wa,children:w?On:za}),En?(0,t.jsx)(H,{actions:En,prefixCls:c}):null]})))}),O=ta,ra=function(n){var o=n.componentCls;return(0,a.Z)({},o,{"&-divider":{flex:"none",width:n.lineWidth,marginInline:n.marginXS,marginBlock:n.marginLG,backgroundColor:n.colorSplit,"&-horizontal":{width:"initial",height:n.lineWidth,marginInline:n.marginLG,marginBlock:n.marginXS}},"&&-size-small &-divider":{marginBlock:n.marginLG,marginInline:n.marginXS,"&-horizontal":{marginBlock:n.marginXS,marginInline:n.marginLG}}})};function ea(r){return(0,Z.Xj)("ProCardDivider",function(n){var o=(0,l.Z)((0,l.Z)({},n),{},{componentCls:".".concat(r)});return[ra(o)]})}var la=function(n){var o=(0,g.useContext)(X.ZP.ConfigContext),i=o.getPrefixCls,u=i("pro-card"),s="".concat(u,"-divider"),x=ea(u),m=x.wrapSSR,S=x.hashId,j=n.className,N=n.style,T=N===void 0?{}:N,W=n.type,F=y()(s,j,S,(0,a.Z)({},"".concat(s,"-").concat(W),W));return m((0,t.jsx)("div",{className:F,style:T}))},ia=la,ca=function(n){return(0,t.jsx)(O,(0,l.Z)({bodyStyle:{padding:0}},n))},$=O;$.isProCard=!0,$.Divider=ia,$.TabPane=qn,$.Group=ca;var da=$},55588:function($n,en,e){e.d(en,{G:function(){return Z}});var l=e(28730),a=e(20237),Q=e(48063),P=e(93236),D={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"}}]},name:"info-circle",theme:"outlined"},ln=D,cn=e(38782),X=function(h,t){return P.createElement(cn.Z,(0,Q.Z)({},h,{ref:t,icon:ln}))},dn=P.forwardRef(X),sn=e(72772),vn=e(89631),Y=e(82187),q=e.n(Y),y=e(22222),gn=function(h){return(0,a.Z)({},h.componentCls,{display:"inline-flex",alignItems:"center",maxWidth:"100%","&-icon":{display:"block",marginInlineStart:"4px",cursor:"pointer","&:hover":{color:h.colorPrimary}},"&-title":{display:"inline-flex",flex:"1"},"&-subtitle ":{marginInlineStart:8,color:h.colorTextSecondary,fontWeight:"normal",fontSize:h.fontSize,whiteSpace:"nowrap"},"&-title-ellipsis":{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",wordBreak:"keep-all"}})};function un(C){return(0,y.Xj)("LabelIconTip",function(h){var t=(0,l.Z)((0,l.Z)({},h),{},{componentCls:".".concat(C)});return[gn(t)]})}var g=e(62086),Z=P.memo(function(C){var h=C.label,t=C.tooltip,pn=C.ellipsis,H=C.subTitle,E=(0,P.useContext)(sn.ZP.ConfigContext),f=E.getPrefixCls,B=f("pro-core-label-tip"),k=un(B),hn=k.wrapSSR,R=k.hashId;if(!t&&!H)return(0,g.jsx)(g.Fragment,{children:h});var L=typeof t=="string"||P.isValidElement(t)?{title:t}:t,fn=(L==null?void 0:L.icon)||(0,g.jsx)(dn,{});return hn((0,g.jsxs)("div",{className:q()(B,R),onMouseDown:function(A){return A.stopPropagation()},onMouseLeave:function(A){return A.stopPropagation()},onMouseMove:function(A){return A.stopPropagation()},children:[(0,g.jsx)("div",{className:q()("".concat(B,"-title"),R,(0,a.Z)({},"".concat(B,"-title-ellipsis"),pn)),children:h}),H&&(0,g.jsx)("div",{className:"".concat(B,"-subtitle ").concat(R).trim(),children:H}),t&&(0,g.jsx)(vn.Z,(0,l.Z)((0,l.Z)({},L),{},{children:(0,g.jsx)("span",{className:"".concat(B,"-icon ").concat(R).trim(),children:fn})}))]}))})}}]);
