# Spectrum AI - AI Automations Agency Website

A modern, responsive website for an AI automation agency built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient accents
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Next.js 14**: Latest React framework with App Router

## 📋 Pages

- **Home**: Hero section, features, statistics, and call-to-action
- **About**: Company information, mission, values, and team
- **Services**: Detailed service offerings and technology stack
- **Case Studies**: Success stories and client testimonials
- **Contact**: Contact form and company information
- **404**: Custom error page

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (ready for integration)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spectrum-ai-website.git
cd spectrum-ai-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
spectrum-ai-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── case-studies/      # Case studies page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary: Blue gradient (`primary-500` to `primary-900`)
- Secondary: Purple gradient (`secondary-500` to `secondary-900`)
- Dark: Gray scale (`dark-50` to `dark-900`)

### Content
Update the content in each page component to match your business:
- Company information in `app/about/page.tsx`
- Services in `app/services/page.tsx`
- Case studies in `app/case-studies/page.tsx`
- Contact information in `app/contact/page.tsx`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder

### Other Platforms
The project is compatible with any platform that supports Next.js.

## 🔗 Backend Integration

The contact form is ready for Supabase integration:

1. Set up a Supabase project
2. Create a `contacts` table
3. Add environment variables
4. Implement form submission logic

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email hello@spectrumai.com or create an issue in this repository.

---

Built with ❤️ by Spectrum AI Team 