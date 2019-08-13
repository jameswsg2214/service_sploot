
forever stopall

cd apiGateway/
npm start

echo "Apigateway Server Started...."
cd ../

cd mobileApp/
npm start
echo "Mobile App Server Started...."
cd ../

cd adminApp/
npm start
echo "Admin App Server Started...."
cd ../


echo "Server Started...."
echo "Check forever list"
