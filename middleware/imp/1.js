// https://juejin.cn/post/6891126082200993805

// https://www.jianshu.com/p/a0208a3d0ef1

const middleware1 = (req, res, next) => {
  console.log('middleware1 start');

  next();
};

const middleware2 = (req, res, next) => {
  console.log('middleware2 start');
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  }).then(() => {
    next();
  });
};

const middleware3 = (req, res, next) => {
  console.log('middleware3 start');

  next();
};

const middlewares = [middleware1, middleware2, middleware3];

const run = (req, res) => {
  const next = () => {
    const middleware = middlewares.shift();
    if (!middleware) {
      return;
    }
    middleware(req, res, next);
  };
  next();
};

run();
