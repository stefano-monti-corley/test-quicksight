const { QuickSightClient, GenerateEmbedUrlForRegisteredUserCommand, ListUsersCommand } = require("@aws-sdk/client-quicksight");

exports.lambdaHandler = async (event, context) => {
    try {
        const client = new QuickSightClient({ region: "eu-central-1" });

        const generateUrlCommand = new GenerateEmbedUrlForRegisteredUserCommand({
            AwsAccountId: "327465495978",
            SessionLifetimeInMinutes: 60,
            UserArn: "arn:aws:quicksight:eu-central-1:327465495978:user/default/AWSReservedSSO_AdministratorAccess_aa0b2176933fbdd4/lorenzo.dessimoni@corley.it",
            ExperienceConfiguration: {
                DashboardVisual: {
                    InitialDashboardVisualId: {
                        DashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9",
                        SheetId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_385023b9-1ff7-4e4f-9118-ae4ca7c01788",
                        VisualId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_88f62564-b9b9-43e4-95fa-91f52f79386d",
                    },
                },
            }
        });
        const response = await client.send(generateUrlCommand);
        return { statusCode: 200, body: response };
    } catch (err) {
        console.log(err);
        return err;
    }
};
