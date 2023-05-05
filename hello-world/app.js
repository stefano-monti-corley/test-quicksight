const { QuickSightClient, GetDashboardEmbedUrlCommand } = require("@aws-sdk/client-quicksight");

exports.lambdaHandler = async (event, context) => {
    try {
        const client = new QuickSightClient();
        const command = new GetDashboardEmbedUrlCommand({
            AwsAccountId: "327465495978", // required
            DashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9", // required
            IdentityType: "IAM", // required
            SessionLifetimeInMinutes: 60,
            UserArn: "arn:aws:lambda:eu-central-1:327465495978:function:test-quicksight-HelloWorldFunction-mYsxkQIFJQnZ"
        });
        const response = await client.send(command);
        return { statusCode: 200, body: JSON.stringify(response) };
    } catch (err) {
        console.log(err);
        return err;
    }
};
