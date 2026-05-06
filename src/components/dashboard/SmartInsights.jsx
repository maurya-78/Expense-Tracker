import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

const SmartInsights = ({ insights }) => {
  return (
    <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg shadow-indigo-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={20} className="text-indigo-200" />
        <h3 className="font-bold">Smart Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-1">
              {insight.type === 'warning' ? <AlertCircle size={16} /> : <TrendingUp size={16} />}
            </div>
            <p className="text-sm leading-snug text-indigo-50 font-medium">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition">
        Analyze Full Report
      </button>
    </div>
  );
};

export default SmartInsights;