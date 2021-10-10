# gRPC Train Journey

## Getting Started

1. Install nodejs
2. Run npm install

```bash
npm install
```

3. Download [gRPC web proxy](https://github.com/improbable-eng/grpc-web) for your platform.
4. Generate the client and server stubs

```bash
npm run proto-gen-client
npm run proto-gen-server
```

5. Open 3 terminals and run the grpc server, grpc-web-proxy and webpack dev server.

```bash
npm run server

./grpcwebproxy-v0.14.1-osx-x86_64 --backend_addr=localhost:50051 --run_tls_server=false --allow_all_origins

npm run client
```