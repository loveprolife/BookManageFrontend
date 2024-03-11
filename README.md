# About env details
We should install node.js v15.14.0, npm 7.7.6, docker 25.0.4, git on both Local and Cloud Platform.

And config node's env, config npm' env on both Local and Cloud Platform.

# How to run/deploy this project
## 1.Run this project on local

Config local machine's ssh public key to GitHub repository's Deploy keys.

```Bash
rm -rf /dir/to/some_path
mkdir -p /dir/to/some_path
cd /dir/to/some_path
git clone git@github.com:loveprolife/BookManageFrontend.git
cd /dir/to/some_path/BookManageFrontend
npm i
npm start
```

We can package it:

```Bash
npm run build
```

## 2.Deploy this project to Prod(use the CI/CD tools GitHub Actions)

### 2.1.Config ssh stuff.

#### 2.1.1.Config the ssh public key on deployed machine to GitHub repository's Deploy keys.

#### 2.1.2.Copy the ssh private key on deployed machine to GitHub repository's Secret.

#### 2.1.3.Append the ssh public key on deployed machine to its ~/.ssh/authorized_keys

### 2.2.1.When some change committed to Main branch, the deploy GitHub Actions will automatically run.

### 2.3.2.Or manually run the GitHub Actions /dir/to/some_path/BookManageFrontend/.github/workflows/deploy_to_prod.yml to deploy it.
