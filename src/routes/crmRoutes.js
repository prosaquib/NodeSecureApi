import {
    addNewContact,
    getContacts, 
    getContactwithID,
    updateContact,
    deleteContact,
} from '../controllers/crmControllers';

import {login, register, loginRequired} from '../controllers/userControllers';

const routes = (app) => {
    app.route('/contact')
    .get((req,res,next) => {
        //MIDDLEWARE
        console.log(`Request from:${req.originalUrl}`)
        console.log(`Request type:${req.method}`)
        next()
    },loginRequired,getContacts)

    .post(loginRequired,addNewContact);

    app.route('/contact/:contactId')
    //get specific contact
    .get(loginRequired,getContactwithID)
    .put(loginRequired,updateContact)

    .delete(loginRequired,deleteContact);

    //registration route
    app.route('/auth/register')
        .post(register);

    //login route
    app.route('/auth/login')
        .post(login);        
}

export default routes;