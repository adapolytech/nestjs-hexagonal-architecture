FROM node:22-alpine
LABEL author="thenuulestdev"
LABEL email="thenuulestdev@gmail.com"
RUN addgroup jenkins && adduser -S -G jenkins jenkins
RUN mkdir -p /app/hackaton && chown -R jenkins:jenkins /app
USER jenkins
WORKDIR /app/hackaton
COPY --chown=jenkins:jenkins . .
RUN npm install
ENV PORT=3000
EXPOSE 3000
RUN npm run build
ENTRYPOINT [ "npm", "run", "start:prod" ]
