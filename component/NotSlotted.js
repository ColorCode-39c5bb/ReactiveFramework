import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	NotSlotted.prototype.template = templateDocument.getElementById("not-slotted");
	window.constructor_withTemplate.push(NotSlotted);
});
export default function NotSlotted(){
	const _this = Reflect.construct(HTMLElement, [], NotSlotted);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	return _this;
}
Object.setPrototypeOf(NotSlotted.prototype, HTMLElement.prototype);
Object.setPrototypeOf(NotSlotted, HTMLElement);
Object.defineProperty(NotSlotted, "observedAttributes", {get: function() {return []}});
NotSlotted.prototype.connectedCallback = function(){
	
}
NotSlotted.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
NotSlotted.prototype.disconnectedCallback = function(){
	
}
NotSlotted.prototype.adoptedCallback = function(){
	
}
//NotSlotted.prototype.reactiverender = function(rd_delta){
//	const rd_this = this.reactivedata;
//}

//NotSlotted.prototype.RDCLASS = function(){
//	this.groups = [];
//}
//NotSlotted.prototype.RDCLASS.prototype.merge = function(Ns_rd_delta){
//	const rd_delta = Ns_rd_delta.reduce(function(prev, cur){
//		if(!prev) return cur; if(!cur) return prev;
//
//		return prev;
//	});
//
//	Object.assign(this, rd_delta);
//	return rd_delta;
//}