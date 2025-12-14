import pino from 'pino'


const pinoEnvOptions: Record<'development' | 'production', pino.Logger> = {
  development: pino({
      enabled: true,
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname,req.remoteAddress,req.remotePortm,log,set',
        },
      },
    }),
  production:  pino({
      enabled: true,
      transport: {
        target: 'pino/file',
        options: {
          destination: 1,
          all: true,
          translateTime: true,
        },
      },
    }),
}

export const logger =
  pinoEnvOptions[
    process.env.NODE_ENV === 'production' ? 'production' : 'development'
  ]

