# README

Ruby version
---------------------
ruby 3.3.3 

Database creation
---------------------
  run the command
  ```
  rails db:create
  ```
  to create the database

  then
  ```
  rails db:migrate
  ```
  and finally the rake task 
  ```
  rake import:import_csv
  ```
  in order to import from the csv files


Reflection
---------------------
My approach to designing this application was familiarizing myself with Ruby on Rails, as this was my first ever application written in this language. I aimed for simplicity as I wanted to make sure I met the requirements expected of me. Problems I faced were figuring out the time calculations and how to make it work with the cells on the grid. The biggest thing I'd improve is the css as it's never been my strong suit and I think it could look way prettier. Another improvement accounting for scalibility as the code focuses on the parameters of the assesment and does not account for multiple days and potential schedule conflicts that may arise from human error.