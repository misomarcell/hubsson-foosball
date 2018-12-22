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

  if (req.body) {
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

    let entGen = azure.TableUtilities.entityGenerator;
    let entity = {
      PartitionKey: entGen.String("match"),
      RowKey: entGen.String(guid()),
      ...req.body
    };

    tableService.insertEntity("test", entity, {echoContent: true}, (error, result, response) => {
      if(error) {
        context.log("testlog");
        context.res = {
          statusCode: 500
        };  
      }

        context.log("SALALALALALAL" + result);

      context.res = {
        statusCode: 200,
        body: JSON.stringify(result)
      };

      context.done();

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
