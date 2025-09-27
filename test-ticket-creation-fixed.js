const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fcdfwqengcmtsatrkwin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZGZ3cWVuZ2NtdHNhdHJrd2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTI1MjAsImV4cCI6MjA3MzI4ODUyMH0.e0VLoxpCLdXzPX0ihTcJiXPmnf3mn9o1Go1hKYvXENE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTicketCreation() {
  console.log('🧪 Testing ticket creation with fixed configuration...\n');

  try {
    // Test ticket creation
    const { data: newTicket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        subject: 'Fixed Configuration Test - ' + new Date().toLocaleTimeString(),
        description: 'This ticket was created after fixing the Supabase configuration.',
        status: 'Open',
        priority: 'Medium',
        category: 'technical',
        channel: 'Portal',
        customer_email: 'test@example.com',
        created_by: 'demo-user-id',
        sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();

    if (ticketError) {
      console.log('❌ Ticket creation failed:', ticketError.message);
    } else {
      console.log('✅ Ticket created successfully:', newTicket[0].subject);
    }

    // Check current ticket count
    const { data: allTickets } = await supabase.from('tickets').select('*');
    console.log(`\n📊 Total tickets in database: ${allTickets?.length || 0}`);

    if (ticketError) {
      console.log('\n❌ ISSUE REMAINS:');
      console.log('   → Database constraint or connection issue');
    } else {
      console.log('\n✅ TICKET CREATION FIXED!');
      console.log('   → Supabase configuration is working');
      console.log('   → You can now create tickets in the UI');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testTicketCreation();





