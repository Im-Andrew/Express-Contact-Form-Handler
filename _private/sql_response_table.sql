/**
* This was the general setup I used for my database.
**/

CREATE TABLE comments
(
  id          INT unsigned NOT NULL AUTO_INCREMENT,     # Unique ID for the record
  name        VARCHAR(250) NOT NULL,                    # Name of Sender
  email       VARCHAR(320) NOT NULL,                    # Sender email
  added       TIMESTAMP NOT NULL DEFAULT CURRENT_TIME,  # Date posted
  message     VARCHAR(3000) NOT NULL,                   # company response for me
  viewed      BOOLEAN NOT NULL DEFAULT 0,               # Flag for if I've viewed an email . . .
  replied     BOOLEAN NOT NULL DEFAULT 0,               # Flag for if I've made a reply . . .
  is_spam     BOOLEAN NOT NULL DEFAULT 0,               # Flag for hiding spam messages
  PRIMARY KEY     (id)                                  # Make the id the primary key
);