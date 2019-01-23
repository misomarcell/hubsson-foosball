# hubsson-foosball
To enable local debugging:
1. In folder hubsson-foosball-functions:
    - npm i azure-functions-core-tools pusher azure-storage
    - func host start
2. In folder hubsson-foosball-ui
    - change store.getters.functionsHost to return "http://localhost:7071"
    - npm run serve