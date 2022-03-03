<h1> FairPolitics project </h1><br>

here we need to describe a little about who we are and what is our project working and so on

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
      <br> - password Is at least eight characters long.
      <br> - Combines letters, numbers, and symbol characters within the password.
      <br> - Is not found in a dictionary.
      <br> - Is not the name of a command.
      <br> - Is not the name of a person.
      <br> - Is not the name of a user.
      <br> - Is not the name of a computer.
      <br> - Is changed regularly.
      <br> - Is different from previous passwords.

    - To run this project basically you'll required to open 3 different bash terminals and execute 3 commands
        <br> 1. Run DBinit.sh script (located in DB Folder, can be run from bash terminal by command: 
        ```
        ./DB/DBinit.sh
        ```
        <br> 2. Server side: run with npm from Server folder by commands: 
        ```
        cd .\Server\ | npm start
        ```
        <br> 3. Client side: run with npm from Client folder by commands: 
        ```
        cd .\Client\fair_politics\ |  npm i install | npm start
        ```


  

## Languages:
- <strong> Backend: Python,nodeJs(express).<strong/><br>
- <strong> Frontend: html,css,reactJs,bootstrap.<strong/><br>
- <strong> DataBase: MySQL.<strong/><br>


## Code Contributors

This project exists thanks to all the people who contribute.<br>
<a href="https://github.com/Final-Project-bb/FairPolitics/graphs/contributors">
  <img src="https://contrib.rocks/image?max=3&repo=Final-Project-bb/FairPolitics" />
</a>
* [Tal Schreiber](https://github.com/TalSchreiber95)
* [Shai Bonfil](https://github.com/shaiBonfil)
* [Omer Shalom](https://github.com/Omer2041)

  ## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check our [issues page](https://github.com/Final-Project-bb/FairPolitics/issues).
