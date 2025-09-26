import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html', // Make sure this path is correct
  styleUrls: ['./home.component.css']   // Make sure this path is correct
})
export class HomeComponent implements OnInit, OnDestroy {
  bookingForm!: FormGroup;
  minDate: string;
  
  private currentSlide = 0;
  private slides: HTMLElement[] = [];
  private slideInterval: any;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormListeners();
    this.initSlideshow();
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      checkIn: ['', [Validators.required, this.dateNotInPastValidator.bind(this)]],
      checkOut: ['', [Validators.required, this.dateNotInPastValidator.bind(this)]],
      guests: ['2'],
      roomType: ['double']
    }, { validators: this.dateRangeValidator.bind(this) });
  }

  setupFormListeners(): void {
 
    this.bookingForm.get('checkIn')?.valueChanges.subscribe(checkInDate => {
      if (checkInDate) {
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const checkOutControl = this.bookingForm.get('checkOut');
        

        if (checkOutControl) {
          const nextDayString = nextDay.toISOString().split('T')[0];
          checkOutControl.setValidators([
            Validators.required, 
            this.dateNotInPastValidator.bind(this),
            this.createMinDateValidator(nextDayString).bind(this)
          ]);
          checkOutControl.updateValueAndValidity();
        }
      }
    });
  }

  // Custom validator to prevent past dates
  dateNotInPastValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today ? null : { invalidDate: true };
  }

  // Custom validator for minimum date
  createMinDateValidator(minDate: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const minDateObj = new Date(minDate);
      minDateObj.setHours(0, 0, 0, 0);
      
      return selectedDate >= minDateObj ? null : { minDate: true };
    };
  }

  // Custom validator to ensure check-out is after check-in
  dateRangeValidator(form: AbstractControl): ValidationErrors | null {
    const checkIn = form.get('checkIn')?.value;
    const checkOut = form.get('checkOut')?.value;
    
    if (!checkIn || !checkOut) return null;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    return checkOutDate > checkInDate ? null : { invalidDateRange: true };
  }

  onCheckAvailability(): void {
    if (this.bookingForm.valid) {
      // Store the search criteria before navigating
      const searchCriteria = this.bookingForm.value;
      localStorage.setItem('bookingSearch', JSON.stringify(searchCriteria));
      
      // Navigate to rooms page
      this.navigateToRooms();
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  // Helper method to mark all form fields as touched
  private markFormGroupTouched(): void {
    Object.keys(this.bookingForm.controls).forEach(key => {
      const control = this.bookingForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access in template
  get checkIn() { return this.bookingForm.get('checkIn'); }
  get checkOut() { return this.bookingForm.get('checkOut'); }

  navigateToRooms(): void {
    this.router.navigate(['/rooms']);
  }

  scrollToContact(): void {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Slideshow methods
  private initSlideshow(): void {
    setTimeout(() => {
      this.slides = Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
      
      if (this.slides.length > 0) {
        // Start with first slide active
        this.slides[0].classList.add('slide-active');
        this.startSlideshow();
      }
    }, 100);
  }

  private startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // slide duration
  }

  private nextSlide(): void {
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove('slide-active');
    
    // Move to next slide
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    
    // Add active class to new slide
    this.slides[this.currentSlide].classList.add('slide-active');
  }


}