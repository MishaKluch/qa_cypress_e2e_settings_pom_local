#!/usr/bin/env node

const assert = require('assert')
const path = require('path')

const config = require('../config')
assert(!config.isProduction)

function myParseInt(value, dummyPrevious) {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError('Not a number.');
  }
  return parsedValue;
}

const commander = require('commander');
commander.option('-a, --n-articles-per-user <n>', 'n articles per user', myParseInt, 10);
commander.option('-f, --n-follows-per-user <n>', 'n follows per user', myParseInt, 2);
commander.option('-t, --n-tags <n>', 'n favorites per user', myParseInt, 5);
commander.option('-u, --n-users <n>', 'n users', myParseInt, 10);
commander.option('-v, --n-favorites-per-user <n>', 'n favorites per user', myParseInt, 5);
commander.parse(process.argv);

(async () => {
const test_lib = require('../test_lib')
const sequelize = await test_lib.generateDemoData({
  directory: path.dirname(__dirname),
  nArticlesPerUser: commander.nArticlesPerUser,
  nFavoritesPerUser: commander.nFavoritesPerUser,
  nFollowsPerUser: commander.nFollowsPerUser,
  nRags: commander.nTags,
  nUsers: commander.nUsers,
})
await sequelize.close()
})()