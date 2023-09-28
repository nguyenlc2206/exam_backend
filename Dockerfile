FROM node:16 as base

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig*.json ./

# Install app dependencies
RUN npm install typescript -g
RUN npm install
COPY . .

FROM base as prod
RUN npm run build