# comandos
> yarn add express
> yarn add nodemon -D
# alteracoes
"script" : {
    "dev" : "nodemon index.js"
}

//  Metodos HTTP:// GET, POST, PUT, DELETE
//  Tipos de parametros:
//  Query params: request.query (Filtros, ordenacao, paginacao, ...)
//  Route params: request.params (Identificar um recurso na alteracao ou remocao)
//  Body: request.body (Dados para a criacao)