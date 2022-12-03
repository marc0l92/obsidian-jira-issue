"use strict";(self.webpackChunkobsidian_jira_issue=self.webpackChunkobsidian_jira_issue||[]).push([[796],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(h,i(i({ref:t},p),{},{components:n})):r.createElement(h,i({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[m]="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},157:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const o={},i="Commands",c={unversionedId:"components/commands",id:"components/commands",title:"Commands",description:"It is possible to access the plugin commands using the Obsidian.md command palette.",source:"@site/docs/components/commands.md",sourceDirName:"components",slug:"/components/commands",permalink:"/obsidian-jira-issue/docs/components/commands",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Inline Issue",permalink:"/obsidian-jira-issue/docs/components/inline-issue"},next:{title:"Extra",permalink:"/obsidian-jira-issue/docs/category/extra"}},s={},l=[{value:"Insert template",id:"insert-template",level:2},{value:"Clear cache",id:"clear-cache",level:2},{value:"Search wizard",id:"search-wizard",level:2}],p={toc:l};function m(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"commands"},"Commands"),(0,a.kt)("p",null,"It is possible to access the plugin commands using the Obsidian.md command palette.\nThe all the plugin commands are described in this page."),(0,a.kt)("h2",{id:"insert-template"},"Insert template"),(0,a.kt)("p",null,"The plugin provides a set of commands to insert a template of each component in case you forget the syntax of them."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Insert issue template"),(0,a.kt)("li",{parentName:"ul"},"Insert search template"),(0,a.kt)("li",{parentName:"ul"},"Insert count template")),(0,a.kt)("h2",{id:"clear-cache"},"Clear cache"),(0,a.kt)("p",null,"Every time a request is performed to the Jira server, the response is cached in order to reduce the network interactions and speedup the note rendering."),(0,a.kt)("p",null,"An item stored in the cache is automatically deleted after its expiration time that can be configured in the plugin settings. ",(0,a.kt)("a",{parentName:"p",href:"/docs/configuration/advanced#cache-time"},"See more")),(0,a.kt)("p",null,"It is possible to force the cache clean up using the ",(0,a.kt)("inlineCode",{parentName:"p"},"Clear cache")," command."),(0,a.kt)("p",null,"Changing the plugin settings will automatically clean the cache."),(0,a.kt)("h2",{id:"search-wizard"},"Search wizard"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"/docs/components/jira-search"},"jira-search")," component allows to create advanced search block that display the results of a Jira query."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"search wizard")," command allows to create a search block without having to remember the name of each section because it provides a UI to insert them."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"searchWizard",src:n(8631).Z,width:"540",height:"793"})))}m.isMDXComponent=!0},8631:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/searchWizard-22de7d062ba8494fac883c139ded1ce5.png"}}]);