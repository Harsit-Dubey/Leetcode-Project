const { createClient } = require("redis");


const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASS,
  socket: {
    host: 'redis-11475.crce276.ap-south-1-3.ec2.cloud.redislabs.com',
    port: 11475
  }
});

module.exports = redisClient;