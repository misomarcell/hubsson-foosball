# hubsson-foosball

## Getting started
Install firebase tools:
`npm install -g firebase-tools` 

Login to firebase:
`firebase login`

Deploy app:
`firebase deploy`

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
match
{
	"id": "string",
	"startTime": "2019-01-01 01:01:01",
	"endTime": undefined,
	"teams": {
		"red": {
			"striker": "string",
			"defender": "string",
			"score": 0
		},
		"blue": {
			"striker": "string",
			"defender": "string",
			"score": 0
		}
	},
	"history": [
		{
			"eventType": "string",
			"player": "string",
			"eventTime": "2019-01-01 01:01:01"
		}
	]
}
```
