#!/usr/bin/env python3
"""
Test script for AI Agent Orchestration
Run this to see the complete workflow output
"""
import asyncio
import json
import sys
import os
from datetime import datetime

# Add project root to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the orchestration components
try:
    from agents.agent_orchestrator import agent_orchestrator
    from backend.app.services.langchain_agents import workflow_orchestrator
    from backend.app.database import get_db, Project
except ImportError as e:
    print(f"❌ Import Error: {e}")
    print("Make sure you're running this from the project root directory")
    sys.exit(1)


async def create_test_project():
    """Create a test project for orchestration"""
    try:
        db = next(get_db())
        
        # Create test project
        test_project = Project(
            business_name="Test AI Company",
            email="test@aicompany.com",
            website_type="business",
            design_style="modern",
            budget=500,
            features=["analytics", "mobile_responsive", "ssl_security", "contact_form"],
            project_description="Test project for AI orchestration",
            status="processing",
            created_at=datetime.utcnow()
        )
        
        db.add(test_project)
        db.commit()
        db.refresh(test_project)
        
        return test_project.id
    except Exception as e:
        print(f"❌ Error creating test project: {e}")
        return None


async def test_orchestration():
    """Test the complete orchestration workflow"""
    print("🚀 STARTING AI AGENT ORCHESTRATION TEST")
    print("=" * 60)
    
    # Create test project
    project_id = await create_test_project()
    if not project_id:
        print("❌ Failed to create test project")
        return
    
    print(f"✅ Created test project with ID: {project_id}")
    print()
    
    try:
        # Run the orchestration workflow
        print("🤖 EXECUTING 6-AGENT WORKFLOW...")
        print("-" * 40)
        
        # You can test either orchestrator:
        # Option 1: Use the agent_orchestrator (from agents/ directory)
        result = await agent_orchestrator.execute_workflow(project_id)
        
        # Option 2: Use the workflow_orchestrator (from backend/app/services/)
        # result = await workflow_orchestrator.run_workflow(project_id)
        
        print("🎯 WORKFLOW EXECUTION COMPLETED!")
        print("=" * 60)
        print()
        
        # Display results
        print("📊 FINAL WORKFLOW RESULTS:")
        print("-" * 30)
        print(json.dumps(result, indent=2, default=str))
        print()
        
        # Show expected agent outputs
        if "error" not in result:
            print("✅ SUCCESSFUL AGENT EXECUTION SEQUENCE:")
            print("-" * 40)
            
            agents_completed = []
            if result.get("design_completed"):
                agents_completed.append("🎨 Design Agent")
            if result.get("development_completed"):
                agents_completed.append("💻 Development Agent")
            if result.get("qa_completed"):
                agents_completed.append("🔍 QA Agent")
            if result.get("deployment_completed"):
                agents_completed.append("🚀 Deployment Agent")
            if result.get("analytics_completed"):
                agents_completed.append("📊 Analytics Agent")
            if result.get("notification_completed"):
                agents_completed.append("📧 Notification Agent")
            
            for i, agent in enumerate(agents_completed, 1):
                print(f"{i}. {agent} ✅")
            
            print()
            print("🎁 DELIVERABLES GENERATED:")
            print("-" * 25)
            
            if result.get("design_mockups"):
                print("🎨 Design mockups and specifications")
            if result.get("development_plan"):
                print("💻 Technical architecture and code structure")
            if result.get("test_results"):
                print("🔍 QA test results and quality metrics")
            if result.get("live_url"):
                print(f"🚀 Live website: {result.get('live_url')}")
            if result.get("analytics_dashboard_url"):
                print(f"📊 Analytics dashboard: {result.get('analytics_dashboard_url')}")
            if result.get("notification_completed"):
                print("📧 Client notifications sent")
        else:
            print("❌ WORKFLOW FAILED:")
            print(f"Error: {result.get('error')}")
    
    except Exception as e:
        print(f"❌ ORCHESTRATION TEST FAILED: {e}")
        import traceback
        traceback.print_exc()


def print_expected_output_guide():
    """Print what the user should expect to see"""
    print("""
🔍 EXPECTED OUTPUT WHEN RUNNING ORCHESTRATION:
═══════════════════════════════════════════════

📋 WORKFLOW SEQUENCE:
1. 🎨 Design Agent (5 min) - Creates mockups and design specs
2. 💻 Development Agent (3 min) - Generates code architecture
3. 🔍 QA Agent (2 min) - Performs quality testing
4. 🚀 Deployment Agent (3 min) - Deploys to live URL
5. 📊 Analytics Agent (1 min) - Sets up tracking
6. 📧 Notification Agent (2 min) - Sends completion notifications

📊 EXPECTED FINAL STATE STRUCTURE:
{
  "project_id": 123,
  "design_completed": true,
  "design_mockups": [...],
  "design_timestamp": "2024-01-01T12:00:00Z",
  
  "development_completed": true,
  "development_plan": {...},
  "development_timestamp": "2024-01-01T12:03:00Z",
  
  "qa_completed": true,
  "test_results": {
    "tests_passed": 58,
    "tests_failed": 2,
    "success_rate": 96.7,
    "quality_score": 95
  },
  "qa_timestamp": "2024-01-01T12:05:00Z",
  
  "deployment_completed": true,
  "live_url": "https://test-ai-company.vercel.app",
  "deployment_timestamp": "2024-01-01T12:08:00Z",
  
  "analytics_completed": true,
  "google_analytics_config": {...},
  "analytics_dashboard_url": "https://analytics.google.com/...",
  "analytics_timestamp": "2024-01-01T12:09:00Z",
  
  "notification_completed": true,
  "notification_timestamp": "2024-01-01T12:11:00Z"
}

⏱️ TOTAL EXECUTION TIME: ~16 minutes
✅ SUCCESS RATE: 95%+ quality score
🎁 DELIVERABLES: 7 final outputs for client

🚀 TO RUN THE TEST:
python test_orchestration.py
    """)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--help":
        print_expected_output_guide()
    else:
        asyncio.run(test_orchestration()) 