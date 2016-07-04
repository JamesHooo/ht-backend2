FROM node:0.12.2
RUN npm install mysql
EXPOSE 8080
COPY search.js .
CMD node ./search.js