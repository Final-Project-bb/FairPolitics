#!/bin/bash

echo "starting initialize DB..."

DB_PATH="./DB/fairpoliticsdb"
DB_NAME="fairpoliticsdb"


	sudo service mysql start
	echo "Starting mysql service..."


	echo "Enter mysql username (usually 'root')"
	read username

	echo "Enter mysql password"
	read password

	echo "Importing tables to local Database..."
	sudo mysql -u $username -p$password < $DB_PATH.sql
		
 	echo "Opening fairpoliticsdb schema..."
	sudo mysql -u $username -p$password $DB_NAME
	
	echo "DBinit finished succesfully!"
