import express, {Request, Response} from 'express';
import Repository from "./Repository";
import SimpleCrud from "./SimpleCrud";
import cors from "cors";
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
    app.get("/health", (req, res) => {
      res.send("Ok");
    });
    app.get("/image_preview", async (req, res) => {
      if (!req.query["uuid"]) {
        res.status(204)
        res.send({ message: "No uuid provided"})
      } else {
        try {
          const image = await Repository.getKitPreviewByKitUuid(req.query["uuid"].toString())
          if (image) {
            res.type(`image/${image.name.split(".").at(-1)}`)
            res.end(Buffer.from(image.data, 'base64'));
          } else {
            res.status(404)
            res.send({ error: "Not Found"})
          }
        } catch (e) {
          res.status(500)
          res.send({ error: "Internal Server Error"})
        }
      }
    });
    app.post("/admin/generate",async (req, res) => {
      try {
        const creationResult = await Repository.generateTestData()
        switch (creationResult) {
          case "ok": res.send({ message: "Test data successfully created"}); break;
          case "present": res.send({ message: "Test data is already present"}); break;
          default: {
            res.status(500)
            res.send({ message: "Failed to create test data"})
            break;
          }
        }
      } catch (e) {
        res.status(500)
        res.send({ error: "Internal Server Error"} )
      }

    });
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }

  private async initSimpleCrud() {
    this.crudEntities.forEach((entity: string) => {
      app.get("/"+entity, async (req: Request, res: Response) => {
        try {
          if (!req.query["uuid"]) {
            res.send(await SimpleCrud.getEntities(entity, req.query["limit"]?.toString(), req.query["page"]?.toString()))
          } else {
            res.send(await SimpleCrud.getEntity(entity, req.query["uuid"].toString()))
          }
        } catch (e) {
          console.log(`GET /${entity} error: `, e)
          res.status(500)
          res.send({ error: "Internal Server Error"} )
        }
      })
      app.post("/"+entity, async (req: Request, res: Response) => {
        try {
          res.send(await SimpleCrud.createEntity(entity, req.body))
        } catch (e) {
          console.log(`POST /${entity} error: `, e)
          res.status(500)
          res.send({ error: "Internal Server Error"} )
        }
      })
      app.patch("/"+entity, async (req: Request, res: Response) => {
        try {
          res.send(await SimpleCrud.updateEntity(entity, req.body))
        } catch (e) {
          console.log(`PATCH /${entity} error: `, e)
          res.status(500)
          res.send({ error: "Internal Server Error"} )
        }
      })
      app.delete("/"+entity, async (req: Request, res: Response) => {
        try {
          res.send(await SimpleCrud.deleteEntity(entity, req.body))
        } catch (e) {
          console.log(`DELETE /${entity} error: `, e)
          res.status(500)
          res.send({ error: "Internal Server Error"} )
        }
      })
    })
  }
}





