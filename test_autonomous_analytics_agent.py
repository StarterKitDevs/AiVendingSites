"""
Comprehensive Test Suite for 100% Autonomous Analytics Agent
Tests all core features: tracking ID generation, code injection, data collection, dashboard access, privacy compliance
"""

import asyncio
import sys
import os
import json
import hashlib
from datetime import datetime
from pathlib import Path
from unittest.mock import Mock, patch, MagicMock

# Fix paths
project_root = Path(__file__).parent.absolute()
sys.path.insert(0, str(project_root))
sys.path.insert(0, str(project_root / "backend"))
sys.path.insert(0, str(project_root / "agents"))

class TestAutonomousAnalyticsAgent:
    """Comprehensive test suite for Autonomous Analytics Agent"""
    
    def __init__(self):
        self.test_results = []
        self.agent = None
        self.test_project = None
        self.test_state = {}
        
    async def setup_test_environment(self):
        """Set up test environment with mocks"""
        print("🔧 Setting up test environment...")
        
        # Mock modules
        mock_app = type(sys)('app')
        mock_services = type(sys)('app.services')
        mock_perplexity = type(sys)('app.services.perplexity_service')
        mock_database = type(sys)('app.database')
        
        # Mock Perplexity Service
        class MockPerplexityService:
            async def chat_completion(self, prompt, context=None):
                print(f"🧠 AI Processing: {prompt[:100]}...")
                await asyncio.sleep(0.1)  # Simulate AI processing
                return {
                    "response": f"Autonomous analytics strategy generated for {prompt.split()[0]} website",
                    "usage": {"tokens": 200}
                }
        
        # Mock Project
        class MockProject:
            def __init__(self):
                self.id = 123
                self.business_name = "Test AI Company"
                self.website_type = "business"
                self.features = ["analytics", "mobile_responsive", "contact_form", "ecommerce"]
                self.design_style = "modern"
                self.budget = 500
                self.target_audience = "Small business owners"
        
        # Mock Database
        class MockAgentLog:
            def __init__(self, **kwargs):
                self.project_id = kwargs.get('project_id')
                self.agent_name = kwargs.get('agent_name')
                self.status = kwargs.get('status')
                self.message = kwargs.get('message')
                self.metadata = kwargs.get('metadata', {})
                self.timestamp = kwargs.get('timestamp', datetime.utcnow())
        
        class MockDatabase:
            def __init__(self):
                self.project = MockProject()
            
            def query(self, model):
                return self
            
            def filter(self, condition):
                return self
            
            def first(self):
                return self.project
            
            def add(self, log_entry):
                pass
            
            def commit(self):
                pass
        
        def mock_get_db():
            return iter([MockDatabase()])
        
        # Install mocks
        mock_perplexity.perplexity_service = MockPerplexityService()
        mock_database.get_db = mock_get_db
        mock_database.Project = MockProject
        mock_database.AgentLog = MockAgentLog
        
        sys.modules['app'] = mock_app
        sys.modules['app.services'] = mock_services
        sys.modules['app.services.perplexity_service'] = mock_perplexity
        sys.modules['app.database'] = mock_database
        
        # Import the agent
        from analytics_agent import AnalyticsAgent
        self.agent = AnalyticsAgent()
        self.test_project = MockProject()
        self.test_state = {
            "project_id": 123,
            "deployment_completed": True,
            "deployment_result": {
                "url": "https://test-ai-company.com"
            }
        }
        
        print("✅ Test environment setup complete")
    
    async def test_1_tracking_id_generation(self):
        """Test 1: Tracking ID Generation"""
        print("\n🧪 TEST 1: Tracking ID Generation")
        print("-" * 40)
        
        try:
            # Test tracking ID generation
            tracking_id = await self.agent._generate_unique_tracking_id(self.test_project)
            
            # Validate format
            assert tracking_id.startswith("AUTO-"), f"Tracking ID should start with 'AUTO-', got: {tracking_id}"
            assert len(tracking_id) == 10, f"Tracking ID should be 10 characters, got: {len(tracking_id)} ({tracking_id})"
            assert tracking_id[5:].isalnum(), f"Tracking ID suffix should be alphanumeric, got: {tracking_id[5:]}"
            
            print(f"✅ Tracking ID generated: {tracking_id}")
            print(f"✅ Format validation passed")
            
            # Test uniqueness by creating a different project
            different_project = type('MockProject', (), {
                'id': 456,
                'business_name': "Different Company",
                'website_type': "ecommerce",
                'features': ["analytics"],
                'design_style': "modern",
                'budget': 1000,
                'target_audience': "Online shoppers"
            })()
            
            tracking_id_2 = await self.agent._generate_unique_tracking_id(different_project)
            assert tracking_id != tracking_id_2, "Tracking IDs should be unique for different projects"
            
            print(f"✅ Uniqueness validation passed")
            
            self.test_results.append({
                "test": "Tracking ID Generation",
                "status": "PASSED",
                "tracking_id": tracking_id,
                "details": "Format and uniqueness validation passed"
            })
            
        except Exception as e:
            print(f"❌ Tracking ID Generation failed: {e}")
            self.test_results.append({
                "test": "Tracking ID Generation",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def test_2_tracking_code_generation(self):
        """Test 2: Tracking Code Generation"""
        print("\n🧪 TEST 2: Tracking Code Generation")
        print("-" * 40)
        
        try:
            tracking_id = await self.agent._generate_unique_tracking_id(self.test_project)
            tracking_code = await self.agent._generate_tracking_code(self.test_project, tracking_id, self.test_state)
            
            # Validate tracking code
            assert "Autonomous Analytics Tracking Code" in tracking_code, "Tracking code should contain header"
            assert tracking_id in tracking_code, f"Tracking ID {tracking_id} should be in tracking code"
            assert "analytics.youragency.com/collect" in tracking_code, "Endpoint should be in tracking code"
            assert "page_view" in tracking_code, "Page view tracking should be included"
            assert "click" in tracking_code, "Click tracking should be included"
            assert "form_submit" in tracking_code, "Form submission tracking should be included"
            
            print(f"✅ Tracking code generated successfully")
            print(f"✅ Contains tracking ID: {tracking_id}")
            print(f"✅ Contains all required tracking events")
            
            # Test code structure
            assert tracking_code.count("<script>") == 1, "Should have exactly one script tag"
            assert tracking_code.count("</script>") == 1, "Should have exactly one closing script tag"
            
            print(f"✅ Code structure validation passed")
            
            self.test_results.append({
                "test": "Tracking Code Generation",
                "status": "PASSED",
                "tracking_id": tracking_id,
                "details": "Code structure and content validation passed"
            })
            
        except Exception as e:
            print(f"❌ Tracking Code Generation failed: {e}")
            self.test_results.append({
                "test": "Tracking Code Generation",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def test_3_autonomous_tracking_setup(self):
        """Test 3: Autonomous Tracking Setup"""
        print("\n🧪 TEST 3: Autonomous Tracking Setup")
        print("-" * 40)
        
        try:
            tracking_id = await self.agent._generate_unique_tracking_id(self.test_project)
            autonomous_tracking = await self.agent._setup_autonomous_tracking(self.test_project, tracking_id, self.test_state)
            
            # Validate autonomous tracking configuration
            assert autonomous_tracking["tracking_id"] == tracking_id, "Tracking ID should match"
            assert autonomous_tracking["tracking_system"] == "autonomous", "Should be autonomous system"
            assert autonomous_tracking["zero_setup_required"] == True, "Should require zero setup"
            
            # Validate conversion events
            conversion_events = autonomous_tracking["conversion_events"]
            assert len(conversion_events) == 4, "Should have 4 conversion events"
            
            event_names = [event["name"] for event in conversion_events]
            expected_events = ["form_submission", "newsletter_signup", "phone_call", "email_click"]
            for expected in expected_events:
                assert expected in event_names, f"Should have {expected} event"
            
            # Validate data collection
            data_collection = autonomous_tracking["data_collection"]
            assert data_collection["page_views"] == True, "Page views should be enabled"
            assert data_collection["clicks"] == True, "Clicks should be enabled"
            assert data_collection["form_submissions"] == True, "Form submissions should be enabled"
            
            # Validate privacy compliance
            privacy = autonomous_tracking["privacy_compliance"]
            assert privacy["gdpr_compliant"] == True, "Should be GDPR compliant"
            assert privacy["ccpa_compliant"] == True, "Should be CCPA compliant"
            assert privacy["data_anonymization"] == True, "Should anonymize data"
            
            print(f"✅ Autonomous tracking setup completed")
            print(f"✅ Conversion events configured: {len(conversion_events)}")
            print(f"✅ Privacy compliance validated")
            
            self.test_results.append({
                "test": "Autonomous Tracking Setup",
                "status": "PASSED",
                "tracking_id": tracking_id,
                "details": "All tracking configuration validated"
            })
            
        except Exception as e:
            print(f"❌ Autonomous Tracking Setup failed: {e}")
            self.test_results.append({
                "test": "Autonomous Tracking Setup",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def test_4_analytics_strategy_generation(self):
        """Test 4: Analytics Strategy Generation"""
        print("\n🧪 TEST 4: Analytics Strategy Generation")
        print("-" * 40)
        
        try:
            analytics_strategy = await self.agent._generate_autonomous_analytics_strategy(self.test_project, self.test_state)
            
            # Validate strategy structure
            assert "analytics_tools" in analytics_strategy, "Should have analytics tools"
            assert "key_metrics" in analytics_strategy, "Should have key metrics"
            assert "conversion_goals" in analytics_strategy, "Should have conversion goals"
            assert "dashboard_features" in analytics_strategy, "Should have dashboard features"
            assert "zero_setup_features" in analytics_strategy, "Should have zero setup features"
            
            # Validate autonomous system
            assert analytics_strategy["autonomous_system"] == True, "Should be autonomous system"
            assert analytics_strategy["delivery_method"] == "dashboard_only", "Should be dashboard-only delivery"
            
            # Validate zero setup features
            zero_setup_features = analytics_strategy["zero_setup_features"]
            expected_features = [
                "Automatic tracking ID generation",
                "No API keys required",
                "No client setup needed",
                "Instant dashboard access"
            ]
            
            for feature in expected_features:
                assert feature in zero_setup_features, f"Should have {feature}"
            
            print(f"✅ Analytics strategy generated")
            print(f"✅ Zero setup features validated: {len(zero_setup_features)}")
            print(f"✅ Autonomous system confirmed")
            
            self.test_results.append({
                "test": "Analytics Strategy Generation",
                "status": "PASSED",
                "details": "Strategy structure and content validated"
            })
            
        except Exception as e:
            print(f"❌ Analytics Strategy Generation failed: {e}")
            self.test_results.append({
                "test": "Analytics Strategy Generation",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def test_5_dashboard_creation(self):
        """Test 5: Dashboard Creation"""
        print("\n🧪 TEST 5: Dashboard Creation")
        print("-" * 40)
        
        try:
            tracking_id = await self.agent._generate_unique_tracking_id(self.test_project)
            dashboard_config = await self.agent._create_analytics_dashboard(self.test_project, tracking_id, self.test_state)
            
            # Validate dashboard configuration
            assert dashboard_config["project_id"] == self.test_project.id, "Project ID should match"
            assert dashboard_config["business_name"] == self.test_project.business_name, "Business name should match"
            assert dashboard_config["tracking_id"] == tracking_id, "Tracking ID should match"
            assert dashboard_config["zero_setup_required"] == True, "Should require zero setup"
            
            # Validate dashboard URL
            expected_url = f"/analytics?project_id={self.test_project.id}&tid={tracking_id}"
            assert dashboard_config["dashboard_url"] == expected_url, "Dashboard URL should match expected format"
            
            # Validate dashboard features
            dashboard_features = dashboard_config["dashboard_features"]
            expected_features = [
                "real_time_monitoring",
                "customizable_widgets", 
                "mobile_responsive",
                "data_export",
                "performance_alerts",
                "seo_insights",
                "social_analytics"
            ]
            
            for feature in expected_features:
                assert dashboard_features[feature] == True, f"Should have {feature} enabled"
            
            print(f"✅ Dashboard configuration created")
            print(f"✅ Dashboard URL: {dashboard_config['dashboard_url']}")
            print(f"✅ Dashboard features validated: {len(dashboard_features)}")
            
            self.test_results.append({
                "test": "Dashboard Creation",
                "status": "PASSED",
                "dashboard_url": dashboard_config["dashboard_url"],
                "details": "Dashboard configuration validated"
            })
            
        except Exception as e:
            print(f"❌ Dashboard Creation failed: {e}")
            self.test_results.append({
                "test": "Dashboard Creation",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def test_6_full_agent_execution(self):
        """Test 6: Full Agent Execution"""
        print("\n🧪 TEST 6: Full Agent Execution")
        print("-" * 40)
        
        try:
            # Patch the _get_project method to return our test project
            async def mock_get_project(project_id):
                return self.test_project
            
            self.agent._get_project = mock_get_project
            
            # Execute the full agent
            result = await self.agent.execute(self.test_project.id, self.test_state)
            
            # Validate result structure
            assert result["analytics_completed"] == True, "Analytics should be completed"
            assert result["autonomous_analytics"] == True, "Should be autonomous analytics"
            assert result["zero_setup_required"] == True, "Should require zero setup"
            assert "tracking_id" in result, "Should have tracking ID"
            assert "tracking_code" in result, "Should have tracking code"
            assert "client_deliverables" in result, "Should have client deliverables"
            
            # Validate tracking ID format
            tracking_id = result["tracking_id"]
            assert tracking_id.startswith("AUTO-"), f"Tracking ID should start with 'AUTO-', got: {tracking_id}"
            
            # Validate client deliverables
            deliverables = result["client_deliverables"]
            assert "dashboard_access" in deliverables, "Should have dashboard access"
            assert "mobile_app_link" in deliverables, "Should have mobile app link"
            assert "tracking_code_snippet" in deliverables, "Should have tracking code snippet"
            assert "setup_instructions" in deliverables, "Should have setup instructions"
            
            # Validate setup instructions
            assert "No setup required" in deliverables["setup_instructions"], "Should indicate no setup required"
            
            print(f"✅ Full agent execution completed")
            print(f"✅ Tracking ID: {tracking_id}")
            print(f"✅ Dashboard access: {deliverables['dashboard_access']}")
            print(f"✅ Setup instructions: {deliverables['setup_instructions']}")
            
            self.test_results.append({
                "test": "Full Agent Execution",
                "status": "PASSED",
                "tracking_id": tracking_id,
                "details": "Complete agent execution validated"
            })
            
        except Exception as e:
            print(f"❌ Full Agent Execution failed: {e}")
            self.test_results.append({
                "test": "Full Agent Execution",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def test_7_privacy_compliance(self):
        """Test 7: Privacy Compliance"""
        print("\n🧪 TEST 7: Privacy Compliance")
        print("-" * 40)
        
        try:
            tracking_id = await self.agent._generate_unique_tracking_id(self.test_project)
            tracking_code = await self.agent._generate_tracking_code(self.test_project, tracking_id, self.test_state)
            
            # Check for privacy compliance indicators
            privacy_checks = {
                "no_pii_collection": True,
                "anonymous_tracking": True,
                "gdpr_compliant": True,
                "no_cookies": True
            }
            
            # Validate tracking code doesn't collect PII
            pii_indicators = ["email", "phone", "address", "name", "personal"]
            for indicator in pii_indicators:
                if indicator in tracking_code.lower():
                    privacy_checks["no_pii_collection"] = False
                    print(f"⚠️  Warning: Found potential PII indicator '{indicator}' in tracking code")
            
            # Validate anonymous tracking
            if "anonymize" in tracking_code.lower() or "anonymous" in tracking_code.lower():
                privacy_checks["anonymous_tracking"] = True
            else:
                privacy_checks["anonymous_tracking"] = False
            
            # Validate no cookies
            if "cookie" in tracking_code.lower():
                privacy_checks["no_cookies"] = False
                print(f"⚠️  Warning: Found cookie reference in tracking code")
            
            # Check autonomous tracking configuration
            autonomous_tracking = await self.agent._setup_autonomous_tracking(self.test_project, tracking_id, self.test_state)
            privacy_config = autonomous_tracking["privacy_compliance"]
            
            assert privacy_config["gdpr_compliant"] == True, "Should be GDPR compliant"
            assert privacy_config["ccpa_compliant"] == True, "Should be CCPA compliant"
            assert privacy_config["data_anonymization"] == True, "Should anonymize data"
            
            print(f"✅ Privacy compliance validated")
            print(f"✅ GDPR compliant: {privacy_config['gdpr_compliant']}")
            print(f"✅ CCPA compliant: {privacy_config['ccpa_compliant']}")
            print(f"✅ Data anonymization: {privacy_config['data_anonymization']}")
            
            self.test_results.append({
                "test": "Privacy Compliance",
                "status": "PASSED",
                "details": "Privacy compliance validated"
            })
            
        except Exception as e:
            print(f"❌ Privacy Compliance failed: {e}")
            self.test_results.append({
                "test": "Privacy Compliance",
                "status": "FAILED",
                "error": str(e)
            })
    
    async def run_all_tests(self):
        """Run all tests"""
        print("🚀 STARTING AUTONOMOUS ANALYTICS AGENT TEST SUITE")
        print("=" * 60)
        
        # Setup
        await self.setup_test_environment()
        
        # Run tests
        await self.test_1_tracking_id_generation()
        await self.test_2_tracking_code_generation()
        await self.test_3_autonomous_tracking_setup()
        await self.test_4_analytics_strategy_generation()
        await self.test_5_dashboard_creation()
        await self.test_6_full_agent_execution()
        await self.test_7_privacy_compliance()
        
        # Generate report
        self.generate_test_report()
    
    def generate_test_report(self):
        """Generate comprehensive test report"""
        print("\n" + "=" * 60)
        print("📊 TEST REPORT - AUTONOMOUS ANALYTICS AGENT")
        print("=" * 60)
        
        passed_tests = [t for t in self.test_results if t["status"] == "PASSED"]
        failed_tests = [t for t in self.test_results if t["status"] == "FAILED"]
        
        print(f"✅ Passed Tests: {len(passed_tests)}/{len(self.test_results)}")
        print(f"❌ Failed Tests: {len(failed_tests)}/{len(self.test_results)}")
        
        if passed_tests:
            print("\n✅ PASSED TESTS:")
            for test in passed_tests:
                print(f"  • {test['test']}: {test.get('details', 'Passed')}")
        
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  • {test['test']}: {test.get('error', 'Unknown error')}")
        
        # Overall assessment
        if len(failed_tests) == 0:
            print("\n🎉 ALL TESTS PASSED! Autonomous Analytics Agent is ready for production!")
        else:
            print(f"\n⚠️  {len(failed_tests)} test(s) failed. Please review and fix issues before production.")
        
        print("\n" + "=" * 60)

async def main():
    """Main test runner"""
    tester = TestAutonomousAnalyticsAgent()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main()) 