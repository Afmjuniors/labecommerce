# labecommerce-backend



<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Afmjuniors/labecommerce-backend">
    <img src="readme-image/logo-doc.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Labecommerce</h3>

  <p align="center">
    Database manipulation of a simple e-commerce using SQLite3. 
    <br />
    <a href="https://github.com/Afmjuniors/labecommerce-backend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Afmjuniors/labecommerce-backend">View Demo</a>
    ·
    <a href="https://github.com/Afmjuniors/labecommerce-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Afmjuniors/labecommerce-backend/issues">Request Feature</a>
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
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



An API using SQLite3 as database. I was able to implement CRUD methods on 3 tables on the database, using the forth as a relations table. Users, and Products do not have foreign keys, as such are independent.

The difficulty in this project was how to decide how to receive and how to send the required information.
Fortunately I arrived with the idea to create a type for each input and the output, creating a fixed pattern.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![SQLite][SQLite]][SQLite-url]
* [![Express][Express]][Express-url]
* [![Node.js][Node.js]][Node.js-url]
* [![Postman][Postman]][Postman-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Read API at https://documenter.getpostman.com/view/24460683/2s8ZDSc53k

2. Clone the repo
   ```sh
   git clone https://github.com/Afmjuniors/labecommerce-backend.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run ther server
   ```js
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Possible to integrate a simple e-commerce project.
A API using CRUD methods.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Feats

- User endpoints
    - Get users
    - Create new User
    - Edit user
    - Delet USer
- Products endpoints
    - Get products
    - Get products by ID
    - Create new Product
    - Edit product
    - Delete Product
- Purchase endpoints
    - Get all purchase of a user
    - Get purchase
    - Create new purchase
    - Update purchase
    - Delete purchase 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation

https://documenter.getpostman.com/view/24460683/2s8ZDSc53k

### Diagram
![Product Name Screen Shot][product-screenshot]

Diagram URL <br/>
https://dbdiagram.io/d/63d3f81d296d97641d7c99fa



<!-- CONTACT -->
## Contact

Alexandre Machado  - afmjuniors@gmail.com



<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Afmjuniors/labecommerce-backend.svg?style=for-the-badge
[contributors-url]: https://github.com/Afmjuniors/labecommerce-backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Afmjuniors/labecommerce-backend.svg?style=for-the-badge
[forks-url]: https://github.com/Afmjuniors/labecommerce-backend/network/members
[stars-shield]: https://img.shields.io/github/stars/Afmjuniors/labecommerce-backend.svg?style=for-the-badge
[stars-url]: https://github.com/Afmjuniors/labecommerce-backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Afmjuniors/labecommerce-backend.svg?style=for-the-badge
[issues-url]: https://github.com/Afmjuniors/labecommerce-backend/issues
[license-shield]: https://img.shields.io/github/license/Afmjuniors/labecommerce-backend.svg?style=for-the-badge
[license-url]: https://github.com/Afmjuniors/labecommerce-backend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/afmjuniors
[product-screenshot]: readme-image/Labecommerce.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Styled-components]:https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled-url]: https://www.styled-components.com/
[Chakra-UI]: https://img.shields.io/static/v1?style=for-the-badge&message=Chakra+UI&color=319795&logo=Chakra+UI&logoColor=FFFFFF&label=
[SQLite]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlitetutorial.net/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/pt-br/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white
[Postman-url]: https://www.postman.com/


