const mongoose = require('mongoose');

//use global ES6 promise instead of mongoose promise
mongoose.Promise = global.Promise;

//execute only once before all test
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {done();})
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

//execute before each test
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
