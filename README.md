# Bopify - A Spotify clone

[Live Link](https://bopify-2022.onrender.com/)
Bopify is a Spotify clone created with love and adoration for Spotify. A place where music nerds can share playlists and listen to music in the comfort of their own home.

## Tech Stacks Used

### Backend:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Amazon S3](https://img.shields.io/static/v1?style=for-the-badge&message=Amazon+S3&color=569A31&logo=Amazon+S3&logoColor=FFFFFF&label=)

**| [WTForms](https://wtforms.readthedocs.io/en/3.0.x/) | [SQLAlchemy](https://www.sqlalchemy.org/) | [Alembic](https://alembic.sqlalchemy.org/en/latest/) |**

### Frontend:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### Python Backend:
This was my second project using a Python backend integrated with Flask and SQLAlchemy. As a programmer becoming a full stack developer, I found flask to be a huge advantge for a back end server. Querying for data was very simple compared to using Express and Sequelize especially when using the dictionary methods I initialized in the models created so extracting data when needed became easy.

### Amazon S3 Integration:
This was also my second time integrating an Amazon S3 bucket into a project I was a part of. In my group project, [Behance](https://github.com/alkezz/Behance-GroupProject-2022), my group and I spent a good amount of time making sure we can implement an S3 route in our backend to allow users to upload images for projects they create. I took what we learned from that and integrated S3 to allow users to upload images for their playlists they create

### React/Redux:
Using React to build out my frontend for each of my projects thus far has felt amazing. It is extremely simple to grasp but hard to master, but when you get the outcomes you are expecting it feels great. React itself was created by Meta front end engineers to create a simple and clean way to build out a front end for Facebook, it has a history of great engineers working on making it more user friendly and easier to use. React makes it easy to display the data you want users to see specifically while also hiding data that might not be necessary for that specific user.

Redux, while hard to grasp at first and even harder to master, has been a huge boost in updating my state whenever it needs to be updated like when a user follows another user or when a playlist is created. Redux allows users to get updated data in real time with no wait or refreshes needed to read that data. Redux uses "stores" for each state you want to keep track of, and within those stores, action creators are defined to send data from Thunks to a reducer that will then create the state you're looking for. Thunks are defined in the store file as well, and thunks are used to fetch data from your back end server to send to those action creators referenced before. In simple terms, it's like a factory where each component in a store relies on the other to keep everything moving. Huge fan of Redux!

## Functionality
When you first enter the website as a logged out user, there isn't much you can do. You can see albums, playlists, and artists but music playback, creating playlists, and following users/playlists are locked to registered users. Any attempt to use those features will send you to the log in page

As a logged in user, you get to use all the features that are currently implemented:
* Create a playlist (max 5 playlists per user)
  * When creating a playlist, a playlist name and picture are provided on first creation, to edit these details, just click the title of the playlist or the playlist image within the playlist page and you're ready to go!
* Edit a playlist + uploading a picture of your choosing
* Delete a playlist
* Music playback
  * You can listen to playlists, albums, and indiviual songs with a queue built in!
* Following Users
* Following Playlists
* You have the ability to like and unlike songs using the "heart" button
  * Your liked songs will appear in the "Liked Songs" tab
  * You have the ability to play your liked songs list as well as indiviual songs in that component

## Wiki Links
[Direct Link to Wiki](https://github.com/alkezz/aA2022-Spotify-Clone/wiki)
<br/>
[Database Schema](https://github.com/alkezz/aA2022-Spotify-Clone/wiki/Database-Schema)
<br/>
[User Stories](https://github.com/alkezz/aA2022-Spotify-Clone/wiki/User-Stories)
<br/>
[Feature List](https://github.com/alkezz/aA2022-Spotify-Clone/wiki/Feature-List)
<br/>
[Wireframes](https://github.com/alkezz/aA2022-Spotify-Clone/wiki/Wire-Frames)

## Features coming soon!
* Being able to like songs and having a page with all your liked songs! - Implemented!
* A search feature to allow you to find what you're looking for easier!
* Radio feature that will lump music together based on genre or mood!
* A Discover feature that will allow users to find music they might not have thought of listening to!

## Screenshots of my website
### Landing Page (logged out)
![image](https://user-images.githubusercontent.com/105993056/205544650-e8ff8ca6-a56d-4fe8-8001-4cbd69738bc4.png)

### Landing Page (logged in)
![image](https://user-images.githubusercontent.com/105993056/205544725-63ea58e0-6cf4-4720-955c-667eda189112.png)

### Login Page
![image](https://user-images.githubusercontent.com/105993056/205544787-7839e34c-f41a-430d-a469-e09f62611b01.png)
Three users are provided to you to test out functionality of the website, just give them a click and you're good to go!

### Signup Page
![image](https://user-images.githubusercontent.com/105993056/205544931-4ab5e662-8b75-41db-9b91-f9898c4641af.png)
Two users are provided for you as well here, just like before give them a click and you'll be logged in as one of those users!

### Artist Page
![image](https://user-images.githubusercontent.com/105993056/205545085-177a6a15-a0de-4d8c-8b88-e7a26d852b22.png)

### Album Page
![image](https://user-images.githubusercontent.com/105993056/205545149-fe625467-f506-43eb-843d-728dbd23cc11.png)

### Playlist Page
![image](https://user-images.githubusercontent.com/105993056/205545200-068d9a44-5b08-4653-9a75-81984c93508c.png)

### Editing A Playlist
![image](https://user-images.githubusercontent.com/105993056/205545238-633fded3-b23a-430c-80ed-b4077479dbdd.png)

### Bottom NavBar Showing Music Playing
![image](https://user-images.githubusercontent.com/105993056/205545340-11003316-e21f-49cc-bfc9-c3d283a9bbcd.png)

### Profile Page
![image](https://user-images.githubusercontent.com/105993056/205545459-eef5eee0-8a07-4787-9944-c2a63ded4d75.png)
As you can see, I followed a playlist named "No Time for chilling", it will show up on the side nav with your playlists as well as being shown on your profile page
![image](https://user-images.githubusercontent.com/105993056/205545567-a802cf24-4869-4e1e-9617-f08cc248ae79.png)
You can also see the users you follow and the users who are you following you on your profile page!
![image](https://user-images.githubusercontent.com/105993056/205545643-cabf4912-9bab-4028-bada-aca0b35fe156.png)
This is a profile page of a different user, you can see the follow button and when hit you will follow that user and the button will change to "UNFOLLOW" to allow you to unfollow as well thanks to Redux!

## Contact Me
If you would like to contact me:

[Github](https://github.com/alkezz)
<br/>
[LinkedIn](https://www.linkedin.com/in/ali-ezzeddine-17b2b6248/)
<br/>
Email: a.k.ezzeddine@gmail.com

