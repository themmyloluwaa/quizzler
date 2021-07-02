# This file contains the solution for the Quizzler Requirments below.

### Requirements of Quizzler

- Quizzler should be deployable in different data centers exposed to the internet with different URLs

- The deployment should be packaged in such a way so that is fully compatible with a modern CI/CD tool e.g. ArgoCD, Flux, GitLab, Jenkins, Harness, Spinnaker

- During deployment, the user should experience zero downtime

- The deployment should have the ability to rollback if needed

- There should be an automated recovery in case of failure

**The solution to these requirements revolve around the following tools and technologies and platforms.**

- Docker
- Kubernetes
- Git
- CI/CD: CircleCI
- GitOps: ArgoCD
- Monitoring - Prometheus/Grafanna
- Deployment - AWS

## The Solution

The first requirment states that _Quizzler should be deployable in different data centers which are exposed to the internet with different URLs._ From this statement, I can infer that Quizzler needs to be:

- packaged in a way that it's platform agnostic meaning it can run anywhere. Considering that we can't guarantee that these data centers servers have the same environment in which Quizzler was developed, it needs to be packaged in a way that different environment isn't a limiting factor.
- Easily movable/transferred: Quizzler needs to be packaged in a way that we can easily deploy it in any of these environments or transfer it to other environments.

**The solution is to package Quizzler as a container**
Quizzler would be packaged as a container with all the binaries needed to run it packaged with it. We can guarantee that these deployment data centers would have the necessary container runtime engine to run containers which already solves the problem of different environment. Containers combined with a container repository enable us to easily move and deploy applications from one data center to more data centers. Since these data centers are internet powered, they can also access this repository to pull Quizzler for deployment. This already solves the easily movable sub requirement.

The container platform I chose is Docker because:

- it's the industry lead in containerisation
- good documentation which would come in handy for debugging and helping out my colleagues when they get stuck
- strong community which has produced many learning resources, guides, how to solves and opportunity to learn
- Supported by all major cloud providers.

The requirment _The deployment should be packaged in such a way so that is fully compatible with a modern CI/CD tool e.g. ArgoCD_ is also satisfied by the containerising of Quizzler. These CI/CD tools have support for containers, specifically docker containers which is a huge advantage for us.
