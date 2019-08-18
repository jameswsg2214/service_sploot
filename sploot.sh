pm2 stop all

cd apiGateway/
npm install -d
pm2 start index.js

echo "Apigateway Server Started...."
cd ../

cd mobileApp/
npm install -d
pm2 start index.js
echo "Mobile App Server Started...."
cd ../

cd adminApp/
npm install -d
pm2 start index.js
echo "Admin App Server Started...."
cd ../


echo "Server Started...."
echo "Check forever list"
