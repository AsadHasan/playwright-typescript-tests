FROM mcr.microsoft.com/playwright:focal
WORKDIR /e2e
COPY . /e2e
RUN npm ci && npx playwright install
ENTRYPOINT [ "npm", "test" ]
