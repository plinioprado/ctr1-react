# CTR1 front

Generic front-end for finance and business CRUD applications

## Scope

When the user login with user+pass+tenant, it will return data for a dynamic menu that will indicated the tables to be CRUD.

When the user click on an option in the menu, will be directed to a List page. It will get a REST response with data+format information to render:

* An Insert button routing to a new Item page
* All records with link routing to their respective Item page

The Item page will get a REST response with data+format information to render:

* Form with its fields
* Return buttom
* Delete buttom
* Confirm buttom

Coding approach is to use the latest version and run a tight cost-benefit analysys on each dependency to be added.

## Stack

* Javascript
* react 19 (installed with vite)
* bootstrap 5
* react-router-dom 7

## Endpoints

To api:

* Login: POST /ctr1/api/login
* Logout: POST /ctr1/api/logout
* Show a list: GET /ctr1/api/:component/:resource
* Show a record by cod: GET /ctr1/api/:component/:resource/:id
* Create a record: POST /ctr1/api/:component/:resource
* Update a record: PUT /ctr1/api/:component/:resource
* Delete a record: DELETE /ctr1/api/:component/:resource/:id

## Contribution

Any suggestion or comment, contact through <www.linkedin.com/in/plinioprado>.
