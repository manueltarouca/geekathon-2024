import json
import boto3
import psycopg
import os

s3_client = boto3.client("s3")
sns_client = boto3.client("sns")


rds_connection_string = "postgresql://postgres_iSOStO{_Xm]*P4-prm5gH%?f{w7T@geekathon-2024-db.cjuo0o6iy3sr.us-west-2.rds.amazonaws.com:5432"
sns_topic_arn = "arn:aws:sns:us-west-2:431614406433:PersistTranscriptionJobDone"


def lambda_handler(event, context):

    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]
    print(f"Processing file: s3://{bucket_name}/{key}")

    event_time = event["Records"][0]["eventTime"]

    # folder_name_with_extension = key.split("/")[-1]  # split by / and get key name
    # folder_name = os.path.splitext(folder_name_with_extension)[0]

    print(bucket_name)
    json_file_path = f"output/{key}/{key}.json"

    # local_file_path = f"/tmp/{key.split('/')[-1]}"

    local_file_path = f"/tmp/{bucket_name}.json"  # Save the file /tmp
    s3_client.download_file(bucket_name, json_file_path, local_file_path)

    with open(local_file_path, "r") as file:
        body = json.load(file)

        job_name = body.get("jobName")
        speakers = body.get("results", {}).get("speaker_labels", {}).get("speakers", 0)
        transcript = (
            body.get("results", {}).get("transcripts", [{}])[0].get("transcript", "")
        )

        print(f"Job Name: {job_name}")
        print(f"Speakers: {speakers}")
        print(f"Transcript: {transcript}")

        with psycopg.connect(rds_connection_string) as conn:
        

            with conn.cursor() as cur:

                cur.execute(
                "INSERT INTO transcriptions (job_id, transcript, num_speakers) VALUES (%s, %s, %s)",
                (job_name, transcript, speakers)
                )

            conn.commit()
    # Send SNS notification
    sns_message = {
        "job_id": job_name,
        "status": "COMPLETED",
        "message": f"Job {job_name} has been successfully processed and persisted.",
    }

    sns_client.publish(
        TopicArn=sns_topic_arn, Message=json.dumps(sns_message), Subject="Job Processed"
    )
    print(f"SNS notification sent for job {job_name}.")

    return {"statusCode": 200, "body": f"Job {job_name} processed successfully."}
