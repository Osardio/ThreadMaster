import express, {NextFunction, Request, Response} from 'express';
import Repository from "./Repository";
import SimpleCrud from "./SimpleCrud";
import cors from "cors";
import {tryCatch} from "./Utils";

const app = express();
const port = 7000;

export class Rest {

  crudEntities: Array<string> = [
    "canvasColor", "canvasName", "canvasSize", "canvas", "file", "manufacturer", "series",
    "kit", "kitPalette", "kitThread", "kitThreadVariant", "thread", "palette"
  ]

  async init() {
    app.use(cors());
    app.use(express.json({ limit: "150mb" }));
    app.use(express.raw({ limit: "150mb" }));
    app.use(express.urlencoded({ limit: "150mb", extended: true }));
    app.set("case sensitive routing", true)
    await this.initSimpleCrud()
    await this.initComplexEndpoints()
    app.get("/health", tryCatch((req, res) => {
      res.send("Ok");
    }));
    app.get("/image_preview", tryCatch(async (req, res) => {
      if (!req.query["uuid"]) {
        res.status(400)
        res.send({ message: "No uuid provided"})
      } else {
        try {
          const image = await Repository.getKitPreviewByKitUuid(req.query["uuid"].toString())
          if (image) {
            res.type(`image/${image.name.split(".").at(-1)}`)
            res.end(Buffer.from(image.data, 'base64'));
          } else {
            res.status(404)
            res.json({ error: "Not Found"})
          }
        } catch (e) {
          console.log(`GET /image_preview error: `, e)
          res.status(500)
          res.json({ error: "Internal Server Error"})
        }
      }
    }));
    app.post("/admin/generate",tryCatch(async (req, res, _next) => {
      const creationResult = await Repository.generateTestData()
      switch (creationResult) {
        case "ok": res.json({ message: "Test data successfully created"}); break;
        case "present": res.json({ message: "Test data is already present"}); break;
        default: {
          res.status(500)
          res.json({ message: "Failed to create test data"})
          break;
        }
      }
    }));

    app.use(this.errorHandler)
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }

  private errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
    console.log(`${req.method} ${req.path} error: `, error)
    res.status(500)
    res.json({ message: error.name, details: error.stack})
  }

  private async initSimpleCrud() {
    this.crudEntities.forEach((entity: string) => {
      app.get("/"+entity, tryCatch(async (req: Request, res: Response, _next) => {
        if (!req.query["uuid"]) {
          res.json(await SimpleCrud.getEntities(entity, req.query["limit"]?.toString(), req.query["page"]?.toString()))
        } else {
          res.json(await SimpleCrud.getEntity(entity, req.query["uuid"].toString()))
        }
      }))
      app.post("/"+entity, tryCatch(async (req: Request, res: Response, _next) => {
        res.json(await SimpleCrud.createEntity(entity, req.body))
      }))
      app.put("/"+entity, tryCatch(async (req: Request, res: Response, _next) => {
        res.json(await SimpleCrud.updateEntity(entity, req.body))
      }))
      app.patch("/"+entity, tryCatch(async (req: Request, res: Response, _next) => {
        if (req.query["uuid"]) {
          res.json(await SimpleCrud.updateEntity(entity, req.body, req.query["uuid"].toString()))
        } else {
          res.status(400)
          res.send({ message: "No uuid provided"})
        }
      }))
      app.delete("/"+entity, tryCatch(async (req: Request, res: Response, _next) => {
        res.json(await SimpleCrud.deleteEntity(entity, req.body))
      }))
    })
  }

  private initComplexEndpoints() {
    app.get("/complex/kit_thread_table_data",tryCatch( async (req, res, _next) => {
      if (!req.query["uuid"]) {
        res.status(400)
        res.send({ message: "No uuid provided"})
      } else {
        const tableData = await Repository.getKitThreadTableData(req.query["uuid"].toString())
        res.json(tableData)
      }
    }))
  }
}





