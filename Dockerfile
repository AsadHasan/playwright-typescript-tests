FROM mcr.microsoft.com/playwright:focal
WORKDIR /e2e
COPY . /e2e
RUN npm ci
ENTRYPOINT [ "npm", "test" ]
