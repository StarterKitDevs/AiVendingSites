import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName,
      email,
      budget,
      websiteType,
      designStyle,
      projectDescription,
      businessGoals,
      targetAudience,
      competitors,
      specialRequirements,
      features,
      images,
      estimatedPrice
    } = body;

    // Validate required fields
    if (!businessName || !email || !websiteType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: businessName, email, and websiteType are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Create project data
    const projectData = {
      id: Date.now(), // Simple ID generation
      businessName,
      email,
      budget,
      websiteType,
      designStyle,
      projectDescription,
      businessGoals,
      targetAudience,
      competitors,
      specialRequirements,
      features,
      images: images || [],
      estimatedPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toISOString()
    };

    // Log the project submission (in production, this would save to database)
    console.log('New quote submission:', {
      id: projectData.id,
      businessName,
      email,
      websiteType,
      estimatedPrice,
      timestamp: projectData.createdAt
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Trigger AI workflow
    // 4. Set up project tracking

    // Simulate successful submission
    return NextResponse.json({
      success: true,
      message: 'Quote submitted successfully! We\'ll contact you within 24 hours.',
      projectId: projectData.id,
      estimatedDelivery: '24-48 hours',
      nextSteps: [
        'Review your project requirements',
        'Prepare initial design concepts',
        'Schedule consultation call',
        'Begin development process'
      ],
      contactInfo: {
        email: 'hello@aiwebagency.com',
        phone: '(555) 123-4567'
      }
    });

  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process quote submission. Please try again.' 
      },
      { status: 500 }
    );
  }
} 