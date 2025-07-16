import { NextRequest, NextResponse } from 'next/server';

interface SearchRequest {
  query: string;
  budget?: number;
  location?: string;
}

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

interface SearchResponse {
  summary: string;
  results: SearchResult[];
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();
    const { query, budget, location } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.LINKUP_API_KEY) {
      return NextResponse.json(
        { error: 'Search service is not configured. Please add your LINKUP_API_KEY.' },
        { status: 500 }
      );
    }

    // Step 1: Call Linkup.so API with correct parameters
    const searchQuery = `${query} ${location ? `in ${location}` : ''} ${budget ? `budget ${budget}` : ''}`;
    
    const linkupResponse = await fetch('https://api.linkup.so/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINKUP_API_KEY}`,
      },
      body: JSON.stringify({
        q: searchQuery,
        depth: 'deep',
        outputType: 'searchResults'
      }),
    });

    if (!linkupResponse.ok) {
      const errorText = await linkupResponse.text();
      console.error('Linkup API error:', linkupResponse.status, errorText);
      throw new Error(`Linkup API error: ${linkupResponse.status} - ${errorText}`);
    }

    const linkupData = await linkupResponse.json();
    console.log('Linkup response:', JSON.stringify(linkupData, null, 2));
    
    // Extract results from the response - Linkup returns 'results' not 'sources'
    const searchResults = linkupData.results || [];

    // If no results found, return a helpful message
    if (!searchResults || searchResults.length === 0) {
      return NextResponse.json({
        summary: "No properties found matching your criteria. Try adjusting your search terms or location.",
        results: []
      });
    }

    // Step 2: Call OpenAI for summarization
    if (!process.env.OPENAI_API_KEY) {
      // If OpenAI is not configured, return results without summary
      const response: SearchResponse = {
        summary: `Found ${searchResults.length} properties matching your search for "${query}"${location ? ` in ${location}` : ''}${budget ? ` with a budget of $${budget}` : ''}.`,
        results: searchResults.map((result: any) => ({
          title: result.name || 'Property Listing',
          snippet: result.content || result.snippet || 'No description available',
          url: result.url || '#'
        }))
      };
      return NextResponse.json(response);
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful real estate assistant. Provide concise, factual summaries of real estate search results.'
          },
          {
            role: 'user',
            content: `Based on the following real estate search results, provide a concise summary that addresses the user's query: "${query}" ${budget ? `with a budget of $${budget}` : ''} ${location ? `in ${location}` : ''}. 

Search Results:
${searchResults.map((result: any) => `${result.name}: ${result.content || result.snippet}`).join('\n\n')}

Please provide a 2-3 sentence summary focusing on the most relevant properties and key details.`
          }
        ],
        max_tokens: 200,
        temperature: 0.3
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', openaiResponse.status, errorText);
      throw new Error(`OpenAI API error: ${openaiResponse.status} - ${errorText}`);
    }

    const openaiData = await openaiResponse.json();
    const summary = openaiData.choices[0]?.message?.content || 'No summary available';

    // Step 3: Return summarized data
    const response: SearchResponse = {
      summary,
      results: searchResults.map((result: any) => ({
        title: result.name || 'Property Listing',
        snippet: result.content || result.snippet || 'No description available',
        url: result.url || '#'
      }))
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to process search request. Please try again.' },
      { status: 500 }
    );
  }
} 