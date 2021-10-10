import {sendUnaryData, Server, ServerCredentials, ServerUnaryCall, UntypedHandleCall} from '@grpc/grpc-js'

import {ITrainAPIServer, TrainAPIService} from './generated/server/proto/train_api_grpc_pb'
import {CreateTrainRequest, Train, GetTrainRequest, UpdateTrainRequest, DeleteTrainRequest, ListTrainsRequest, ListTrainsResponse} from './generated/server/proto/train_api_pb'

class TrainAPIServer implements ITrainAPIServer {
    [name: string]: UntypedHandleCall


    public createTrain(call: ServerUnaryCall<CreateTrainRequest, Train>, callback: sendUnaryData<Train>): void {
        callback(null)
    }

    public getTrain(call: ServerUnaryCall<GetTrainRequest, Train>, callback: sendUnaryData<Train>): void {
        callback(null)
    }

    public updateTrain(call: ServerUnaryCall<UpdateTrainRequest, Train>, callback: sendUnaryData<Train>): void {
        callback(null)
    }

    public deleteTrain(call: ServerUnaryCall<DeleteTrainRequest, any>, callback: sendUnaryData<any>): void {
        callback(null)
    }

    public listTrains(call: ServerUnaryCall<ListTrainsRequest, ListTrainsResponse>, callback: sendUnaryData<ListTrainsResponse>): void {
        const train = new Train()
        train.setId("123")
        const response = new ListTrainsResponse()
        response.addTrains(train)
        callback(null, response)
    }
}

function getServer() {
    const server = new Server()
    server.addService(TrainAPIService, new TrainAPIServer())
    return server
}

if (require.main === module) {
    const routeServer = getServer()
    routeServer.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
        console.log('Listening on port 50051')
        routeServer.start()
    })
}