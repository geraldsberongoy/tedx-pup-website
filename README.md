# TEDxPUP Event Website

**Frontend Developer Challenge: Freestyle Edition Submission**

A modern, mobile-first website for the TEDxPUP event at Polytechnic University of the Philippines. This project showcases fundamental web development skills through a complete, responsive website built from scratch using only HTML5, CSS3, and Vanilla JavaScript.

## Table of Contents

- [Challenge Overview](#challenge-overview)
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Technical Requirements Met](#technical-requirements-met)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Live Demo](#live-demo)
- [Development Process](#development-process)
- [Credits](#credits)

---

## Challenge Overview

This project was created as part of the **Frontend Developer Challenge: Freestyle Edition**, where developers showcase their skills by building a complete website using only fundamental web technologies. I chose **Option 2: TEDxPUP Website** to create an inspiring event site featuring speakers, schedule, registration, and more.

## Project Description

This TEDxPUP website serves as a comprehensive platform for the TEDx event at Polytechnic University of the Philippines. The site features:

- **Inspiring Design**: Glass-morphism aesthetics with TEDx red accents
- **Complete Event Information**: Speakers lineup, event schedule, and registration
- **Interactive Elements**: Modal dialogs, animated transitions, hover effects
- **Mobile-First Approach**: Responsive design across all device sizes
- **Professional Structure**: Clean, maintainable code organization
- **Accessibility Focus**: Semantic HTML and keyboard navigation support

## Features

### Design & User Experience

- **Modern Glass-morphism UI**: Visually striking design with TEDx red accents
- **Responsive Layout**: Mobile-first approach with seamless adaptation across devices
- **Interactive Elements**: Engaging hover effects, smooth transitions, and micro-interactions
- **Brand Consistency**: Professional TEDx-inspired design language throughout

### Technical Implementation

- **Semantic HTML5**: Clean, accessible markup structure
- **Modular CSS**: Organized stylesheets for maintainability (Grid/Flexbox layouts)
- **Vanilla JavaScript**: Interactive functionality without framework dependencies
- **Performance Optimized**: Fast loading times on both mobile and desktop
- **Touch-Friendly**: All interactive elements designed for mobile interaction

### Content Sections

- **Hero Section**: Eye-catching landing with event countdown
- **About Section**: Event mission and vision
- **Speakers Lineup**: Interactive modal system with speaker details
- **Event Schedule**: Responsive grid layout with session information
- **Registration**: Free ticket system for PUP students/organizations
- **Sponsors**: Tiered display with engaging hover effects
- **Footer**: Comprehensive contact and social media information

## Technologies Used

**Core Technologies (Challenge Requirement)**

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with Grid, Flexbox, and custom properties
- **Vanilla JavaScript (ES6)**: Interactive functionality without frameworks

**Design Implementation**

- **CSS Grid & Flexbox**: Modern layout systems for responsive design
- **CSS Custom Properties**: Maintainable color and spacing variables
- **Media Queries**: Mobile-first responsive breakpoints
- **CSS Animations**: Smooth transitions and micro-interactions
- **SVG Icons**: Scalable social media and UI icons

**Mock Data Sources**

- **Realistic Speaker Profiles**: Industry-relevant speaker information
- **Event Schedule**: Believable TEDx session lineup
- **Sponsor Images**: [picsum.photos](https://picsum.photos/) placeholder service

## Technical Requirements Met

✅ **Core Technologies**: HTML5, CSS3, Vanilla JavaScript only  
✅ **Mobile-First Design**: Responsive across 320px+, 768px+, 1024px+ breakpoints  
✅ **Touch-Friendly**: All interactive elements optimized for mobile  
✅ **Performance**: Optimized loading with efficient CSS and minimal JavaScript  
✅ **Clean Code Organization**: Professional file structure with separated concerns  
✅ **Semantic HTML**: Accessible markup structure  
✅ **Modern CSS Layouts**: Extensive use of Grid and Flexbox  
✅ **Interactive Elements**: Modal dialogs, form validation, animated transitions  
✅ **Mock Data**: Realistic content for speakers, schedule, and sponsors

## Setup Instructions

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/geraldsberongoy/aws.git
   cd aws
   ```

2. **Serve locally** (choose one method):

   ```bash
   # Option 1: Python 3.x
   python -m http.server 8080

   # Option 2: Node.js (if installed)
   npx http-server

   # Option 3: VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8080` (or the port shown by your server)

### Customization

- **Images**: Replace placeholder images in `assets/images/`
- **Content**: Update event details in `index.html`
- **Styling**: Modify CSS files in `assets/css/` for design changes
- **Functionality**: Extend JavaScript in `assets/js/scripts.js`

## Folder Structure

```
aws/
├── index.html                 # Main HTML file
├── README.md                 # Project documentation
└── assets/
    ├── css/                  # Modular stylesheets
    │   ├── styles.css        # Global styles and variables
    │   ├── hero.css          # Landing section
    │   ├── about.css         # About section
    │   ├── speakers.css      # Speakers and modal
    │   ├── schedule.css      # Event schedule
    │   ├── tickets.css       # Registration form
    │   ├── sponsors.css      # Sponsors section
    │   └── footer.css        # Footer styling
    ├── js/
    │   └── scripts.js        # Interactive functionality
    └── images/               # Image assets
        └── (placeholder images)
```

## Live Demo

🚀 **Live Site**: [https://geraldsberongoy.github.io/tedx-pup-website/](https://geraldsberongoy.github.io/tedx-pup-website/)

> **Note**: If deploying to a different platform (Netlify, Vercel), update the link above.

## Development Process

### Design Decisions

- **Mobile-First Approach**: Started with mobile layout, then enhanced for larger screens
- **Modular Architecture**: Separated CSS files for maintainability and scalability
- **Performance Focus**: Optimized images and minimal JavaScript for fast loading
- **Accessibility Priority**: Semantic HTML and keyboard navigation throughout

### Key Challenges Solved

- **Responsive Modal System**: Custom JavaScript modal with proper focus management
- **Complex Grid Layouts**: CSS Grid for schedule and sponsors sections
- **Touch Interactions**: Mobile-optimized hover states and touch targets
- **Cross-Browser Compatibility**: Tested across modern browsers

### Code Quality

- **Clean Structure**: Logical file organization and naming conventions
- **Semantic HTML**: Proper heading hierarchy and ARIA attributes
- **Modern CSS**: Custom properties, Grid, Flexbox, and efficient selectors
- **Vanilla JavaScript**: ES6+ features without framework dependencies

## Credits

- **Developer**: geraldsberongoy
- **Challenge**: Frontend Developer Challenge: Freestyle Edition
- **Institution**: Polytechnic University of the Philippines (PUP)
- **Design Inspiration**: TEDx official branding guidelines
- **Images**: [picsum.photos](https://picsum.photos/) placeholder service

---

**Project Submission**: This website demonstrates fundamental web development skills, creative problem-solving, and the ability to deliver a complete project from concept to deployment using only core web technologies.

For questions, feedback, or contributions, please open an issue or pull request on GitHub.
