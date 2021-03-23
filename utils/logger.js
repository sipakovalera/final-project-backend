const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'this computer' },
  transports: [
    new transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' }),
    new transports.File({ filename: 'logs/server.log' })
  ],
});
