# Check out https://hub.docker.com/_/node to select a new base image
FROM node:17.6.0

# Set to a non-root built-in user `node`.  
USER root

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied.   
# where available (npm@5+)

RUN rm -r -f node_modules
COPY --chown=node package.json ./

RUN npm install --save-dev nodemon


RUN npm install

# Bundle app source code
COPY --chown=node . .

# Bind to all network interfaces so that it can be mapped to the host OS ooo, let see it
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "npm", "start" ]







