import {ListTrainsRequest,Train} from './generated/client/proto/train_api_pb'
import {TrainAPIClient} from './generated/client/proto/train_api_pb_service'

const GRPC_GATEWAY = 'http://localhost:8080'

const client = new TrainAPIClient(GRPC_GATEWAY)

export function getTrains(callback: (trains?: Train[]) => void) {
    const request = new ListTrainsRequest();

    client.listTrains(request, (err, response) => callback(response?.getTrainsList()))
}

// Listen to the button click and make a request to the gRPC server.
document.getElementById('get-trains-button')?.addEventListener('click', () => {
    getTrains((trains) => {
        console.log(trains)
    })
});