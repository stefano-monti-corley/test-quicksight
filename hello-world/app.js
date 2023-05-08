const { QuickSightClient, GenerateEmbedUrlForRegisteredUserCommand, DescribeUserCommand } = require("@aws-sdk/client-quicksight");
const config = require("config");

exports.lambdaHandler = async (event, context) => {
    const username = config.get("quicksightUsername");;
    const awsAccountId = config.get("awsAccountId");;

    const client = new QuickSightClient({ region: "eu-central-1" });

    function getGraph({ dashboardId, sheetId, visualId, awsAccountId, userArn }) {
        const command = new GenerateEmbedUrlForRegisteredUserCommand({
            AwsAccountId: awsAccountId,
            SessionLifetimeInMinutes: 480,
            UserArn: userArn,
            ExperienceConfiguration: {
                DashboardVisual: {
                    InitialDashboardVisualId: {
                        DashboardId: dashboardId,
                        SheetId: sheetId,
                        VisualId: visualId,
                    },
                },
            }
        });

        return client.send(command);
    }
    try {
        const describeUserCommand = new DescribeUserCommand({
            AwsAccountId: awsAccountId,
            UserName: username,
            Namespace: "default"
        });

        const { User, $metadata } = await client.send(describeUserCommand);
        if ($metadata.httpStatusCode !== 200) {
            throw new Error(`DescribeUser failed with http status code ${$metadata.httpStatusCode}`);
        }

        if (!User.Arn || !User.Active) {
            throw new Error(`User with username ${username} not found.`);
        }

        const graph1 = getGraph({
            awsAccountId,
            userArn: User.Arn,
            dashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9",
            sheetId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_385023b9-1ff7-4e4f-9118-ae4ca7c01788",
            visualId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_88f62564-b9b9-43e4-95fa-91f52f79386d",
        });

        const graph2 = getGraph({
            awsAccountId,
            userArn: User.Arn,
            dashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9",
            sheetId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_385023b9-1ff7-4e4f-9118-ae4ca7c01788",
            visualId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_9c1262e7-ddee-4470-b1dc-0804467c4652",
        });

        const graph3 = getGraph({
            awsAccountId,
            userArn: User.Arn,
            dashboardId: "d3e64692-410a-4ea8-9af7-0f05daf561c9",
            sheetId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_385023b9-1ff7-4e4f-9118-ae4ca7c01788",
            visualId: "d3e64692-410a-4ea8-9af7-0f05daf561c9_3555aeee-1e84-44a4-b159-9c444eb9f8ee",
        });


        const responses = await Promise.all([graph1, graph2, graph3]);
        const urls = responses.map(({ EmbedUrl }) => EmbedUrl);
        return { statusCode: 200, body: { urls } };
    } catch (err) {
        console.log(err);
        return err;
    }
};
