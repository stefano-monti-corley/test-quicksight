const { QuickSightClient, GenerateEmbedUrlForRegisteredUserCommand } = require("@aws-sdk/client-quicksight");

exports.lambdaHandler = async (event, context) => {
    try {
        const client = new QuickSightClient({ region: "eu-central-1" });
        const input = {
            AwsAccountId: "327465495978", // required
            SessionLifetimeInMinutes: 60,
            UserArn: "arn:aws:lambda:eu-central-1:327465495978:function:test-quicksight-HelloWorldFunction-mYsxkQIFJQnZ", // required
            ExperienceConfiguration: {
                Dashboard: {
                    InitialDashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9", // required
                    FeatureConfigurations: {
                        StatePersistence: {
                            Enabled: false, // required
                        },
                        Bookmarks: {
                            Enabled: false, // required
                        },
                    },
                },
                DashboardVisual: {
                    // RegisteredUserDashboardVisualEmbeddingConfiguration
                    InitialDashboardVisualId: {
                        // DashboardVisualId
                        DashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9", // required
                        SheetId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_385023b9-1ff7-4e4f-9118-ae4ca7c01788", // required
                        VisualId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_88f62564-b9b9-43e4-95fa-91f52f79386d", // required
                    },
                },
            },
        };
        const command = new GenerateEmbedUrlForRegisteredUserCommand(input);
        const response = await client.send(command);
        return { statusCode: 200, body: JSON.stringify(response) };
    } catch (err) {
        console.log(err);
        return err;
    }
};
