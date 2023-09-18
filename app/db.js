const mongoose = require('mongoose');
const config = require('config');

module.exports.connect = async () => {
  const url = `mongodb://${config?.db?.host}:${config?.db?.port}/${config?.db?.name}`;
  await mongoose.connect(url, { maxPoolSize: 5 });
  console.log('Db connected');
};
