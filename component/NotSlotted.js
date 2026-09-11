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
//NotSlotted.prototype.reactiverender = function(rd){
//
//}

NotSlotted.prototype.RDCLASS = function(){
	this.construction = {
		i_f: true,
		
	};
	return this;
}