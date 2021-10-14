import {
  DeleteTrainResponse,
  ListTrainsResponse,
  Train,
} from "./generated/client/proto/train_api_pb";
import {
  TrainAPIClient,
  ServiceError,
} from "./generated/client/proto/train_api_pb_service";

const GRPC_GATEWAY = "http://localhost:8080";

const client = new TrainAPIClient(GRPC_GATEWAY);

export declare type TrainType = 0 | 1 | 2;
export declare type Operator = 0 | 1 | 2 | 3;

declare type Callback<T> = (
  error: ServiceError | null,
  responseMessage: T | null
) => void;

export function getTrains(callback: Callback<ListTrainsResponse>) {
  // TODO: Implement call to server to get trains
}

export function createTrain(
  name: string,
  trainType: TrainType,
  operator: Operator,
  coachCount: number,
  catering: boolean,
  callback: Callback<Train>
) {
  // TODO: Implement call to server to create train
}

export function deleteTrain(
  id: string,
  callback: Callback<DeleteTrainResponse>
) {
  // TODO: Implement call to server to delete train
}
