# docker-scripts
Useful scripts for using node with docker

# Installation
```
npm install --save @plandid/docker-scripts
```

# Usage
Setup Dockerfile and .dockerignore:
```
npx docker-setup
```

Build image:
```
npx docker-build
```

Run container from image:
```
npx docker-run
```

Kill all running containers:
```
npx docker-kill-all
```