import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import {
  CreateTrainResponse,
  Operator,
  TrainType,
} from "./generated/client/proto/train_api_pb";

import {
  ITrainAPIServer,
  TrainAPIService,
} from "./generated/server/proto/train_api_grpc_pb";
import {
  CreateTrainRequest,
  Train,
  DeleteTrainRequest,
  ListTrainsRequest,
  ListTrainsResponse,
  DeleteTrainResponse,
} from "./generated/server/proto/train_api_pb";

// Initial train that is already present on startup of server
const initTrain: Train = new Train();
initTrain.setName("Initial Train");
initTrain.setId(0);
initTrain.setOperator(Operator.OPERATOR_THAMESLINK);
initTrain.setTrainType(TrainType.TRAIN_TYPE_HIGH_SPEED);
initTrain.setCoachCount(5);

// Counter for number of trains that have been created
let trainCount = 1;
// Tracks all trains in the server
const trains: Train[] = [initTrain];

class TrainAPIServer implements ITrainAPIServer {
  [name: string]: UntypedHandleCall;

  public listTrains(
    call: ServerUnaryCall<ListTrainsRequest, ListTrainsResponse>,
    callback: sendUnaryData<ListTrainsResponse>
  ): void {
    // TODO: Implement list trains request
  }

  public createTrain(
    call: ServerUnaryCall<CreateTrainRequest, Train>,
    callback: sendUnaryData<CreateTrainResponse>
  ): void {
    // Get train from incoming request
    const train = call.request.getTrain();
    train.setId(trainCount++);

    // TODO: Add train to trains array
    // Hint: to add elements to an array use push() function

    // Return response without errors back to client
    const response = new CreateTrainResponse();
    callback(null, response);
  }

  public deleteTrain(
    call: ServerUnaryCall<DeleteTrainRequest, any>,
    callback: sendUnaryData<DeleteTrainResponse>
  ): void {
    const trainId = call.request.getId();

    // TODO: Implement function to delete train
    // Hint 1: Get index of train using findIndex (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
    // Hint 2: Remove element from array at index using splice(index, 1)
    // Bonus: Return error if ID doesn't exist

    trains.findIndex((train) => train.getId() === trainId);

    const response = new DeleteTrainResponse();
    callback(null, response);
  }
}

function getServer() {
  const server = new Server();
  server.addService(TrainAPIService, new TrainAPIServer());
  return server;
}

if (require.main === module) {
  const routeServer = getServer();
  routeServer.bindAsync(
    "0.0.0.0:50051",
    ServerCredentials.createInsecure(),
    () => {
      console.log("Listening on port 50051");
      routeServer.start();
    }
  );
}
