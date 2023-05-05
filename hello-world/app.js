const { QuickSightClient, GenerateEmbedUrlForRegisteredUserCommand } = require("@aws-sdk/client-quicksight");

exports.lambdaHandler = async (event, context) => {
    try {
        const client = new QuickSightClient({
            region: "eu-central-1",
            credentials: {
                accessKeyId: "ASIAUYPTW5WVFR3OASRS",
                secretAccessKey: "fRD/zniVT/j4Jhgc1IXtZF42FnJb/DOgljSBeqYh",
                sessionToken: "IQoJb3JpZ2luX2VjEPv//////////wEaDGV1LWNlbnRyYWwtMSJHMEUCIQCOCdoY+N9oRzYwbL7zpQhRabJI/EeXJhsE/rbmRtpylwIgZukGqKBGjTVHOCPAskd5dFSxKsSj2U40EqVkfTG531YqlQMIFBACGgwzMjc0NjU0OTU5NzgiDLQHDK1ktGQw2JtCoSryAp75VIZxermCn3j6DT0EzBzIqpHSuj9nHtTcW1LjEhdqZElrj+SBvUjNuFsl1jURIKrtlo8nMhB4eR67D+Fxd7k/W1yIbs+wxtKG3uIufu6RBrYCnnv+MBd06eMeAKjYJIyzXDVfsXSSetwohiwkng/R/bDb3DPvkiNKfJIavhiKyB42ODJrV5NVybeh5zHtU1UhHTStYcDchbgvT2wRO4ptyDSvbJPTNnWaJul/nWxx7O4C79/D+86movbaL6W5fh49AJlsC5QJb+s+vsGOaFrcX+w+BRjpKMtxem5b5EXKYUijXLSSXN+T/FR1PzC9rkhThw5hY5ju7yHA+HbL82gAVJQNlDL1WsCe/wA5nHZga+wKdYwT+gm3dUVBEw6VfpwkyuV72ygU0XrJ4qbaFmIro3MmNab1okmMYN/iOXEgE+wvBHE7672ucQk1ezLg95SrqqopDhH/fXN0FPr5xpjjtgEolpEb7XCGwwtxhstgRMkwirrTogY6pgED9lyMb16p/aisW8tgscM2Dblb3UpuzXJNJC5aOhBEd7og6/YFt+z1ZjJEZDYfOvLzSn69wdYBreLs4QBv0gjnHC05yhf4dK7CEatQiMY3V/QOFJxtlZ47h0fRffIRlc98xu7ScgkJ80WU76HSSZLp3VW9WTfDuMeHG3bmNaUHPURtNQmBbHQKe7+IEplBbYISXo7V6PmkIFXlOagA11svb9nhirRD"
            }
        });
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
