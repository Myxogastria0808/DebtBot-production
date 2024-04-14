import { Hono } from 'hono';
import { debt, user } from './routes/index';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
    '/*',
    cors({
        origin: ['*'],
        allowHeaders: ['*'],
        allowMethods: ['GET', 'POST', 'PATCH'],
        exposeHeaders: ['*'],
        credentials: true,
    })
);

app.route('/user', user);
app.route('/debt', debt);

app.get('/', async (c) => {
    return c.text('Hello, World!');
});

export default app;
