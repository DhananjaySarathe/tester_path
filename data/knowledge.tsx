export interface KnowledgeItem {
  id: string
  title: string
  content: React.ReactNode
}

export const knowledgeData: Record<string, KnowledgeItem> = {
  sdlc: {
    id: 'sdlc',
    title: 'SDLC (Software Development Life Cycle)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">What it is:</h3>
          <p className="text-slate-300 mb-4">
            How a product is built from idea → users.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Startup version of SDLC:</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
            <li>Idea / Requirement (often vague)</li>
            <li>Design (sometimes skipped 😄)</li>
            <li>Development</li>
            <li>Testing</li>
            <li>Release</li>
            <li>Feedback & Fix (loop repeats fast)</li>
          </ol>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-brand-500">
          <h3 className="text-lg font-bold text-white mb-2">Why tester should care:</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Testing starts early</li>
            <li>• Bugs found late = expensive & embarrassing</li>
          </ul>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example:</h3>
          <p className="text-slate-300 mb-2">Founder says:</p>
          <p className="text-white italic mb-3">"Add referral bonus"</p>
          <p className="text-slate-300 mb-2">Tester should ask:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Who can refer?</li>
            <li>When does bonus apply?</li>
            <li>Any limits?</li>
          </ul>
        </div>
      </div>
    ),
  },
  stlc: {
    id: 'stlc',
    title: 'STLC (Software Testing Life Cycle)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">What testers actually do:</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
            <li>Understand requirement</li>
            <li>Test planning (mental, not docs in startups)</li>
            <li>Test case design</li>
            <li>Test execution</li>
            <li>Bug reporting</li>
            <li>Retesting & regression</li>
          </ol>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example:</h3>
          <p className="text-white font-semibold mb-2">Feature: Signup with phone number</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Test valid number</li>
            <li>Test invalid number</li>
            <li>Test existing number</li>
            <li>Test OTP timeout</li>
          </ul>
        </div>
      </div>
    ),
  },
  testCaseVsScenario: {
    id: 'testCaseVsScenario',
    title: 'Test Case vs Test Scenario',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Test Scenario (High level)</h3>
          <div className="bg-slate-800 p-4 rounded-lg mb-4">
            <p className="text-slate-300 italic">"Verify user can sign up successfully"</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Test Case (Detailed)</h3>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>Open signup page</li>
              <li>Enter valid phone number</li>
              <li>Click Send OTP</li>
              <li>Enter correct OTP</li>
              <li>Click Submit</li>
            </ol>
            <p className="text-green-400 mt-2">Expected: User is logged in</p>
          </div>
        </div>

        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
          <p className="text-yellow-400">
            🧠 Startups care more about <strong>scenarios</strong> than 1000 test cases.
          </p>
        </div>
      </div>
    ),
  },
  bugLifeCycle: {
    id: 'bugLifeCycle',
    title: 'Bug Life Cycle (Real Flow)',
    content: (
      <div className="space-y-6">
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="flex items-center justify-center space-x-4 mb-4 flex-wrap">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">New</div>
            <i className="fa-solid fa-arrow-right text-slate-400"></i>
            <div className="bg-yellow-500 text-white px-4 py-2 rounded">Assigned</div>
            <i className="fa-solid fa-arrow-right text-slate-400"></i>
            <div className="bg-green-500 text-white px-4 py-2 rounded">Fixed</div>
            <i className="fa-solid fa-arrow-right text-slate-400"></i>
            <div className="bg-purple-500 text-white px-4 py-2 rounded">Retest</div>
            <i className="fa-solid fa-arrow-right text-slate-400"></i>
            <div className="bg-gray-500 text-white px-4 py-2 rounded">Closed</div>
          </div>
          <div className="text-center">
            <i className="fa-solid fa-arrow-up text-red-500"></i>
            <span className="text-red-400 ml-2">Reopened (if still broken)</span>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example:</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• You report login bug</li>
            <li>• Dev fixes it</li>
            <li>• You retest</li>
            <li>• Still fails → Reopen with proof</li>
          </ul>
        </div>

        <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
          <p className="text-red-400">
            ⚠️ <strong>Never close bug without retesting.</strong>
          </p>
        </div>
      </div>
    ),
  },
  severityVsPriority: {
    id: 'severityVsPriority',
    title: 'Severity vs Priority (VERY IMPORTANT)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Severity = How bad is the bug?</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/20 p-3 rounded border border-red-700">
              <p className="text-red-400 font-bold">Critical</p>
              <p className="text-slate-300 text-sm">App crashes, payment fails</p>
            </div>
            <div className="bg-orange-900/20 p-3 rounded border border-orange-700">
              <p className="text-orange-400 font-bold">Major</p>
              <p className="text-slate-300 text-sm">Core feature broken</p>
            </div>
            <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700">
              <p className="text-yellow-400 font-bold">Minor</p>
              <p className="text-slate-300 text-sm">UI issue</p>
            </div>
            <div className="bg-gray-900/20 p-3 rounded border border-gray-700">
              <p className="text-gray-400 font-bold">Trivial</p>
              <p className="text-slate-300 text-sm">Spelling</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Priority = How fast to fix?</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-red-900/20 p-3 rounded border border-red-700">
              <p className="text-red-400 font-bold">High</p>
              <p className="text-slate-300 text-sm">Fix now</p>
            </div>
            <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700">
              <p className="text-yellow-400 font-bold">Medium</p>
              <p className="text-slate-300 text-sm">Next release</p>
            </div>
            <div className="bg-gray-900/20 p-3 rounded border border-gray-700">
              <p className="text-gray-400 font-bold">Low</p>
              <p className="text-slate-300 text-sm">Later</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-3">📌 Examples:</h3>
          <div className="space-y-3">
            <div className="bg-slate-800 p-3 rounded">
              <p className="text-white font-semibold mb-1">Typo on homepage</p>
              <p className="text-slate-300 text-sm">Severity: <span className="text-yellow-400">Low</span></p>
              <p className="text-slate-300 text-sm">Priority: <span className="text-red-400">High</span> (brand image)</p>
            </div>
            <div className="bg-slate-800 p-3 rounded">
              <p className="text-white font-semibold mb-1">Rare crash in settings</p>
              <p className="text-slate-300 text-sm">Severity: <span className="text-red-400">High</span></p>
              <p className="text-slate-300 text-sm">Priority: <span className="text-yellow-400">Medium</span></p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  exploratoryTesting: {
    id: 'exploratoryTesting',
    title: 'Exploratory Testing (Most Important)',
    content: (
      <div className="space-y-6">
        <div>
          <p className="text-slate-300 mb-4">
            No scripts. Just <strong className="text-white">thinking like a user + attacker</strong>.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Ask:</h3>
          <ul className="space-y-2 text-slate-300 ml-4">
            <li>• What if user does wrong?</li>
            <li>• What if network is slow?</li>
            <li>• What if user presses back?</li>
            <li>• What if user refreshes?</li>
          </ul>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example (Payment page):</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Click Pay twice</li>
            <li>Refresh after payment</li>
            <li>Close browser mid-payment</li>
          </ul>
        </div>
      </div>
    ),
  },
  smokeSanityRegression: {
    id: 'smokeSanityRegression',
    title: 'Types of Testing (Practical)',
    content: (
      <div className="space-y-6">
        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="text-lg font-bold text-white mb-2">Smoke Testing</h3>
          <p className="text-slate-300 mb-2">Quick check to see if build is usable.</p>
          <p className="text-green-400 italic">"Does app open? Can I login?"</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-lg font-bold text-white mb-2">Sanity Testing</h3>
          <p className="text-slate-300">Check small fix didn't break core flow.</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-white mb-2">Regression Testing</h3>
          <p className="text-slate-300">Old features still work after new changes.</p>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example:</h3>
          <p className="text-white font-semibold mb-2">Referral feature added → Check:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Signup</li>
            <li>Login</li>
            <li>Payments (even if unchanged)</li>
          </ul>
        </div>
      </div>
    ),
  },
  apiTesting: {
    id: 'apiTesting',
    title: 'API Testing (Startup Gold Skill)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">What is API?</h3>
          <p className="text-slate-300 mb-4">
            Frontend talks to backend using APIs.
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
          <p className="text-green-400 mb-2">POST /login</p>
          <pre className="text-slate-300">{`{
  "email": "a@b.com",
  "password": "123456"
}`}</pre>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">What to Test in APIs</h3>
          <div className="space-y-4">
            <div className="bg-green-900/20 p-4 rounded border border-green-700">
              <h4 className="text-green-400 font-bold mb-2">1. Positive Case</h4>
              <p className="text-slate-300">Valid request → success response</p>
            </div>
            <div className="bg-red-900/20 p-4 rounded border border-red-700">
              <h4 className="text-red-400 font-bold mb-2">2. Negative Case</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                <li>Missing fields</li>
                <li>Wrong data type</li>
                <li>Invalid token</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 p-4 rounded border border-blue-700">
              <h4 className="text-blue-400 font-bold mb-2">3. Status Codes</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• <span className="text-green-400">200</span> – Success</li>
                <li>• <span className="text-yellow-400">400</span> – Bad request</li>
                <li>• <span className="text-orange-400">401</span> – Unauthorized</li>
                <li>• <span className="text-red-400">500</span> – Server error (dev issue)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Postman Example:</h3>
          <p className="text-white font-semibold mb-2">Test login API:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Correct credentials → <span className="text-green-400">200</span></li>
            <li>Wrong password → <span className="text-orange-400">401</span></li>
            <li>Empty body → <span className="text-yellow-400">400</span></li>
          </ul>
          <p className="text-yellow-400 mt-3">
            📌 Startup testers catch API bugs <strong>before frontend even built</strong>.
          </p>
        </div>
      </div>
    ),
  },
  databaseBasics: {
    id: 'databaseBasics',
    title: 'Database Basics (Verification Power)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Why DB knowledge helps</h3>
          <p className="text-slate-300 mb-4">You can verify:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>User created?</li>
            <li>Payment recorded?</li>
            <li>Duplicate data?</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Basic SQL Tester Should Know</h3>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <code className="text-green-400">
              SELECT * FROM users WHERE email='test@test.com';
            </code>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example:</h3>
          <p className="text-slate-300 mb-2">User signed up → but not able to login</p>
          <p className="text-slate-300">Check DB → user exists or not.</p>
        </div>
      </div>
    ),
  },
  webBasics: {
    id: 'webBasics',
    title: 'Web Technology Basics',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">1. HTML (What tester should know)</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>input, button, form</li>
            <li>required fields</li>
            <li>disabled buttons</li>
          </ul>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm mt-3">
            <p className="text-slate-300">📌 Example: If button is disabled → check HTML attribute:</p>
            <code className="text-green-400">{'<button disabled>'}</code>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">2. CSS (UI Bugs)</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Alignment</li>
            <li>Responsive issues</li>
            <li>Overlapping elements</li>
          </ul>
          <div className="bg-slate-800 p-4 rounded-lg mt-3">
            <p className="text-slate-300 mb-2">📌 Example: On mobile:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
              <li>Button hidden</li>
              <li>Text overlaps</li>
            </ul>
            <p className="text-yellow-400 mt-2">These are <strong>real startup bugs</strong>.</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">3. JavaScript (Just Concept)</h3>
          <p className="text-slate-300 mb-2">Understand:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>Form validation</li>
            <li>API calls</li>
            <li>Error handling</li>
          </ul>
          <div className="bg-slate-800 p-4 rounded-lg mt-3">
            <p className="text-slate-300 mb-2">📌 Example:</p>
            <p className="text-slate-300">
              If submit button does nothing → JS error likely.
            </p>
            <p className="text-slate-300 mt-2">
              Open DevTools → Console → check error.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  productThinking: {
    id: 'productThinking',
    title: 'Product Thinking (What Makes Tester Valuable)',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Good tester asks:</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
            <li>Will user understand this?</li>
            <li>Can this be misused?</li>
            <li>Will this fail in real life?</li>
          </ul>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📌 Example:</h3>
          <p className="text-white font-semibold mb-2">OTP expires in 30 seconds →</p>
          <p className="text-slate-300">User on slow network? Old phone?</p>
        </div>
      </div>
    ),
  },
  goodBugReport: {
    id: 'goodBugReport',
    title: 'Writing Good Bug Reports',
    content: (
      <div className="space-y-6">
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
          <h3 className="text-red-400 font-bold mb-2">❌ Bad Bug</h3>
          <p className="text-slate-300 italic">"Login not working"</p>
        </div>

        <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
          <h3 className="text-green-400 font-bold mb-3">✅ Good Bug</h3>
          <div className="bg-slate-800 p-4 rounded font-mono text-sm space-y-2">
            <div>
              <p className="text-blue-400 font-bold">Title:</p>
              <p className="text-white">Login fails with valid credentials on Chrome</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold">Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-4">
                <li>Open Chrome</li>
                <li>Go to login page</li>
                <li>Enter valid email/password</li>
                <li>Click Login</li>
              </ol>
            </div>
            <div>
              <p className="text-green-400 font-bold">Expected:</p>
              <p className="text-slate-300">User logged in</p>
            </div>
            <div>
              <p className="text-red-400 font-bold">Actual:</p>
              <p className="text-slate-300">Page refreshes, no error shown</p>
            </div>
            <div>
              <p className="text-yellow-400 font-bold">Impact:</p>
              <p className="text-slate-300">User cannot access account → churn risk</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

