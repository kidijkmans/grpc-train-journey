import {
  CreateTrainRequest,
  DeleteTrainRequest,
  DeleteTrainResponse,
  ListTrainsRequest,
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
  const request = new ListTrainsRequest();
  client.listTrains(request, callback);
}

export function createTrain(
  name: string,
  trainType: TrainType,
  operator: Operator,
  coachCount: number,
  catering: boolean,
  callback: Callback<Train>
) {
  const train = new Train();
  train.setName(name);
  train.setTrainType(trainType);
  train.setOperator(operator);
  train.setCoachCount(coachCount);
  train.setCatering(catering);
  const request = new CreateTrainRequest();
  request.setTrain(train);
  client.createTrain(request, callback);
}

export function deleteTrain(
  id: string,
  callback: Callback<DeleteTrainResponse>
) {
  const request = new DeleteTrainRequest();
  request.setId(id);

  client.deleteTrain(request, callback);
}
