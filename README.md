# Real Estate Search

A modern, interactive web application that functions as a specialized search engine for real estate, similar to Perplexity, but focused on specific, pre-defined websites.

## Features

- **AI-Powered Search**: Uses OpenAI to summarize real estate search results
- **Web Search Integration**: Leverages Linkup.so to search across top real estate websites
- **Modern UI**: Beautiful glassmorphism design with Framer Motion animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Natural Language Queries**: Search with natural language like "3 bedroom apartment in downtown"

## Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Web Search**: Linkup.so API
- **AI Summarization**: OpenAI API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate-search
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
LINKUP_API_KEY=your_linkup_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Getting API Keys

1. **Linkup.so API Key**:
   - Visit [Linkup.so](https://linkup.so/)
   - Sign up for an account
   - Get your API key from the dashboard

2. **OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in
   - Create a new API key

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Enter your search query** in natural language (e.g., "3 bedroom apartment in downtown")
2. **Add optional filters**:
   - Budget: Enter your maximum budget
   - Location: Specify the city or area
3. **Click "Search Properties"** to find results
4. **View the AI summary** and individual property listings
5. **Click "View Property"** to visit the original listing

## Supported Real Estate Websites

The application searches across these major real estate platforms:
- Zillow.com
- Realtor.com
- Redfin.com
- Trulia.com
- Apartments.com

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # API endpoint for search
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main search interface
```

## Future Enhancements

- **Database Integration**: Supabase for saving search history
- **Authentication**: Kinde for user accounts
- **Advanced Filters**: More property filters (bedrooms, bathrooms, etc.)
- **Saved Searches**: Save and manage favorite searches
- **Property Alerts**: Get notified of new matching properties

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
