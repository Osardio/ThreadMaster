import { DomainEntity } from "../../types/Types";
import { prisma } from "./Repository";

export default class SimpleCrud {

  static async getEntities(type: string, limit?: string, page?: string) : Promise<Array<DomainEntity>> {
    const queryOptions = { take: undefined, skip: undefined };
    if (limit !== undefined) queryOptions.take = Number(limit)
    if (page !== undefined) queryOptions.skip = Number(limit) * (Number(page) - 1)
    return await prisma[type].findMany(queryOptions)
  }

  static async getEntity(type: string, uuid: string) : Promise<DomainEntity> {
    return await prisma[type].findUnique({ where: { uuid: uuid }})
  }

  static async createEntity(type: string, body: any) : Promise<DomainEntity> {
    return await prisma[type].create({ data: body })
  }

  static async updateEntity<Type extends DomainEntity>(type: string, body: Type, uuid?: string) : Promise<DomainEntity> {
    if (uuid) {
      // update specific field
      return await prisma[type].update({ where: { uuid: uuid }, data: body })
    } else {
      // update whole entity
      return await prisma[type].update({ where: { uuid: body.uuid }, data: body })
    }
  }

  static async deleteEntity<Type extends DomainEntity>(type: string, body: Type) : Promise<DomainEntity> {
    return await prisma[type].delete({ where: { uuid: body.uuid } })
  }

}