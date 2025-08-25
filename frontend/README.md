# Video Summarizer SaaS Frontend

A modern, responsive React SaaS application for video summarization with authentication, dashboard, and pricing features.

## 🚀 Features

- **Modern React 19** with Vite build tool
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side routing
- **Context API** for state management
- **Responsive Design** for all device sizes
- **Authentication System** with protected routes
- **Dashboard** with sidebar navigation
- **Pricing Page** with subscription plans
- **Profile Management** with editable forms
- **Reusable Components** (Button, Modal, Input, Sidebar)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Icons**: React Icons
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AuthLayout.jsx   # Authentication page layout
│   │   ├── Button.jsx       # Reusable button component
│   │   ├── Footer.jsx       # Site footer
│   │   ├── HeroSection.jsx  # Landing page hero
│   │   ├── Inputs/          # Form input components
│   │   ├── Modal.jsx        # Modal/dialog component
│   │   ├── Navbar.jsx       # Navigation header
│   │   ├── Sidebar.jsx      # Dashboard sidebar
│   │   └── ...              # Other components
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── Auth/            # Authentication pages
│   │   ├── Dashboard/       # Dashboard pages
│   │   ├── Home.jsx         # Landing page
│   │   ├── Pricing.jsx      # Pricing page
│   │   └── Profile.jsx      # User profile page
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#4f46e5)
- **Secondary**: Cyan (#06b6d4)
- **Text**: Gray (#1f2937)
- **Background**: Gray (#f9fafb)

### Typography
- **Font Family**: Poppins
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Cards**: Consistent shadow and border radius
- **Forms**: Clean input styling with validation
- **Navigation**: Responsive navbar and sidebar

## 🔐 Authentication

The app includes a complete authentication system:

- **Login/Register** forms with validation
- **Protected Routes** for authenticated users
- **Context-based** state management
- **Token-based** authentication (localStorage)
- **Route Guards** for unauthorized access

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interactions on mobile

## 🧩 Component Library

### Core Components

- **Button**: Multiple variants and sizes
- **Input**: Form inputs with validation states
- **Modal**: Overlay dialogs and confirmations
- **Sidebar**: Collapsible navigation sidebar
- **Navbar**: Responsive navigation header

### Usage Examples

```jsx
// Button Component
<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>

// Modal Component
<Modal isOpen={isOpen} onClose={handleClose} title="Example Modal">
  <p>Modal content goes here</p>
</Modal>

// Input Component
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={handleChange}
/>
```

## 🚧 Future Enhancements

- [ ] **Backend Integration** - Connect to MERN backend
- [ ] **Stripe Integration** - Payment processing
- [ ] **Real-time Features** - WebSocket integration
- [ ] **Advanced Analytics** - User behavior tracking
- [ ] **Multi-language Support** - Internationalization
- [ ] **Dark Mode** - Theme switching
- [ ] **PWA Features** - Offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ using React and Tailwind CSS
