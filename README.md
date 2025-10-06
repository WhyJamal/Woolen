# WoolenTex

**WoolenTex** is a web-based project designed to manage and control 1C operations through a modern interface. The main goal of the system is to oversee product manufacturing stages and synchronize all data directly with 1C for seamless process automation.

---

## Purpose
WoolenTex aims to simplify and centralize production management through a visual, intuitive web interface. Each product goes through several stages (etaps), and this system allows you to define, monitor, and control each stage while maintaining full synchronization with the 1C system.

## Key Features
- Manage product stages (etaps) and monitor progress.
- Full two-way integration with 1C via HTTP/REST APIs.
- User authentication and role-based access control — each user sees pages relevant to their production stage.
- Clear visualization of production processes using interactive frontend components.

## Technologies
- Frontend: **Vue.js**
- Integration: **1C** (via REST/HTTP data exchange)
- Build & package management: **npm**

> Backend (if used) and server-side integration details can be provided separately in a `backend/README.md` file.

## Installation (Development)
Follow these steps to set up the project locally. Ensure **Node.js** and **npm** are installed.

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install required dependencies:

```bash
npm install
```

Alternatively, if a `packages.txt` file is provided:

```powershell
Get-Content packages.txt | ForEach-Object { npm install $_ }
```

3. Start the development server:

```bash
npm run dev
```

For a production build:

```bash
npm run build
```

## Usage
1. Open the login page and enter your employee code to authenticate.
2. Once logged in, the system automatically redirects the user to the page corresponding to their assigned production stage.
3. Each product or order passes through a defined set of stages, all synchronized with 1C in real time.

## Structure and Modules
- `LoginPage.vue` — handles authentication and user login.
- Stage management — modules and pages responsible for creating, updating, and monitoring production stages.
- 1C integration — ensures all frontend operations are synced with 1C via REST API calls.

> Note: Detailed folder structure and backend logic (if applicable) should be described in the project source (e.g., `frontend/`, `backend/`, `integration/`).

## 1C Integration
Integration between the Vue frontend and 1C is the core of this project. Communication is established through RESTful HTTP requests, ensuring full synchronization between systems.

Key integration concepts:
- Data exchange via HTTP requests (GET/POST).
- Automatic synchronization for key actions (e.g., stage completion, status updates).
- Error handling and logging mechanisms are recommended for reliability.

> Technical details such as endpoints, authentication tokens, and field mappings should be included in the 1C integration documentation.

## Contributing
If you want to contribute:
- Fork the repository → create a new branch → commit your changes → open a Pull Request.
- Keep commit messages concise and meaningful (e.g., `Add: auth error modal on LoginPage` or `Fix: double submit on login form`).

## License
This project is licensed under the [MIT License](./LICENSE).

## Author & Contact
- **Project Name:** WoolenTex  
- **Description:** Web-based 1C integration and production management system.  
- **Contact:** Add your preferred contact (email, Telegram, or Slack) here.


