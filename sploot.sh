forever stopall

cd apiGateway/
npm install -d
npm start

echo "Apigateway Server Started...."
cd ../

cd mobileApp/
npm install -d
npm start
echo "Mobile App Server Started...."
cd ../

cd adminApp/
npm install -d
npm start
echo "Admin App Server Started...."
cd ../


echo "Server Started...."
echo "Check forever list"
