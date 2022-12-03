"use strict";(self.webpackChunkobsidian_jira_issue=self.webpackChunkobsidian_jira_issue||[]).push([[239],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),f=i,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||o;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7384:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_position:2},a="Rendering",s={unversionedId:"configuration/rendering",id:"configuration/rendering",title:"Rendering",description:"The rendering section of the plugin settings allows you to configure some visualization settings of the plugin.",source:"@site/docs/configuration/rendering.md",sourceDirName:"configuration",slug:"/configuration/rendering",permalink:"/obsidian-jira-issue/docs/configuration/rendering",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Authentication",permalink:"/obsidian-jira-issue/docs/configuration/authentication"},next:{title:"Search default columns",permalink:"/obsidian-jira-issue/docs/configuration/search-default-columns"}},l={},u=[{value:"Default search results limit",id:"default-search-results-limit",level:2},{value:"Dark mode",id:"dark-mode",level:2},{value:"Issue URL to tag",id:"issue-url-to-tag",level:2},{value:"Inline issue prefix",id:"inline-issue-prefix",level:2}],c={toc:u};function p(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rendering"},"Rendering"),(0,i.kt)("p",null,"The rendering section of the plugin settings allows you to configure some visualization settings of the plugin."),(0,i.kt)("h2",{id:"default-search-results-limit"},"Default search results limit"),(0,i.kt)("p",null,"This setting allows you to configure the default limit of search results displayed when using the ",(0,i.kt)("inlineCode",{parentName:"p"},"jira-search")," fence.\nYou can override this setting in the ",(0,i.kt)("inlineCode",{parentName:"p"},"jira-search")," fence by using the ",(0,i.kt)("inlineCode",{parentName:"p"},"limit")," attribute."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/components/jira-search"},"Read more...")),(0,i.kt)("h2",{id:"dark-mode"},"Dark mode"),(0,i.kt)("p",null,"This setting allows you to enable the dark mode of the plugin."),(0,i.kt)("p",null,"Examples:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"light-mode1",src:n(2135).Z,width:"718",height:"759"})),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"dark-mode1",src:n(9949).Z,width:"700",height:"745"})),(0,i.kt)("h2",{id:"issue-url-to-tag"},"Issue URL to tag"),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"This feature is currently not available in Live Preview mode, but only in reading mode.")),(0,i.kt)("p",null,"This settings allows you to enable the conversion of Jira issue URL to tags. The plugin looks for URL that are composed like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"<host>/browse/<issue-key>\n")),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"https://my-project.jira.com/browse/ABCD-1234\n")),(0,i.kt)("h2",{id:"inline-issue-prefix"},"Inline issue prefix"),(0,i.kt)("p",null,"This setting allows you to configure the prefix used to identify inline issues. Inline issues are composed by the prefix followed by the issue key."),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"JIRA:ABCD-711\n")),(0,i.kt)("p",null,"The default value is ",(0,i.kt)("inlineCode",{parentName:"p"},"JIRA:"),"."))}p.isMDXComponent=!0},9949:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/dark-mode1-bfb6ef21679f90597ef094be250a91e6.png"},2135:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/light-mode1-25b72a69455c28c952b7d17fb62b9e9c.png"}}]);