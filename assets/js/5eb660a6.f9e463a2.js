"use strict";(self.webpackChunkobsidian_jira_issue=self.webpackChunkobsidian_jira_issue||[]).push([[23],{3905:(t,e,n)=>{n.d(e,{Zo:()=>p,kt:()=>m});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var l=r.createContext({}),u=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},p=function(t){var e=u(t.components);return r.createElement(l.Provider,{value:e},t.children)},c="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},h=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,a=t.originalType,l=t.parentName,p=s(t,["components","mdxType","originalType","parentName"]),c=u(n),h=i,m=c["".concat(l,".").concat(h)]||c[h]||d[h]||a;return n?r.createElement(m,o(o({ref:e},p),{},{components:n})):r.createElement(m,o({ref:e},p))}));function m(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var a=n.length,o=new Array(a);o[0]=h;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s[c]="string"==typeof t?t:i,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2280:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const a={sidebar_position:1},o="Introduction",s={unversionedId:"get-started/introduction",id:"get-started/introduction",title:"Introduction",description:"Why this plugin?",source:"@site/docs/get-started/introduction.md",sourceDirName:"get-started",slug:"/get-started/introduction",permalink:"/obsidian-jira-issue/docs/get-started/introduction",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Get Started",permalink:"/obsidian-jira-issue/docs/category/get-started"},next:{title:"Installation",permalink:"/obsidian-jira-issue/docs/get-started/installation"}},l={},u=[{value:"Why this plugin?",id:"why-this-plugin",level:2},{value:"Who is this plugin for?",id:"who-is-this-plugin-for",level:2},{value:"How to use this plugin?",id:"how-to-use-this-plugin",level:2}],p={toc:u};function c(t){let{components:e,...n}=t;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduction"},"Introduction"),(0,i.kt)("h2",{id:"why-this-plugin"},"Why this plugin?"),(0,i.kt)("p",null,"As a developer that works in a IT company I work every day on many topics that I love to record and document in my notes."),(0,i.kt)("p",null,"I evaluated several note taking applications, but the one that I found more compatible with a working environment workflow is ",(0,i.kt)("a",{parentName:"p",href:"https://obsidian.md/"},"Obsidian.md"),"."),(0,i.kt)("p",null,"With this plugin I wanted to connect my notes with the word of ",(0,i.kt)("a",{parentName:"p",href:"https://www.atlassian.com/software/jira"},"Atlassian Jira")," issues that I work on, in order to be able to monitor the user story I create but also link user stories that I'm working on."),(0,i.kt)("p",null,"The plugin is inspired by the integration between Confluence and Jira, and I wanted to reproduce the same style in order to create something that Atlassian user are familiar with."),(0,i.kt)("h2",{id:"who-is-this-plugin-for"},"Who is this plugin for?"),(0,i.kt)("p",null,"This plugin is meant to be used by people that work with Atlassian Jira and takes note using Obsidian.md."),(0,i.kt)("p",null,"The plugin is quite general purpose and can be used by people in any role:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Developers"),(0,i.kt)("li",{parentName:"ul"},"Quality Assurance"),(0,i.kt)("li",{parentName:"ul"},"Product Owner"),(0,i.kt)("li",{parentName:"ul"},"Product Manager"),(0,i.kt)("li",{parentName:"ul"},"Scrum Master"),(0,i.kt)("li",{parentName:"ul"},"Project Manager"),(0,i.kt)("li",{parentName:"ul"},"...")),(0,i.kt)("h2",{id:"how-to-use-this-plugin"},"How to use this plugin?"),(0,i.kt)("p",null,"If you are used to the other community plugin of Obsidian.md you will find this plugin quite easy to use. Here the first step you can take to get started:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/get-started/installation"},"Install the plugin")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/get-started/basic-authentication"},"Configure your authentication credentials")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/get-started/basic-usage"},"Add in your note your first Jira reference"))))}c.isMDXComponent=!0}}]);