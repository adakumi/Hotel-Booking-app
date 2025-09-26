# HotelBookingApplication

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



# Hotel-Booking-Engine
Muhamma Adib Hafifi 

Softinn Task

A responsive hotel room booking application built with Angular 17+ that allows users to browse available rooms and make bookings. This project demonstrates modern Angular development practices with a focus on clean architecture and user experience.

How to Run the Application


Prerequisites
Node.js (version 18 or higher)
npm (version 9 or higher)
Angular CLI (version 17+)


  Installation & Setup
    
  1. Clone the repository 
    
    git clone https://github.com/adakumi/Hotel-Booking-Engine/blob/main/README.md
    cd hotel-booking-engine
  
  2. Install dependencies
   
    npm install
    Start the development server

  3. Acces The application

    ng serve

 

Open your browser and navigate to: 
http://localhost:4200

The application will automatically reload when each changes


Production Build

    ng build --configuration production










Design Decisions & Architecture

1. Component Architecture
Decision: Modular component-based architecture with clear separation of concerns.

Reusability: RoomCardComponent can be used across different pages

Maintainability: Each component has a single responsibility

Testability: Isolated components are easier to unit test


2. State Management
Decision: Used RxJS Observables with Services for state management instead of external state libraries.

Implementation:

typescript

    // room.service.ts
    private rooms: Room[] = [...];
    private roomsSubject = new BehaviorSubject<Room[]>(this.rooms);
    
    getRooms(): Observable<Room[]> {
      return this.roomsSubject.asObservable().pipe(delay(500));
    }

    bookRoom(roomId: string): Observable<boolean> {
    // Update local state and notify subscribers
    }
Reason: For a small-to-medium application, Angular's built-in services with RxJS provide sufficient state management without the complexity of external libraries.

3. Responsive Design Approach
Decision: Mobile-first Bootstrap 5 grid system with custom CSS variables.

Implementation:

html
    
    <div class="row g-4">
     <div class="col-12 col-sm-6 col-lg-4 col-xl-3" *ngFor="let room of rooms">
    <app-room-card [room]="room"></app-room-card>
    </div>
    </div>


    
Benefits:

Consistent across all device sizes

Bootstrap's utility classes for rapid development

Custom CSS variables for theming consistency

4. Form Handling
Decision: Angular Reactive Forms with custom validators.

Implementation:

typescript
  
    this.bookingForm = this.fb.group({
    guestName: ['', [Validators.required, Validators.minLength(2)]],
    checkIn: ['', [Validators.required, this.dateValidator]],
    checkOut: ['', [Validators.required]]
      }, { validators: this.dateRangeValidator });
Benefits:

Type-safe form handling

Complex validation scenarios

Better performance than template-driven forms













Requirements Implementation

1. Room List Page 
Mock API: Implemented with RxJS of() and delay() operators

Room Display: Each room shows name, type, price, and availability status

Responsive Grid: Bootstrap grid system for optimal layout


2. Book Room Modal 
Modal Component: Reusable booking form component

Form Validation: Required fields with custom date validators

State Update: Updates room availability in real-time

3. Confirmation System 
Toast Notifications: Custom toast service for user feedback



Success/Error States: Different styles for booking outcomes




Bonus Features Implemented

-Angular Reactive Forms
-Complex validation for dates and guest information
-Real-time form state management
-Modular Structure
-Clean separation of components, services, and models
-Lazy-loading ready architecture

✅ Custom RoomCardComponent
Reusable component with input/output properties

Consistent styling and behavior

✅ Bootstrap Grid & Utilities
Responsive design using Bootstrap's grid system

Utility classes for spacing, colors, and layout


✅ localStorage Persistence
Booking data persists across browser sessions

Maintains room availability state

🛠️ Technical Stack Choices

Frameworks & Libraries Used
-Angular 17+	Main framework	Latest features, strong typing, enterprise-ready
-Bootstrap 5	UI framework	Rapid prototyping, responsive grid, utility classes
-RxJS	State management	Built-in Angular solution, powerful operators
-TypeScript	Language	Type safety, better developer experience


🎯 Key Features Demonstrated
1. TypeScript Strict Typing

2. Responsive Design
-Mobile-first approach
-Breakpoints for tablet and desktop
-Touch-friendly interfaces

3. Clean Code Practices
-Single responsibility components
-Descriptive variable and method names
-Consistent code formatting

4. User Experience
-Loading states during API calls
-Immediate feedback for user actions
-Intuitive navigation and workflows



Responsive Design Features

-Breakpoints Implemented
Mobile: < 768px (single column layout)

Tablet: 768px - 1199px (two column layout)

Desktop: 1200px+ (multi-column layout)

Mobile Optimizations
Touch-friendly button sizes

Simplified navigation

Optimized images and layouts





ADDITIONAL
To reset the room booking data, press the reset data button on the room page


