# Dashboard-Specific API Endpoints

This document maps each functionality in the Educator, Student, and Marketer dashboards to specific API endpoints.

---

## 👨‍🏫 EDUCATOR DASHBOARD API ENDPOINTS

### Dashboard Overview (`/dashboard/educator`)

#### 1. Get Dashboard Statistics
**Functionality:** Display key metrics (Total Courses, Total Students, Revenue, Completion Rate)
- **Endpoint:** `GET /api/dashboard/educator/stats`
- **Response:**
```json
{
  "totalCourses": 12,
  "totalStudents": 1234,
  "revenue": 45231,
  "completionRate": 78,
  "trends": {
    "courses": { "value": 8, "isPositive": true },
    "students": { "value": 12, "isPositive": true },
    "revenue": { "value": 15, "isPositive": true },
    "completionRate": { "value": 5, "isPositive": true }
  }
}
```

#### 2. Get Recent Courses
**Functionality:** Display most popular courses with student count and revenue
- **Endpoint:** `GET /api/dashboard/educator/recent-courses?limit=3`
- **Response:**
```json
[
  {
    "id": "1",
    "title": "Advanced React Patterns",
    "students": 245,
    "revenue": 4900
  }
]
```

#### 3. Get AI Suggestions
**Functionality:** Display AI-powered course improvement suggestions
- **Endpoint:** `GET /api/ai/suggestions/educator`
- **Response:**
```json
[
  {
    "title": "Add interactive quizzes",
    "description": "Courses with quizzes have 35% higher completion rates.",
    "action": "Generate Quizzes",
    "impact": { "before": 62, "after": 84 }
  }
]
```

### Course Management

#### 4. Create New Course
**Functionality:** Open course creation modal (`CourseContentModal`)
- **Endpoint:** `POST /api/courses`
- **Request Body:**
```json
{
  "title": "Course Title",
  "description": "Course Description",
  "category": "Web Development",
  "price": 99.99,
  "duration": "8 weeks",
  "instructor": "Instructor Name",
  "instructorBio": "Bio text",
  "modules": [
    {
      "title": "Module Title",
      "description": "Module Description",
      "duration": "45 minutes"
    }
  ]
}
```
- **Response:** Created course object with ID

#### 5. Upload Video for Module
**Functionality:** Upload video file for a course module
- **Endpoint:** `POST /api/courses/:courseId/modules/:moduleId/video`
- **Request:** Multipart form data with video file
- **Response:** Video URL and metadata

#### 6. Enhance Video with AI
**Functionality:** Apply AI enhancements (brightness, contrast, noise reduction, focus)
- **Endpoint:** `POST /api/ai/video/enhance`
- **Request Body:**
```json
{
  "videoId": "video-id",
  "brightness": 110,
  "contrast": 115,
  "noiseReduction": 65,
  "focusEnhancement": true
}
```
- **Response:** Enhanced video URL

#### 7. Generate AI Notes from Video
**Functionality:** Generate notes/summary from video content
- **Endpoint:** `POST /api/ai/video/generate-notes`
- **Request Body:**
```json
{
  "videoId": "video-id",
  "moduleId": "module-id"
}
```
- **Response:**
```json
{
  "notes": "Generated notes text..."
}
```

#### 8. Generate Quiz for Module
**Functionality:** Generate interactive quiz using AI
- **Endpoint:** `POST /api/ai/courses/:courseId/modules/:moduleId/generate-quiz`
- **Response:**
```json
{
  "quiz": {
    "questions": [
      {
        "question": "Question text",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0
      }
    ]
  }
}
```

#### 9. Update Course
**Functionality:** Edit existing course details
- **Endpoint:** `PUT /api/courses/:courseId`
- **Request Body:** Same as create course (partial updates allowed)
- **Response:** Updated course object

#### 10. Get Course by ID
**Functionality:** Fetch course details for editing or viewing
- **Endpoint:** `GET /api/courses/:courseId`
- **Response:** Complete course object with modules

#### 11. Delete Course
**Functionality:** Remove course
- **Endpoint:** `DELETE /api/courses/:courseId`
- **Response:** Success message

### Analytics (`/analytics/educator`)

#### 12. Get Educator Analytics
**Functionality:** Display comprehensive analytics dashboard
- **Endpoint:** `GET /api/analytics/educator`
- **Response:**
```json
{
  "revenue": {
    "total": 45231,
    "trend": 15,
    "chartData": [
      { "month": "Jan", "value": 3200 }
    ]
  },
  "users": {
    "total": 1234,
    "trend": 12,
    "chartData": [
      { "month": "Jan", "value": 890 }
    ]
  },
  "courses": {
    "total": 12,
    "trend": 8,
    "topPerforming": [
      {
        "id": "1",
        "title": "Course Title",
        "students": 245,
        "revenue": 4900
      }
    ]
  },
  "engagement": {
    "completionRate": 78,
    "chartData": [
      { "day": "Mon", "value": 65 }
    ]
  }
}
```

#### 13. Get Revenue Over Time
**Functionality:** Monthly revenue trends chart
- **Endpoint:** `GET /api/analytics/educator/revenue?period=monthly&months=6`
- **Response:** Array of monthly revenue data

#### 14. Get Student Growth
**Functionality:** Student enrollment trends chart
- **Endpoint:** `GET /api/analytics/educator/students?period=monthly&months=6`
- **Response:** Array of monthly student counts

#### 15. Get Top Performing Courses
**Functionality:** Courses ranked by revenue
- **Endpoint:** `GET /api/analytics/educator/courses/top-performing?limit=10`
- **Response:** Array of top courses with revenue

#### 16. Get Weekly Engagement
**Functionality:** Student activity throughout the week
- **Endpoint:** `GET /api/analytics/educator/engagement/weekly`
- **Response:** Array of daily engagement metrics

### Students Management (`/students`)

#### 17. Get All Students
**Functionality:** List all enrolled students
- **Endpoint:** `GET /api/students?role=educator`
- **Query Params:** `?search=query&page=1&limit=50`
- **Response:**
```json
{
  "students": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "institution": "University"
    }
  ],
  "total": 1234,
  "page": 1,
  "limit": 50
}
```

#### 18. Search Students
**Functionality:** Search students by name, email, or institution
- **Endpoint:** `GET /api/students/search?q=query&role=educator`
- **Response:** Filtered list of students

### Courses Page (`/courses/role/educator`)

#### 19. Get All Courses (Educator's)
**Functionality:** List all courses created by educator
- **Endpoint:** `GET /api/courses?instructorId=:educatorId`
- **Response:** Array of courses

#### 20. Search Courses
**Functionality:** Search courses by title or category
- **Endpoint:** `GET /api/courses/search?q=query&instructorId=:educatorId`
- **Response:** Filtered courses

### AI Suggestions (`/ai-suggestions`)

#### 21. Get AI Suggestions
**Functionality:** Get personalized AI suggestions for educators
- **Endpoint:** `GET /api/ai/suggestions/educator`
- **Response:**
```json
[
  {
    "title": "Add interactive quizzes",
    "description": "Description",
    "action": "Generate Quizzes",
    "impact": { "before": 62, "after": 84 },
    "plan": ["Step 1", "Step 2"]
  }
]
```

#### 22. Mark Suggestion as Complete
**Functionality:** Track suggestion completion
- **Endpoint:** `POST /api/ai/suggestions/:suggestionId/complete`
- **Response:** Success confirmation

---

## 👨‍🎓 STUDENT DASHBOARD API ENDPOINTS

### Dashboard Overview (`/dashboard/student`)

#### 1. Get Dashboard Statistics
**Functionality:** Display key metrics (Enrolled Courses, Learning Hours, Certificates, Completion Rate)
- **Endpoint:** `GET /api/dashboard/student/stats`
- **Response:**
```json
{
  "enrolledCourses": 5,
  "inProgress": 2,
  "learningHours": 48,
  "period": "This month",
  "certificates": 3,
  "completionRate": 68
}
```

#### 2. Get Active Courses
**Functionality:** Display courses in progress with progress percentage
- **Endpoint:** `GET /api/enrollments/student/:studentId/active`
- **Response:**
```json
[
  {
    "id": "1",
    "courseId": "course-1",
    "title": "Advanced React Patterns",
    "progress": 65,
    "nextLesson": "Custom Hooks",
    "lastAccessed": "2024-01-15T10:30:00Z"
  }
]
```

#### 3. Get Recommended Courses
**Functionality:** AI-powered course recommendations
- **Endpoint:** `GET /api/ai/recommendations/courses?userId=:studentId&limit=3`
- **Response:**
```json
[
  {
    "id": "1",
    "title": "Node.js Backend Development",
    "reason": "Complements your React skills",
    "matchScore": 0.92
  }
]
```

### Course Discovery (`/courses/role/student`)

#### 4. Get Available Courses
**Functionality:** Browse all available courses for enrollment
- **Endpoint:** `GET /api/courses/available`
- **Query Params:** `?category=web&search=query&page=1&limit=20`
- **Response:** Paginated list of courses

#### 5. Get Course Details
**Functionality:** View full course information
- **Endpoint:** `GET /api/courses/:courseId`
- **Response:** Complete course object with modules, reviews, etc.

#### 6. Check Enrollment Status
**Functionality:** Check if student is enrolled in course
- **Endpoint:** `GET /api/enrollments/check?userId=:studentId&courseId=:courseId`
- **Response:**
```json
{
  "isEnrolled": true,
  "enrollmentDate": "2024-01-01",
  "progress": 65
}
```

### Course Enrollment (`/courses/:id`)

#### 7. Enroll in Course
**Functionality:** Enroll student in a course
- **Endpoint:** `POST /api/enrollments`
- **Request Body:**
```json
{
  "courseId": "course-id",
  "userId": "student-id"
}
```
- **Response:** Enrollment confirmation

#### 8. Process Payment for Course
**Functionality:** Handle course payment
- **Endpoint:** `POST /api/payments/course`
- **Request Body:**
```json
{
  "courseId": "course-id",
  "amount": 99.99,
  "paymentMethod": "stripe",
  "paymentToken": "token"
}
```
- **Response:** Payment confirmation and enrollment

#### 9. Get Course Reviews
**Functionality:** View all reviews for a course
- **Endpoint:** `GET /api/reviews/course/:courseId`
- **Response:** Array of reviews

#### 10. Submit Course Review
**Functionality:** Write a review for enrolled course
- **Endpoint:** `POST /api/reviews`
- **Request Body:**
```json
{
  "courseId": "course-id",
  "rating": 5,
  "comment": "Great course!"
}
```
- **Response:** Created review

#### 11. Get User's Review
**Functionality:** Get student's own review for a course
- **Endpoint:** `GET /api/reviews/user/:userId/course/:courseId`
- **Response:** Review object or null

### Bundle Discovery (`/bundles/role/student`)

#### 12. Get Available Bundles
**Functionality:** Browse available course bundles
- **Endpoint:** `GET /api/bundles/available`
- **Query Params:** `?search=query&page=1&limit=20`
- **Response:** Paginated list of bundles

#### 13. Get Bundle Details
**Functionality:** View bundle information
- **Endpoint:** `GET /api/bundles/:bundleId`
- **Response:** Complete bundle object with included courses

#### 14. Purchase Bundle
**Functionality:** Purchase a bundle
- **Endpoint:** `POST /api/purchases/bundle`
- **Request Body:**
```json
{
  "bundleId": "bundle-id",
  "userId": "student-id",
  "amount": 199.99,
  "paymentMethod": "stripe",
  "paymentToken": "token"
}
```
- **Response:** Purchase confirmation

#### 15. Check Bundle Purchase Status
**Functionality:** Check if bundle is purchased
- **Endpoint:** `GET /api/purchases/bundle/:bundleId?userId=:studentId`
- **Response:**
```json
{
  "isPurchased": true,
  "purchaseDate": "2024-01-01"
}
```

### My Purchases (`/purchases/student`)

#### 16. Get Enrolled Courses
**Functionality:** List all enrolled courses
- **Endpoint:** `GET /api/enrollments/user/:studentId`
- **Response:** Array of enrolled courses with progress

#### 17. Get Purchased Bundles
**Functionality:** List all purchased bundles
- **Endpoint:** `GET /api/purchases/user/:studentId/bundles`
- **Response:** Array of purchased bundles

#### 18. Get Course Progress
**Functionality:** Get detailed progress for a course
- **Endpoint:** `GET /api/enrollments/:enrollmentId/progress`
- **Response:**
```json
{
  "courseId": "course-id",
  "progress": 65,
  "completedModules": [1, 2, 3],
  "totalModules": 8,
  "lastAccessed": "2024-01-15T10:30:00Z"
}
```

### Analytics (`/analytics/student`)

#### 19. Get Student Analytics
**Functionality:** Display learning analytics
- **Endpoint:** `GET /api/analytics/student/:studentId`
- **Response:**
```json
{
  "courses": {
    "total": 5,
    "inProgress": 2,
    "completed": 3
  },
  "engagement": {
    "completionRate": 68,
    "averageTime": "3.5 hrs/week",
    "chartData": [
      { "day": "Mon", "value": 60 }
    ]
  },
  "learningTime": {
    "thisWeek": 12,
    "thisMonth": 48,
    "total": 240
  }
}
```

#### 20. Get Weekly Learning Activity
**Functionality:** Study time throughout the week
- **Endpoint:** `GET /api/analytics/student/:studentId/activity/weekly`
- **Response:** Array of daily activity data

#### 21. Get Course Progress
**Functionality:** Progress for all enrolled courses
- **Endpoint:** `GET /api/analytics/student/:studentId/courses/progress`
- **Response:** Array of course progress data

#### 22. Get Achievements
**Functionality:** Display earned and available achievements
- **Endpoint:** `GET /api/achievements/user/:studentId`
- **Response:**
```json
[
  {
    "id": "1",
    "title": "First Course",
    "description": "Completed your first course",
    "earned": true,
    "earnedDate": "2024-01-01"
  }
]
```

#### 23. Get Certificates
**Functionality:** List earned certificates
- **Endpoint:** `GET /api/certificates/user/:studentId`
- **Response:** Array of certificates

### AI Suggestions (`/ai-suggestions`)

#### 24. Get Student AI Suggestions
**Functionality:** Personalized learning recommendations
- **Endpoint:** `GET /api/ai/suggestions/student?userId=:studentId`
- **Response:**
```json
[
  {
    "title": "Recommended course: Advanced TypeScript",
    "description": "Based on your completed React courses.",
    "action": "View Course",
    "impact": { "before": 68, "after": 92 },
    "plan": ["Week 1: Enroll and complete intro module"]
  }
]
```

#### 25. Generate Study Schedule
**Functionality:** AI-generated personalized study plan
- **Endpoint:** `POST /api/ai/study-schedule/generate`
- **Request Body:**
```json
{
  "userId": "student-id",
  "preferences": {
    "hoursPerWeek": 10,
    "preferredDays": ["Mon", "Wed", "Fri"]
  }
}
```
- **Response:** Generated study schedule

### AI Chatbot

#### 26. Send Chat Message
**Functionality:** Send message to AI chatbot
- **Endpoint:** `POST /api/ai/chat`
- **Request Body:**
```json
{
  "message": "User message text",
  "userId": "student-id",
  "role": "student",
  "context": "course-content"
}
```
- **Response:**
```json
{
  "response": "AI response text",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 27. Get Chat History
**Functionality:** Retrieve previous chat messages
- **Endpoint:** `GET /api/ai/chat/history?userId=:studentId&limit=50`
- **Response:** Array of chat messages

---

## 📊 MARKETER DASHBOARD API ENDPOINTS

### Dashboard Overview (`/dashboard/marketer`)

#### 1. Get Dashboard Statistics
**Functionality:** Display key metrics (Active Bundles, Total Sales, Revenue, Students Enrolled)
- **Endpoint:** `GET /api/dashboard/marketer/stats`
- **Response:**
```json
{
  "activeBundles": 8,
  "totalSales": 456,
  "revenue": 89340,
  "studentsEnrolled": 2847,
  "trends": {
    "bundles": { "value": 15, "isPositive": true },
    "sales": { "value": 23, "isPositive": true },
    "revenue": { "value": 18, "isPositive": true },
    "students": { "value": 12, "isPositive": true }
  }
}
```

### Bundle Management

#### 2. Get All Bundles
**Functionality:** List all bundles for management
- **Endpoint:** `GET /api/bundles?marketerId=:marketerId`
- **Response:** Array of bundles with status, sales, revenue

#### 3. Create Bundle
**Functionality:** Create new course bundle
- **Endpoint:** `POST /api/bundles`
- **Request Body:**
```json
{
  "title": "Bundle Title",
  "description": "Bundle Description",
  "courses": ["course-id-1", "course-id-2"],
  "originalPrice": 299.99,
  "discountedPrice": 199.99,
  "discount": 33,
  "status": "Draft"
}
```
- **Response:** Created bundle object

#### 4. Update Bundle
**Functionality:** Edit bundle details
- **Endpoint:** `PUT /api/bundles/:bundleId`
- **Request Body:** Partial bundle data
- **Response:** Updated bundle

#### 5. Duplicate Bundle
**Functionality:** Create a copy of existing bundle
- **Endpoint:** `POST /api/bundles/:bundleId/duplicate`
- **Response:** New bundle with copied data

#### 6. Update Bundle Status
**Functionality:** Change bundle status (Draft, Active, Paused, Archived)
- **Endpoint:** `PUT /api/bundles/:bundleId/status`
- **Request Body:**
```json
{
  "status": "Active"
}
```
- **Response:** Updated bundle

#### 7. Preview Bundle
**Functionality:** Get bundle preview data
- **Endpoint:** `GET /api/bundles/:bundleId/preview`
- **Response:** Bundle preview information

#### 8. Get Bundle Sales Data
**Functionality:** Get sales and revenue for a bundle
- **Endpoint:** `GET /api/bundles/:bundleId/sales`
- **Response:**
```json
{
  "sales": 120,
  "revenue": 2400,
  "courses": 3
}
```

### Campaign Management

#### 9. Get All Campaigns
**Functionality:** List all marketing campaigns
- **Endpoint:** `GET /api/campaigns?marketerId=:marketerId`
- **Response:** Array of campaigns

#### 10. Create Campaign
**Functionality:** Create new marketing campaign
- **Endpoint:** `POST /api/campaigns`
- **Request Body:**
```json
{
  "name": "Back-to-School",
  "status": "Planned",
  "eta": "2024-09-10",
  "expectedImpact": "+15%",
  "targetBundles": ["bundle-id-1"],
  "promoCodeId": "promo-id"
}
```
- **Response:** Created campaign

#### 11. Update Campaign Status
**Functionality:** Change campaign status (Planned, Scheduled, Launched)
- **Endpoint:** `PUT /api/campaigns/:campaignId/status`
- **Request Body:**
```json
{
  "status": "Launched"
}
```
- **Response:** Updated campaign

#### 12. Launch Campaign
**Functionality:** Launch a campaign
- **Endpoint:** `POST /api/campaigns/:campaignId/launch`
- **Response:** Campaign launch confirmation

#### 13. Get Campaign Analytics
**Functionality:** Get campaign performance metrics
- **Endpoint:** `GET /api/campaigns/:campaignId/analytics`
- **Response:**
```json
{
  "impact": "+15%",
  "salesIncrease": 68,
  "revenueIncrease": 1360,
  "startDate": "2024-09-10",
  "endDate": "2024-09-30"
}
```

### Task Management

#### 14. Get Marketing Tasks
**Functionality:** Get task list for marketer
- **Endpoint:** `GET /api/tasks?userId=:marketerId&type=marketing`
- **Response:**
```json
[
  {
    "id": "t1",
    "label": "Launch seasonal campaign",
    "done": false,
    "priority": "high"
  }
]
```

#### 15. Update Task Status
**Functionality:** Toggle task completion
- **Endpoint:** `PUT /api/tasks/:taskId`
- **Request Body:**
```json
{
  "done": true
}
```
- **Response:** Updated task

#### 16. Get Task Progress
**Functionality:** Calculate overall task completion percentage
- **Endpoint:** `GET /api/tasks/progress?userId=:marketerId`
- **Response:**
```json
{
  "completed": 1,
  "total": 3,
  "percentage": 33
}
```

### Promo Codes

#### 17. Generate Promo Code
**Functionality:** Create new promotional code
- **Endpoint:** `POST /api/promo-codes`
- **Request Body:**
```json
{
  "code": "SAVE50-ABCD",
  "discount": 50,
  "discountType": "percentage",
  "validFrom": "2024-01-01",
  "validTo": "2024-12-31",
  "maxUses": 100,
  "applicableTo": ["bundles"]
}
```
- **Response:** Created promo code

#### 18. Get Promo Code History
**Functionality:** View all generated promo codes
- **Endpoint:** `GET /api/promo-codes?marketerId=:marketerId`
- **Response:** Array of promo codes

#### 19. Validate Promo Code
**Functionality:** Check if promo code is valid
- **Endpoint:** `POST /api/promo-codes/validate`
- **Request Body:**
```json
{
  "code": "SAVE50-ABCD",
  "bundleId": "bundle-id"
}
```
- **Response:** Validation result with discount

### Analytics (`/analytics/marketer`)

#### 20. Get Marketer Analytics
**Functionality:** Display comprehensive marketing analytics
- **Endpoint:** `GET /api/analytics/marketer/:marketerId`
- **Response:**
```json
{
  "revenue": {
    "total": 89340,
    "trend": 18,
    "chartData": [
      { "month": "Jan", "value": 6800 }
    ]
  },
  "users": {
    "total": 2847,
    "trend": 12,
    "chartData": [
      { "month": "Jan", "value": 2100 }
    ]
  },
  "bundles": {
    "total": 8,
    "trend": 15,
    "topPerforming": [
      {
        "id": "1",
        "title": "Full Stack Developer Bundle",
        "students": 89,
        "revenue": 17800
      }
    ]
  },
  "engagement": {
    "completionRate": 72,
    "chartData": [
      { "day": "Mon", "value": 68 }
    ]
  }
}
```

#### 21. Get Revenue Over Time
**Functionality:** Monthly bundle sales revenue
- **Endpoint:** `GET /api/analytics/marketer/:marketerId/revenue?period=monthly`
- **Response:** Array of monthly revenue data

#### 22. Get Top Performing Bundles
**Functionality:** Bundles ranked by revenue
- **Endpoint:** `GET /api/analytics/marketer/:marketerId/bundles/top-performing?limit=10`
- **Response:** Array of top bundles

### Students Management (`/students`)

#### 23. Get All Students
**Functionality:** List all students (marketer view)
- **Endpoint:** `GET /api/students?role=marketer`
- **Query Params:** `?search=query&page=1&limit=50`
- **Response:** Paginated list of students

#### 24. Search Students
**Functionality:** Search students by name, email, or institution
- **Endpoint:** `GET /api/students/search?q=query&role=marketer`
- **Response:** Filtered students

### Teachers Management (`/teachers`)

#### 25. Get All Teachers
**Functionality:** List all teachers
- **Endpoint:** `GET /api/teachers`
- **Query Params:** `?search=query&page=1&limit=50`
- **Response:**
```json
[
  {
    "id": "t1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "specialization": "Web Development"
  }
]
```

#### 26. Search Teachers
**Functionality:** Search teachers by name, email, or specialization
- **Endpoint:** `GET /api/teachers/search?q=query`
- **Response:** Filtered teachers

### Course Licensing (`/courses/role/marketer`)

#### 27. Get Available Courses for Licensing
**Functionality:** Browse courses available for bundle licensing
- **Endpoint:** `GET /api/courses/available-for-licensing`
- **Response:** Array of licensable courses

#### 28. License Course for Bundle
**Functionality:** Add course to bundle
- **Endpoint:** `POST /api/bundles/:bundleId/courses`
- **Request Body:**
```json
{
  "courseId": "course-id"
}
```
- **Response:** Bundle with added course

### AI Suggestions (`/ai-suggestions`)

#### 29. Get Marketer AI Suggestions
**Functionality:** Personalized marketing recommendations
- **Endpoint:** `GET /api/ai/suggestions/marketer?marketerId=:marketerId`
- **Response:**
```json
[
  {
    "title": "Optimize bundle pricing",
    "description": "Increase discounts to 35% for higher conversion rates.",
    "action": "Apply Changes",
    "impact": { "before": 50, "after": 72 },
    "plan": ["Step 1: Analyze top-performing bundles"]
  }
]
```

#### 30. Optimize Bundle Pricing (AI)
**Functionality:** Get AI recommendations for bundle pricing
- **Endpoint:** `POST /api/ai/optimize-pricing`
- **Request Body:**
```json
{
  "bundleId": "bundle-id",
  "currentPrice": 199.99,
  "targetSales": 100
}
```
- **Response:**
```json
{
  "recommendedPrice": 179.99,
  "expectedSales": 125,
  "expectedRevenue": 22498.75
}
```

#### 31. Get Target Audience Analysis
**Functionality:** AI analysis for new audience targeting
- **Endpoint:** `POST /api/ai/audience-analysis`
- **Request Body:**
```json
{
  "bundleId": "bundle-id",
  "targetSector": "healthcare"
}
```
- **Response:** Audience analysis and recommendations

### Bundle Pages (`/bundles`)

#### 32. Get Bundle Details
**Functionality:** View bundle information
- **Endpoint:** `GET /api/bundles/:bundleId`
- **Response:** Complete bundle object

#### 33. Get Bundle Courses
**Functionality:** Get all courses included in bundle
- **Endpoint:** `GET /api/bundles/:bundleId/courses`
- **Response:** Array of course objects

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### Common Auth Endpoints (All Roles)

#### Login
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Register
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "role": "student|educator|marketer"
}
```

#### Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Response:** Current user object with role

#### Logout
- **Endpoint:** `POST /api/auth/logout`

---

## 📝 NOTES

### Request Headers
All authenticated requests should include:
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Error Responses
All endpoints should return consistent error format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Pagination
Paginated endpoints should return:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### File Uploads
Video and image uploads use multipart/form-data:
```
Content-Type: multipart/form-data
```

---

**Last Updated:** 2025-01-27
