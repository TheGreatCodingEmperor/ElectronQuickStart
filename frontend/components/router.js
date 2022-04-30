
export default class Router {
    routes = {};
    errorHandler;
    add(path,fn){
        this.routes[`host${path}`] = fn;
    }
    navigateTo(path){
        if(!this.routes[`host${path}`]){
            this.errorHandler();
            return;
        }
        return this.routes[`host${path}`]();
    }
    error404(fn){
        this.errorHandler = fn;
    }
}