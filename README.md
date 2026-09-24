# 💊 Medicine Reminder System

A **cloud-based medicine reminder web application** designed to help users manage their medication schedules and receive timely reminders. The project uses **AWS serverless architecture** to provide a scalable, reliable, and cost-effective solution.

## 🌟 Project Overview

The Medicine Reminder System allows users to:

* Add medicine reminders with name, medicine, and time
* View all saved reminders through a dashboard
* Search reminders
* Mark medicines as **Taken**
* Receive popup and sound alerts at scheduled times
* Track the next upcoming dose
* View reminder statistics
* Switch between Light and Dark Mode
* Snooze reminders for a short period

The application is designed with a simple and user-friendly interface to help users maintain their medication schedules effectively.

##  Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend & Cloud

* **AWS Lambda** – Serverless backend logic
* **Amazon API Gateway** – REST API layer
* **Amazon DynamoDB** – NoSQL database
* **Amazon S3** – Static website hosting
* **AWS IAM** – Access control and permissions
* **Amazon CloudWatch** – Monitoring and logging

## 🏗️ System Architecture

```text
                 👤 User
                    │
                    ▼
              🌐 Web Browser
                    │
                    ▼
             ☁️ Amazon S3
            Frontend Hosting
                    │
                    ▼
            🚪 API Gateway
                    │
                    ▼
             ⚡ AWS Lambda
             Backend Logic
                    │
                    ▼
             🗄️ DynamoDB
             Database Storage
                    │
                    ▼
            📊 CloudWatch
          Monitoring & Logs
```

The application follows a serverless architecture where Amazon S3 hosts the frontend, API Gateway handles requests, Lambda processes backend operations, and DynamoDB stores reminder data.

## ✨ Key Features

### ⏰ Reminder Creation

Users can create multiple medicine reminders by entering their name, medicine, and required time.

### 📋 Reminder Dashboard

The dashboard displays all active reminders in an organized layout with search functionality.

### ✔️ Mark as Taken

Users can mark a reminder as **Taken** to prevent repeated alerts.

### 🔔 Alerts & Notifications

The application checks reminder times and triggers popup and sound alerts when a medicine is due.

### 🌙 Dark Mode

Users can switch between light and dark themes. The selected mode is stored using browser local storage.

### 🔎 Search

Users can search reminders by either the person's name or medicine name.

### ⏭️ Next Dose

The system identifies and displays the next upcoming medicine reminder.

### 😴 Snooze

Users can temporarily snooze an active reminder.

## 🔄 How It Works

```text
1. User enters medicine details
             ↓
2. Frontend sends request to API Gateway
             ↓
3. AWS Lambda processes the request
             ↓
4. Reminder is stored in DynamoDB
             ↓
5. Dashboard retrieves reminder data
             ↓
6. System checks the current time
             ↓
7. Alert is triggered when time matches
```

The frontend sends reminder information to the backend, Lambda processes it, and the data is stored in DynamoDB. The dashboard retrieves the stored reminders for display.

## 🔗 API Endpoints

| Method   | Endpoint        | Description                  |
| -------- | --------------- | ---------------------------- |
| `POST`   | `/save`         | Save a new medicine reminder |
| `GET`    | `/getReminders` | Fetch all reminders          |
| `DELETE` | `/delete/{id}`  | Delete a reminder            |

The frontend JavaScript uses REST API requests to save, retrieve, and delete reminder records.

## 📁 Project Structure

```text
Medicine-Reminder-System/
│
├── index.html
├── dashboard.html
├── style.css
├── script.js
└── README.md
```

### File Description

| File             | Purpose                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| `index.html`     | Main page for creating medicine reminders                              |
| `dashboard.html` | Dashboard for viewing and managing reminders                           |
| `style.css`      | Styling, animations, cards, dark mode, and UI design                   |
| `script.js`      | Reminder logic, API calls, alerts, search, and dashboard functionality |
| `README.md`      | Project documentation                                                  |

## 🚀 Deployment

The project can be deployed using AWS serverless services:

1. Create a **DynamoDB** table for storing reminders.
2. Create **AWS Lambda** functions for backend operations.
3. Configure **API Gateway** to expose REST APIs.
4. Upload frontend files to an **Amazon S3 bucket**.
5. Configure required **IAM permissions**.
6. Use **CloudWatch** for monitoring and logs.

The project's documented deployment architecture uses S3 for frontend hosting, Lambda for backend processing, API Gateway for APIs, DynamoDB for storage, and CloudWatch for monitoring.

## 🔐 Security

The project uses **AWS IAM** to control access and permissions between AWS services. Input validation is also implemented on the frontend to ensure required fields are completed before sending data.

> **Note:** This project is an academic/demo application and should not be considered a substitute for professional medical advice.

## 🧪 Testing

The system has been tested for:

* Creating reminders
* Fetching reminders
* Deleting reminders
* Searching reminders
* Triggering scheduled alerts
* Marking reminders as taken
* Dark mode functionality
* Input validation

## 🔮 Future Enhancements

Planned improvements include:

* 👤 User authentication and secure accounts
* 📱 Mobile application integration
* 🤖 AI-based personalized recommendations
* 🔔 Advanced push notifications
* ⌚ Smartwatch and wearable integration
* 🏥 Healthcare system integration

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Cloud computing
* AWS serverless architecture
* AWS Lambda
* API Gateway
* DynamoDB
* Amazon S3
* IAM permissions
* CloudWatch monitoring
* REST API integration
* Frontend development using HTML, CSS & JavaScript
* Building a real-world cloud-based application

## 👨‍💻 Author

**Harsh Kumar Mishra**

B.Tech Computer Science & Engineering

### ⭐ If you found this project useful

Give this repository a ** Star** and feel free to explore the project!
