import WebSocketClient from 'dlink_websocketclient';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { readFileSync } from 'fs';

const client = new WebSocketClient({
  ip: process.env.IP,
  pin: process.env.PIN,
});

const app = new Hono();
app.get('/switch', async (c) => {
  const file = readFileSync('./switch.html', 'utf8');
  return c.html(file);
})
app.get('/status', async (c) => {
    const status = await client.state();
    return c.text(status ? 'on' : 'off');
});
app.post('/on', async (c) => {
  await client.switch(true);
  return c.text('cool');
});
app.post('/off', async (c) => {
  await client.switch(false);
  return c.text('cool');
});

await client.login().then(() => console.log('Logged onto device'));
serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (i) => {
    console.log(`Server started on port ${i.port}`);
  }
);
