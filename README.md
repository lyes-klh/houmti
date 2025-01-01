# Houmti

Houmti is a social media network for local communities, designed to connect people within the same city or neighborhood. Users can interact with their neighbors, share posts, organize events, offer services, and more, fostering a sense of local community online.

---

## Final Bachelor's Degree Project

This project was developed as the final project for my bachelor's degree, showcasing my skills in full-stack web development and UI/UX design.

---

## Features

### User Registration and Profiles

- **Signup/Login**: Users can create accounts and log in.
- **Profile Management**: Update personal information, upload profile pictures, and change the city/neighborhood they follow.
- **Password Management**: Users can change their passwords at any time.

### Neighborhood-Specific Feed

- Users can choose their city/neighborhood to see and interact with content relevant to their area.

#### Post Types:

1. **Normal Posts**: Simple posts with a title and text content.
2. **Posts with Images**: Posts that include images alongside the text.
3. **Events**: Posts that include a title, description, date, and place.
4. **Polls**: Posts with a title, description, and poll choices for voting.
5. **Services**: Posts offering services with a title, description, and phone number.

#### Interactions:

- **Likes and Comments**: Engage with all types of posts.
- **Event Participation**: Click "Participate" to join an event.
- **Poll Voting**: Cast a vote on polls.
- **Service Demands**: Click "Demand" to request a service.

### Notifications

- Users receive notifications when others interact with their content (e.g., like, comment, vote, demand service).

### Profile Updates

- Change personal info (e.g., firstname, lastname) or switch city/neighborhood.
- Update passwords and profile pictures.

### Admin Features

- API routes for admin functionalities are implemented but currently lack a user interface.

### Responsive UI/UX

- Responsive design ensures the app works seamlessly on all screen sizes.
- Light/Dark mode is available for better user experience.

---

## Technologies Used

**Languages:**

- JavaScript (Frontend & Backend)

**Frontend:**

- React
- Redux Toolkit
- Chakra UI
- Axios

**Backend:**

- Node.js
- Express.js

**Database:**

- MongoDB (with Mongoose)

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- MongoDB (for local database)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/houmti.git
   ```
2. Navigate to the project directory:
   ```bash
   cd houmti
   ```
3. Install all dependencies:
   ```bash
   npm run install:all
   ```
4. Create `.env` files in both the `client` and `server` directories.

#### Example `.env` for Server:

```
DB_LOCAL=mongodb://localhost:27017
PORT=4000
JWT_KEY=key123
NODE_ENV=development
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
```

#### Example `.env` for Client:

```
REACT_APP_API=http://localhost:4000/api/v1
REACT_APP_BACKEND=http://localhost:4000
```

5. Start the application:
   ```bash
   npm start
   ```

### Additional Scripts

- Run the client only:
  ```bash
  npm run start:client
  ```
- Run the server only:
  ```bash
  npm run start:server
  ```
- Install dependencies manually:
  Navigate to each folder (`client` and `server`) and run `npm install`.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact

- **Author**: Lyes Kellouche
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/lyes-kellouche/)
- **Github**: [Github](https://github.com/lyes-klh)

---

Feel free to reach out with feedback or suggestions, and thank you for checking out Houmti!
