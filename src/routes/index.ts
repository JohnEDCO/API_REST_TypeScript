import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (filename: string) => {
    const file = filename.split('.').shift();
    return file;
}

readdirSync(PATH_ROUTER).filter((filename) => {
    const cleanName = cleanFileName(filename);
    if (cleanName !== "index") {
        // esta propiedad de importacion dinamica es propia de typescript
        import(`./${cleanName}`).then((moduleRouter)=>{
            console.log(`Cargando la ruta.... /${cleanName}`);
            router.use(`/${cleanName}`,moduleRouter.router);
        })
    }
});

export { router };

