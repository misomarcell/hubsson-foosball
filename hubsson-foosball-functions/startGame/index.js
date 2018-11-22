let azure = require("azure-storage");
var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "649442",
  key: "ba07e9ae8cac25d7175b",
  secret: "d4a44b8d1be20bb1ce34",
  cluster: "eu",
  encrypted: true
});

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (req.query.name || (req.body && req.body.name)) {
    let connectionString = process.env.AzureWebJobsStorage;
    let tableService = azure.createTableService(connectionString);

    tableService.createTableIfNotExists("test", function(
      error,
      result,
      response
    ) {
      if (error) {
        context.log(error);
      }
      context.log(result);
    });

    var entGen = azure.TableUtilities.entityGenerator;
    var entity = {
      PartitionKey: entGen.String("asd"),
      RowKey: entGen.String(guid()),
      name: req.body.name
    };

    tableService.insertEntity("test", entity, (error, result, response) => {
      context.res = {
        statusCode: error ? 400 : 204,
        body: "Worked"
      };
    });

    pusher.trigger("my-channel", "my-event", {
      message: "hello world"
    });
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
};
