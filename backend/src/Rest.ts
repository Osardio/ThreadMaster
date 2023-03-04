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
      await Repository.generateTestData()
      res.send('Test data successfully created.')
    });
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  }
}





