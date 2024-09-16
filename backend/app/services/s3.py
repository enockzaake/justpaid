import boto3
from django.conf import settings

def s3_upload(file):

    print("Uploading to amazon s3 bucket")
    # Print file attributes
    print("FILE NAME:", file.name)  # Name of the uploaded file
    print("FILE SIZE:", file.size)  # Size of the file in bytes
    print("FILE CONTENT TYPE:", file.content_type)  # MIME type of the file

    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key="TKZmv+Cyi1ItkmBMuM8LuTGSkqvwrIOh3uUcYaMT",
        region_name=settings.AWS_S3_REGION_NAME,
    )

    bucket_name = settings.AWS_STORAGE_BUCKET_NAME
    
    try:
        s3_client.upload_fileobj(file, bucket_name, file.name)
        file_url = f"https://{bucket_name}.s3.amazonaws.com/{file.name}"
        print("S3 URL:",file_url)
        return {'url':file_url }
    
    except Exception as e:
        return {'error': str(e)}
    