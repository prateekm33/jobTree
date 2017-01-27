const { authRouter, accountsRouter, profileRouter } = require('./routers');

console.log('ENV: ', process.env);
let root = process.env.NODE_ENV === 'production' ? '.' : '..';
function mountRoutes(app) {
  app.use('/auth', authRouter);

  app.use('/accounts', accountsRouter);

  app.get('*', (req, res) => {
    return res.sendFile('/client/index.html', {root});
  });
}

module.exports = mountRoutes;