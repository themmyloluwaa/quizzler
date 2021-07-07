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

### Step One - Containerize Quizzler

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

- I created two docker files, a docker-compose file for development and a `dockerprodbuild` script for building production images.
- One of the docker file is for development and it has a .dev file extension. It's used by the compose file as the build context
- The production docker file is used by the `dockerprodbuild` script for building the production image. The production image would be run using an nginx server to serve the built files.

### Step Two - Setup Pipeline for Quizzler

After successfully packaging Quizzler as a container locally, the next step was to integrate a CI platform to handle automation regarding the Quizzler project. I went with CircleCI because I have experience working with Github Actions, Gitlab CI/CD and TravisCI. I wanted to give CircleCI a try and add it to my skillset.

I created a .circleci/config.yml file with holds all the configurations for the Quizzler pipeline. CircleCI comes with various features and I leveraged the orbs feature to make use of nodejs workflows. I added two jobs for now, a _test_ job to run all tests related to the project and a _build_ job to build the project binaries. I'd add other jobs to complete our pipeline below. After 10+ attempts and 2 successful attempts, a pipeline is setup to run and build tests on the main branch of Quizzler.

### Step Three - Create k8s Deployment Configuration

We have a CI pipeline on CircleCI that handles the testing and building of our application. While this isn't a complete pipeline, it's enough to get us started and move to the next phase. Writing the Quizzler deployment configuration. Since we want to deploy Quizzler to various data centers in the world, we'd need a tool or technology that empowers us to manage various servers called nodes and deploy Quizzler unto them in an easy way. This process is called container orchestration and Kubernetes is a technology that makes that very possible.

Since we're getting to the production aspect of Quizzler, I created a new branch called `development` that contains the development artifacts of the Quizzler application. The `main` branch would serve as the production branch for the application.
