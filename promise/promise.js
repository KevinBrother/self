function b(num) {
  return new Promise((resolve, reject) => {
    try {
      console.log(1);
      const d = 3 / dd;
      console.log(d);
    } catch (e) {
      reject(e);
    } finally {
      resolve(2);
    }
  });
}

async function a() {
  const nums = [4, 0, 'xxx'];
  nums.map(async (num) => {
    const c = await b(num);
    console.log('result', c);
  });

  // nums.map(async (num) => {
  //   b(num)
  //     .then((res) => {
  //       console.log('result', res);
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  // });

  // for (let num of nums) {
  //   try {
  //     const c = await b(num);
  //     console.log('result', c);
  //   } catch (e) {
  //     console.log('err==', e);
  //   }
  // }

  // for (let num of nums) {
  //   b(num)
  //     .then((res) => {
  //       console.log('result', res);
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  // }

  // b()
  //   .then((res) => {
  //     console.log('res', res);
  //   })
  //   .catch((err) => {
  //     console.log('err', err);
  //   });
}

a();
