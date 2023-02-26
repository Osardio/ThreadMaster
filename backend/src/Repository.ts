import { PrismaClient } from '@prisma/client'
import Tools from "Tools";
const prisma = new PrismaClient()

async function init() {

  /*const image = Tools.base64_encode('./assets/sleigh_ride.png')
  const manufacturer = await prisma.manufacturers.create({
    data: { name: "Dimensions" }
  })
  const series = await prisma.series.create({
    data: {
      manufacturer_uuid: manufacturer.uuid,
      name: "Gold Collection"
    }
  })
  const canvasName = await prisma.canvas_names.create({
    data: { name: "Aida" }
  })
  const canvasSize = await prisma.canvas_sizes.create({
    data: { size: 16 }
  })
  const canvasColor = await prisma.canvas_colors.create({
    data: { name: "Light Blue"}
  })
  const canvas = await prisma.canvases.create({
    data: {
      canvas_name_uuid: canvasName.uuid,
      canvas_color_uuid: canvasColor.uuid,
      canvas_size_uuid: canvasSize.uuid
    }
  })
  await prisma.kits.create({
    data: {
      manufacturer_uuid: manufacturer.uuid,
      series_uuid: series.uuid,
      canvas_uuid: canvas.uuid,
      code: "08689",
      name_en: "Sleigh Ride",
      name_ru: "Санная прогулка",
      design_width: 38,
      design_length: 28,
      design_size: 20,
      sharms: "Отсутствуют",
      colors_count: 57,
      beads_available: false
    }
  })*/
}

init()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  throw e
})