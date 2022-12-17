

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Incubation Management System</h3>

  <p align="center">
    <br />
    <a href="https://github.com/Jauharmuhammed/incubation-frontend-react"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://incubation-frontend-react.netlify.app/">View Site</a>
    ·
    <a href="https://github.com/Jauharmuhammed/incubation-frontend-react/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jauharmuhammed/incubation-frontend-react/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#frontend-setting-up">Frontend setting up</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project
This is the backend api using Django Rest Framework for an incubation management system where a user apply for a slot and admin can accept or deny application and allocate a slot. You can find the backend API of the project [here](https://github.com/Jauharmuhammed/incubation-backend-django)

- User Authentication using JWT (JSON Web Token).
- One user can apply only once then he pormpted to an application status page where user can track and see the application status.
- Admin can see the latest application in a seperate section.
- Admin has the option to accept or deny the application.
- Accecpted applications can be alloacated to a slot once and cannot be overriden.
- Duplication slot allocations are not possible.
- Admin can also track all the application and view the details any time.
<br>

<table width="100%"> 
<tr>

<td width="33%">
<p align="center">
Login Page
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/1.png">  
</td>
  <td width="33%">      
<p align="center">
Signup Page
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/2.png">
</td> 
  <td width="33%">      
<p align="center">
Home Page before application
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/3.png">
</td> 
</table>
<br/>

<table width="100%"> 
<tr>

<td width="33%">
<p align="center">
Application page
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/4.png">  
</td>
  <td width="33%">      
<p align="center">
Home Page after application
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/5.png">
</td> 
  <td width="33%">      
<p align="center">
Tracking / Status Page
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/6.png">
</td> 
</table>
<br/>

<table width="100%"> 
<tr>

<td width="33%">
<p align="center">
Admin Application Management
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/7.png">  
</td>
  <td width="33%">      
<p align="center">
Admin Slot Management
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/8.png">
</td> 
  <td width="33%">      
<p align="center">
Admin Application Tracking
</p>
<img src="https://github.com/Jauharmuhammed/incubation-frontend-react/blob/main/assets/9.png">
</td> 
</table>
<br/>

### Built With

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

<br>


## Setting up Backend API 

This is a sample for Django Project.

Clone the project. This will download the GitHub respository files onto your local machine.

```Shell
git clone https://github.com/Jauharmuhammed/incubation-backend-django
```

To get this project up and running you should start by having Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately. You can install virtualenv with

```
pip install virtualenv
```

Clone or download this repository and open it in your editor of choice. In a terminal (mac/linux) or windows terminal, run the following command in the base directory of this project

```
virtualenv venv
```

That will create a new folder `env` in your project directory. Next activate it with this command on mac/linux:

```
source venv/bin/active
```

Then install the project dependencies with

```
pip install -r requirements.txt
```

Apply migrations and create your database
```
python manage.py migrate
```
Create a user with manage.py
```
python manage.py createsuperuser
```

Now you can run the project with this command

```
python manage.py runserver
```

<br>
<br>
<br>


## Frontend setting up

### Frontend Instructions (Create React App) 

---> Navigate to the `frontend/` directory

```Shell
cd frontend
```

---> Install the project dependencies

```Shell
npm install
```

---> Start the development server on localhost:3000

```Shell
npm run start
```

---> Open your browser and navigate to either `http://localhost:3000 or http://127.0.0.1:3000`
<br>
<br>
<br>



## Contact

<div align='left'>

<a href="https://linkedin.com/in/jauharmuhammed" target="_blank">
<img src="https://img.shields.io/badge/linkedin-%2300acee.svg?color=405DE6&style=for-the-badge&logo=linkedin&logoColor=white" alt=linkedin style="margin-bottom: 5px;"/>
</a>
	
<a href="https://twitter.com/jauharmuhammed_" target="_blank">
<img src="https://img.shields.io/badge/twitter-%2300acee.svg?color=1DA1F2&style=for-the-badge&logo=twitter&logoColor=white" alt=twitter style="margin-bottom: 5px;"/>
</a>
	
<a href="mailto:jauharmuhammedk@gmail.com" target="_blank">
<img src="https://img.shields.io/badge/gmail-%23EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white" t=mail style="margin-bottom: 5px;" />
</a>
	
		
<a href="https://codepen.io/jauharmuhammed" target="_blank">
<img src="https://img.shields.io/badge/codepen-%23000000.svg?style=for-the-badge&logo=codepen&logoColor=white" t=mail style="margin-bottom: 5px;" />
</a>

</div>


