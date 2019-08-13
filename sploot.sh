forever stopall

cd apiGateway/
sudo npm install
npm start

echo "Apigateway Server Started...."
cd ../

cd mobileApp/
sudo npm install
npm start
echo "Mobile App Server Started...."
cd ../

cd adminApp/
sudo npm install
npm start
echo "Admin App Server Started...."
cd ../


echo "Server Started...."
echo "Check forever list"
