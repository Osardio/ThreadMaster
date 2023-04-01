import {DomainEntity, EntityType, KitThreadCreateDto} from "../types/Types";
import {prisma} from "./Repository";

export default class SimpleCrud {

  static async getEntities(type: EntityType, limit?: string, page?: string) : Promise<Array<DomainEntity>> {
    let queryOptions: QueryOptions = {};
    if (limit !== undefined) queryOptions.take = Number(limit)
    if (page !== undefined) queryOptions.skip = Number(limit) * (Number(page) - 1)
    // @ts-ignore
    return await prisma[type].findMany(queryOptions)
  }

  static async getEntity(type: EntityType, uuid: string) : Promise<DomainEntity> {
    // @ts-ignore
    return await prisma[type].findUnique({ where: { uuid: uuid }})
  }

  static async updateEntity<Type extends DomainEntity>(type: EntityType, body: Type, uuid?: string) : Promise<DomainEntity> {
    if (uuid) {
      // update specific field
      // @ts-ignore
      return await prisma[type].update({ where: { uuid: uuid }, data: body })
    } else {
      // update whole entity
      // @ts-ignore
      return await prisma[type].update({ where: { uuid: body.uuid }, data: body })
    }
  }

  static async deleteEntity(type: EntityType, entityUuid?: string) : Promise<DomainEntity> {
    // @ts-ignore
    return await prisma[type].delete({ where: { uuid: entityUuid } })
  }

  static async createEntity(type: EntityType, body: any) : Promise<DomainEntity> {
    switch (type) {
      case EntityType.KIT_THREAD:
        const createDto = body as KitThreadCreateDto
        const kitThread = await prisma.kitThread.create({data: {
            quantity: createDto.quantity,
            order_number: createDto.order_number,
            kit: { connect: { uuid: createDto.kit_uuid } }
        }})
        const kitPalettes = await prisma.kitPalette.findMany({ where: { kit: { uuid: kitThread.kit_uuid }}})
        for (const kitPalette of kitPalettes) {
          await prisma.kitThreadVariant.create({ data: {
            kit_palette: { connect: { uuid: kitPalette.uuid } },
            kit_thread: { connect: { uuid: kitThread.uuid } }
          }})
        }
        return kitThread
      default:
        // @ts-ignore
        return await prisma[type].create({data: body})
    }
  }

}

interface QueryOptions {
  take?: number,
  skip?: number
}