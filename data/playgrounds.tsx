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
    isCorrect?: boolean
  }[]
  correctAnswer: string
  explanation: {
    whatHappens: string
    why: string
    idealBehavior: string
    impact: string
  }
  meta: {
    category: string
    skills: string[]
  }
}

export interface APICase {
  id: string
  title: string
  request: {
    method: string
    endpoint: string
    body?: string | object
    headers?: Record<string, string>
  }
  response: {
    status: number
    statusText?: string
    body: string | object
  }
  question: string
  options: {
    id: string
    label: string
  }[]
  correctAnswer: string
  explanation: {
    whyIncorrect?: string
    why?: string
    correctBehavior: string
    risk: string
  }
  meta: {
    topic: string
    skills: string[]
  }
}

export interface BugReportCase {
  id: string
  title: string
  badReport: string
  question: string
  improvedReport: {
    title: string
    steps: string[]
    expected: string
    actual: string
    impact: string
  }
  explanation: {
    issuesInBadReport: string[]
    whyImprovedIsBetter: string
  }
  meta: {
    skills: string[]
    difficulty: string
  }
}

export const bugSpottingCases: BugSpottingCase[] = [
  {
    id: 'BSB-01',
    title: 'Invalid Email Accepted',
    uiComponent: (
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Create Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="text"
              value="abc@"
              readOnly
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value="******"
              readOnly
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Login</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="text"
              value="user@example.com"
              readOnly
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="text"
              value="MySecret123!"
              readOnly
              className="w-full px-3 py-2 border border-red-400 rounded-md bg-red-900/30 text-red-200"
            />
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-triangle-exclamation"></i> Password visible as plain text
            </p>
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Sign Up</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value=""
              readOnly
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value=""
              readOnly
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value=""
              readOnly
              placeholder="Create password"
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-500"
            />
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Submit
          </button>
          <p className="text-xs text-slate-400 text-center">All fields are empty but button is enabled</p>
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
      <div className="bg-slate-800 p-4 rounded-lg shadow-lg max-w-sm mx-auto relative border border-slate-700" style={{ height: '500px' }}>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-4">Login</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input
                type="text"
                value="user@example.com"
                readOnly
                className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value="••••••••"
                readOnly
                className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
              />
            </div>
          </div>
        </div>
        
        {/* Simulated Keyboard */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-600 border-t-2 border-slate-500 p-2">
          <div className="grid grid-cols-3 gap-1 mb-1">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
              <div key={key} className="bg-slate-700 p-2 text-center text-xs rounded border border-slate-500 text-white">
                {key}
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-300 text-center flex items-center justify-center gap-1">
            <i className="fa-solid fa-keyboard"></i> On-screen Keyboard
          </div>
        </div>
        
        {/* Login Button - Hidden behind keyboard */}
        <div className="absolute bottom-16 left-0 right-0 px-4 opacity-50">
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md">
            Login
          </button>
          <p className="text-xs text-red-400 mt-1 text-center flex items-center justify-center gap-1">
            <i className="fa-solid fa-triangle-exclamation"></i> Button hidden behind keyboard
          </p>
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Create Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="text"
              value="test@example.com"
              readOnly
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value="••••••••"
              readOnly
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white"
            />
          </div>
          <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-md hover:bg-brand-700 transition">
            Create Account
          </button>
          
          {/* Error Message */}
          <div className="bg-red-900/30 border border-red-700 rounded-md p-3 mt-2">
            <p className="text-red-300 text-sm font-medium">Something went wrong</p>
          </div>
          <p className="text-xs text-slate-400 text-center">Generic error with no helpful information</p>
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Checkout</h3>
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded border border-slate-600">
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">Product Name</span>
              <span className="font-semibold text-white">$99.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">Shipping</span>
              <span className="font-semibold text-white">$5.00</span>
            </div>
            <div className="border-t border-slate-600 pt-2 flex justify-between">
              <span className="font-bold text-white">Total</span>
              <span className="font-bold text-lg text-white">$104.99</span>
            </div>
          </div>
          
          <button className="w-full bg-brand-600 text-white py-3 px-4 rounded-md hover:bg-brand-700 transition font-semibold text-lg">
            Place Order
          </button>
          
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-md p-3 mt-2">
            <p className="text-yellow-300 text-xs flex items-center gap-1">
              <i className="fa-solid fa-triangle-exclamation"></i> Clicking twice creates duplicate orders
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white">User Dashboard</h4>
                <p className="text-sm text-slate-300">Logged in as: user@example.com</p>
              </div>
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                Logout
              </button>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded p-2 mb-2">
              <p className="text-xs text-yellow-300 flex items-center gap-1">
                <i className="fa-solid fa-triangle-exclamation"></i> After logout, user can still access dashboard via browser back button
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-900/30 rounded text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-chart-line"></i> Analytics
              </div>
              <div className="p-2 bg-blue-900/30 rounded text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-user"></i> Profile
              </div>
              <div className="p-2 bg-blue-900/30 rounded text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-gear"></i> Settings
              </div>
            </div>
          </div>
          <div className="bg-red-900/30 border border-red-700 rounded p-3">
            <p className="text-xs text-red-300">
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Contact Form</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value=""
              readOnly
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-500"
            />
            <p className="text-xs text-slate-400 mt-1">(Required but no indicator shown)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value=""
              readOnly
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
            <textarea
              value=""
              readOnly
              placeholder="Enter your message"
              rows={3}
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white placeholder-slate-500"
            />
            <p className="text-xs text-slate-400 mt-1">(Required but no indicator shown)</p>
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Our Service</h2>
          <p className="text-slate-300 text-sm">Get started with our amazing features</p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 p-3 bg-slate-700 rounded">
            <div className="w-8 h-8 bg-blue-500 rounded"></div>
            <span className="text-sm text-slate-300">Feature 1</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-700 rounded">
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <span className="text-sm text-slate-300">Feature 2</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-700 rounded">
            <div className="w-8 h-8 bg-purple-500 rounded"></div>
            <span className="text-sm text-slate-300">Feature 3</span>
          </div>
        </div>
        
        {/* Misaligned Button */}
        <div className="pl-2">
          <button className="bg-brand-600 text-white py-2 px-6 rounded-md hover:bg-brand-700 transition">
            Get Started
          </button>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <i className="fa-solid fa-triangle-exclamation"></i> Button is off-center compared to content above
          </p>
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
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Create Username</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <input
              type="text"
              value="   john_doe"
              readOnly
              className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white font-mono"
            />
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-triangle-exclamation"></i> Leading spaces accepted: "{'   john_doe'}"
            </p>
            <p className="text-xs text-slate-400 mt-1">
              (Should be trimmed to: "john_doe")
            </p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded p-3">
            <p className="text-xs text-yellow-300">
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
    id: 'WHI-01',
    title: 'Double Click on Pay Button',
    scenario: 'User clicks the "Pay Now" button twice very quickly.',
    options: [
      { id: 'A', label: 'Second click is ignored automatically' },
      { id: 'B', label: 'Payment fails completely' },
      { id: 'C', label: 'User may get charged twice' },
      { id: 'D', label: 'Application crashes' },
    ],
    correctAnswer: 'C',
    explanation: {
      whatHappens: 'Two payment requests are sent to backend.',
      why: 'Button is not disabled and backend does not enforce idempotency.',
      idealBehavior: 'Disable button immediately and use idempotency keys.',
      impact: 'Duplicate charges → financial loss + user trust damage.',
    },
    meta: {
      category: 'Payment',
      skills: ['Edge Case Thinking', 'Transaction Safety'],
    },
  },
  {
    id: 'WHI-02',
    title: 'Refresh After Successful Payment',
    scenario: 'User refreshes the page immediately after completing payment.',
    options: [
      { id: 'A', label: 'Order summary is shown' },
      { id: 'B', label: 'Payment is retried' },
      { id: 'C', label: 'User sees blank or error page' },
      { id: 'D', label: 'Nothing happens' },
    ],
    correctAnswer: 'C',
    explanation: {
      whatHappens: 'Frontend state is lost after refresh.',
      why: 'Order confirmation is not persisted or handled on reload.',
      idealBehavior: 'Fetch order status from backend using transaction ID.',
      impact: 'User confusion + support tickets.',
    },
    meta: {
      category: 'State Management',
      skills: ['Reliability Testing', 'UX Awareness'],
    },
  },
  {
    id: 'WHI-03',
    title: 'OTP Expires While Typing',
    scenario: 'User receives OTP but enters it after expiry time.',
    options: [
      { id: 'A', label: 'User is logged in anyway' },
      { id: 'B', label: 'Clear error message is shown' },
      { id: 'C', label: 'Generic error is shown' },
      { id: 'D', label: 'App crashes' },
    ],
    correctAnswer: 'C',
    explanation: {
      whatHappens: 'Backend rejects OTP but frontend shows unclear error.',
      why: 'OTP expiry case not handled gracefully in UI.',
      idealBehavior: "Show message: 'OTP expired. Please request again.'",
      impact: 'User frustration and drop-offs.',
    },
    meta: {
      category: 'Authentication',
      skills: ['Negative Testing', 'UX Thinking'],
    },
  },
  {
    id: 'WHI-04',
    title: 'Network Drops During File Upload',
    scenario: 'Internet disconnects while uploading a large file.',
    options: [
      { id: 'A', label: 'Upload resumes automatically' },
      { id: 'B', label: 'Upload silently fails' },
      { id: 'C', label: 'User sees progress stuck forever' },
      { id: 'D', label: 'Application restarts upload' },
    ],
    correctAnswer: 'C',
    explanation: {
      whatHappens: 'Upload progress freezes without feedback.',
      why: 'No network failure detection or retry logic.',
      idealBehavior: 'Show failure message with retry option.',
      impact: 'User wastes time and abandons task.',
    },
    meta: {
      category: 'Network',
      skills: ['Resilience Testing', 'Error Handling'],
    },
  },
  {
    id: 'WHI-05',
    title: 'User Presses Back After Login',
    scenario: 'User logs in successfully and presses browser back button.',
    options: [
      { id: 'A', label: 'Login page opens again' },
      { id: 'B', label: 'User stays logged in' },
      { id: 'C', label: 'User gets logged out' },
      { id: 'D', label: 'Blank screen appears' },
    ],
    correctAnswer: 'A',
    explanation: {
      whatHappens: 'Browser loads cached login page.',
      why: 'History stack not handled correctly.',
      idealBehavior: 'Redirect logged-in users away from login page.',
      impact: 'Confusing UX, potential session bugs.',
    },
    meta: {
      category: 'Navigation',
      skills: ['Browser Behavior', 'Session Awareness'],
    },
  },
  {
    id: 'WHI-06',
    title: 'Token Expires While User Is Active',
    scenario: 'User is filling a long form when auth token expires.',
    options: [
      { id: 'A', label: 'Form auto-submits' },
      { id: 'B', label: 'User is logged out without warning' },
      { id: 'C', label: 'Silent refresh happens' },
      { id: 'D', label: 'Form submission fails suddenly' },
    ],
    correctAnswer: 'D',
    explanation: {
      whatHappens: 'Form submit fails due to unauthorized request.',
      why: 'Token refresh not implemented.',
      idealBehavior: 'Refresh token or warn user before expiry.',
      impact: 'Loss of user-entered data.',
    },
    meta: {
      category: 'Authentication',
      skills: ['Session Management', 'UX Risk Analysis'],
    },
  },
  {
    id: 'WHI-07',
    title: 'User Opens Same Account in Two Tabs',
    scenario: 'User performs actions simultaneously in two browser tabs.',
    options: [
      { id: 'A', label: 'Actions sync perfectly' },
      { id: 'B', label: 'One tab overwrites the other' },
      { id: 'C', label: 'Application crashes' },
      { id: 'D', label: 'User gets logged out' },
    ],
    correctAnswer: 'B',
    explanation: {
      whatHappens: 'Last action wins, overwriting earlier data.',
      why: 'No concurrency handling or locking.',
      idealBehavior: 'Warn user or merge changes.',
      impact: 'Data loss or inconsistent state.',
    },
    meta: {
      category: 'Concurrency',
      skills: ['State Conflicts', 'Real-User Simulation'],
    },
  },
  {
    id: 'WHI-08',
    title: 'User Pastes Very Large Text Input',
    scenario: 'User pastes extremely long text into a comment field.',
    options: [
      { id: 'A', label: 'Input is trimmed automatically' },
      { id: 'B', label: 'App becomes slow or unresponsive' },
      { id: 'C', label: 'Submission is blocked with error' },
      { id: 'D', label: 'Text is saved fully' },
    ],
    correctAnswer: 'B',
    explanation: {
      whatHappens: 'UI freezes due to lack of input limits.',
      why: 'No frontend or backend length validation.',
      idealBehavior: 'Set character limits with user feedback.',
      impact: 'Poor performance and potential crashes.',
    },
    meta: {
      category: 'Performance',
      skills: ['Boundary Testing', 'Performance Awareness'],
    },
  },
  {
    id: 'WHI-09',
    title: 'User Clicks Logout During API Call',
    scenario: 'User clicks logout while data is still loading.',
    options: [
      { id: 'A', label: 'Request completes normally' },
      { id: 'B', label: 'User is logged out cleanly' },
      { id: 'C', label: 'Data loads after logout' },
      { id: 'D', label: 'App crashes' },
    ],
    correctAnswer: 'C',
    explanation: {
      whatHappens: 'Pending API response updates UI after logout.',
      why: 'Requests not cancelled on logout.',
      idealBehavior: 'Abort requests and clear state.',
      impact: 'Security and UX risk.',
    },
    meta: {
      category: 'Session',
      skills: ['Async Handling', 'Security Awareness'],
    },
  },
  {
    id: 'WHI-10',
    title: 'User Submits Form With Slow Network',
    scenario: 'User submits form on very slow internet.',
    options: [
      { id: 'A', label: 'Loader is shown properly' },
      { id: 'B', label: 'User clicks submit multiple times' },
      { id: 'C', label: 'Form auto-saves' },
      { id: 'D', label: 'Submission fails immediately' },
    ],
    correctAnswer: 'B',
    explanation: {
      whatHappens: 'User retries due to lack of feedback.',
      why: 'No loading indicator or disabled state.',
      idealBehavior: 'Show loader and disable submit.',
      impact: 'Duplicate requests and backend load.',
    },
    meta: {
      category: 'UX',
      skills: ['Network Simulation', 'User Psychology'],
    },
  },
]

export const apiCases: APICase[] = [
  {
    id: 'ARD-01',
    title: 'Login API Accepts Empty Password',
    request: {
      method: 'POST',
      endpoint: '/login',
      body: {
        email: 'user@test.com',
        password: '',
      },
    },
    response: {
      status: 200,
      body: {
        success: true,
        token: 'abc123',
      },
    },
    question: 'Is this API response correct?',
    options: [
      { id: 'A', label: 'Correct' },
      { id: 'B', label: 'Incorrect' },
      { id: 'C', label: 'Partially correct' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Password is empty but API allows login.',
      correctBehavior: 'Return 400 Bad Request with validation error.',
      risk: 'Severe security vulnerability.',
    },
    meta: {
      topic: 'Authentication',
      skills: ['API Validation', 'Security Testing'],
    },
  },
  {
    id: 'ARD-02',
    title: 'Signup API Allows Duplicate Email',
    request: {
      method: 'POST',
      endpoint: '/signup',
      body: {
        email: 'existing@test.com',
        password: '123456',
      },
    },
    response: {
      status: 201,
      body: {
        userId: 'u123',
      },
    },
    question: 'Is this behavior acceptable?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
      { id: 'C', label: 'Depends on frontend' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Duplicate email accounts should not be allowed.',
      correctBehavior: 'Return 409 Conflict or validation error.',
      risk: 'Data inconsistency and login confusion.',
    },
    meta: {
      topic: 'Data Integrity',
      skills: ['Negative Testing', 'Backend Validation'],
    },
  },
  {
    id: 'ARD-03',
    title: 'Missing Auth Token Returns 200',
    request: {
      method: 'GET',
      endpoint: '/profile',
      headers: {},
    },
    response: {
      status: 200,
      body: {
        name: 'John',
      },
    },
    question: 'Is this API secure?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Protected endpoint accessible without authentication.',
      correctBehavior: 'Return 401 Unauthorized.',
      risk: 'Private user data exposure.',
    },
    meta: {
      topic: 'Authorization',
      skills: ['Security Testing', 'Auth Validation'],
    },
  },
  {
    id: 'ARD-04',
    title: 'Invalid Input Returns 500 Error',
    request: {
      method: 'POST',
      endpoint: '/create-order',
      body: {
        productId: null,
      },
    },
    response: {
      status: 500,
      body: {
        error: 'Server error',
      },
    },
    question: 'Is this the correct status code?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Client sent invalid data.',
      correctBehavior: 'Return 400 Bad Request.',
      risk: 'Misleading monitoring and debugging difficulty.',
    },
    meta: {
      topic: 'Status Codes',
      skills: ['Error Handling', 'API Design'],
    },
  },
  {
    id: 'ARD-05',
    title: 'Delete API Uses GET Method',
    request: {
      method: 'GET',
      endpoint: '/delete-user?id=123',
    },
    response: {
      status: 200,
      body: {
        deleted: true,
      },
    },
    question: 'Is this API design correct?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'GET should not modify server state.',
      correctBehavior: 'Use DELETE method.',
      risk: 'Accidental deletions and security issues.',
    },
    meta: {
      topic: 'REST Principles',
      skills: ['API Semantics', 'Design Awareness'],
    },
  },
  {
    id: 'ARD-06',
    title: 'Expired Token Returns 200',
    request: {
      method: 'GET',
      endpoint: '/orders',
      headers: {
        Authorization: 'Bearer expired_token',
      },
    },
    response: {
      status: 200,
      body: [],
    },
    question: 'Is this response valid?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Expired tokens should not be accepted.',
      correctBehavior: 'Return 401 Unauthorized.',
      risk: 'Session hijacking and access control failure.',
    },
    meta: {
      topic: 'Token Management',
      skills: ['Security Testing', 'Auth Flows'],
    },
  },
  {
    id: 'ARD-07',
    title: 'Successful Creation Returns 200',
    request: {
      method: 'POST',
      endpoint: '/products',
      body: {
        name: 'Laptop',
      },
    },
    response: {
      status: 200,
      body: {
        id: 'p123',
      },
    },
    question: 'Is this status code ideal?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
      { id: 'C', label: 'Acceptable but not ideal' },
    ],
    correctAnswer: 'C',
    explanation: {
      why: '200 works but 201 Created is more correct.',
      correctBehavior: 'Use 201 for resource creation.',
      risk: 'Minor REST inconsistency.',
    },
    meta: {
      topic: 'REST Best Practices',
      skills: ['API Standards', 'Attention to Detail'],
    },
  },
  {
    id: 'ARD-08',
    title: 'Sensitive Data in API Response',
    request: {
      method: 'GET',
      endpoint: '/user/123',
    },
    response: {
      status: 200,
      body: {
        email: 'user@test.com',
        password: 'hashed_password',
      },
    },
    question: 'Is this acceptable?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Password should never be returned in API response.',
      correctBehavior: 'Exclude sensitive fields.',
      risk: 'Critical security breach.',
    },
    meta: {
      topic: 'Data Security',
      skills: ['Security Awareness', 'Data Protection'],
    },
  },
  {
    id: 'ARD-09',
    title: 'Rate Limit Exceeded Returns 200',
    request: {
      method: 'POST',
      endpoint: '/login',
      body: {
        email: 'user@test.com',
        password: 'wrong',
      },
    },
    response: {
      status: 200,
      body: {
        message: 'Too many attempts',
      },
    },
    question: 'Is this correct?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Rate limiting should return 429 status.',
      correctBehavior: '429 Too Many Requests.',
      risk: 'Bots may abuse API.',
    },
    meta: {
      topic: 'Rate Limiting',
      skills: ['Security Testing', 'API Governance'],
    },
  },
  {
    id: 'ARD-10',
    title: 'Partial Failure Returns Success',
    request: {
      method: 'POST',
      endpoint: '/bulk-upload',
      body: {
        items: ['a', 'b', null],
      },
    },
    response: {
      status: 200,
      body: {
        success: true,
      },
    },
    question: 'Is this response sufficient?',
    options: [
      { id: 'A', label: 'Yes' },
      { id: 'B', label: 'No' },
      { id: 'C', label: 'Only for small systems' },
    ],
    correctAnswer: 'B',
    explanation: {
      whyIncorrect: 'Partial failures must be clearly reported.',
      correctBehavior: 'Return detailed success/failure breakdown.',
      risk: 'Silent data loss.',
    },
    meta: {
      topic: 'Data Consistency',
      skills: ['Edge Case Analysis', 'API Reliability'],
    },
  },
]

export const bugReportCases: BugReportCase[] = [
  {
    id: 'WTB-01',
    title: 'Login Not Working',
    badReport: 'Login is not working.',
    question: 'What is wrong with this bug report?',
    improvedReport: {
      title: 'Login fails with valid credentials on Chrome',
      steps: [
        'Open login page',
        'Enter valid email and password',
        'Click Login',
      ],
      expected: 'User should be logged in successfully.',
      actual: 'Page reloads and user remains on login screen.',
      impact: 'User cannot access account, leading to potential churn.',
    },
    explanation: {
      issuesInBadReport: [
        'No steps to reproduce',
        'No browser or environment mentioned',
        'No expected vs actual behavior',
      ],
      whyImprovedIsBetter: 'Developers can now reproduce and prioritize the issue easily.',
    },
    meta: {
      skills: ['Bug Writing', 'Communication'],
      difficulty: 'Easy',
    },
  },
  {
    id: 'WTB-02',
    title: 'Payment Issue',
    badReport: 'Payment is buggy sometimes.',
    question: 'How can this bug report be improved?',
    improvedReport: {
      title: 'Duplicate payment created on double click of Pay button',
      steps: [
        'Go to checkout page',
        'Click Pay button twice quickly',
      ],
      expected: 'Payment should be processed only once.',
      actual: 'Two payment transactions are created.',
      impact: 'User may be charged twice, causing financial loss.',
    },
    explanation: {
      issuesInBadReport: [
        "Uses vague words like 'sometimes'",
        'No specific scenario mentioned',
      ],
      whyImprovedIsBetter: 'Clearly identifies trigger condition and business impact.',
    },
    meta: {
      skills: ['Edge Case Reporting', 'Critical Thinking'],
      difficulty: 'Medium',
    },
  },
  {
    id: 'WTB-03',
    title: 'UI Looks Bad',
    badReport: 'UI looks bad on mobile.',
    question: 'What information is missing here?',
    improvedReport: {
      title: 'Login button hidden behind keyboard on mobile devices',
      steps: [
        'Open login page on mobile',
        'Tap on password field to open keyboard',
      ],
      expected: 'Login button should remain visible.',
      actual: 'Keyboard overlaps and hides Login button.',
      impact: 'Mobile users cannot complete login.',
    },
    explanation: {
      issuesInBadReport: [
        'No device details',
        'No specific UI element mentioned',
      ],
      whyImprovedIsBetter: 'Pinpoints exact UI problem and affected users.',
    },
    meta: {
      skills: ['UI Testing', 'Mobile Testing'],
      difficulty: 'Easy',
    },
  },
  {
    id: 'WTB-04',
    title: 'App Crashes',
    badReport: 'App crashes when using profile.',
    question: 'Why is this report hard to act on?',
    improvedReport: {
      title: 'App crashes when saving profile without phone number',
      steps: [
        'Go to Profile page',
        'Clear phone number field',
        'Click Save',
      ],
      expected: 'Profile should save with validation error.',
      actual: 'Application crashes.',
      impact: 'User loses changes and trust in app stability.',
    },
    explanation: {
      issuesInBadReport: [
        'No crash trigger',
        'No steps provided',
      ],
      whyImprovedIsBetter: 'Helps developer reproduce crash reliably.',
    },
    meta: {
      skills: ['Crash Reporting', 'Reproducibility'],
      difficulty: 'Medium',
    },
  },
  {
    id: 'WTB-05',
    title: 'Something Went Wrong Error',
    badReport: 'Error message is wrong.',
    question: 'What makes this bug report weak?',
    improvedReport: {
      title: 'Generic error message shown on invalid coupon code',
      steps: [
        'Go to checkout',
        'Apply invalid coupon code',
      ],
      expected: 'User should see clear reason for failure.',
      actual: "Generic message 'Something went wrong' is shown.",
      impact: 'User does not know how to fix the issue.',
    },
    explanation: {
      issuesInBadReport: [
        'Does not mention which error message',
        'No scenario described',
      ],
      whyImprovedIsBetter: 'Clarifies UX issue and improvement needed.',
    },
    meta: {
      skills: ['UX Testing', 'Clarity in Reporting'],
      difficulty: 'Easy',
    },
  },
  {
    id: 'WTB-06',
    title: 'Slow Performance',
    badReport: 'Page is slow.',
    question: 'How should this be reported better?',
    improvedReport: {
      title: 'Dashboard takes more than 8 seconds to load on first visit',
      steps: [
        'Login as valid user',
        'Navigate to Dashboard',
      ],
      expected: 'Dashboard should load within 2–3 seconds.',
      actual: 'Dashboard takes ~8 seconds to load.',
      impact: 'Users may abandon app due to slow performance.',
    },
    explanation: {
      issuesInBadReport: [
        'No measurable data',
        'No context of where slowness occurs',
      ],
      whyImprovedIsBetter: 'Provides measurable performance expectation.',
    },
    meta: {
      skills: ['Performance Awareness', 'Precision'],
      difficulty: 'Medium',
    },
  },
  {
    id: 'WTB-07',
    title: 'Logout Not Working',
    badReport: 'Logout button does nothing.',
    question: 'What details are missing?',
    improvedReport: {
      title: 'User remains logged in after clicking Logout',
      steps: [
        'Login to application',
        'Click Logout button',
        'Press browser back button',
      ],
      expected: 'User should not access protected pages.',
      actual: 'Dashboard is still accessible.',
      impact: 'Security risk due to session not cleared.',
    },
    explanation: {
      issuesInBadReport: [
        'Does not describe result after logout',
        'Misses security impact',
      ],
      whyImprovedIsBetter: 'Highlights security severity.',
    },
    meta: {
      skills: ['Session Testing', 'Security Awareness'],
      difficulty: 'Medium',
    },
  },
  {
    id: 'WTB-08',
    title: 'Form Issue',
    badReport: 'Form is confusing.',
    question: 'Why is this feedback insufficient?',
    improvedReport: {
      title: 'Required fields not indicated on signup form',
      steps: [
        'Open signup form',
        'Try submitting without filling fields',
      ],
      expected: 'Mandatory fields should be clearly marked.',
      actual: 'No indication which fields are required.',
      impact: 'Users face repeated validation errors.',
    },
    explanation: {
      issuesInBadReport: [
        'Subjective language',
        'No actionable insight',
      ],
      whyImprovedIsBetter: 'Turns opinion into testable issue.',
    },
    meta: {
      skills: ['UX Evaluation', 'Structured Feedback'],
      difficulty: 'Easy',
    },
  },
  {
    id: 'WTB-09',
    title: 'API Fails',
    badReport: 'API is failing.',
    question: 'What should be added to this report?',
    improvedReport: {
      title: 'Create Order API returns 500 for missing productId',
      steps: [
        'Call POST /create-order without productId',
      ],
      expected: 'API should return 400 Bad Request.',
      actual: 'API returns 500 Internal Server Error.',
      impact: 'Incorrect error handling and monitoring noise.',
    },
    explanation: {
      issuesInBadReport: [
        'No endpoint mentioned',
        'No request details',
      ],
      whyImprovedIsBetter: 'Backend team can immediately debug.',
    },
    meta: {
      skills: ['API Testing', 'Backend Communication'],
      difficulty: 'Hard',
    },
  },
  {
    id: 'WTB-10',
    title: 'Upload Problem',
    badReport: 'File upload fails.',
    question: 'Why is this not helpful?',
    improvedReport: {
      title: 'File upload fails silently on network disconnect',
      steps: [
        'Start uploading large file',
        'Disconnect internet mid-upload',
      ],
      expected: 'User should see upload failure message.',
      actual: 'Upload stops without any message.',
      impact: 'User does not know upload failed.',
    },
    explanation: {
      issuesInBadReport: [
        'No failure condition',
        'No user impact mentioned',
      ],
      whyImprovedIsBetter: 'Captures real-world failure scenario.',
    },
    meta: {
      skills: ['Resilience Testing', 'Clear Reporting'],
      difficulty: 'Hard',
    },
  },
]
