# DayByDay 
This repository contains the code for the DayByDay app produced for the Pediatriac ICU at
Lurie Children's Hospital as project for EECS394. This app allows nurses to send routine updates to parents about their children.

<img width= 70% src="Updating.gif">

## Client Notes
### HIPAA Compliance
Please note that this application is not HIPAA compliant and is not ready for use
in a real-world medical setting.

### App Usage
To use the app on a mobile device, first download Ionic View from the [Apple App Store](https://play.google.com/store/apps/details?id=com.ionic.viewapp&hl=en) or [Android Play Store](https://play.google.com/store/apps/details?id=com.ionic.viewapp&hl=en).
Click on Preview Shared app and use the App ID: d89435f7.
To sign in as a test nurse, use the email ruthtaylor@picu.com.
To sign in as a test parent, use the email debdove@gmail.com. This will allow you to view updates for the child Kyle Dove.
The password for both accounts is abc123.

## Developer Setup
### Install Node and Ionic
Prior to setting up this application, you will need to make sure that you have
Node and Ionic installed. For this application, be sure to use a version of 
Node greater than 6.0 and Ionic 2. You can install by following the instructions
below.

* [Node Installation](https://nodejs.org/en/download/)
* [Ionic 2 Installation](https://ionicframework.com/getting-started/)

### Configuring Application
To set up the application for development, you will need to complete the
following steps in a terminal shell of your choosing.

1. `git clone https://github.com/eecs394-s17/DayByDay.git`.
2. `cd DayByDay`
3. `npm install`
4. `ionic serve`

### Configuring Firebase
To point the backend for this application to your own Firebase application,
create a new Firebase application and update the authentication information
in `src/app/app.module.ts`.

### Known Bugs
* Cancel on dropdowns does not unselect choice
* Does not prevent duplicate sending of updates on double click in updates form
* Access keys for Firebase publicly committed

## Developers
* Wajihuddin Omar Mohammed
* Will Finnegan
* Safia Abdalla
* Grace Alexander
* Haridu Senadeera
* Kyle Lueptow
