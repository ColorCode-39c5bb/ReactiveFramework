import Router from "./Router.js";
import config_route from "./config/config_route.js";
import {requestCache} from "./template.js";

HTMLElement._render = function(render){
	return function(rd, render_acquired){
		this.rd_torender ??= [];
		this.rd_torender.push(rd);
		if(this.__proto__.constructor == HTMLElement) return;
		if(!this.isConnected) return;

		rd = this.reactivemerge();
		this.rd_torender = undefined;
		if(rd == undefined) return;
		render.call(this, rd, render_acquired);
	};
};

HTMLElement._connectedcallback = function(connectedcallback){
	return function(){
		if(this.rd_torender) this.reactiverender();
		return connectedcallback.call(this);
	}
};

const defaultStyleSheet = new CSSStyleSheet();
for(let i = 1; i < document.styleSheets[0].cssRules.length; i++) defaultStyleSheet.insertRule(document.styleSheets[0].cssRules[i].cssText);
HTMLElement.prototype.initShadowRoot = function(){
	if(this.shadowRoot == null) return;
	this.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
	this.shadowRoot.appendChild(customElements.get(this.tagName.toLowerCase()).template.content.cloneNode(true));
}

HTMLElement.prototype.reactivemerge = function(){
	const rd = this.rd_torender.reduce(function(prev, cur){
		if(!prev) return cur;
		return Object.assign(prev, cur);
	});
	this.reactivedata ??= {};
	Object.assign(this.reactivedata, rd);
	return rd;
}

HTMLElement.prototype.reactiverender = HTMLElement._render(function(rd, render){
	if(typeof(render)!="function") return;
	render.call(this, rd);
});

HTMLElement.prototype.reactiverender_for = function(rdarray, render){
	//if(!rdarray) throw new Error("rdarray必须是数组, 否则此方法不应该有机会调用");
	if(rdarray == undefined) return;
	if(!this.Ns_active) this.Ns_active = [this];
	if(!this.Ns_inactive) this.Ns_inactive = [];
	if(!this.container) this.container = this.parentElement;
	for(let i=0; i<rdarray.length; i++){
		let next = this.Ns_active[i];
		if(!next){
			next = this.Ns_inactive.pop();
			if(!next) next = this.cloneNode(true);
			this.container.appendChild(next);
			this.Ns_active.push(next);
		}
		next.reactiverender(rdarray[i], render);
	}
	for(let j=this.Ns_active.length-rdarray.length; j>0; j--){
		const item = this.Ns_active.pop();
		item.remove();
		this.Ns_inactive.push(item);
	}
};

window.constructor_withTemplate = [];
//window.router = new Router(config_route);
//window.router.push("/blog");
Promise.all(requestCache.values()).then(()=>{
	const appmain = document.getElementById("appmain");
	appmain.remove();
	constructor_withTemplate.forEach((C)=>{
		C.prototype.reactiverender = HTMLElement._render(C.prototype.reactiverender);
		C.prototype.connectedCallback = HTMLElement._connectedcallback(C.prototype.connectedCallback);
		customElements.define(C.template.id, C);
	});
	document.body.appendChild(appmain);
});