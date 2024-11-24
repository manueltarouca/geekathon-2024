import json
import boto3
import psycopg2
import os

s3_client = boto3.client("s3")
sns_client = boto3.client("sns")

#rds_connection_string = "postgresql://postgres_iSOStO{_Xm]*P4-prm5gH%?f{w7T@geekathon-2024-db.cjuo0o6iy3sr.us-west-2.rds.amazonaws.com:5432"
sns_topic_arn = "arn:aws:sns:us-west-2:431614406433:PersistTranscriptionJobDone"

db_name = "postgres"
db_user = "postgres"
db_password = "iSOStO{_Xm]*P4-prm5gH%?f{w7T"
db_host = "geekathon-2024-db.cjuo0o6iy3sr.us-west-2.rds.amazonaws.com"
db_port = "5432"

def lambda_handler(event, context):
    try:
        print("hello world")
        bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
        key = event["Records"][0]["s3"]["object"]["key"]
        print(f"Processing file: s3://{bucket_name}/{key}")

        event_time = event["Records"][0]["eventTime"]
        json_file_path = f"{key}"

        s3_object = s3_client.get_object(Bucket=bucket_name, Key=key)
        
        
        file_content = s3_object["Body"].read().decode("utf-8")
        print("File downloaded in memory")
        
        body = json.loads(file_content)

        job_name = body.get("jobName")
        speakers = body.get("results", {}).get("speaker_labels", {}).get("speakers", 0)
        transcript = body.get("results", {}).get("transcripts", [{}])[0].get("transcript", "")

        print(f"Job Name: {job_name}")
        print(f"Speakers: {speakers}")
        print(f"Transcript: {transcript}")
     
        with psycopg2.connect(rds_connection_string) as conn:
             with conn.cursor() as cur:
                 cur.execute(
                     "INSERT INTO transcriptions (job_id, transcript, num_speakers) VALUES (%s, %s, %s)",
                     (job_name, transcript, speakers)
                 )
             conn.commit()

        # # Enviar notificação SNS
        # sns_message = {
        #     "job_id": job_name,
        #     "status": "COMPLETED",
        #     "message": f"Job {job_name} has been successfully processed and persisted.",
        # }

        # sns_client.publish(
        #     TopicArn=sns_topic_arn, Message=json.dumps(sns_message), Subject="Job Processed"
        # )
        # print(f"SNS notification sent for job {job_name}.")

        # return {"statusCode": 200, "body": f"Job {job_name} processed successfully."}
                # Insert into PostgreSQL database
    except Exception as err:
        print(err)
