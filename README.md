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
