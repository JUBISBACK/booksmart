# BookSmart

A modern web application for tracking your reading progress, setting reading goals, and connecting with other readers.

## Features

- 📚 Track your reading progress with detailed statistics
- 🎯 Set and track reading goals
- 📊 View reading analytics and trends
- 🎯 Participate in reading challenges
- 📝 Maintain a reading journal
- 💬 Connect with other readers in book clubs
- 💡 Get personalized book recommendations
- 🤖 Chat with an AI reading companion

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js
- OpenAI GPT-4
- Radix UI
- TanStack Query

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/booksmart.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/booksmart"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Deployment

The application is ready for deployment to Vercel. Follow these steps:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy to production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
