import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { logOnStart } from '@/utils/log-on-start';
import { wrap } from '@bogeychan/elysia-logger';
import { logger } from '@/lib/logger';

const app = new Elysia()
  .use(
    wrap(logger)
  )
.use(cors({
    origin: 'http://localhost:3000'
}))
    .get('/', () => 'Hi Elysia 12322s')
    .get('/id/:id', ({ params: { id } }) => id)
    .post('/mirror', ({ body }) => body, {
        body: t.Object({
            id: t.Number(),
            name: t.String()
        })
    })
    
    .listen(3001)

logOnStart()

export type App = typeof app;