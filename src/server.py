from concurrent import futures
import logging
import grpc
from generated.server import train_api_pb2_grpc as api
from generated.server import train_api_pb2 as protos

class TrainAPIServicer(api.TrainAPIServicer):
    def __init__(self):
        # Initial Train
        initTrain = protos.Train()
        initTrain.name = "Python Train"
        initTrain.id = 0
        initTrain.operator = protos.Operator.OPERATOR_THAMESLINK
        initTrain.train_type = protos.TrainType.TRAIN_TYPE_HIGH_SPEED
        initTrain.coach_count = 5
        # Counter to use for train IDs
        self.trainCount = 1
        # List of trains
        self.trains = [initTrain]
    
    def ListTrains(self, request, context):
        response = protos.ListTrainsResponse()

        # TODO: Set the list of trains to be returned

        return response
    
    def CreateTrain(self, request, context):
        train = request.train
        train.id = self.trainCount
        self.trainCount += 1
        
        # TODO: Add the new train to trains

        response = protos.CreateTrainResponse()
        return response
    
    def DeleteTrain(self, request, context):
        trainId = request.id

        # TODO: Remove the train with id=trainId from trains

        response = protos.DeleteTrainResponse()
        return response
    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    api.add_TrainAPIServicer_to_server(TrainAPIServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()
    
if __name__ == '__main__':
    logging.basicConfig()
    serve()
    
    