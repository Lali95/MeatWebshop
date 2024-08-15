MeatWebshop
Table of Contents

    About The Project
    Technologies
    Features
    Installation

About The Project

This E-Commerce Web Application is a dynamic and modern online shopping platform developed as a solo project. It emphasizes a seamless user interface and is designed with a focus on delivering a polished, user-centric experience. The application leverages advanced frontend technologies for interactive and responsive design while ensuring efficient data management and user authentication.
Technologies

    React: Utilized for building the interactive and component-based user interface.
    .NET: Provides a robust backend framework for managing business logic and server-side operations.
    Entity Framework: Used for data access, managing the database operations in an object-oriented manner.
    Identity Framework: Implements user authentication and authorization, ensuring secure access to the application.
    Docker: Containerization of the application for consistent development and deployment across different environments.
    Vite: Enhances the development experience with fast build times and hot module replacement.

Features

    Responsive Design: Built with Bootstrap, the application is fully responsive, ensuring a smooth experience across devices.
    Multilingual Support: Integrated with react-i18next, the application supports multiple languages for a wider audience reach.
    Interactive UI: Leveraging React, the interface is dynamic and provides a seamless user experience.
    RESTful API Integration: The application communicates with the backend services using RESTful APIs for efficient data handling.
    Secure Authentication: User registration and login are managed by the Identity Framework, ensuring secure access.
    Containerized Deployment: Docker is used to containerize the application, simplifying deployment and scalability.

Installation

To run this project locally, follow these steps:

    Clone the Repository:

    sh

git clone https://github.com/Lali95/MeatWebshop

Navigate to the Project Directory:

sh

cd your-repository

Install Dependencies:

sh

npm install

Set Up Docker:
Ensure Docker is installed and running on your machine. Then, build and start the Docker containers:

sh

docker-compose up --build

Run the Application:
Start the development server with Vite:

sh

npm run dev

