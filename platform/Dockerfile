#  Create a new image from the base nodejs 7 image.
FROM node:8-alpine as builder

MAINTAINER IEP|ONE

# Create the target directory in the imahge
RUN mkdir -p /usr/src/app
# Set the created directory as the working directory
WORKDIR /usr/src/app
# Copy the package.json inside the working directory
COPY package.json /usr/src/app
# Install required dependencies
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
#RUN npm config set registry https://registry.npmjs.org/
RUN npm install
RUN npm install bootstrap@3.3.6
RUN npm install --save @ng-bootstrap/ng-bootstrap@1.0.0-beta.6

# Copy the client application source files. You can use .dockerignore to exlcude files. Works just as .gitignore does.
COPY . /usr/src/app
# Open port 4200. This is the port that our development server uses
EXPOSE 4200
# Start the application. This is the same as running ng serve.
CMD ["npm", "start"]