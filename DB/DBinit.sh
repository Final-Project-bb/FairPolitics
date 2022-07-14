#!/bin/bash

echo "starting initialize DB..."

DB_PATH="./fairpoliticsdb"
DB_NAME="fairpoliticsdb"


	sudo service mysql start
	echo "Starting mysql service..."


	echo "Enter mysql username (usually 'root')"
	read username

	echo "Enter mysql password."

	read password

	echo "Importing tables to local Database..."
	sudo mysql -u $username -p$password < $DB_PATH.sql

	echo "DBinit finished succesfully!"

 	echo "Opening fairpoliticsdb schema..."
	sudo mysql -u $username -p$password $DB_NAME

	ALTER USER `$username`@'localhost' IDENTIFIED WITH mysql_native_password BY `$password`

	
