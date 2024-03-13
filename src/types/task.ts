import {BSON} from 'realm';

export type AddTaskType = {
  isComplete: boolean;
  title: string;
  priorityLevel: number;
};

export type TaskType = AddTaskType & {
  _id: BSON.ObjectId;
};
