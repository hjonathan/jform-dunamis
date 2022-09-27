import _ from "lodash";
export default {
    data() {
        return {
        }
    },
    methods: {
        parseIfExpression(data) {
            if (data.length <= 3) {
                return this.parseSimpleExpression(data);
            }
            return this.parseComplexExpression(data);
        },
        /**
         * When the expression lenght <= 3
         * @param {*} data 
         */
        parseSimpleExpression(data) {
            let value = "",
                operator = "",
                scope = "";
            data.forEach(el => {
                switch (el.type) {
                    case "field":
                        scope = el.text;
                        break;
                    case "operator":
                        operator = el.text;
                        break;
                    case "value":
                        value = el.text;
                        break;
                }
            });
            return {
                "effect": "",
                "condition": {
                    "scope": `#/properties/${scope}`,
                    "schema": {
                        "const": value
                    }
                }
            };
        },
        parseComplexExpression(data) {
            let operator = [],
                res = [],
                cloneData = _.cloneDeep(data);
            do {
                res.push(this.parse3Expression(_.slice(cloneData, 0, 3)));
                cloneData = _.slice(cloneData, 3, cloneData.length);
                if (cloneData.length != 0) {
                    operator = cloneData.shift();
                }
            }
            while (cloneData.length != 0);
            return this.getRuleSchema(res);
        },
        /**
         * When the expression lenght <= 3
         * @param {*} data 
         */
        parse3Expression(data) {
            let value = "",
                operator = "",
                scope = "";
            data.forEach(el => {
                switch (el.type) {
                    case "field":
                        scope = el.text;
                        break;
                    case "operator":
                        operator = el.text;
                        break;
                    case "value":
                        value = el.text;
                        break;
                }
            });
            return this.getEqualExpression(scope, value);
        },
        getEqualExpression(scope, value) {
            return {
                type: "object",
                properties: {
                    [scope]: {
                        "const": value
                    }
                }
            };
        },
        getRuleSchema(conditions) {
            return {
                effect: "",
                condition: {
                    scope: "#",
                    schema: {
                        allOf: conditions
                    }
                }
            };
        }

    }
}
