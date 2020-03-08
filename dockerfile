#Base off of the node LTS Alpine image
FROM mhart/alpine-node:8.12.0

#work the 
WORKDIR /app

#copy the package.json file, for deps.
COPY package.json /app

#install deps with Yarn, can be done with NPM.
RUN yarn 

#copy the rest of the appliation
COPY . /app

#build the appplication
RUN yarn run build 

#launch the application
CMD yarn run start

#expose 8080, defacto web standard.
EXPOSE 8080