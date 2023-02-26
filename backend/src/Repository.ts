import { PrismaClient } from '@prisma/client'
import Tools from "./Tools";
import * as path from "path";
const prisma = new PrismaClient()

export class Repository {
  async init() {

    const image_path = path.resolve("./assets/sleigh_ride.png")

    const manufacturer = await prisma.manufacturers.create({
      data: { name: "Dimensions" }
    })

    await prisma.kits.create({
      data: {
        manufacturer: { connect: { uuid: manufacturer.uuid } },
        series: {
          create: { name: "Gold Collection", manufacturer: { connect: { uuid: manufacturer.uuid } }}
        },
        canvas: {
          create: {
            canvas_name:  { create: { name: "Aida" } },
            canvas_color: { create: { name: "Light Blue" } },
            canvas_size:  { create: { size: 16 } }
          }
        },
        files: {
          create: {
            name: "sleigh_ride.png",
            data: Tools.base64_encode(image_path),
            file_type: "FRONT"
          }
        },
        code: "08689",
        name_en: "Sleigh Ride",
        name_ru: "Санная прогулка",
        design_width: 38,
        design_length: 28,
        stitches_count: 30000,
        charms: "Отсутствуют",
        colors_count: 57,
        beads_available: false
      }
    })
    .then(async () => {
      await prisma.$disconnect()
      console.log("Kit successfully created.")
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      throw e
    })

  }
}

