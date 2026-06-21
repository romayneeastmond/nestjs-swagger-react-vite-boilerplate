# GitHub CI/CD to AWS

## Versioning & Releases

The most common approach is Semantic Versioning (SemVer):

MAJOR.MINOR.PATCH

2    .1   .3
MAJOR — breaking changes

MINOR — new features, backwards compatible

PATCH — bug fixes

Manage this with npm version commands run independently in each subfolder since the API and frontend can evolve at different rates:

```bash
cd api
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

cd client
npm version patch
npm version minor
npm version major
```

This automatically updates `package.json` and creates a git tag for that release.

---

## Branch Strategy
main        ← production, protected, deploys automatically

develop     ← integration branch

feature/*   ← individual features, PR into develop

hotfix/*    ← urgent fixes, PR directly into main

---

## CI/CD Pipeline Flow

Pull requests into main only trigger the test jobs — they never build or deploy. Only a merge into main triggers the full pipeline:
Push to main

↓

Run API tests

Run Frontend tests

↓

Build Docker images

Push to Amazon ECR (Elastic Container Registry)

↓

Deploy to ECS Fargate

↓

Live

---

## Pipeline Jobs

### Test
- Runs on every pull request and push to main
- Installs dependencies and runs unit tests and e2e tests for the API
- Installs dependencies and runs unit tests for the frontend
- Both must pass before the pipeline proceeds

### Build and Push
- Only runs on a push to main after tests pass
- Builds Docker images for both the API and frontend
- Tags each image with the Git commit SHA for traceability as well as latest
- Pushes both images to Amazon ECR
- The frontend image receives VITE_API_URL as a build argument at this stage since Vite bakes environment variables into the bundle at build time

### Deploy
- Only runs after a successful build and push
- Issues a force new deployment to ECS Fargate for both the API and frontend services
- ECS pulls the latest images from ECR and replaces the running containers

---

## AWS Services Used

| Service                          | Purpose                                       |
|----------------------------------|-----------------------------------------------|
| ECR (Elastic Container Registry) | Stores Docker images                          |
| ECS Fargate                      | Runs containers without managing servers      |
| IAM                              | Controls access permissions for GitHub to AWS |

---

## GitHub Secrets

Secrets are encrypted environment variables stored in GitHub and injected into the pipeline at runtime. They are never visible in logs or to other users.

### How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings**
3. Click **Secrets and variables** in the left sidebar
4. Click **Actions**
5. Click **New repository secret**
6. Add each secret by name and value

### Required Secrets

| Secret                  | Description                                       |
|-------------------------|---------------------------------------------------|
| `AWS_ACCOUNT_ID`        | Your 12 digit AWS account ID                      |
| `AWS_ACCESS_KEY_ID`     | Access key for the IAM user GitHub uses to deploy |
| `AWS_SECRET_ACCESS_KEY` | Secret key for the same IAM user                  |
| `VITE_API_URL`          | The production URL of your NestJS API             |

### IAM User Best Practices

Never use your AWS root account credentials in GitHub. Instead:

1. Create a dedicated IAM user in AWS for GitHub Actions
2. Attach only the permissions that user needs (ECR push, ECS deploy)
3. Generate an access key specifically for that user
4. Rotate the access key periodically
5. If the key is ever exposed, revoke it immediately in AWS IAM and generate a new one

### Why VITE_API_URL is a Secret

Unlike the other secrets which are sensitive credentials, VITE_API_URL is a secret because it contains your production API domain which you may not want publicly visible in your repository. If you are comfortable with it being public, it can be stored as a variable instead of a secret under **Settings → Secrets and variables → Actions → Variables**.