# Aaple Guruji - Puja Booking Platform

A complete full-stack puja booking platform with email OTP verification, lead capture, and admin notifications.

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- Redux Toolkit
- React Router
- React Hook Form
- React Toastify

### Backend
- Express 5
- MongoDB with Mongoose
- Nodemailer (email service)
- bcryptjs (OTP hashing)
- express-rate-limit

## Features

✅ Landing page with responsive design
✅ Puja listing and detail pages
✅ Multi-step booking form with validation
✅ Email OTP verification
✅ Dynamic pricing calculation
✅ Lead capture for abandoned bookings
✅ Admin email notifications
✅ Booking confirmation emails
✅ WhatsApp integration

## Project Structure

```
AapleGurujiV3/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/           # App configuration
│   │   ├── features/      # Feature modules
│   │   │   ├── Booking/   # Booking functionality
│   │   │   └── Landing/   # Landing page components
│   │   └── shared/        # Shared components
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── app/           # Express app
│   │   ├── config/        # Configuration
│   │   ├── controller/    # API controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── model/         # Mongoose models
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection string
- Email service account (Gmail recommended with App Password)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AapleGurujiV3
```

### 2. Backend Setup

```bash
cd server
npm install
```

#### Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aapleguruji
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Admin Configuration
ADMIN_EMAIL=admin@example.com

# OTP Configuration
OTP_EXPIRY_MINUTES=5
MAX_OTP_ATTEMPTS=3
OTP_RESEND_COOLDOWN_SECONDS=60
```

#### Getting Gmail App Password

1. Go to Google Account settings
2. Enable 2-factor authentication
3. Go to Security > App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS`

#### Start the Backend Server

```bash
npm run dev
```

The server will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd client
npm install
```

#### Configure API Base URL

The API base URL is configured in `client/src/config/api.jsx`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
```

Update this if your backend runs on a different URL.

#### Start the Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Database Models

### Puja Model
```javascript
{
  slug: String,
  name: { en: String, mr: String },
  category: String,
  shortDescription: { en: String, mr: String },
  description: { en: String, mr: String },
  benefits: [String],
  serviceHighlights: [String],
  images: {
    thumbnail: String,
    gallery: [String]
  },
  samagri: {
    includedWithPackage: [String],
    customerArrangedChecklist: [String],
    householdRequirements: [String]
  },
  packages: [{
    id: String,
    name: { en: String, mr: String },
    price: Number,
    includesSamagri: Boolean,
    features: [String],
    active: Boolean
  }],
  availability: {
    active: Boolean,
    locations: [String]
  }
}
```

### Lead Model
```javascript
{
  name: String,
  mobile: String,
  email: String,
  pujaId: ObjectId,
  funnelStage: String, // details_submitted, otp_sent, email_verified, booking_submitted, abandoned
  otpSentAt: Date,
  emailVerifiedAt: Date,
  bookingSubmittedAt: Date,
  lastActivityAt: Date,
  bookingReference: String,
  notificationSent: Boolean,
  notificationSentAt: Date,
  notificationAttempts: Number
}
```

### Booking Model
```javascript
{
  bookingReference: String,
  leadId: ObjectId,
  pujaId: ObjectId,
  customerName: String,
  mobile: String,
  email: String,
  samagriOption: String, // with_samagri, without_samagri
  basePrice: Number,
  samagriPrice: Number,
  totalPrice: Number,
  currency: String,
  status: String, // pending, confirmed, cancelled, completed
  paymentStatus: String, // pending, paid, failed
  emailVerified: Boolean,
  scheduledDate: Date,
  scheduledTime: String,
  address: String,
  city: String,
  pincode: String,
  notes: String,
  confirmationEmailSent: Boolean,
  adminNotificationSent: Boolean
}
```

### OTP Model
```javascript
{
  email: String,
  otp: String,
  otpHash: String,
  expiresAt: Date,
  attempts: Number,
  verified: Boolean,
  verifiedAt: Date
}
```

## API Endpoints

### Pujas
- `GET /api/pujas` - Get all active pujas
- `GET /api/pujas/:id` - Get puja by ID

### Leads
- `POST /api/leads` - Create or update lead
- `PATCH /api/leads/stage` - Update lead funnel stage
- `POST /api/leads/abandon` - Mark lead as abandoned

### OTP
- `POST /api/otp/request` - Request OTP for email verification
- `POST /api/otp/verify` - Verify OTP code

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:reference` - Get booking by reference
- `POST /api/bookings/calculate-price` - Calculate price for puja

### Admin

The `/admin` workspace manages customer leads and Puja Samagri. Set a strong
`ADMIN_API_KEY` in `server/.env`, restart the backend, then open `/admin` and
enter the same key. The key is kept in the browser session only and is sent as
an `x-admin-key` header for each admin request.

## User Journey

1. **Landing Page**
   - User views available pujas
   - Clicks "Book a Puja" or "Book Now" on a specific puja

2. **Booking Form**
   - User enters personal information (name, mobile, email)
   - Clicks "Continue to Verification" - this saves the lead
   - User requests OTP via email
   - User enters and verifies OTP
   - User selects puja and samagri option
   - User fills optional scheduling and address details
   - User submits booking

3. **Confirmation**
   - User sees success page with booking reference
   - User receives confirmation email
   - Admin receives notification email

4. **Lead Capture**
   - If user abandons after submitting details, lead is saved
   - Admin receives notification for abandoned leads
   - Lead funnel stage is tracked throughout

## Security Features

- ✅ OTPs are hashed using bcrypt before storage
- ✅ OTPs expire after 5 minutes (configurable)
- ✅ Maximum 3 OTP attempts (configurable)
- ✅ Rate limiting on OTP, lead, and booking endpoints
- ✅ Email verification required before booking submission
- ✅ Prices calculated on backend, not trusted from frontend
- ✅ Duplicate booking prevention
- ✅ CORS configured for approved origins
- ✅ Input validation and sanitization

## Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Puja cards display from backend
- [ ] Puja detail page loads with correct data
- [ ] "Book Now" button opens booking form with preselected puja
- [ ] Form validation rejects invalid emails and phone numbers
- [ ] OTP is sent to entered email
- [ ] Incorrect OTP is rejected
- [ ] Expired OTP is rejected
- [ ] Resend OTP cooldown is enforced
- [ ] Changing email invalidates previous verification
- [ ] Booking cannot be submitted without email verification
- [ ] Dynamic pricing updates when puja/samagri changes
- [ ] Booking submission creates valid record
- [ ] Confirmation email is sent
- [ ] Admin notification is sent
- [ ] Lead is saved when user abandons
- [ ] Failed email delivery doesn't delete data

## Deployment

### Backend Deployment (e.g., Render, Railway, Vercel)

1. Push code to your Git repository
2. Create a new web service
3. Set environment variables in the deployment platform
4. Deploy the server
5. Update `FRONTEND_URL` to production frontend URL

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder
3. Update API base URL in production environment

### Production Environment Variables

Make sure to set these in production:

```env
PORT=3000
MONGODB_URI=<production-mongodb-uri>
FRONTEND_URL=<production-frontend-url>
EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>
EMAIL_USER=<email-user>
EMAIL_PASS=<email-password>
EMAIL_FROM=<sender-email>
ADMIN_EMAIL=<admin-email>
ADMIN_API_KEY=<long-random-admin-secret>
OTP_EXPIRY_MINUTES=5
MAX_OTP_ATTEMPTS=3
OTP_RESEND_COOLDOWN_SECONDS=60
```

## Troubleshooting

### OTP Not Sending
- Check email credentials in `.env`
- Verify SMTP host and port
- Check if app password is correct (for Gmail)
- Check server logs for error messages

### Database Connection Error
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB user has correct permissions

### CORS Errors
- Verify `FRONTEND_URL` matches your frontend URL
- Check CORS configuration in `server/src/app/app.js`

### Rate Limiting Issues
- Adjust limits in `server/src/middleware/rateLimiter.js`
- Or modify via environment variables

## Support

For issues or questions, please contact the development team.

## License

[Your License Here]
