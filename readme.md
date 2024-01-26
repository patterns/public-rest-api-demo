# Da Vinci Renaissance Website Backend

This repository contains the backend code for the Da Vinci Renaissance website.

## Getting started

**One-time steps to set up environment:**

1. Download and install [Node JS](https://nodejs.org/). After installation, you can confirm it's installed correctly by running the commands `node --version` and `npm --version` in a terminal.

1. Clone the repository with the following command:

    ```
    git clone https://github.com/Da-Vinci-Renaissance/Website_Backend.git
    ```

1. Install dependencies by executing the following command in the project directory:

    ```
    npm install
    ```
**DOCKER setup**

1. Make sure Docker is installed using :  docker --version

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If not:  https://docs.docker.com/engine/install/

2. Navigate to the directory containing the mongodb.yml file: -> '**docker**' folder

3.  Run the Docker Compose file: docker-compose -f mongodb.yml up -d

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If  '**docker-compose**' is not found:
```sudo apt install docker-compose```
 (assuming Linux)

 4. Verify the MongoDB container is running:  ```docker ps```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It should show a **CONTAINER ID** : example "*c2ed58d9ff3a*"

#### Access via MongoDB Shell: 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```docker exec -it c2ed58d9ff3a mongo```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At the '>' run you command: example: '**show dbs**'

### or

#### Connect with GUI tools like ***MongoDB Compass***, ***Robo 3T***, or ***Studio 3T***:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**server address**: _localhost or the server's IP address_

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**port**: _27017_ (unless modified in the mongodb.yml file)

## Starting the app every time:

1. If you're on Windows, open Docker Desktop.

1. CD to the project directory.

1. Run the following to start the database:

    ```
    npm run docker:db:up
    ```

1. Run the following to start the development server:
    ```
    npm run dev
    ```

1. Open a browser and go to `localhost:8000` to see the app!


## Stopping the app:

1. Type `Ctrl+C` in the terminal with the server to stop the server.

1. In Docker Desktop, you can press the Stop button to stop a container and persist its data. Pressing the Delete button will stop a container and delete its data. You can also delete Dabble's db container with the following command:

    ```
    npm run docker:db:down
    ```


**Helpful tools:**

1. You can use [Postman](https://www.postman.com/downloads/) to send requests to the server.

1. [MongoDB Compass](https://www.mongodb.com/products/tools/compass) is great for viewing MongoDB data.