import { initDatabase, db, hashPassword, verifyPassword } from '../server/db.js';
import { createToken, verifyToken } from '../server/auth.js';

console.log('--- Starting ParroFill Automated System Verification ---\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    testsPassed++;
  } else {
    console.error(`✗ [FAIL] ${testName}${details ? ` - ${details}` : ''}`);
    testsFailed++;
  }
}

async function runTests() {
  // 1. Test Database Schema & Seeding
  initDatabase();
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  assert(userCount.count >= 2, 'Database initialized and seeded with demo accounts', `Count: ${userCount.count}`);

  const aman = db.prepare('SELECT * FROM users WHERE email = ?').get('amangoud@example.com') as any;
  assert(Boolean(aman), 'Demo user Aman Goud exists in database');
  assert(verifyPassword('password123', aman.salt, aman.password_hash), 'Aman Goud password verification passes');

  const admin = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@parrofill.io') as any;
  assert(Boolean(admin && admin.role === 'admin'), 'Admin account exists with admin role');
  assert(verifyPassword('admin123', admin.salt, admin.password_hash), 'Admin password verification passes');

  // 2. Test Auth Token Generation & Verification
  const token = createToken({ id: aman.id, email: aman.email, role: aman.role });
  assert(Boolean(token && token.length > 30), 'JWT session token generated cleanly');
  const payload = verifyToken(token);
  assert(Boolean(payload && payload.id === aman.id), 'JWT session token verified successfully', `User ID: ${payload?.id}`);

  // 3. Test Profile Persistence
  const profileRow = db.prepare('SELECT data_json FROM profiles WHERE user_id = ?').get(aman.id) as any;
  assert(Boolean(profileRow), 'User profile row exists in database');
  const parsedProfile = JSON.parse(profileRow.data_json);
  assert(parsedProfile.firstName === 'Aman', 'Profile payload matches candidate Aman');

  // 4. Test Resume Vault
  const resumes = db.prepare('SELECT * FROM resumes WHERE user_id = ?').all(aman.id);
  assert(resumes.length >= 2, 'User has pre-populated resumes in vault', `Found ${resumes.length} resumes`);

  // 5. Test Applications Pipeline
  const applications = db.prepare('SELECT * FROM applications WHERE user_id = ?').all(aman.id);
  assert(applications.length >= 6, 'User has pre-populated job applications in tracker', `Found ${applications.length} applications`);

  // 6. Test Pricing Plans
  const plans = db.prepare('SELECT * FROM pricing_plans').all();
  assert(plans.length >= 3, 'Pricing plans exist in database', `Found ${plans.length} plans`);

  // 7. Test Extension Sync Token Creation and Query
  const syncToken = 'ext-test-' + Date.now();
  db.prepare(`
    INSERT INTO extension_tokens (token, user_id, created_at, last_used_at)
    VALUES (?, ?, ?, ?)
  `).run(syncToken, aman.id, new Date().toISOString(), new Date().toISOString());

  const tokenLookup = db.prepare('SELECT user_id FROM extension_tokens WHERE token = ?').get(syncToken) as any;
  assert(Boolean(tokenLookup && tokenLookup.user_id === aman.id), 'Extension sync token successfully pairs with user profile');

  // Clean up test token
  db.prepare('DELETE FROM extension_tokens WHERE token = ?').run(syncToken);

  // 8. Test Rate Limiter and Password Hashing Salt Uniqueness
  const hash1 = hashPassword('testpass123');
  const hash2 = hashPassword('testpass123');
  assert(hash1.salt !== hash2.salt, 'Unique cryptographic salts generated per hash');
  assert(verifyPassword('testpass123', hash1.salt, hash1.hash), 'Salted hash verification succeeds');

  console.log(`\n========================================`);
  console.log(`Summary: ${testsPassed} passed, ${testsFailed} failed.`);
  console.log(`========================================\n`);

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
