// @ts-ignore
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
// @ts-ignore
import { green, yellow } from "https://deno.land/std@0.122.0/fmt/colors.ts";
// @ts-ignore 
import { oakCors } from "https://deno.land/x/cors/mod.ts";

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


// app.use(oakCors({ origin: "*" }));

app.use(
   oakCors({
      origin: "http://localhost:4200"
   }),
);


// @ts-ignore
import todoRouter from "./routes/todo.ts";
// @ts-ignore
import userRouter from "./routes/user.ts";
app.use(todoRouter.routes());
app.use(userRouter.routes());
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



































