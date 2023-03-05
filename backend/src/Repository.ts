import { PrismaClient, Kit } from '@prisma/client'
import Tools from "./Tools";
import path from "path";
export const prisma = new PrismaClient()

export default class Repository {

  static async generateTestData() : Promise<string> {
    try {
      const image_path = path.resolve("./assets/sleigh_ride.png")
      const manufacturer = await prisma.manufacturer.create({
        data: { name: "Dimensions" }
      })
      const palette = await prisma.palette.create({
        data: { name: "J & P Coats" }
      })
      const thread1 = await prisma.thread.create({
        data: { code: "13013", name: "Red", color: "#FF0000", palette_uuid: palette.uuid }
      })
      const thread2 = await prisma.thread.create({
        data: { code: "13336", name: "Lt. orange", color: "#FFC300", palette_uuid: palette.uuid }
      })
      const thread3 = await prisma.thread.create({
        data: { code: "16878", name: "Green", color: "#38d900", palette_uuid: palette.uuid }
      })
      const thread4 = await prisma.thread.create({
        data: { code: "17181", name: "Blue", color: "#0022ff", palette_uuid: palette.uuid }
      })
      const thread5 = await prisma.thread.create({
        data: { code: "17981", name: "Very dk. blue", color: "#000777", palette_uuid: palette.uuid }
      })
      if ((await prisma.kit.findFirst({ where: { code: "08689", manufacturer_uuid: manufacturer.uuid  } })) !== null) return "present"
      const kit = await prisma.kit.create({
        data: {
          manufacturer: { connect: { uuid: manufacturer.uuid }} ,
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
              data: await Tools.base64_encode(image_path),
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
          beads_available: false,
        }
      })
      const kit_palette = await prisma.kitPalette.create({ data: {
          kit_uuid: kit.uuid,
          order_number: 1,
          palette_uuid: palette.uuid
        }})
      const kit_thread1 = await prisma.kitThread.create({
        data: { order_number: 1,  quantity: 1, kit_uuid: kit.uuid }
      })
      const kit_thread2 = await prisma.kitThread.create({
        data: {  order_number: 2,  quantity: 2, kit_uuid: kit.uuid }
      })
      const kit_thread3 = await prisma.kitThread.create({
        data: { order_number: 3,  quantity: 1, kit_uuid: kit.uuid }
      })
      const kit_thread4 = await prisma.kitThread.create({
        data: { order_number: 4,  quantity: 8, kit_uuid: kit.uuid }
      })
      const kit_thread5 = await prisma.kitThread.create({
        data: { order_number: 5,  quantity: 8, kit_uuid: kit.uuid }
      })
      await prisma.kitThreadVariant.create({ data: {
          kit_palette: { connect: { uuid: kit_palette.uuid } },
          thread: { connect: { uuid: thread1.uuid } },
          kit_thread: { connect: { uuid: kit_thread1.uuid } }
        }})
      await prisma.kitThreadVariant.create({ data: {
          kit_palette: { connect: { uuid: kit_palette.uuid } },
          thread: { connect: { uuid: thread2.uuid } },
          kit_thread: { connect: { uuid: kit_thread2.uuid } }
        }})
      await prisma.kitThreadVariant.create({ data: {
          kit_palette: { connect: { uuid: kit_palette.uuid } },
          thread: { connect: { uuid: thread3.uuid } },
          kit_thread: { connect: { uuid: kit_thread3.uuid } }
        }})
      await prisma.kitThreadVariant.create({ data: {
          kit_palette: { connect: { uuid: kit_palette.uuid } },
          thread: { connect: { uuid: thread4.uuid } },
          kit_thread: { connect: { uuid: kit_thread4.uuid } }
        }})
      await prisma.kitThreadVariant.create({ data: {
          kit_palette: { connect: { uuid: kit_palette.uuid } },
          thread: { connect: { uuid: thread5.uuid } },
          kit_thread: { connect: { uuid: kit_thread5.uuid } }
        }})
      console.log("Kit successfully created")
      return "ok"
    } catch (e) {
      return "error"
    }
  }
}

