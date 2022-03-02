# FairPolitics project


## Initialize project: 
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
     
      <strong> password restrictions: </strong>
			     <br> password Is at least eight characters long.
			    <br> Combines letters, numbers, and symbol characters within the password.
			    <br> Is not found in a dictionary.
			    <br> Is not the name of a command.
			    <br> Is not the name of a person.
			    <br> Is not the name of a user.
			    <br> Is not the name of a computer.
			    <br> Is changed regularly.
			    <br> Is different from previous passwords.." 
     
    - Run DBinit.sh script (located in DB Folder, can be run from bash terminal by command: ```./DB/DBinit.sh```.
    - Server side: run with npm from Server folder by commands: ```cd ./Server ``` and then  ```npm start```
    - Client side: run with npm from Client folder by commands: ```cd ./Client ``` and then  ```npm start```

  

# Languages:
## Backend: Python,nodeJs(express).
## Frontend: html,css,reactJs,bootstrap.
## DataBase: MySQL.


  ## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check our [issues page](https://github.com/Final-Project-bb/FairPolitics/issues).
