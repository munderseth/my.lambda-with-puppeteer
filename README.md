# my.lambda-with-puppeteer
Sandbox for using Puppeteer with a AWS Lamba.

> [my-lambda-with-puppeteer](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions/my-lambda-with-puppeteer?tab=code)

## Usage
### Deploying
The deployment of the lambda is done using the `deploy.xml` workflow via `workflow_dispatch`:

- Installs packages - production only (`npm install --only=production`)
- Zips `node_modules` and `hello-puppeteer-index.js`
- Sets up the AWS credentials
- Uploads the zip file to S3 bucket - `munderseth`
- Deploys the zip file to the lambda function - `my-lambda-with-puppeteer`

Note that an `S3 bucket` is being used because the zip file containing puppeteer is just over **50MB** (limit for direct upload).

### Running:
- Can test run the lambda via the AWS Console using the [Test](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions/my-lambda-with-puppeteer?tab=testing) option.
- Can also run locally by uncommenting `//main()`:
    ```
    node hello-puppeteer-indexjs
    ```

## Setup

### Packages
The version existing is `10.1.0`. The 2 packages should match versions.
```
npm install chrome-aws-lambda --save-prod
```

```
npm install puppeteer-core@10.1.0 --save-prod
```

For local (desktop) only

```
npm install --save-dev puppeteer
```

### Secrets
[Setting](https://github.com/munderseth/my.puppeteer-aws-lambda/settings/secrets/actions) in GitHub.

```
AWS_ACCESS_KEY_ID
```
```
AWS_SECRET_ACCESS_KEY
```

### AWS
The following are specifics for creating a new lambda function:

#### Runtime settings:
- **Runtime** set to `Node.js 12.x`
- **Handler** set to `hello-puppeteer-index` (same name as the file within the repo)

#### General configuration
- **Memory** set to `1023 MB` from *128 MB*


## References

- https://github.com/alixaxel/chrome-aws-lambda - Chromium binary for AWS Lambda
- https://github.com/appleboy/lambda-action - Action for AWS deployment
- [How to use Lambda and Puppeteer](https://acloudguru.com/blog/engineering/serverless-browser-automation-with-aws-lambda-and-puppeteer) - blog article

