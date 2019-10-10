sudo chmod -R 777 *
pm2 stop all
pm2 delete all

cd apiGateway/
npm install -d
pm2 start gatewayindex.js
echo "Apigateway Server Started...."
cd ../

cd mobileApp/
npm install -d
pm2 start mobileindex.js
echo "Mobile App Server Started...."
cd ../

cd adminApp/
npm install -d
pm2 start adminindex.js
echo "Admin App Server Started...."
cd ../

echo "Server Started...."

