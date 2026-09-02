export default function Router(config_route) {
	this.Ns_link_config = new Map();
	this.Ns_link_target = new Map();
	const setroute = (route)=>{
		route.forEach((route)=>{
			this.Ns_link_config.set(route.path, route);
			if(route.routes) setroute(route.routes);
		});
	}
	setroute(config_route);
	document.querySelectorAll("a[route]").forEach(a=>{
		a.href = a.getAttribute("route");
		a.addEventListener("click", (e)=>{
			e.preventDefault();
			this.push(a.getAttribute("href"));
		}, false);
	});
	document.querySelectorAll("[route]:not(a)").forEach((target)=>{
		target.target_container = target.parentElement;
		this.Ns_link_target.set(target.getAttribute("route"), target);
		target.remove();
	});

	window.addEventListener("popstate", this.render.bind(this), false);
	//window.addEventListener("load", this.render.bind(this), false);
}

Router.prototype.render = function() {
	const topath = window.location.pathname;
	const patharray = topath.split("/");
	for(let i=1, path="/"+patharray[i]; i<patharray.length; i++, path+=("/"+patharray[i])){
		const target = this.Ns_link_target.get(path);	
		if(!target || target.isConnected) continue;
		target.target_container.replaceChildren(target);
	}
	window.dispatchEvent(new Event("routechange"));
}

Router.prototype.parseParams = function(path) {
	const params = {};
	const queryString = path.slice(2);
	const queryPairs = queryString.split('&');
	for (const pair of queryPairs) {
		const [key, value] = pair.split('=');
		params[key] = decodeURIComponent(value);
	}
	return params;
}

Router.prototype.push = function(topath) {
	const config = this.Ns_link_config.get(topath);
	history.pushState(config.state, '', topath); //location.pathname = path;
	this.render();
	if(config.call) config.call();
}

Router.prototype.replace = function(topath) {
	const config = this.Ns_link_config.get(topath);
	history.replaceState(config.state, '', topath);
	this.render();
	if(config.call) config.call();
}