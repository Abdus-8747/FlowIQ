

export default function ModelCard({ model }) {
  return (
    <div className="bg-gray-900 text-white p-4 md:p-6 rounded-lg mb-5">
      
      <h2 className="text-lg md:text-xl font-bold">{model.name}</h2>
      <p className="mt-2 text-sm">{model.whySelected}</p>

    </div>
  );
}
