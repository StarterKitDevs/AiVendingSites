import asyncio
import sys
import os
from datetime import datetime
from pathlib import Path

# Fix paths
project_root = Path(__file__).parent.absolute()
sys.path.insert(0, str(project_root))
sys.path.insert(0, str(project_root / "backend"))

async def test_with_mocks():
    print("🧪 TESTING WITH MOCKED DEPENDENCIES")
    print("=" * 40)
    
    # Mock the problematic imports
    import types
    
    # Create mock modules
    mock_app = types.ModuleType('app')
    mock_services = types.ModuleType('app.services')
    mock_perplexity = types.ModuleType('app.services.perplexity_service')
    mock_database = types.ModuleType('app.database')
    
    # Create mock perplexity service
    class MockPerplexityService:
        async def chat_completion(self, prompt, context=None):
            print(f"🧠 AI Processing: {prompt[:50]}...")
            await asyncio.sleep(1)  # Simulate API call
            return {
                "response": "Mock AI response with comprehensive analysis and recommendations",
                "usage": {"tokens": 150}
            }
    
    # Create mock database classes
    class MockProject:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
    
    def mock_get_db():
        return None
    
    class MockAgentLog:
        def __init__(self, **kwargs):
            pass
    
    # Set up mocks
    mock_perplexity.perplexity_service = MockPerplexityService()
    mock_database.get_db = mock_get_db
    mock_database.Project = MockProject
    mock_database.AgentLog = MockAgentLog
    
    # Install in sys.modules
    sys.modules['app'] = mock_app
    sys.modules['app.services'] = mock_services
    sys.modules['app.services.perplexity_service'] = mock_perplexity
    sys.modules['app.database'] = mock_database
    
    # Now import and test real agents
    try:
        from agents.qa_agent import QAAgent
        
        print("✅ QA Agent imported successfully")
        
        # Test QA Agent
        qa = QAAgent()
        test_state = {
            "project_id": 123,
            "development_completed": True
        }
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] 🔍 QA Agent Starting...")
        result = await qa.execute(123, test_state)
        print(f"[{datetime.now().strftime('%H:%M:%S')}] 🔍 QA Agent Completed ✅")
        
        print(f"✅ QA Completed: {result.get('qa_completed')}")
        print(f"🧪 Test Results: {result.get('test_results', {}).get('success_rate', 'N/A')}%")
        print(f"🏆 Quality Score: {result.get('quality_metrics', {}).get('overall_score', 'N/A')}")
        
        return result
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    result = asyncio.run(test_with_mocks())
    if result:
        print("\n🎉 SUCCESS: Real agent executed with mocked dependencies!")
    else:
        print("\n❌ Test failed")
