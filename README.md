# gRPC Train Journey

## Getting Started

1. Install NodeJS from [NodeJS website](https://nodejs.org/en/download/)
2. Install Python from [Python website](https://www.python.org/downloads/)
3. Download or clone the project (if you have git installed). You can download the [project here](https://github.com/OmarKidwai/grpc-train-journey/archive/refs/heads/master.zip)

```bash
git clone https://github.com/OmarKidwai/grpc-train-journey.git
cd grpc-train-journey
```

4. Run npm install

```bash
npm install
```

5. Generate the client stubs. The command to run will vary based on your Operating System:

- MacOS: `npm run proto-gen-client-osx`
- Linux: `npm run proto-gen-client-linux`
- Windows 64bit: `npm run proto-gen-client-win64`
- Windows 32bit: `npm run proto-gen-client-win32`

6. Run pip install grpcio-tools

```bash
pip install grpcio-tools
```

7. Generate the server stubs.

```bash
python -m grpc_tools.protoc -Iproto --python_out=src/generated/server --grpc_python_out=src/generated/server proto/train_api.proto
```

8. Open 3 terminals and run the python server, grpc-web-proxy and webpack dev server.

 Terminal 1:

Run server.py. You may have to navigate to train_api_pb2_grpc.py and edit the import to get this to work

```python
from generated.server import train_api_pb2 as train_api_pb2
```

Terminal 2 (this will vary depending on Operating System):

- MacOS: `npm run webproxy-osx`
- Linux: `npm run webproxy-linux`
- Windows 64bit: `npm run webproxy-win64`
- Windows 32bit: `npm run webproxy-win32`

Terminal 3:

```bash
npm run client
```

## Challenges

### 1. Implement ListTrains request

The goal of this challenge is to implement a call from the client to the server to receive the trains stored on the server and display them on the webpage. To do so we have to implement the ListTrains method specified in the protobuf file.

```protobuf
rpc ListTrains(ListTrainsRequest) returns (ListTrainsResponse);
```

On the client side you will have to create the ```ListTrainsRequest``` object in the ```listTrains``` method of the ```client.ts``` file and pass it to the listTrains method of the gRPC client ```client.listTrains(request, callback)```.

```typescript
const request = new ListTrainsRequest();
client.listTrains(request, callback);
```

> Make sure to pass the callback as well so the UI is notified about the server response

In ```server.py``` in the ```ListTrains``` method set the trains property of the  ```ListTrainsResponse```.

```python
response.trains.extend(self.trains)
```

### 2. Implement CreateTrain request

Now that we can fetch the list of trains from the server we want to be able to create new trains. Therefore, we implement the CreateTrain method of the protobuf.

```protobuf
rpc CreateTrain(CreateTrainRequest) returns (CreateTrainResponse);
```

In the ```createTrain``` method in ```client.ts``` set the train properties on the request.

```typescript
const request = new CreateTrainRequest();
const train = new Train();

train.setName(name);
train.setTrainType(trainType);
...

request.setTrain(train);
client.createTrain(request, callback);
```

To implement the functionality on the server open ```server.py``` and in the ```CreateTrain``` method append the train from the request into the ```trains``` array.

```python
self.trains.append(train)
```

This will add it to the array and you should now see your created train when you click on the List Train button. In a real application instead of pushing the train on an array we could persist it in a database.

### 3. Implement DeleteTrain request

Finally, we now want to be able to delete trains by their id. To realize this we implement the DeleteTrain method of the protobuf file.

```protobuf
rpc DeleteTrain(DeleteTrainRequest) returns (DeleteTrainResponse);
```

In the ```client.ts``` file in the ```deleteTrain``` method set the id of the train that should be deleted in the request.

```typescript
const request = new DeleteTrainsRequest();
request.setId(id);

client.deleteTrain(request, callback);
```

In ```server.py``` you could filter trains to select elements which don't have that ID

```python
self.trains = [train for train in self.trains if train.id != trainId]
# Or this way
self.trains = filter(lambda train: train.getId() != trainId, self.trains)
```

Challenge: The code now works given that the train id in the request exists in the trains array. In case no train can be found with the given id, how can we return an error to the client?

Hint:

```python
context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
context.set_details('Could not find a train with the given id!')
```