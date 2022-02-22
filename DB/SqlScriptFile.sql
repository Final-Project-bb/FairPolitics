-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fairpoliticsdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fairpoliticsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fairpoliticsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `fairpoliticsdb` ;

-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`algorithm_user_chosen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`algorithm_user_chosen` (
  `id_user` INT NOT NULL,
  `id_algorithm` INT NOT NULL,
  PRIMARY KEY (`id_user`, `id_algorithm`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`comment_like_approval`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`comment_like_approval` (
  `id_comment` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_comment`, `id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`discussion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`discussion` (
  `id_post` INT NOT NULL,
  `id_user` INT NOT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `tag` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `picture` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_post`, `id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`discussion_like_approval`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`discussion_like_approval` (
  `id_post` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_post`, `id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '			';


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`discussion_response`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`discussion_response` (
  `id_post` INT NOT NULL,
  `id_user` INT NOT NULL,
  `id_comment` INT NOT NULL,
  `comment` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_post`, `id_user`, `id_comment`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`follower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`follower` (
  `id_following` INT NOT NULL,
  `id_follower` INT NOT NULL,
  PRIMARY KEY (`id_following`, `id_follower`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`login_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`login_details` (
  `follower_id` INT NOT NULL,
  `following_id` INT NOT NULL,
  PRIMARY KEY (`follower_id`, `following_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`poll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`poll` (
  `id_poll` INT NOT NULL,
  `id_user` INT NOT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `picture` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_poll`, `id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`poll_answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`poll_answer` (
  `id_answer` INT NOT NULL,
  `id_poll` INT NOT NULL,
  `id_user` INT NOT NULL,
  `answer` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_answer`, `id_poll`, `id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`poll_answer_approval`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`poll_answer_approval` (
  `id_answer` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_answer`, `id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`shriber`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`shriber` (
  `bdika` INT NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fairpoliticsdb`.`user_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fairpoliticsdb`.`user_details` (
  `id_user` INT NOT NULL,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `birthdate` VARCHAR(45) NULL DEFAULT NULL,
  `job_title` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `profile_picture` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
