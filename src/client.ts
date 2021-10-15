import {
  CreateTrainRequest,
  DeleteTrainRequest,
  DeleteTrainResponse,
  ListTrainsRequest,
  ListTrainsResponse,
  OperatorMap,
  Train,
  TrainTypeMap,
} from "./generated/client/proto/train_api_pb";
import {
  TrainAPIClient,
  ServiceError,
} from "./generated/client/proto/train_api_pb_service";

const GRPC_GATEWAY = "http://localhost:8080";
const client = new TrainAPIClient(GRPC_GATEWAY);

declare type Callback<T> = (
  error: ServiceError | null,
  responseMessage: T | null
) => void;

export function listTrains(callback: Callback<ListTrainsResponse>) {
  // TODO: Implement list trains request
}

export function createTrain(
  name: string,
  trainType: TrainTypeMap[keyof TrainTypeMap],
  operator: OperatorMap[keyof OperatorMap],
  coachCount: number,
  catering: boolean,
  callback: Callback<Train>
) {
  const request = new CreateTrainRequest();
  const train = new Train();

  // TODO: Set properties of train

  request.setTrain(train);
  client.createTrain(request, callback);
}

export function deleteTrain(
  id: string,
  callback: Callback<DeleteTrainResponse>
) {
  const request = new DeleteTrainRequest();

  // TODO: Set id of train to be deleted in request

  client.deleteTrain(request, callback);
}
