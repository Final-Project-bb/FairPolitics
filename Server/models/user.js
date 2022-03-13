// const Picture = require('./models/picture');

class User {
  constructor(
    id,
    phone_number,
    password,
    first_name,
    last_name,
    city,
    date_of_birth,
    job_title,
    description,
    gender,
    rating
  ) {
    this.id = id;
    this.phone_number = phone_number;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.city = city;
    this.date_of_birth = date_of_birth;
    this.job_title = job_title;
    this.description = description;
    // this.profile_picture = Picture;
    this.gender = gender;
    this.rating = rating;
  }
}

module.exports = User;