# DentEase - Dental Practice Management System
A modern, React-based dental practice management application designed to streamline front desk operations, appointment scheduling, and emergency case management.

## Overview

DentEase is a comprehensive dental practice management system built with React and Firebase. It provides an intuitive interface for managing daily operations including patient appointments, emergency cases, and practice availability tracking.

## Key Features Explained
### Smart Emergency Scheduling
The emergency system automatically finds available 30-minute slots. If no slots are available, it intelligently reschedules the earliest regular appointment to accommodate the emergency case.

### Real-time Updates
All components use Firebase's real-time listeners to provide live updates without manual refresh, ensuring the front desk always has current information.

### Check-in Management
Front desk staff can easily toggle patient check-in status with visual indicators showing checked-in vs. not-checked-in patients.

### Patient Search
Quick patient lookup with real-time filtering as you type, supporting both existing patient selection and new patient registration.


https://github.com/user-attachments/assets/3c4eb197-61ad-447b-9926-7ceb61316abf





## Features
### Front Desk Dashboard
- **Today's Appointments**: Real-time view of daily appointments with check-in status management
- **Patient Search**: Quick patient lookup and record access
- **Live Notifications**: Real-time updates and alerts
- **At-a-Glance Overview**: Quick statistics and practice status

### Appointment Scheduling
- **Interactive Calendar**: Date selection with past date restrictions
- **Time Slot Management**: 30-minute appointment slots with availability checking
- **Patient Management**: Support for both existing and new patient registration
- **Doctor Assignment**: Assign appointments to available doctors
- **Procedure Selection**: Predefined procedure types
- **Real-time Updates**: Live synchronization with Firebase

### Emergency Management
- **Emergency Registration**: Quick emergency case entry with patient details
- **Smart Scheduling**: Automatic slot allocation with appointment rescheduling if needed
- **Severity Classification**: Low, Moderate, and High priority levels
- **Live Availability**: Real-time chair and doctor availability tracking
- **Current Emergencies**: Active emergency case monitoring
- **Emergency Types**: Predefined and custom emergency type support

## Technology Stack

- **Frontend**: React + Vite
- **Database**: Firebase Firestore

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/typshi-aswin/aetherduo.git
   cd aetherduo
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore database
   - Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Set up Firestore Collections**
   The application expects the following collections in your Firestore database:
   - `appointments` - Patient appointments
   - `patients` - Patient records
   - `doctors` - Doctor information
   - `procedures` - Available procedures
   - `emergency` - Emergency types
   - `emergency_appointments` - Emergency cases

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.
