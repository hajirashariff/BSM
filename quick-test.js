const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function quickTest() {
  console.log('🔍 Quick database test...\n');
  
  try {
    // Test 1: Try to create a simple ticket
    console.log('📋 Testing ticket creation...');
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        subject: 'Quick Test Ticket',
        description: 'Testing if database is working.',
        status: 'Open',
        priority: 'Medium',
        category: 'technical',
        channel: 'Portal',
        customer_email: 'test@example.com',
        created_by: 'demo-user',
        sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })
      .select();
    
    if (ticketError) {
      console.log('❌ Ticket creation failed:', ticketError.message);
      console.log('   → Database schema needs to be updated');
    } else {
      console.log('✅ Ticket creation working!');
    }
    
    // Test 2: Check existing data
    console.log('\n📊 Current data:');
    const { data: tickets } = await supabase.from('tickets').select('*');
    const { data: accounts } = await supabase.from('accounts').select('*');
    const { data: services } = await supabase.from('services').select('*');
    const { data: articles } = await supabase.from('knowledge_base').select('*');
    
    console.log(`   📋 Tickets: ${tickets?.length || 0}`);
    console.log(`   🏢 Accounts: ${accounts?.length || 0}`);
    console.log(`   🔧 Services: ${services?.length || 0}`);
    console.log(`   📚 Articles: ${articles?.length || 0}`);
    
    if (ticketError) {
      console.log('\n⚠️  You need to run the database fix first!');
      console.log('   Go to: https://supabase.com/dashboard/project/fcdfwqengcmtsatrkwin/sql');
      console.log('   Copy and paste the contents of STEP_BY_STEP_FIX.sql');
    } else {
      console.log('\n🎉 Database is working! Your applications should be functional now.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

quickTest();

const supabaseUrl = 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function quickTest() {
  console.log('🔍 Quick database test...\n');
  
  try {
    // Test 1: Try to create a simple ticket
    console.log('📋 Testing ticket creation...');
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        subject: 'Quick Test Ticket',
        description: 'Testing if database is working.',
        status: 'Open',
        priority: 'Medium',
        category: 'technical',
        channel: 'Portal',
        customer_email: 'test@example.com',
        created_by: 'demo-user',
        sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })
      .select();
    
    if (ticketError) {
      console.log('❌ Ticket creation failed:', ticketError.message);
      console.log('   → Database schema needs to be updated');
    } else {
      console.log('✅ Ticket creation working!');
    }
    
    // Test 2: Check existing data
    console.log('\n📊 Current data:');
    const { data: tickets } = await supabase.from('tickets').select('*');
    const { data: accounts } = await supabase.from('accounts').select('*');
    const { data: services } = await supabase.from('services').select('*');
    const { data: articles } = await supabase.from('knowledge_base').select('*');
    
    console.log(`   📋 Tickets: ${tickets?.length || 0}`);
    console.log(`   🏢 Accounts: ${accounts?.length || 0}`);
    console.log(`   🔧 Services: ${services?.length || 0}`);
    console.log(`   📚 Articles: ${articles?.length || 0}`);
    
    if (ticketError) {
      console.log('\n⚠️  You need to run the database fix first!');
      console.log('   Go to: https://supabase.com/dashboard/project/fcdfwqengcmtsatrkwin/sql');
      console.log('   Copy and paste the contents of STEP_BY_STEP_FIX.sql');
    } else {
      console.log('\n🎉 Database is working! Your applications should be functional now.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

quickTest();





