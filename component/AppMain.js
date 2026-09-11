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
//AppMain.prototype.reactiverender = function(rd){
//
//}

AppMain.prototype.RDCLASS = function(){
	this.construction = {
		i_f: true,
		
	};
	return this;
}