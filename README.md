This project is a simple, full stack URL shortener. It comprises of:
- MongoDB database
- Node.js express based server (Typescript)
- Vue.js frontend (Typescript) using the Quasar framework (some irrelevant boilerplate still remains)
    - 'short-url-list.vue' and 'Index.vue' are the only files that contain the simple UI (everything else can be ignored)

The top level docker-compose.yml file allows all services to be built and started

SETUP:
- docker-compose up
- Web interface should load up on localhost:8080 (this can be changed in Docker compose)

NOTES:
- The server is using the node "config" module which is intended to make it easy to switch between configurations i.e. 
test, dev, production. It can't directly be overwritten by environment variables but it can be overwritten by a partial
configuration which can seen in the docker-compose file. In reality, you may want to combine the config package
with a single NODE_ENV variable from docker-compose
