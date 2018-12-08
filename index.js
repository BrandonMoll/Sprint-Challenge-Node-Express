const PORT = 4000;

const express = require('express');
const logger = require('morgan');

const actionRouter = require('./routers/action_router');
const projectRouter = require('./routers/project_router')

const server = express();

server.use(
    express.json(),
    logger('dev')
);

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
});