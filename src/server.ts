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

class TrainAPIServer implements ITrainAPIServer {
  [name: string]: UntypedHandleCall;

  public createTrain(
    call: ServerUnaryCall<CreateTrainRequest, Train>,
    callback: sendUnaryData<Train>
  ): void {
    // TODO: Implement function to create train and return response
  }

  public getTrain(
    call: ServerUnaryCall<GetTrainRequest, Train>,
    callback: sendUnaryData<Train>
  ): void {
    // TODO: Implement function to return train
  }

  public updateTrain(
    call: ServerUnaryCall<UpdateTrainRequest, Train>,
    callback: sendUnaryData<Train>
  ): void {
    // TODO: Implement function to update train
  }

  public deleteTrain(
    call: ServerUnaryCall<DeleteTrainRequest, any>,
    callback: sendUnaryData<DeleteTrainResponse>
  ): void {
    // TODO: Implement function to delete train
  }

  public listTrains(
    call: ServerUnaryCall<ListTrainsRequest, ListTrainsResponse>,
    callback: sendUnaryData<ListTrainsResponse>
  ): void {
    // TODO: Implement function to list trains
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
