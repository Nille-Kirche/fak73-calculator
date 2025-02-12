import { Hono } from "hono";

const app = new Hono();
let state = 0;

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/stateless-add", (c) => {
  const x: any = +(c.req.query("x") || 0);
  if (isNaN(x)) {
    return c.text("Invalid x");
  }

  const y: any = +(c.req.query("y") || 0);
  if (isNaN(y)) {
    return c.text("Invalid y");
  }

  const result = x + y;
  state = result;
  return c.json({ result });
});

app.get("/add", (c) => {
  const y: any = +(c.req.query("y") || 0);
  if (isNaN(y)) {
    return c.text("Invalid y");
  }

  const result = state + y;
  state = result;
  return c.json({ result });
});

app.get("/reset", (c) => {
  state = 0;

  return c.text("Speicher resettet");
});

export default app;
