export interface BugSpottingCase {
  id: string
  title: string
  uiComponent: React.ReactNode
  question: string
  options: {
    id: string
    label: string
    icon?: string
  }[]
  correctAnswer: string
  explanation: {
    summary: string
    details: string
    severity: string
    priority: string
    whyItMatters: string
  }
  meta: {
    bugType: string
    skills: string[]
  }
}

export interface PredictionCase {
  id: string
  title: string
  scenario: string
  options: {
    id: string
    label: string
    isCorrect: boolean
  }[]
  explanation: string
  impact: string
  bestPractice: string[]
  teachingHighlight: string
}

export interface APICase {
  id: string
  title: string
  request: {
    method: string
    endpoint: string
    body: string
  }
  response: {
    status: number
    statusText: string
    body: string
  }
  question: string
  correctAnswer: 'correct' | 'incorrect' | 'partially'
  explanation: string
  correctBehavior: {
    status: number
    statusText: string
    body: string
  }
  teachingNote: string
}

export interface BugReportCase {
  id: string
  title: string
  badReport: string
  improvedReport: {
    title: string
    steps: string[]
    expected: string
    actual: string
    impact: string
  }
  teachingExplanation: {
    title: string
    steps: string
    impact: string
  }
}

export const bugSpottingCases: BugSpottingCase[] = [
  {
    id: 'BSB-01',
    title: 'Invalid Email Accepted',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value="abc@"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value="******"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Create Account
          </button>
        </div>
      </div>
    ),
    question: 'Do you notice any issue in this UI?',
    options: [
      { id: 'A', label: 'No issue' },
      { id: 'B', label: 'UI alignment bug' },
      { id: 'C', label: 'Input validation bug' },
      { id: 'D', label: 'UX improvement suggestion' },
    ],
    correctAnswer: 'C',
    explanation: {
      summary: 'The email format is invalid but still accepted.',
      details:
        "An email like 'abc@' does not follow standard email format, yet the form allows submission. This indicates missing or incorrect validation logic.",
      severity: 'Medium',
      priority: 'High',
      whyItMatters: 'Invalid user data pollutes database and causes downstream issues like login failures.',
    },
    meta: {
      bugType: 'Functional',
      skills: ['Validation Testing', 'Exploratory Testing'],
    },
  },
  {
    id: 'BSB-02',
    title: 'Password Field Not Masked',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Login</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value="user@example.com"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="text"
              value="MySecret123!"
              readOnly
              className="w-full px-3 py-2 border border-red-400 rounded-md bg-red-50"
            />
            <p className="text-xs text-red-600 mt-1">⚠️ Password visible as plain text</p>
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Sign In
          </button>
        </div>
      </div>
    ),
    question: 'What kind of issue is this?',
    options: [
      { id: 'A', label: 'Security bug' },
      { id: 'B', label: 'UI bug' },
      { id: 'C', label: 'Functional bug' },
      { id: 'D', label: 'No issue' },
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Password characters are visible on screen.',
      details:
        'Password fields must mask user input. Showing plaintext exposes sensitive information and is a security risk.',
      severity: 'High',
      priority: 'High',
      whyItMatters: 'Shoulder surfing and screen recording can compromise user accounts.',
    },
    meta: {
      bugType: 'Security',
      skills: ['Security Awareness', 'UI Testing'],
    },
  },
  {
    id: 'BSB-03',
    title: 'Submit Button Enabled With Empty Fields',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Sign Up</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value=""
              readOnly
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value=""
              readOnly
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value=""
              readOnly
              placeholder="Create password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Submit
          </button>
          <p className="text-xs text-gray-500 text-center">All fields are empty but button is enabled</p>
        </div>
      </div>
    ),
    question: 'What is the primary issue here?',
    options: [
      { id: 'A', label: 'UI styling issue' },
      { id: 'B', label: 'Missing frontend validation' },
      { id: 'C', label: 'Backend API issue' },
      { id: 'D', label: 'Accessibility issue' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Submit button should be disabled until required fields are filled.',
      details:
        'Allowing submission with empty mandatory fields leads to invalid requests and poor user experience.',
      severity: 'Medium',
      priority: 'Medium',
      whyItMatters: 'Increases backend load and frustrates users.',
    },
    meta: {
      bugType: 'Functional',
      skills: ['Form Validation', 'UX Thinking'],
    },
  },
  {
    id: 'BSB-04',
    title: 'Login Button Hidden Behind Keyboard',
    uiComponent: (
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto relative" style={{ height: '500px' }}>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Login</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                value="user@example.com"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value="••••••••"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>
        
        {/* Simulated Keyboard */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-200 border-t-2 border-gray-400 p-2">
          <div className="grid grid-cols-3 gap-1 mb-1">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
              <div key={key} className="bg-white p-2 text-center text-xs rounded border border-gray-300">
                {key}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-600 text-center">⌨️ On-screen Keyboard</div>
        </div>
        
        {/* Login Button - Hidden behind keyboard */}
        <div className="absolute bottom-16 left-0 right-0 px-4 opacity-50">
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md">
            Login
          </button>
          <p className="text-xs text-red-600 mt-1 text-center">⚠️ Button hidden behind keyboard</p>
        </div>
      </div>
    ),
    question: 'Which type of bug is this?',
    options: [
      { id: 'A', label: 'Functional bug' },
      { id: 'B', label: 'Responsive UI bug' },
      { id: 'C', label: 'Security bug' },
      { id: 'D', label: 'Performance issue' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Login button becomes inaccessible on mobile.',
      details: 'UI does not adapt correctly to keyboard presence, blocking critical action.',
      severity: 'High',
      priority: 'High',
      whyItMatters: 'Mobile users cannot login at all.',
    },
    meta: {
      bugType: 'UI',
      skills: ['Responsive Testing', 'Mobile Testing'],
    },
  },
  {
    id: 'BSB-05',
    title: 'Error Message Without Context',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value="test@example.com"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value="••••••••"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Create Account
          </button>
          
          {/* Error Message */}
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
            <p className="text-red-600 text-sm font-medium">Something went wrong</p>
          </div>
          <p className="text-xs text-gray-500 text-center">Generic error with no helpful information</p>
        </div>
      </div>
    ),
    question: 'What is the problem with this error message?',
    options: [
      { id: 'A', label: 'Incorrect grammar' },
      { id: 'B', label: 'Too generic, not helpful' },
      { id: 'C', label: 'Wrong color usage' },
      { id: 'D', label: 'No problem' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Generic error message provides no guidance.',
      details: 'Users cannot understand what went wrong or how to fix it.',
      severity: 'Low',
      priority: 'Medium',
      whyItMatters: 'Poor UX increases support tickets and user frustration.',
    },
    meta: {
      bugType: 'UX',
      skills: ['UX Testing', 'User Empathy'],
    },
  },
  {
    id: 'BSB-06',
    title: 'Double Click Creates Duplicate Order',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Checkout</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Product Name</span>
              <span className="font-semibold">$99.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Shipping</span>
              <span className="font-semibold">$5.00</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-lg">$104.99</span>
            </div>
          </div>
          
          <button className="w-full bg-brand-600 text-white py-3 px-4 rounded-md hover:bg-brand-700 transition font-semibold text-lg">
            Place Order
          </button>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2">
            <p className="text-yellow-800 text-xs">
              ⚠️ Clicking twice creates duplicate orders
            </p>
          </div>
        </div>
      </div>
    ),
    question: 'What kind of issue is this?',
    options: [
      { id: 'A', label: 'Performance issue' },
      { id: 'B', label: 'Functional bug' },
      { id: 'C', label: 'UI bug' },
      { id: 'D', label: 'Content issue' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'System does not prevent duplicate submissions.',
      details: 'Actions should be idempotent or UI should prevent repeated clicks.',
      severity: 'High',
      priority: 'High',
      whyItMatters: 'Causes financial and inventory inconsistencies.',
    },
    meta: {
      bugType: 'Functional',
      skills: ['Edge Case Testing', 'Transaction Testing'],
    },
  },
  {
    id: 'BSB-07',
    title: 'Logout Does Not End Session',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">User Dashboard</h4>
                <p className="text-sm text-gray-600">Logged in as: user@example.com</p>
              </div>
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                Logout
              </button>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2">
              <p className="text-xs text-yellow-800">
                ⚠️ After logout, user can still access dashboard via browser back button
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-50 rounded">📊 Analytics</div>
              <div className="p-2 bg-blue-50 rounded">👤 Profile</div>
              <div className="p-2 bg-blue-50 rounded">⚙️ Settings</div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-xs text-red-700">
              <strong>Issue:</strong> Session not properly invalidated. Protected pages still accessible.
            </p>
          </div>
        </div>
      </div>
    ),
    question: 'What is the main issue?',
    options: [
      { id: 'A', label: 'Cache issue' },
      { id: 'B', label: 'Session handling bug' },
      { id: 'C', label: 'UI bug' },
      { id: 'D', label: 'No issue' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Session is not properly invalidated on logout.',
      details: 'User should not access protected pages after logout.',
      severity: 'High',
      priority: 'High',
      whyItMatters: 'Security vulnerability and data exposure risk.',
    },
    meta: {
      bugType: 'Security',
      skills: ['Session Testing', 'Security Testing'],
    },
  },
  {
    id: 'BSB-08',
    title: 'Required Field Not Marked',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Form</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value=""
              readOnly
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">(Required but no indicator shown)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value=""
              readOnly
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value=""
              readOnly
              placeholder="Enter your message"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">(Required but no indicator shown)</p>
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Submit
          </button>
        </div>
      </div>
    ),
    question: 'What is the issue here?',
    options: [
      { id: 'A', label: 'Functional bug' },
      { id: 'B', label: 'UX clarity issue' },
      { id: 'C', label: 'API issue' },
      { id: 'D', label: 'Security bug' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'User is not informed that field is mandatory.',
      details: 'Lack of visual indicators leads to confusion and form errors.',
      severity: 'Low',
      priority: 'Low',
      whyItMatters: 'Increases form abandonment rate.',
    },
    meta: {
      bugType: 'UX',
      skills: ['Usability Testing', 'UX Evaluation'],
    },
  },
  {
    id: 'BSB-09',
    title: 'Misaligned CTA Button',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Our Service</h2>
          <p className="text-gray-600 text-sm">Get started with our amazing features</p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-8 h-8 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Feature 1</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Feature 2</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-8 h-8 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700">Feature 3</span>
          </div>
        </div>
        
        {/* Misaligned Button */}
        <div className="pl-2">
          <button className="bg-brand-600 text-white py-2 px-6 rounded-md hover:bg-brand-700 transition">
            Get Started
          </button>
          <p className="text-xs text-gray-500 mt-1">⚠️ Button is off-center compared to content above</p>
        </div>
      </div>
    ),
    question: 'How would you classify this issue?',
    options: [
      { id: 'A', label: 'UI bug' },
      { id: 'B', label: 'Functional bug' },
      { id: 'C', label: 'Security issue' },
      { id: 'D', label: 'No issue' },
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Visual alignment inconsistency.',
      details: 'UI should be visually consistent to maintain professional appearance.',
      severity: 'Low',
      priority: 'Low',
      whyItMatters: 'Affects perceived quality of product.',
    },
    meta: {
      bugType: 'UI',
      skills: ['Visual Inspection', 'UI Consistency'],
    },
  },
  {
    id: 'BSB-10',
    title: 'Form Allows Leading Spaces',
    uiComponent: (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Create Username</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value="   john_doe"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono"
            />
            <p className="text-xs text-red-600 mt-1">
              ⚠️ Leading spaces accepted: "{'   john_doe'}"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              (Should be trimmed to: "john_doe")
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-xs text-yellow-800">
              <strong>Issue:</strong> Input not sanitized. Leading/trailing spaces will cause login issues later.
            </p>
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Create Account
          </button>
        </div>
      </div>
    ),
    question: 'What issue does this represent?',
    options: [
      { id: 'A', label: 'UI issue' },
      { id: 'B', label: 'Input sanitization bug' },
      { id: 'C', label: 'Performance issue' },
      { id: 'D', label: 'No issue' },
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Input is not trimmed or sanitized.',
      details: 'Leading/trailing spaces cause data inconsistency and login issues.',
      severity: 'Medium',
      priority: 'Medium',
      whyItMatters: 'Creates hard-to-debug user problems later.',
    },
    meta: {
      bugType: 'Functional',
      skills: ['Data Validation', 'Negative Testing'],
    },
  },
]

export const predictionCases: PredictionCase[] = [
  {
    id: 'double-click-pay',
    title: 'Double Click on Pay Button',
    scenario: 'User clicks "Pay Now" twice very fast.',
    options: [
      { id: 'ignored', label: 'A) Second click is ignored', isCorrect: false },
      { id: 'fails', label: 'B) Payment fails', isCorrect: false },
      { id: 'charged-twice', label: 'C) User is charged twice', isCorrect: true },
      { id: 'crashes', label: 'D) App crashes', isCorrect: false },
    ],
    explanation:
      'Without button disabling or backend idempotency, duplicate payment requests can be processed.',
    impact: 'Financial loss + user trust damage',
    bestPractice: [
      'Disable button immediately',
      'Use payment idempotency keys',
    ],
    teachingHighlight: 'Many real production payment bugs happen this way.',
  },
]

export const apiCases: APICase[] = [
  {
    id: 'login-empty-password',
    title: 'Login API With Empty Password',
    request: {
      method: 'POST',
      endpoint: '/login',
      body: `{
  "email": "user@test.com",
  "password": ""
}`,
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: `{
  "success": true,
  "token": "abc123"
}`,
    },
    question: 'Is this API response correct?',
    correctAnswer: 'incorrect',
    explanation:
      'Password is empty → invalid request. API should return 400 Bad Request. Accepting this is a security risk.',
    correctBehavior: {
      status: 400,
      statusText: 'Bad Request',
      body: `{
  "error": "Password is required"
}`,
    },
    teachingNote: 'Never rely only on frontend validation.',
  },
]

export const bugReportCases: BugReportCase[] = [
  {
    id: 'login-failure',
    title: 'Login Failure Bug',
    badReport: 'Login is not working properly.',
    improvedReport: {
      title: 'Login fails with valid credentials on Chrome',
      steps: [
        'Open login page',
        'Enter valid email & password',
        'Click Login',
      ],
      expected: 'User should be logged in',
      actual: 'Page reloads, no error message shown',
      impact: 'User cannot access account → high churn risk',
    },
    teachingExplanation: {
      title: 'Title is specific',
      steps: 'Steps are reproducible',
      impact: 'Impact helps prioritize fix',
    },
  },
]
