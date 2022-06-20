import { TransformableInfo } from 'logform';
import { createLogger, format, transports } from 'winston';

function something(info: TransformableInfo) {
  return `${info}`;
}

export default createLogger({
  transports: new transports.File({
    filename: 'logs/server.log',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sssZ' }),
      format.printf(info => something(info))
    ),
  }),
});
