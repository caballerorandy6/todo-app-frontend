# Todo List App - Frontend 📝

This repository contains the frontend for the Todo List application. It is a modern, responsive web app built with **Next.js (App Router)**, **TypeScript**, and styled with **Tailwind CSS**. It communicates with a separate backend API to manage tasks.

---

## Key Features ✨

- **View All Tasks:** See a complete list of your tasks on the home page.
- **Add & Edit Tasks:** Create new tasks or modify existing ones through a user-friendly form.
- **Toggle Completion:** Mark tasks as complete or incomplete directly from the main view.
- **Delete Tasks:** Remove tasks you no longer need.
- **Responsive Design:** A clean and functional UI that works seamlessly on both desktop and mobile devices.

---

## Prerequisites 🛠️

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher is recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## Getting Started 🚀

Follow these steps to set up and run the project in your local environment.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/caballerorandy6/todo-app-frontend.git]
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd todo-app-frontend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a new file named `.env.local` in the project root. See the **Environment Variables** section below for details.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## Environment Variables ⚙️

This Next.js application requires an environment variable to know the location of the backend API.

Create a file named `.env.local` in the root of the project and add the following variable:

```env
# The base URL of the backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

This variable tells the application where to send API requests (e.g., to fetch, create, or delete tasks).

---

## Connecting to the Backend 🔗

This frontend application is designed to work with its corresponding backend API. **Before running the frontend, please ensure the backend server is installed, configured, and already running.**

You can find the setup instructions in the backend repository's README file.
