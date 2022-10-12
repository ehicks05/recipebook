import { TransformableInfo } from 'logform';
import { createLogger, format, transports } from 'winston';

function something(info: TransformableInfo): string {
  let baseLogMessage = `"@timestamp": "${info.timestamp}", "level":"${info.level.toUpperCase()}", "message":"${
    info.message
  }", "service":"RecipeBook"`;

  Object.entries(info).forEach((ent) => {
    const key = ent[0];
    const val = ent[1];
    if (!['level', 'message', 'timestamp'].includes(key)) {
      if (typeof val === 'object') {
        if (Array.isArray(val)) {
          val.forEach((item) => {
            const i = item.dataValues;
            // Object.entries(item.dataValues).forEach((e) => {
            for (const k in i) {
              // eslint-disable-next-line no-prototype-builtins
              if (i.hasOwnProperty(k)) {
                i[k] = String(i[k]);
              }
            }
          });
        }
        baseLogMessage += `, "${ent[0]}": ${JSON.stringify(ent[1])}`;
      } else {
        baseLogMessage += `, "${ent[0]}":"${ent[1]}"`;
      }
    }
  });
  return `{${baseLogMessage}}`;
}

export default createLogger({
  transports: new transports.File({
    filename: 'logs/server.log',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sssZ' }),
      format.printf((info) => something(info))
    ),
  }),
});
