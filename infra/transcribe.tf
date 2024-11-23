# resource "aws_iam_role" "transcribe_service_role" {
#   name = "TranscribeServiceRole"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Principal = {
#           Service = "transcribe.amazonaws.com"
#         },
#         Action = "sts:AssumeRole"
#       }
#     ]
#   })

#   inline_policy {
#     name = "TranscribeS3AccessPolicy"
#     policy = jsonencode({
#       Version = "2012-10-17",
#       Statement = [
#         {
#           Effect : "Allow",
#           Action : [
#             "s3:GetObject",
#             "s3:PutObject"
#           ],
#           Resource : [
#             "${aws_s3_bucket.transcription_bucket.arn}/*",
#           ]
#         }
#       ]
#     })
#   }
# }
