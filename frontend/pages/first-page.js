// import {handlebars} from "../../node_modules/handlebars/types/index.d.ts";
// import Handlebars from "handlebars";
// import Handlebars from "handlebars";
export default class FirstPage {
    main(data) {
        var source = `<p>Hello, my name is {{name}}. I am from {{hometown}}. I have
            {{kids.length}} kids:</p>
            <ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>`;
        var template = Handlebars.compile(source);

        data = data?data:{
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
        };
        var result = template(data);
        return result;
    }
}