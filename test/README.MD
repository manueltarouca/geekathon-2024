boto3

pip install -r requirements.txt
venv/
source venv/bin/activate

mkdir package
cp -r venv/lib/python3.*/site-packages/* package/
cp lambda_test.py package/
cp sns.py package/  #COPY OTHERS FILES
cd package


zip -r ../lambda_package.zip .
cd ..
