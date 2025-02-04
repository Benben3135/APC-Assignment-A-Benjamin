import WidgetList from '@/app/components/WidgetList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Widget Manager</h1>
        <WidgetList />
      </div>
    </main>
  );
}