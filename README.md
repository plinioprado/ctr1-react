# CTR1 front

Generic front-end for finance and business CRUD applications

## Scope

When the user login with user+pass+tenant, it will return data for a dynamic menu that will indicated the tables to be CRUD.

When the user click over a table in the menu, will be directed to a List page. It will get a REST response with data+format information to render:

* An Insert button routing to a new Item page
* A filter
* All records with link routing to its Item page
 any of the shown records. Including an Insert button and a

The Item page will get a REST response with data+format information to render:

* Form with its fields
* Edit buttom to make it from read only to read and write
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

Login: POST /api/login
Logout: POST /api/logout
Show a list: GET /api/:table
Show a record by cod: GET /api/:table/:id
Create a record: POST /api/:table
Update a record: PUT /api/:table
Delete a record: DELETE /api/:table/:id

## Contribution

Any suggestion or comment, contact through <www.linkedin.com/in/plinioprado>.
