# System Design Cheat Sheet

## When Requirements Are Given
- Clarify scale — how many users, requests per second, data volume
- Clarify read vs write ratio — read heavy vs write heavy changes the design
- Clarify consistency requirements — is stale data acceptable?
- Clarify availability requirements — can it go down briefly during deploys?
- Ask about geographic distribution — single region or multi region?

## Core Components to Consider
- Client (browser / mobile)
- DNS — Route 53
- CDN — CloudFront for static assets
- Load Balancer — ALB
- API Layer — NestJS on ECS Fargate
- Database — RDS for relational, DynamoDB for NoSQL
- Cache — ElastiCache (Redis)
- Queue — SQS for async work, SNS for fan-out
- Storage — S3 for files and assets
- Auth — Cognito or JWT via API
- Monitoring — CloudWatch

## Scalability Considerations
- Horizontal scaling behind a load balancer
- Database read replicas for read heavy workloads
- Caching frequently read data in Redis
- Offload long running tasks to a queue
- CDN for static frontend assets

## Database Considerations
- Relational for structured data with relationships
- NoSQL for unstructured or high volume key-value lookups
- Run migrations before deploying new code
- Never use synchronize: true in production
- Backwards compatible migrations in case of rollback

## Security Considerations
- Public subnets for load balancers only
- Private subnets for API servers and databases
- Secrets Manager for credentials
- WAF in front of CloudFront or ALB
- IAM roles with least privilege

## Deployment Considerations
- Docker images pushed to ECR
- Migrations run before new containers start
- Environment variables via Secrets Manager or task definition
- Health check endpoint for load balancer to verify containers are up

## Trade-offs to Mention
- SQL vs NoSQL
- Sync vs async processing
- Cache consistency vs freshness
- Fargate simplicity vs EKS control
- Cost vs availability

## Things Interviewers Want to Hear
- I would start simple and scale as needed
- The trade-off here is X versus Y
- This decision depends on the read/write ratio
- We should consider what happens when this component fails
- We could improve this later by adding a cache / queue / replica