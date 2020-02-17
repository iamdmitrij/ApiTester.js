FROM node:slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app
ENV CODE_INPUT 'REB001,REB002,REB003,REB004,REB005,REB006,REB007'
ENV TARGET_API 'https://codes.dev.rebellionpay.com/'
RUN node -v
CMD node main.js