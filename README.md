# hubsson-foosball

## Getting started
Install firebase tools:
`npm install -g firebase-tools` 

Login to firebase:
`firebase login`

Install prerequisites:
`npm install -g eslint`
`npm install -g eslint-plugin-promise`
` cd .\functions\; npm install; cd ..` (this step is required till `functions` folder and its dependencies are removed)

Deploy app:
`firebase deploy`

Install ui prequisites:
` cd .\hubsson-foosball-ui\; npm install; cd ..`

Start the app:
`npm run serve`

## Contract for THE BOX:
```
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
```

## Database Contract:
```
activeMatch{
	"matchId": "string"
}

match
{
    "id": "string",
    "startTime": dateTime,
    "endTime": dateTime,
    "teams": {
        "red": {
            "striker": "string",
	    "defender": "string",
	    "score": int
        },
	"blue": {
	    "striker": "string",
	    "defender": "string",
	    "score": int
	}
    },
    "history": [
        {
			"eventType": "string",
			"player": "string",
			"eventTime": dateTime
		},
		{...}
    ]
}
```