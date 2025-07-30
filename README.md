# Blood Bank Management System

A comprehensive web application for managing blood bank operations, including donor management, blood inventory tracking, request processing, and donation drive organization.

## Features

### 🔐 Authentication & Authorization
- Role-based access control (Patient, Hospital, Admin)
- Secure JWT authentication
- User profile management

### 🩸 Core Functionality
- **Donor Management**: Register and track blood donors
- **Blood Inventory**: Real-time inventory tracking with expiry monitoring
- **Blood Requests**: Submit and manage blood requests with priority handling
- **Donation Drives**: Organize and manage blood donation events
- **Notifications**: Real-time alerts and updates

### 📊 Analytics & Reports
- Comprehensive dashboard with key metrics
- Blood inventory reports
- Donation statistics
- Request fulfillment analytics

### 🛠 Utilities
- Blood compatibility checker
- Donor eligibility assessment
- Emergency request handling

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Nodemailer** for email notifications
- **Moment.js** for date handling

## Project Structure

```
src/
├── components/
│   └── Layout/
│       └── Layout.js          # Main application layout
├── contexts/
│   └── AuthContext.js         # Authentication context
├── pages/
│   ├── Auth/
│   │   ├── Login.js          # Login page
│   │   └── Register.js       # Registration page
│   ├── Dashboard/
│   │   └── Dashboard.js      # Main dashboard
│   ├── Donors/
│   │   ├── Donors.js         # Donor listing
│   │   └── DonorForm.js      # Add/Edit donor
│   ├── Inventory/
│   │   ├── Inventory.js      # Blood inventory
│   │   └── InventoryForm.js  # Add/Edit inventory
│   ├── Requests/
│   │   ├── Requests.js       # Blood requests
│   │   └── RequestForm.js    # Create request
│   ├── Drives/
│   │   ├── Drives.js         # Donation drives
│   │   └── DriveForm.js      # Create drive
│   ├── Admin/
│   │   ├── AdminDashboard.js # Admin panel
│   │   └── AdminUsers.js     # User management
│   ├── Reports/
│   │   └── Reports.js        # Analytics & reports
│   └── Utilities/
│       └── Utilities.js      # Utility tools
├── services/
│   └── api.js                # API service layer
└── App.js                    # Main app component
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory and install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bloodbank
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

3. Start the backend server:
```bash
npm start
```

### Frontend Setup
1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## User Roles & Permissions

### Patient
- View blood inventory
- Submit blood requests
- View own requests
- Register for donation drives
- Access utilities

### Hospital
- All patient permissions
- Manage donors
- Manage blood inventory
- View all requests
- Create donation drives
- Access reports

### Admin
- All hospital permissions
- User management
- System administration
- Advanced analytics
- Notification management

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Donors
- `GET /api/donors` - Get all donors
- `POST /api/donors` - Create donor
- `GET /api/donors/:id` - Get donor by ID
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor

### Blood Inventory
- `GET /api/inventory` - Get inventory
- `POST /api/inventory` - Add inventory
- `PUT /api/inventory/:id` - Update inventory
- `GET /api/inventory/compatible/:bloodGroup` - Get compatible blood

### Blood Requests
- `GET /api/requests` - Get requests
- `POST /api/requests` - Create request
- `GET /api/requests/:id` - Get request by ID
- `PUT /api/requests/:id/status` - Update request status

### Donation Drives
- `GET /api/drives` - Get drives
- `POST /api/drives` - Create drive
- `GET /api/drives/:id` - Get drive by ID
- `PUT /api/drives/:id` - Update drive
- `POST /api/drives/:id/register` - Register for drive

## Development Status

### ✅ Completed
- Project setup and structure
- Authentication system
- Main dashboard
- Basic donor management
- Navigation and layout
- API service layer

### 🚧 In Progress
- Complete CRUD operations for all entities
- Advanced dashboard analytics
- Report generation
- Notification system

### 📋 Planned
- Email notifications
- Advanced search and filtering
- Data export functionality
- Mobile responsiveness improvements
- Unit and integration tests

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@bloodbank.com or create an issue in the repository.

---

**Note**: This is a comprehensive blood bank management system designed for educational and demonstration purposes. For production use, additional security measures, testing, and compliance considerations should be implemented.
