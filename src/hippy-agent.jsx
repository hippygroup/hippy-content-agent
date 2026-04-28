import React, { useState } from 'react';
import { Upload, Sparkles, Calendar, Settings, AlertCircle } from 'lucide-react';

export default function HippyContentAgent() {
  const [activeTab, setActiveTab] = useState('generator');
  const [imagePreview, setImagePreview] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('hippy_api_key') || '');
  const [notionToken, setNotionToken] = useState(localStorage.getItem('hippy_notion_token') || '');
  const [databaseId, setDatabaseId] = useState(localStorage.getItem('hippy_db_id') || '');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const saveSettings = () => {
    localStorage.setItem('hippy_api_key', apiKey);
    localStorage.setItem('hippy_notion_token', notionToken);
    localStorage.setItem('hippy_db_id', databaseId);
    setSuccess('⚙️ Nastavenia uložené!');
    setTimeout(() => setSuccess(null), 3000);
    setSettingsOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const generateCaption = async () => {
    if (!imagePreview || !productDescription.trim()) {
      setError('Nahraj fotku a popíš produkt!');
      return;
    }
    if (!apiKey) {
      setError('Nastav API key v nastaveniach!');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const imageBase64 = imagePreview.split(',')[1];
      
      const response = await fetch('/api/generateCaption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          productDescription,
          apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API error');
      }

      const data = await response.json();
      setResult(data.content);
      setSuccess('✨ Content vygenerovaný!');
    } catch (err) {
      setError(`Chyba: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const generateWeeklyPlan = async () => {
    if (!apiKey) {
      setError('Nastav API key v nastaveniach!');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generateWeeklyPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API error');
      }

      const data = await response.json();
      setWeeklyPlan(data.content);
      setSuccess('📅 Týždenný plán hotový!');
    } catch (err) {
      setError(`Chyba: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const saveToNotion = async () => {
    if (!notionToken || !databaseId) {
      setError('Nastav Notion token a Database ID v nastaveniach!');
      return;
    }
    if (!result && !weeklyPlan) {
      setError('Vygeneruj content najprv!');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const pageContent = result || weeklyPlan;
      const title = result ? `Caption: ${productDescription}` : 'Týždenný plán';

      const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties: {
            title: {
              title: [{ text: { content: title } }],
            },
            status: {
              status: { name: 'Not started' },
            },
            content: {
              rich_text: [{ text: { content: pageContent } }],
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Notion API error');
      }

      setSuccess('🎯 Uložené do Notionu!');
      setResult(null);
      setProductDescription('');
      setImagePreview(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Notion chyba: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 font-sans">
      {/* Header */}
      <header className="border-b border-emerald-100/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">HIPPY Agent</h1>
                <p className="text-sm text-emerald-600">AI Content Planning za vašu značku</p>
              </div>
            </div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-3 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Notifications */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
            {success}
          </div>
        )}

        {/* Settings Panel */}
        {settingsOpen && (
          <div className="mb-8 p-6 bg-white rounded-xl border border-emerald-100 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-6">⚙️ Nastavenia</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Anthropic API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-sm"
                  placeholder="sk-ant-..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notion Integration Token
                </label>
                <input
                  type="password"
                  value={notionToken}
                  onChange={(e) => setNotionToken(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-sm"
                  placeholder="ntn_..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notion Database ID
                </label>
                <input
                  type="text"
                  value={databaseId}
                  onChange={(e) => setDatabaseId(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-sm"
                  placeholder="3506d575a8b8803f910dec6b5e0f95ce"
                />
              </div>
              <button
                onClick={saveSettings}
                className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-emerald-100">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'generator'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-5 h-5 inline mr-2" />
            Caption Generator
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'planner'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            Týždenný plán
          </button>
        </div>

        {/* Caption Generator Tab */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl border-2 border-dashed border-emerald-200 hover:border-emerald-400 transition-colors cursor-pointer group">
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center py-12">
                    <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-700 font-semibold mb-2">
                      Nahraj fotku produktu
                    </p>
                    <p className="text-sm text-slate-500">
                      PNG, JPG alebo WEBP (max 10MB)
                    </p>
                  </div>
                </label>
              </div>

              {imagePreview && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-700">Náhľad:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto rounded-lg border border-emerald-100"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Popis produktu
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="napr. Legíny SUNSET, čierne, vysoký pás, Econyl..."
                  className="w-full h-32 px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
              </div>

              <button
                onClick={generateCaption}
                disabled={generating}
                className={`w-full px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  generating
                    ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                {generating ? 'Generujem...' : 'Generovať caption'}
              </button>
            </div>

            {/* Result Section */}
            <div className="space-y-4">
              {result && (
                <div className="bg-white p-8 rounded-xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">✨ Vygenerovaný obsah</h3>
                  <div className="prose prose-sm max-w-none bg-slate-50 p-4 rounded-lg overflow-y-auto max-h-96 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                  <button
                    onClick={saveToNotion}
                    disabled={generating}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    💾 Uložiť do Notionu
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Weekly Planner Tab */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <button
              onClick={generateWeeklyPlan}
              disabled={generating}
              className={`w-full px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                generating
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              <Calendar className="w-5 h-5" />
              {generating ? 'Plánam...' : 'Vygeneruj týždenný plán'}
            </button>

            {weeklyPlan && (
              <div className="bg-white p-8 rounded-xl border border-emerald-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📅 Obsah na tento týždeň</h3>
                <div className="prose prose-sm max-w-none bg-slate-50 p-4 rounded-lg overflow-y-auto max-h-96 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {weeklyPlan}
                </div>
                <button
                  onClick={saveToNotion}
                  disabled={generating}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  💾 Uložiť do Notionu
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
