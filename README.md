# FairPolitics project

initialize project: 
  * Basically can be executed by Linux Ubuntu/Windows.
  - ### requirements:
    - VSCode
    - NodeJS (npm)
    - Ubuntu 20.04.4 LTS (Linux Ubuntu OS/wsl in windows) 
    - MySQL Server V8.0 
  - ### instructions: 
    - mysql-server V8.0 - can be installed from bash terminal by commands: 
     <br> 1. ```sudo apt update``` 
     <br> 2. ```sudo apt install mysql-server``` 
     <br> 3. ```sudo /etc/init.d/mysql start ``` 
     <br> 4. ```sudo mysql_secure_installation``` - here you need to create a password for your username (usually root)
    - Run DBinit.sh script (located in DB Folder, can be run from bash terminal by command: ```./DB/DBinit.sh```.
    - Server side: run with npm from Server folder by commands: ```cd ./Server ``` and then  ```npm start```
    - Client side: run with npm from Client folder by commands: ```cd ./Client ``` and then  ```npm start```

  
# Languages:
## Backend: Python,nodeJs(express).
## Frontend: html,css,reactJs,bootstrap.
## DataBase: MySql.
