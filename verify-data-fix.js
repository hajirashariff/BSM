const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDataFix() {
  console.log('🔍 Verifying data fix...\n');
  
  try {
    // Test 1: Check if we can create a ticket
    console.log('📋 Testing ticket creation...');
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        subject: 'Test Ticket - ' + new Date().toLocaleTimeString(),
        description: 'Testing ticket creation after database fix.',
        status: 'Open',
        priority: 'Medium',
        category: 'technical',
        channel: 'Portal',
        customer_email: 'test@example.com',
        created_by: 'demo-user',
        sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (ticketError) {
      console.log('❌ Ticket creation still failing:', ticketError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Ticket creation working:', ticket[0].subject);
    }
    
    // Test 2: Check if we can create an account
    console.log('\n🏢 Testing account creation...');
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .insert({
        name: 'Test Account - ' + new Date().toLocaleTimeString(),
        status: 'active',
        health_score: 90,
        alerts: 2,
        industry: 'Technology',
        tier: 'Standard',
        renewal: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        contact: 'contact@company.com',
        email: 'admin@company.com',
        phone: '+1-555-0123',
        location: 'New York, NY',
        value: 100000
      })
      .select();
    
    if (accountError) {
      console.log('❌ Account creation still failing:', accountError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Account creation working:', account[0].name);
    }
    
    // Test 3: Check if we can create a service
    console.log('\n🔧 Testing service creation...');
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .insert({
        name: 'Test Service - ' + new Date().toLocaleTimeString(),
        description: 'Testing service creation after database fix.',
        status: 'operational',
        health_score: 95,
        category: 'Testing',
        features: ['Testing', 'Verification']
      })
      .select();
    
    if (serviceError) {
      console.log('❌ Service creation still failing:', serviceError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Service creation working:', service[0].name);
    }
    
    // Test 4: Check if we can create a knowledge base article
    console.log('\n📚 Testing knowledge base article creation...');
    const { data: article, error: articleError } = await supabase
      .from('knowledge_base')
      .insert({
        title: 'Test Article - ' + new Date().toLocaleTimeString(),
        content: 'Testing article creation after database fix.',
        category: 'Testing',
        status: 'published',
        featured: false,
        tags: ['testing', 'verification']
      })
      .select();
    
    if (articleError) {
      console.log('❌ Article creation still failing:', articleError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Article creation working:', article[0].title);
    }
    
    // Test 5: Count all existing data
    console.log('\n📊 Current data counts:');
    const { data: tickets } = await supabase.from('tickets').select('*');
    const { data: accounts } = await supabase.from('accounts').select('*');
    const { data: services } = await supabase.from('services').select('*');
    const { data: articles } = await supabase.from('knowledge_base').select('*');
    
    console.log(`   📋 Tickets: ${tickets?.length || 0}`);
    console.log(`   🏢 Accounts: ${accounts?.length || 0}`);
    console.log(`   🔧 Services: ${services?.length || 0}`);
    console.log(`   📚 Articles: ${articles?.length || 0}`);
    
    // Check if all tests passed
    const allWorking = !ticketError && !accountError && !serviceError && !articleError;
    
    if (allWorking) {
      console.log('\n🎉 ALL DATA ISSUES FIXED!');
      console.log('✅ Your BSM portals are now fully functional!');
      console.log('   Customer Portal: http://localhost:3000');
      console.log('   Admin Portal: http://localhost:3001');
    } else {
      console.log('\n⚠️  Some issues remain. Please run the URGENT_DATABASE_FIX.sql first!');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

verifyDataFix();

const supabaseUrl = 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDataFix() {
  console.log('🔍 Verifying data fix...\n');
  
  try {
    // Test 1: Check if we can create a ticket
    console.log('📋 Testing ticket creation...');
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        subject: 'Test Ticket - ' + new Date().toLocaleTimeString(),
        description: 'Testing ticket creation after database fix.',
        status: 'Open',
        priority: 'Medium',
        category: 'technical',
        channel: 'Portal',
        customer_email: 'test@example.com',
        created_by: 'demo-user',
        sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (ticketError) {
      console.log('❌ Ticket creation still failing:', ticketError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Ticket creation working:', ticket[0].subject);
    }
    
    // Test 2: Check if we can create an account
    console.log('\n🏢 Testing account creation...');
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .insert({
        name: 'Test Account - ' + new Date().toLocaleTimeString(),
        status: 'active',
        health_score: 90,
        alerts: 2,
        industry: 'Technology',
        tier: 'Standard',
        renewal: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        contact: 'contact@company.com',
        email: 'admin@company.com',
        phone: '+1-555-0123',
        location: 'New York, NY',
        value: 100000
      })
      .select();
    
    if (accountError) {
      console.log('❌ Account creation still failing:', accountError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Account creation working:', account[0].name);
    }
    
    // Test 3: Check if we can create a service
    console.log('\n🔧 Testing service creation...');
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .insert({
        name: 'Test Service - ' + new Date().toLocaleTimeString(),
        description: 'Testing service creation after database fix.',
        status: 'operational',
        health_score: 95,
        category: 'Testing',
        features: ['Testing', 'Verification']
      })
      .select();
    
    if (serviceError) {
      console.log('❌ Service creation still failing:', serviceError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Service creation working:', service[0].name);
    }
    
    // Test 4: Check if we can create a knowledge base article
    console.log('\n📚 Testing knowledge base article creation...');
    const { data: article, error: articleError } = await supabase
      .from('knowledge_base')
      .insert({
        title: 'Test Article - ' + new Date().toLocaleTimeString(),
        content: 'Testing article creation after database fix.',
        category: 'Testing',
        status: 'published',
        featured: false,
        tags: ['testing', 'verification']
      })
      .select();
    
    if (articleError) {
      console.log('❌ Article creation still failing:', articleError.message);
      console.log('   → You need to run the URGENT_DATABASE_FIX.sql first!');
    } else {
      console.log('✅ Article creation working:', article[0].title);
    }
    
    // Test 5: Count all existing data
    console.log('\n📊 Current data counts:');
    const { data: tickets } = await supabase.from('tickets').select('*');
    const { data: accounts } = await supabase.from('accounts').select('*');
    const { data: services } = await supabase.from('services').select('*');
    const { data: articles } = await supabase.from('knowledge_base').select('*');
    
    console.log(`   📋 Tickets: ${tickets?.length || 0}`);
    console.log(`   🏢 Accounts: ${accounts?.length || 0}`);
    console.log(`   🔧 Services: ${services?.length || 0}`);
    console.log(`   📚 Articles: ${articles?.length || 0}`);
    
    // Check if all tests passed
    const allWorking = !ticketError && !accountError && !serviceError && !articleError;
    
    if (allWorking) {
      console.log('\n🎉 ALL DATA ISSUES FIXED!');
      console.log('✅ Your BSM portals are now fully functional!');
      console.log('   Customer Portal: http://localhost:3000');
      console.log('   Admin Portal: http://localhost:3001');
    } else {
      console.log('\n⚠️  Some issues remain. Please run the URGENT_DATABASE_FIX.sql first!');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

verifyDataFix();





