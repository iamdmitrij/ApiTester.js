# API Tester
The purpose of this app is to test given API in containerized fashion. Written using Node.js.
## Usage
You can run this app as simple Node.js app:

``node src/main.js``

This app supports containerization. If you want to build this app locally you can use following command:

``docker build -t api-tester .``


If you run this app without any arguments, it will check against default valid codes:

``docker run api-tester``

In order to customize your input please pass environment variable CODE_INPUT. Do note that you have set multiple code input by sepataring value with commas.

``docker run -e="CODE_INPUT=a,b,c" api-tester``

To pull image from Docker registry use:

``docker pull iamdmitrij/api-tester:1.0.0``