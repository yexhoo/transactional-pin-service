# Transactional PIN Service
Service that exposes functionality to save and retrieve password and Personal Identification Number (PIN) for given user.

## Mission: Retrieve transactional PIN

<p align="justify">
Our users are assigned a debit card after they complete their onboarding. During this process, the user chooses a PIN that will be assigned to their card before it’s delivered.

<p align="justify">
However, users tend to forget this PIN, so your mission is to give them the ability to retrieve their transactional PIN at any time from their app. However, we don’t want to store it in plain text. Similarly to how only a user knows their password, no one at Fondeadora (our outside!) should be able to figure out what a user’s PIN is, regardless of their level of access.

Your task is to create a service, that covers these use cases:

* <p align="justify"> During the user’s onboarding, we should assign the PIN to the card and store their password and PIN (both entered by the user in our mobile app).
* <p align="justify"> They should be able to retrieve their unencrypted PIN at any moment, given they enter their password.

* <p align="justify"> The user should be able to change their password without losing access to their PIN.

<p align="justify">
Don’t worry about assigning the PIN to the card, you can assume that you’ll call an external service (that expects the PIN in plain text) for that and stub it out.

<p align="justify">
The main thing to keep in mind is that passwords or PINs should never be stored in plain text and only someone that knows the user’s password (hopefully only the user) should be able to retrieve the PIN.