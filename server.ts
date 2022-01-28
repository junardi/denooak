import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.122.0/fmt/colors.ts";

const app = new Application();
const port: number = 8000;

// const router = new Router();
// router.get("/", ({ response }: { response:any }) => {
//    response.body = {
//       message: "Hello Mastermind"
//    };
// })
// app.use(router.routes());
// app.use(router.allowedMethods());


import todoRouter from "./routes/todo.ts";
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());


app.addEventListener("listen", ({ secure, hostname, port }) => {
  
   const sample = "The sample";

   const protocol = secure ? "https://" : "http://";
   const url = `${protocol}${hostname ?? "localhost"}:${port}`;
   console.log(`Listening on: ${port}`);
   // console.log(protocol);
   // console.log(hostname);
   // console.log(url);
   //console.log(`${sample ?? "The sample is null"}`);

   console.log(`${yellow("Listening on:")} ${green(url)}`);

});


await app.listen({ port: port });

































