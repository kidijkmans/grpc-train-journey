# gRPC Train Journey

## Getting Started

1. Install nodejs
2. Run npm install

```bash
npm install
```

4. Generate the client and server stubs for your operating system

```bash
npm run proto-gen-osx
npm run proto-gen-win32
npm run proto-gen-win64
npm run proto-gen-linux
```

5. Open 3 terminals and run the grpc server, grpc-web-proxy and webpack dev server.

```bash
npm run server

npm run webproxy-osx
npm run webproxy-win32
npm run webproxy-win64
npm run webproxy-linux

npm run client
```