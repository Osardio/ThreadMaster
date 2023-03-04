import express from 'express';
import {Repository} from "./Repository";
const app = express();
const port = 3000;

export class Rest {
  init() {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.post('/admin/generate',async (req, res) => {
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

    });
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }
}





