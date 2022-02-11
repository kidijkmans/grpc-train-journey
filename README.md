# gRPC Train Journey

## Getting Started

1. Install NodeJS from [NodeJS website](https://nodejs.org/en/download/)
2. Download or clone the project (if you have git installed). You can download the [project here](https://github.com/alexander-lloyd/grpc-train-journey/archive/refs/heads/master.zip)

```bash
git clone https://github.com/alexander-lloyd/grpc-train-journey.git
cd grpc-train-journey
```

3. Run npm install

```bash
npm install
```

4. Generate the client and server stubs. The command to run will vary based on your Operating System:

- MacOS: `npm run proto-gen-osx`
- Linux: `npm run proto-gen-linux`
- Windows 64bit: `npm run proto-gen-win64`
- Windows 32bit: `npm run proto-gen-win32`


5. Open 3 terminals and run the grpc server, grpc-web-proxy and webpack dev server.

 Terminal 1:

```bash
npm run server
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

In ```server.ts``` in the ```listTrains``` method create the ```ListTrainsResponse``` set trains property of it and pass it to the callback as following.

```typescript
const response = new ListTrainsResponse();
response.setTrainsList(trains);
callback(null, response);
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

To implement the functionality on the server open ```server.ts``` and in the ```createTrain``` method push the train from the request into the ```trains``` array.

```typescript
trains.push(train)
```

This will add it to the array and you should now see your created train when you click on the List Train button. In a real application instead pushing the tran on an array we could persist it in a database.

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

In ```server.ts``` you have to first find the index of the train with the given id and then remove it from the trains array. To do this, we use the ```findIndex``` and ```splice``` methods.

```typescript
// Get index of train which id equals trainId
const index = trains.findIndex((train) => train.getId() === trainId);
// Delete train at index from array
trains.splice(index, 1);
```

The code now works given that the train id in the request exists in the trains array. In case no train can be found with the given id we should return an error to the client. To do this check if the index returned from the ```findIndex``` method is -1 and if so return an error as such.


```typescript
callback({ name: "Error", message: `Train with id ${trainId} was not found`}, null);
```

For python command:
```bash
python -m grpc_tools.protoc -Iproto --python_out=src/generated/server --grpc_python_out=src/generated/server proto/train_api.proto
```