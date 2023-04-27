'use strict';
const plugin = require('../admin/src/pluginId')

module.exports = ({ strapi }) => {
    strapi.customFields.register({
        name: 'pages',
        plugin,
        type: 'string',
    });
};
