# React Demo App - Interview Project

A responsive React application built with Next.js that demonstrates authentication, API data fetching, and state management.

## Features

### 1. Login Page

- Phone number input with validation (must start with country code like +254)
- Mock authentication (use `+254712345678` to login)
- Error messages for invalid input
- Redirects to Main Page on success

### 2. Main Page (Protected Route)

- Fetches posts from [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- Displays posts in a responsive grid layout
- Real-time search bar to filter posts by title
- Loading spinner while fetching data
- Error handling with retry option
- Requires authentication - redirects to login if not authenticated
- Click any post to view details

### 3. Detail Page

- Shows full post content
- Displays author information
- Shows comments on the post
- Back navigation to main page

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)

## Project Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```
bash
# Install dependencies
npm install
```

### Running the Development Server

```
bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Demo Credentials

- **Valid Phone Number**: `+254712345678`
- **Password**: Any (mock authentication)

## Testing

```
bash
# Run tests
npm test
```

## Project Structure

```
react-demo-app/
├── app/
│   ├── _test_/              # Test files
│   │   └── login.test.js    # Login page tests
│   ├── components/
│   │   └── common/          # Reusable components
│   │       ├── ErrorMessage.js
│   │       ├── LoadingSpinner.js
│   │       └── NavBar.js
│   ├── context/
│   │   └── AuthContext.js  # Authentication context
│   ├── detail/[id]/
│   │   └── page.js         # Detail page
│   ├── login/
│   │   └── page.js         # Login page
│   ├── services/
│   │   └── api.js          # API service
│   ├── utils/
│   │   └── validation.js   # Validation utilities
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── providers.js        # App providers
├── package.json
└── README.md
```

## API Endpoints Used

- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post
- `GET /users/:id` - Fetch user details
- `GET /posts/:id/comments` - Fetch post comments

## License

MIT
