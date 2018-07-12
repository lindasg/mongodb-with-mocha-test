const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Title1' }, { title: 'Title2' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[1].title === 'Title2');
        done();
      })
  });

  it('Can add Subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Title1' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[1].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Title1' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
