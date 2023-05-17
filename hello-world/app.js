const { QuickSightClient, GenerateEmbedUrlForRegisteredUserCommand, DescribeUserCommand } = require("@aws-sdk/client-quicksight");
const config = require("config");

const client = new QuickSightClient({ region: "eu-central-1" });
exports.lambdaHandler = async (event, context) => {
    // const username = config.get("quicksightUsername");;
    // const awsAccountId = config.get("awsAccountId");;
    const awsAccountId = "327465495978";
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

    function getDashboard({ dashboardId, awsAccountId, userArn }) {
        const command = new GenerateEmbedUrlForRegisteredUserCommand({
            AwsAccountId: awsAccountId,
            SessionLifetimeInMinutes: 480,
            UserArn: userArn,
            ExperienceConfiguration: {
                Dashboard: {
                    InitialDashboardId: dashboardId
                },
            }
        });
        return client.send(command);
    }

    try {
        const graphMasterCommand = getGraph({
            awsAccountId,
            userArn: "arn:aws:quicksight:eu-central-1:327465495978:user/default/AWSReservedSSO_AdministratorAccess_aa0b2176933fbdd4/lorenzo.dessimoni@corley.it",
            dashboardId: "fe31ddde-1b16-45b5-a51b-f818982d26e9",
            sheetId: "fe31ddde-1b16-45b5-a51b-f818982d26e9_2868bd74-6f0e-44c6-a58f-883c6a25d4a6",
            visualId: "fe31ddde-1b16-45b5-a51b-f818982d26e9_1954359f-3941-44c0-9a5d-eb851e9a26ec",
        });
        const kpiMasterCommand = getGraph({
            awsAccountId,
            userArn: "arn:aws:quicksight:eu-central-1:327465495978:user/default/AWSReservedSSO_AdministratorAccess_aa0b2176933fbdd4/lorenzo.dessimoni@corley.it",
            dashboardId: "fe31ddde-1b16-45b5-a51b-f818982d26e9",
            sheetId: "fe31ddde-1b16-45b5-a51b-f818982d26e9_2868bd74-6f0e-44c6-a58f-883c6a25d4a6",
            visualId: "fe31ddde-1b16-45b5-a51b-f818982d26e9_3b9b1731-d739-4c56-b724-39434b1fbfa5",
        });
        const graphCakeCommand = getGraph({
            awsAccountId,
            userArn: "arn:aws:quicksight:eu-central-1:327465495978:user/default/AWSReservedSSO_AdministratorAccess_aa0b2176933fbdd4/lorenzo.dessimoni@corley.it",
            dashboardId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b",
            sheetId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b_ba74e40a-874e-4c2f-9df1-368ba1b6cced",
            visualId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b_1baa86fe-0780-4273-aab0-d89b6492b88e",
        });
        const graphBarCommand = getGraph({
            awsAccountId,
            userArn: "arn:aws:quicksight:eu-central-1:327465495978:user/default/AWSReservedSSO_AdministratorAccess_aa0b2176933fbdd4/lorenzo.dessimoni@corley.it",
            dashboardId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b",
            sheetId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b_ba74e40a-874e-4c2f-9df1-368ba1b6cced",
            visualId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b_6f6ee087-3608-4610-856e-d7d50a890212",
        });

        const dashboardCommand = getDashboard({
            awsAccountId,
            userArn: "arn:aws:quicksight:eu-central-1:327465495978:user/default/AWSReservedSSO_AdministratorAccess_aa0b2176933fbdd4/lorenzo.dessimoni@corley.it",
            dashboardId: "f850a3d2-aa1e-4dab-9960-fd6038f1a77b"
        });

        const [graphMaster, kpiMaster, dashboard, graphCake, graphBar] = await Promise.all([
            graphMasterCommand, 
            kpiMasterCommand, 
            dashboardCommand, 
            graphCakeCommand, 
            graphBarCommand
        ]);

        const mapper = ({ EmbedUrl }) => EmbedUrl;
        const urls = [graphMaster, kpiMaster].map(mapper);

        return {
            statusCode: 200,
            body: {
                urls,
                dashboard: mapper(dashboard),
                components: {
                    cake: mapper(graphCake),
                    bar: mapper(graphBar)
                }
            }
        };
    } catch (err) {
        console.log(err);
        return err;
    }
};
