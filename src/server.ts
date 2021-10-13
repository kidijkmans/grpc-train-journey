import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
  UntypedHandleCall,
} from "@grpc/grpc-js";

import {
  ITrainAPIServer,
  TrainAPIService,
} from "./generated/server/proto/train_api_grpc_pb";
import {
  CreateTrainRequest,
  Train,
  GetTrainRequest,
  UpdateTrainRequest,
  DeleteTrainRequest,
  ListTrainsRequest,
  ListTrainsResponse,
  DeleteTrainResponse,
} from "./generated/server/proto/train_api_pb";

const trains: Train[] = [];

class TrainAPIServer implements ITrainAPIServer {
  [name: string]: UntypedHandleCall;

  public createTrain(
    call: ServerUnaryCall<CreateTrainRequest, Train>,
    callback: sendUnaryData<Train>
  ): void {
    const train = call.request.getTrain();
    train.setId(trains.length.toString());
    trains.push(train);

    callback(null, train);
  }

  public getTrain(
    call: ServerUnaryCall<GetTrainRequest, Train>,
    callback: sendUnaryData<Train>
  ): void {
    callback(null);
  }

  public updateTrain(
    call: ServerUnaryCall<UpdateTrainRequest, Train>,
    callback: sendUnaryData<Train>
  ): void {
    callback(null);
  }

  public deleteTrain(
    call: ServerUnaryCall<DeleteTrainRequest, any>,
    callback: sendUnaryData<DeleteTrainResponse>
  ): void {
    const index = trains.findIndex((t) => t.getId() === call.request.getId());
    if (index === -1) {
      callback({
        name: "NotFound",
        message: `No train for ${call.request.getId()}`,
      });
    } else {
      trains.splice(index, 1);
      callback(null, new DeleteTrainResponse());
    }
  }

  public listTrains(
    call: ServerUnaryCall<ListTrainsRequest, ListTrainsResponse>,
    callback: sendUnaryData<ListTrainsResponse>
  ): void {
    const response = new ListTrainsResponse();
    response.setTrainsList(trains);
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
