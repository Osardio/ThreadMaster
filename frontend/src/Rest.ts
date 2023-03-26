import axios from 'axios';
import {DomainEntity, EntityType} from "#/Types";
import {KitThreadTableData} from "#/ComplexTypes";

const rest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  headers: {'Content-Type': "application/json"}
})

export default class Rest {

  static async getEntity(entityType: string, uuid: string): Promise<DomainEntity> {
    return (await rest.get(entityType, {
      params: { uuid: uuid }
    })).data as DomainEntity
  }

  static async getEntities(entityType: string): Promise<DomainEntity[]> {
    return (await rest.get(entityType)).data as DomainEntity[]
  }

  static async postEntity(entityType: EntityType, entity: object): Promise<DomainEntity> {
    return (await rest.post(entityType, entity)).data as DomainEntity
  }

  static async putEntity<Type extends DomainEntity>(entityType: EntityType, entity: Type): Promise<DomainEntity> {
    return (await rest.put(entityType, entity, {
      params: { uuid: entity.uuid }
    })).data as DomainEntity
  }

  static async patchEntity(entityType: EntityType, entityUuid: string, body: object): Promise<DomainEntity> {
    return (await rest.patch(entityType, body, {
        params: { uuid: entityUuid }
    })).data as DomainEntity
  }

  static async deleteEntity(entityType: EntityType, entityUuid: string): Promise<DomainEntity> {
    return (await rest.delete(entityType, {
      params: { uuid: entityUuid },
    })).data as DomainEntity
  }

  static async getKitThreadTableData(kitUuid: string) : Promise<KitThreadTableData> {
    return (await rest.get("complex/kit_thread_table_data", {
      params: { uuid: kitUuid },
    })).data as KitThreadTableData
  }

}
