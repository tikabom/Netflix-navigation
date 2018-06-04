# Netflix-navigation

Project structure: 
Netflix-navigation
  - assets
  - css
  - metadata
  - src
    - js
    - templates
  - index.html
  - webpack.config.js

assets/ contains all image assets for the application

css/ contains all the style files

metadata/ contains the data to be bound with the application

src/js/ contains javascript files that handle initial window load, routing, browse and details page functionality and data setup.

src/templates contains handlebar templates/html for the shared Headline (Browse and Details page) and Browse and Details content.

index.html is the template for the SPA.

webpack.config.js contains configuration for the app and sets src/js/index.js as the entry point.

List of external dependencies:
- jQuery
- Webpack
- Handlebars
- handlebars-loader, css-loader

To run the application, run 'npm install' in the root directory and then run 'npm run start'.
