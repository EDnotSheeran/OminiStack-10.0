const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router();

routes.get('/',(req,res) => {
    return res.send("<h1>Hello World</h1>");
});

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;