import {DomainEntity} from "types/Types";
import {prisma} from "./Repository";
import {PrismaClient} from "@prisma/client";

export default class SimpleCrud {

  static async getEntities(type: keyof PrismaClient, limit?: string, page?: string) : Promise<Array<DomainEntity>> {
    const queryOptions = { take: Number(), skip: Number() };
    if (limit !== undefined) queryOptions.take = Number(limit)
    if (page !== undefined) queryOptions.skip = Number(limit) * (Number(page) - 1)
    // @ts-ignore
    return await prisma[type].findMany(queryOptions)
  }

  static async getEntity(type: keyof PrismaClient, uuid: string) : Promise<DomainEntity> {
    // @ts-ignore
    return await prisma[type].findUnique({ where: { uuid: uuid }})
  }

  static async createEntity(type: keyof PrismaClient, body: any) : Promise<DomainEntity> {
    // @ts-ignore
    return await prisma[type].create({ data: body })
  }

  static async updateEntity<Type extends DomainEntity>(type: keyof PrismaClient, body: Type, uuid?: string) : Promise<DomainEntity> {
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

  static async deleteEntity<Type extends DomainEntity>(type: keyof PrismaClient, body: Type) : Promise<DomainEntity> {
    // @ts-ignore
    return await prisma[type].delete({ where: { uuid: body.uuid } })
  }

}