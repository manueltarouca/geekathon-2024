{
  "Records": [
    {
      "eventVersion": "2.1",
      "eventSource": "aws:s3",
      "awsRegion": "us-west-2",
      "eventTime": "2024-11-24T12:34:56.789Z",
      "eventName": "ObjectCreated:Put",
      "s3": {
        "bucket": {
          "name": "geekathon-2024-431614406433-us-west-2-data",
          "arn": "arn:aws:s3:::geekathon-2024-431614406433-us-west-2-data"
        },
        "object": {
          "key": "019359ce-9b80-74fa-86a7-891c39cff611",
          "size": 1024,
          "eTag": "abc123def4567890",
          "sequencer": "00123456789ABCDEF"
        }
      }
    }
  ]
}


{
  "Effect": "Allow",
  "Action": "sns:Publish",
  "Resource": "arn:aws:sns:us-west-2:431614406433:PersistTranscriptionJobDone"
}
