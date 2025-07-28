const WorkflowParser = require('./lib/workflow-parser');
const ExecutionEngine = require('./lib/execution-engine');
const ContextManager = require('./lib/context-manager');
const { validateWorkflow } = require('./lib/workflow-schema');

async function runTests() {
  console.log('🧪 Testing Agent Orchestration System\n');
  
  // Test 1: Schema Validation
  console.log('Test 1: Schema Validation');
  const validWorkflow = {
    version: '1.0',
    name: 'test-workflow',
    tasks: [
      { id: 'task1', agent: 'planner', parameters: { task: 'Plan something' } }
    ]
  };
  
  const errors = validateWorkflow(validWorkflow);
  console.log(`  ✓ Valid workflow validated: ${errors.length === 0 ? 'PASS' : 'FAIL'}`);
  
  // Test 2: Invalid workflow
  const invalidWorkflow = {
    name: 'invalid',
    tasks: [
      { id: 'task1', agent: 'unknown-agent' }
    ]
  };
  
  const invalidErrors = validateWorkflow(invalidWorkflow);
  console.log(`  ✓ Invalid workflow detected: ${invalidErrors.length > 0 ? 'PASS' : 'FAIL'}`);
  
  // Test 3: Context interpolation
  console.log('\nTest 2: Context Interpolation');
  const contextManager = new ContextManager();
  contextManager.setTaskOutput('task1', 'Hello from task1');
  
  const interpolated = contextManager.interpolate('Result: ${task1.output}', 'task2');
  console.log(`  ✓ Interpolation works: ${interpolated === 'Result: Hello from task1' ? 'PASS' : 'FAIL'}`);
  
  // Test 4: Workflow execution
  console.log('\nTest 3: Workflow Execution');
  try {
    const parser = new WorkflowParser();
    const workflow = parser.parse('./workflows/examples/hello-world.yaml');
    
    const execContextManager = new ContextManager();
    const engine = new ExecutionEngine(execContextManager);
    
    const summary = await engine.execute(workflow);
    console.log(`  ✓ Workflow executed: ${summary.overallStatus === 'success' ? 'PASS' : 'FAIL'}`);
    console.log(`  ✓ All tasks completed: ${summary.successCount === 3 ? 'PASS' : 'FAIL'}`);
  } catch (error) {
    console.log(`  ✗ Workflow execution failed: ${error.message}`);
  }
  
  console.log('\n✅ All tests completed!');
}

runTests().catch(console.error);