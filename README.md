<h1> FairPolitics project </h1><br>
Many times we see an imbalance between the issues that the elected official
focuses on and the issues that the electorate wanted to focus on. This case carries
with it a problem of not fulfilling the will of the voters, so we decided to fix
this by developing a system called <strong>Fair Politics</strong> that will help the elected official
who wants to get feedback from his voters to know which issues to focus, to divide
his time more correctly. Also, our system builds in a way such that we achieve the
highest satisfaction for most of the voters. We intend to build the feedback and
implement Dynamic Proportional Rankings algorithm feedback, such that the results
they get reflect the will of the voters. This system will be convenient and friendly
to the users, including support for a variety of languages common to the population.
Moreover, we have a unique identification to avoid bias in the results.

## Our video
you can [click here](https://www.youtube.com/watch?v=HY6YOd0Ix3g) to watch a short video that describes our project.

## Initialize project: 
  * Basically can be executed by Linux Ubuntu/Windows.
  - ### requirements:
    - VSCode
    - NodeJS (npm) v16.5.0 (read [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) for more information)
    - Ubuntu 20.04.4 LTS (Linux Ubuntu OS/wsl in windows) 
    - MySQL Server V8.0 
  - ### instructions: 
    - mysql-server V8.0 - can be installed from bash terminal by commands: 
     <br> 1. ```sudo apt update``` 
     <br> 2. ```sudo apt install mysql-server``` 
     <br> 3. ```sudo /etc/init.d/mysql start ``` 
     <br> 4. ```sudo mysql_secure_installation``` - here you need to create a password for your username (usually root)


      ## Initialize .env file:
      <strong>make your .env file inside the Server folder and in this format:</strong>
      <br><br>this is tutorial how to create Google OAuth Credentials, [click here.](https://www.youtube.com/watch?v=xH6hAW3EqLk)
      <br>set the URIs as follows:<br><br>
      <a href="https://ibb.co/pvQZ1Q6"><img src="https://i.ibb.co/3yvWTv5/Whats-App-Image-2022-06-10-at-15-47-56.jpg" alt="Whats-App-Image-2022-06-10-at-15-47-56" border="0"></a>
      <a href="https://ibb.co/b6J3Kfs"><img src="https://i.ibb.co/51F9R7r/Whats-App-Image-2022-06-10-at-15-48-20.jpg" alt="Whats-App-Image-2022-06-10-at-15-48-20" border="0"></a>
      <br><br>
      ### Now you can create the .env file:
      ``` 
      // for DB connection
      DATABASE_HOST = your DB host (usualy localhost)
      DATABASE_USER = your DB user name (usualy root)
      DATABASE_PASSWORD = your DB password
      DATABASE = your DB schema name

      // Google token
      GOOGLE_CLIENT_ID = "your id"
      GOOGLE_CLIENT_SECRET = "your id"
      ```
      
      - To run this project basically you'll required to open 3 different bash terminals and execute 3 commands
        <br> 1. Run DBinit.sh script (located in DB Folder), can be run from bash terminal by command:
        <br> Note that these commands match to Linux but not wsl (for wsl use "\\" instead of "/").
        ```
        ./DB/DBinit.sh
        ```
        Supposed to look like this:
        <img src="https://raw.githubusercontent.com/Final-Project-bb/FairPolitics/master/Client/fair_politics/src/images/DB.jpeg">
        <br> 2. Server side: run with npm from Server folder by commands: 
        ```
        1. cd ./Server/
        2. npm install
        3. npm start
        ```
        Supposed to look like this:
        <img src="https://raw.githubusercontent.com/Final-Project-bb/FairPolitics/master/Client/fair_politics/src/images/server.jpeg">
        <br> 3. Client side: run with npm from Client folder by commands: 
        ```
        1. cd ./Client/fair_politics/
        2. npm install
        3. npm start
        ```
        Supposed to look like this:
        <img src='https://raw.githubusercontent.com/Final-Project-bb/FairPolitics/master/Client/fair_politics/src/images/Client.jpeg'>


## Languages:
- <strong> Backend: NodeJS(express).<strong/><br>
- <strong> Frontend: html,css,reactJS,bootstrap.<strong/><br>
- <strong> DataBase: MySQL.<strong/><br>


## Code Contributors

This project exists thanks to all the people who contribute.<br>
<a href="https://github.com/Final-Project-bb/FairPolitics/graphs/contributors">
  <img src="https://contrib.rocks/image?max=3&repo=Final-Project-bb/FairPolitics" />
</a>
* [Tal Schreiber](https://github.com/TalSchreiber95)
* [Shai Bonfil](https://github.com/shaiBonfil)
* [Omer Shalom](https://github.com/Omer2041)

  ## ???? Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check our [issues page](https://github.com/Final-Project-bb/FairPolitics/issues).
