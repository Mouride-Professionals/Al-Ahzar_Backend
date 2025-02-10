module.exports = {
    routes: [
        {
            method: "PUT",
            path: "/school-years/:id/set-current",
            handler: "school-year.setCurrent",
            config: {
                policies: [],
                auth: { scope: ["api::school-year.school-year.update"] },

            },
        },
        {
            method: "PUT",
            path: "/school-years/:id/set-ended",
            handler: "school-year.setEnded",
            config: {
                policies: [],
                auth: { scope: ["api::school-year.school-year.update"] },

            },
        },
        {
            method: "PUT",
            path: "/school-years/:id/set-active",
            handler: "school-year.setActive",
            config: {
                policies: [],
                auth: { scope: ["api::school-year.school-year.update"] },

            },
        },
    ],
};
