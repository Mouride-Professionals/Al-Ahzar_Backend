"use strict";

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/expenses/stats",
            handler: "expense.stats",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};