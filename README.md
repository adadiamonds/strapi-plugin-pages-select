# Strapi plugin pages-select

A strapi custom field for selecting any page from the current Strapi instance.

## Installation

To install this plugin, you need to add an NPM dependency to your Strapi application:

```
# Using Yarn
yarn add strapi-plugin-pages-select

# Or using NPM
npm install strapi-plugin-pages-select
```

Then, you'll need to build your admin panel:

```
# Using Yarn
yarn build

# Or using NPM
npm run build
```


## Usage

After installation you will find the pages-select at the custom fields section of the content-type builder.

Now you can select any page from the list. The relative url path of the selected page is stored in the database.
