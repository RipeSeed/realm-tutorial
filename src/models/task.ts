import Realm, {BSON} from 'realm';
import {TASK_MODAL_NAME} from '../constants/realmConstants';

export class Task extends Realm.Object<Task> {
  _id!: BSON.ObjectId;
  isComplete!: boolean;
  owner_id!: string;
  title!: string;
  priorityLevel!: number;

  static schema: Realm.ObjectSchema = {
    name: TASK_MODAL_NAME,
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      // All todo items will default to incomplete
      isComplete: {type: 'bool', default: false},
      title: 'string',
      priorityLevel: 'int',
      userId: 'string',
    },
  };
}
