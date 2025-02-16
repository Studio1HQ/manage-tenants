import PropertyList from '@/components/PropertyList';

export default function Home() {
  return (
    <div>
      <section className="bg-blue-600 text-white py-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Manage Tenants</h1>
          <p className="text-lg mb-8">
            Simplify your property management with our intuitive platform.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#properties"
              className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
            >
              View Properties
            </a>
            <a
              target="_blank"
              href="/api/cron"
              className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
            >
              Trigger Automation
            </a>
          </div>
        </div>
      </section>
      <div id="properties" className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Properties
          </h1>
          <PropertyList />
        </div>
      </div>
    </div>
  );
}
