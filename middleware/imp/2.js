// https://juejin.cn/post/6891126082200993805

// https://www.jianshu.com/p/a0208a3d0ef1

const middleware1 = (req, res, next) => {
  console.log('middleware1 start');

  return next().then(() => {
    console.log('middleware1 end');
  });
};

const middleware2 = (req, res, next) => {
  console.log('middleware2 start');
  return next().then(() => {
    console.log('middleware2 end');
  });
};

const middleware3 = (req, res, next) => {
  console.log('middleware3 start');

  return next().then(() => {
    console.log('middleware3 end');
  });
};

const middlewares = [middleware1, middleware2, middleware3];

const run = (req, res) => {
  const next = () => {
    const middleware = middlewares.shift();
    if (!middleware) {
      return Promise.resolve('end');
    }
    return Promise.resolve(middleware(req, res, next));
  };

  next();
};

run();
