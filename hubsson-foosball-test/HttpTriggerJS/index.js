let azure = require('azure-storage');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {

        let connectionString = process.env.AzureWebJobsStorage;
        let tableService = azure.createTableService(connectionString);
        
        tableService.createTableIfNotExists('items', function(error, result, response) {
            if (!error) {
              // result contains true if created; false if already exists
            }
            context.log(result);
        });


        var entGen = azure.TableUtilities.entityGenerator;
        var entity = {
            PartitionKey: entGen.String(
                'asd'
            ),
            RowKey: entGen.String('asd'),
            name: req.query.name,
          };

        tableService.insertEntity('items', entity, (error, result, response) => {
            context.res = {
                statusCode: error ? 400 : 204,
                body: "Worked"
            };
        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};