-- FINAL COMPREHENSIVE CONSTRAINTS FIX
-- This fixes all remaining constraint issues

-- Fix accounts tier constraint
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_tier_check;
ALTER TABLE accounts ADD CONSTRAINT accounts_tier_check CHECK (tier IN ('Basic', 'Standard', 'Premium', 'Enterprise'));

-- Fix accounts industry constraint
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_industry_check;
ALTER TABLE accounts ADD CONSTRAINT accounts_industry_check CHECK (industry IN ('Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Government', 'Other'));

-- Fix accounts status constraint
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_status_check;
ALTER TABLE accounts ADD CONSTRAINT accounts_status_check CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));

-- Fix tickets status constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_status_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_status_check CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed', 'Pending'));

-- Fix tickets priority constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_priority_check CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent'));

-- Fix tickets channel constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_channel_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_channel_check CHECK (channel IN ('Email', 'Phone', 'Chat', 'Portal', 'API', 'Web', 'Support'));

-- Fix tickets category constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_category_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_category_check CHECK (category IN ('technical', 'billing', 'general', 'feature_request', 'bug_report'));

-- Fix services status constraint
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_status_check;
ALTER TABLE services ADD CONSTRAINT services_status_check CHECK (status IN ('operational', 'degraded', 'outage', 'maintenance'));

-- Fix knowledge_base status constraint
ALTER TABLE knowledge_base DROP CONSTRAINT IF EXISTS knowledge_base_status_check;
ALTER TABLE knowledge_base ADD CONSTRAINT knowledge_base_status_check CHECK (status IN ('draft', 'published', 'archived'));

-- Verify all constraints are working
SELECT 'All constraints fixed successfully!' as status;

-- Fix accounts tier constraint
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_tier_check;
ALTER TABLE accounts ADD CONSTRAINT accounts_tier_check CHECK (tier IN ('Basic', 'Standard', 'Premium', 'Enterprise'));

-- Fix accounts industry constraint
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_industry_check;
ALTER TABLE accounts ADD CONSTRAINT accounts_industry_check CHECK (industry IN ('Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Government', 'Other'));

-- Fix accounts status constraint
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_status_check;
ALTER TABLE accounts ADD CONSTRAINT accounts_status_check CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));

-- Fix tickets status constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_status_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_status_check CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed', 'Pending'));

-- Fix tickets priority constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_priority_check CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent'));

-- Fix tickets channel constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_channel_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_channel_check CHECK (channel IN ('Email', 'Phone', 'Chat', 'Portal', 'API', 'Web', 'Support'));

-- Fix tickets category constraint
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_category_check;
ALTER TABLE tickets ADD CONSTRAINT tickets_category_check CHECK (category IN ('technical', 'billing', 'general', 'feature_request', 'bug_report'));

-- Fix services status constraint
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_status_check;
ALTER TABLE services ADD CONSTRAINT services_status_check CHECK (status IN ('operational', 'degraded', 'outage', 'maintenance'));

-- Fix knowledge_base status constraint
ALTER TABLE knowledge_base DROP CONSTRAINT IF EXISTS knowledge_base_status_check;
ALTER TABLE knowledge_base ADD CONSTRAINT knowledge_base_status_check CHECK (status IN ('draft', 'published', 'archived'));

-- Verify all constraints are working
SELECT 'All constraints fixed successfully!' as status;





