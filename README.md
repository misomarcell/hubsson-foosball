# hubsson-foosball
To enable local debugging:
1. In folder hubsson-foosball-functions:
    - npm i azure-functions-core-tools pusher azure-storage
    - func host start
2. In folder hubsson-foosball-ui
    - change store.getters.functionsHost to return "http://localhost:7071"
    - npm run serve

Contract for THE BOX:
1. Single tap: goal, double tap: ownGoal
{
    "team": "red | blue",
    "position": "striker | defense",
    "action": "goal | ownGoal",
}

2. Press and hold for 2 sec
PUT /undo

3. 2 buttons press and hold for 2 sec
{
    "action": "swap",
    "player1": {
        "team": null,
        "position": null,
    },
    "player2": {
        "team": null,
        "position": null,
    }
}
