import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AppMain.prototype.template = templateDocument.getElementById("app-main");
	window.constructor_withTemplate.push(AppMain);
});
export default function AppMain(){
	const _this = Reflect.construct(HTMLElement, [], AppMain);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	return _this;
}
Object.setPrototypeOf(AppMain.prototype, HTMLElement.prototype);
Object.setPrototypeOf(AppMain, HTMLElement);
Object.defineProperty(AppMain, "observedAttributes", {get: function() {return []}});
AppMain.prototype.connectedCallback = function(){
	
}
AppMain.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
AppMain.prototype.disconnectedCallback = function(){
	
}
AppMain.prototype.adoptedCallback = function(){
	
}
//AppMain.prototype.reactiverender = function(rd_delta){
//	const rd_this = this.reactivedata;
//}

//AppMain.prototype.RDCLASS = function(){
//	this.groups = [];
//}
//AppMain.prototype.RDCLASS.prototype.merge = function(Ns_rd_delta){
//	const rd_delta = Ns_rd_delta.reduce(function(prev, cur){
//		if(!prev) return cur; if(!cur) return prev;
//
//		return prev;
//	});
//
//	Object.assign(this, rd_delta);
//	return rd_delta;
//}