export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-slate-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">30-Day Action Plan</h2>

        <div className="relative pl-8 sm:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 bg-slate-700 transform sm:-translate-x-1/2"></div>

          {/* Week 1 */}
          <div className="relative z-10 mb-12 sm:flex sm:justify-between sm:items-center w-full group">
            <div className="hidden sm:block sm:w-5/12 text-right pr-8">
              <h3 className="text-xl font-bold text-white">Week 1: The Basics</h3>
              <p className="text-slate-400 text-sm mt-1">Bug lifecycle & Writing 20 bug reports.</p>
            </div>
            <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-slate-900 border-4 border-brand-500 rounded-full transform sm:-translate-x-1/2 flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>
            <div className="pl-12 sm:pl-8 sm:w-5/12">
              <div className="block sm:hidden mb-2">
                <h3 className="text-xl font-bold text-white">Week 1: The Basics</h3>
              </div>
              <ul className="list-disc list-outside text-slate-300 text-sm ml-4">
                <li>Learn SDLC/STLC basics</li>
                <li>Understand Severity vs Priority</li>
                <li>Practice writing bugs on fake apps</li>
              </ul>
            </div>
          </div>

          {/* Week 2 */}
          <div className="relative z-10 mb-12 sm:flex sm:justify-between sm:items-center w-full group flex-row-reverse">
            <div className="hidden sm:block sm:w-5/12 text-left pl-8">
              <h3 className="text-xl font-bold text-white">Week 2: Deep Manual</h3>
              <p className="text-slate-400 text-sm mt-1">Test real apps like Zomato/Flipkart.</p>
            </div>
            <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-slate-900 border-4 border-blue-500 rounded-full transform sm:-translate-x-1/2 flex items-center justify-center">
              <span className="text-xs font-bold text-white">2</span>
            </div>
            <div className="pl-12 sm:pr-8 sm:pl-0 sm:w-5/12 sm:text-right">
              <div className="block sm:hidden mb-2">
                <h3 className="text-xl font-bold text-white">Week 2: Deep Manual</h3>
              </div>
              <ul className="list-disc list-outside text-slate-300 text-sm ml-4 sm:ml-0 sm:mr-4 sm:list-none">
                <li>Exploratory testing practice</li>
                <li>Find UI/UX alignment issues</li>
                <li>Start learning Postman basics</li>
              </ul>
            </div>
          </div>

          {/* Week 3 */}
          <div className="relative z-10 mb-12 sm:flex sm:justify-between sm:items-center w-full">
            <div className="hidden sm:block sm:w-5/12 text-right pr-8">
              <h3 className="text-xl font-bold text-white">Week 3: Tech & Portfolio</h3>
              <p className="text-slate-400 text-sm mt-1">API Testing + Database Basics.</p>
            </div>
            <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-slate-900 border-4 border-purple-500 rounded-full transform sm:-translate-x-1/2 flex items-center justify-center">
              <span className="text-xs font-bold text-white">3</span>
            </div>
            <div className="pl-12 sm:pl-8 sm:w-5/12">
              <div className="block sm:hidden mb-2">
                <h3 className="text-xl font-bold text-white">Week 3: Tech & Portfolio</h3>
              </div>
              <ul className="list-disc list-outside text-slate-300 text-sm ml-4">
                <li>Test Login APIs with Postman</li>
                <li>Write basic SQL queries</li>
                <li>Create Notion/GitHub portfolio</li>
              </ul>
            </div>
          </div>

          {/* Week 4 */}
          <div className="relative z-10 sm:flex sm:justify-between sm:items-center w-full flex-row-reverse">
            <div className="hidden sm:block sm:w-5/12 text-left pl-8">
              <h3 className="text-xl font-bold text-white">Week 4: Apply</h3>
              <p className="text-slate-400 text-sm mt-1">Resume + Cold DMs + Mocks.</p>
            </div>
            <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-slate-900 border-4 border-green-500 rounded-full transform sm:-translate-x-1/2 flex items-center justify-center">
              <span className="text-xs font-bold text-white">4</span>
            </div>
            <div className="pl-12 sm:pr-8 sm:pl-0 sm:w-5/12 sm:text-right">
              <div className="block sm:hidden mb-2">
                <h3 className="text-xl font-bold text-white">Week 4: Apply</h3>
              </div>
              <ul className="list-disc list-outside text-slate-300 text-sm ml-4 sm:ml-0 sm:mr-4 sm:list-none">
                <li>Tailor resume (Focus on "Real Apps")</li>
                <li>Apply on Wellfound/LinkedIn</li>
                <li>Send Founder DMs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

