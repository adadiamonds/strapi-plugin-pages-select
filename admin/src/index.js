import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginId from './pluginId';
import PagesSelectIcon from './components/PagesSelectIcon';
import getTrad from './utils/getTrad';

export default {
    register(app) {
        app.customFields.register({
            name: 'pages',
            pluginId: 'pages-select',
            type: 'string',
            icon: PagesSelectIcon,
            intlLabel: {
                id: getTrad('pages-select.label'),
                defaultMessage: 'Page',
            },
            intlDescription: {
                id: getTrad('pages-select.description'),
                defaultMessage: 'Select any page',
            },
            components: {
                Input: async () =>
                    import('./components/PagesSelect'),
            },
            options: {
                advanced: [
                    {
                        sectionTitle: {
                            id: 'global.settings',
                            defaultMessage: 'Settings',
                        },
                        items: [
                            {
                                name: 'required',
                                type: 'checkbox',
                                intlLabel: {
                                    id: 'form.attribute.item.requiredField',
                                    defaultMessage: 'Required field',
                                },
                                description: {
                                    id: 'form.attribute.item.requiredField.description',
                                    defaultMessage: "You won't be able to create an entry if this field is empty",
                                },
                            },
                        ],
                    },
                ],
            },
        });
    },

    async registerTrads({ locales }) {
        const importedTrads = await Promise.all(
            locales.map((locale) => {
                return Promise.all([
                    import(`./translations/${locale}.json`),
                    fetch(`https://ecom.adadiamonds.com/api/cms/pageUrls`)
                ])
                .then(async ([pluginTranslations, pagesTranslations]) => {
                    console.log("pagesTranslations:", pagesTranslations)
                    const pagesObject = await pagesTranslations.json();
                    console.log("pagesObject:", pagesObject)

                    return {
                        data: {
                            ...prefixPluginTranslations(pluginTranslations.default, pluginId),
                            [`${pluginId}.pages`]: JSON.stringify(pagesObject) 
                        },
                        locale,
                    };
                })
                .catch(() => {
                    return {
                        data: {},
                        locale,
                    };
                });
            })
        );
        return Promise.resolve(importedTrads);
    },
};
