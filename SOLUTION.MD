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

### Step Four - Use Kustomize for templating, multi-stage deployment

I opted in for using the Kustomize tool for managing the deployment of the Quizzler application in the cluster. Since it's come inbuilt with kubectl and it makes it easy to deploy the same deployment configurations to different environments, it's a great tool to integrate into our deployment effort.

I created a kustomize folder in the kubernetes folder, and added a base folder that contains the deployment files for Quizzler and the kustomize configuration file. I also added an overlay folder that would contain the various environments that the cluster would be deployed. The deployment was ran with `kubectl apply -k base/` and kustomize ensured that the necessary resources and objects are deployed appropriately.

### Step Five - Automatic Build and Tagging of Docker Image

The next step is to automate the build and tagging of the Quizzler image. This would be included in the pipeline for the Quizzler application and it would only run on the main branch to ensure we don't build images at every commit. The main branch would serve as the branch handling the deployment of the Quizzler application to production.
I setup the required job that handles building the image, tagging it using the CI_BUILD_NO and pushing it to my docker hub repository.

![CI Integration Pipeline](https://drive.google.com/uc?export=view&id=16zLFTSXn70ReaMqn10m7f4_hFixaMfYe)

### Step Six - Deployment

For the deployment aspect of Quizzler, I created a new repository called `quizzler-deployment`. This repository would hold the manifest files for the Quizzler deployment. This is the first step of integrating GitOps into the deployment pipeline of Quizzler. Creating a seperate repository to store the deployment files of Quizzler also gives makes it possible to integrate ArgoCD to manage deploying the Quizzler application to the various data centers as specified in the requirement.

I added a new job called generateYAML which would handle pulling the deployment repository, updating the kustomization file with the new image built and pushing it back to the repository. Once ArgoCD is setup in the cluster, it would monitor this new repository and handle the deployment based on the settings configured.

I created a Kubernetes cluster on AWS using the eksctl cli tool. I created a cluster called quizzler in us-west-2 with worker node of type t2.micro. The command I ran was `eksctl create cluster -n quizzler -t t2.micro -r us-west-2`. eksctl handled creating all the necessary resources like the VPC, subnets, internet gateway, the control planes and attaching the two worker nodes to the AWS managed k8s cluster.

I then created a new namespace called argocd and deployed all the necessary argocd related resources by running
`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.0.0-rc3/manifests/install.yaml`.

The argocd related resources was created in this namespace. After that, I updated my argocd account configuration and deployed the [Quizzler Deployment Repository](https://github.com/themmyloluwaa/quizzler-deployment) in the cluster.

![Quizzler deployed application by ArgoCD](https://drive.google.com/uc?export=view&id=18aIkaaMOuvxuc3YrRUyyEkHtN1l-Xxd1)

The app has been deployed and we can access it by visiting the node's IP address and the autogenerated port.

![Deployed Quizzler Service Running on the IP address of the node server](https://drive.google.com/uc?export=view&id=1sQ_9OaBIYO32GtYPvF0tbuqo2y0ZQqJX)

#### NOTE:

**I used nodePort service type here because this is a small development project and it'll be torn down by the time you're accessing it. For a production application, I'd use a LoadBalancer service instead to enable users access the application.**

If we make a change to the [Quizzler Deployment Repository](https://github.com/themmyloluwaa/quizzler-deployment) and check the ArgoCD dashboard, we'd notice it notifies us that our application is out of sync. This means that the current state of the application is not the desired state in our repository. ArgoCD enables us to integrate various notification services in our application and so we could integrate slack with ArgoCD and we'd get notified anytime our application is out of sync. For the purpose of this project, i'd not be doing that.

![ArgoCD Notification About Out of Sync State of the deployment](https://drive.google.com/uc?export=view&id=1U2vUTQJ4KQXnAKIxJISd7ziVDiUHECkV)

### Conclusion

In this project, I have packaged Quizzler application as a containerised service that can be published and deployed on various data centers around the world. I have also added a CI/CD pipeline in the deployment process using CircleCI and ArgoCD. This integration enables us to automate a lot of things like

- Running tests
- Building the application
- Building the image and publishing it to the container registry
- Generating deployment manifest
- Pushing to the deployment repository monitored by ArgoCD

Here's the final working application tested below. Don't mind my scores :).

It's been an amazing learning process working on this project and I learnt a lot. If you're working with these stacks or more and would love to talk, my email is [codekagei@gmail.com](mailto:codekagei@gmail.com).

![Quizzler Application Tested and Running](https://drive.google.com/uc?export=view&id=1X5HSAEhjO1_2DcUQ_3Y15o2sW5et2LhM)
