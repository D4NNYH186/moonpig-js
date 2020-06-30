### folder structure

- lib/ contains all local folders
- public/- is anything that is front end resources (JS, CSS, pictures,etc. )
- views/ contains individual pages
- views/layouts contains the layout for how each page will render 
- index.js entry point for the application

## NPM Setup
- npm init -y sets up package,json
- npm i path express express-handlebars mongoose body-parser dotenv

## PLAN MOONPIG

- three UI's CX, Factory- just drop down menu and list of orders for specific factory, Eng.- similar to factory view, but with extra functions with a form to edit factory details. want to see what they are making now and what they have to make( filtering between factories and order status.) - 2 forms - 1 schema. 

- factoryArray factoryOnOff = true; - if factory = false - true/ true - false
- schemas:
- orderSchema- CX full name, address, order date, dispatch address, product type.
- orderFunction(to send order to correct factory, based on capacity. also date stamped and given orderID) 
- totalOrderFunction(caluclates total order)
- remainingFunction(to see what remaing capacity there is in each factory.)
- orderComplete(order date and time + 2hrs, once this has passed will complete order.)
- 
- sent to factory and engineer pages (to see a list of orders and where they should be fulfilled.)
- order DB
- somewhere to store product info.
- somewhere to store factory info.(4 factories)
