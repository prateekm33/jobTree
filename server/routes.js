const { authRouter, accountsRouter, profileRouter } = require('./routers');

const root = __dirname.indexOf('server') > -1 ? '..' : '.'

function mountRoutes(app) {
  app.use('/auth', authRouter);

  app.use('/accounts', accountsRouter);

  app.get('*', (req, res) => {
    return res.sendFile('./client/index.html', {root});
  });
}

module.exports = mountRoutes;