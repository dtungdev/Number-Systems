import React, { useState, useEffect } from 'react';

export default function App() {
  const [num, setNum] = useState(25);
  const [base, setBase] = useState(2);
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState([]);
  const [reverseSteps, setReverseSteps] = useState([]);
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem("baseConverterNotes") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("baseConverterNotes", notes);
    } catch {
      // bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [notes]);

  useEffect(() => {
    const n = parseInt(num);
    if (isNaN(n)) return;

    const res = n.toString(base).toUpperCase();
    setResult(res);

    let tempN = n;
    let s = [];
    if (tempN === 0) s.push({ dividend: 0, div: base, rem: "0" });
    while (tempN > 0) {
      let q = Math.floor(tempN / base);
      let r = (tempN % base).toString(base).toUpperCase();
      s.push({ dividend: tempN, div: base, rem: r });
      tempN = q;
    }
    setSteps(s);

    let rs = [];
    for (let i = 0; i < res.length; i++) {
      let digit = parseInt(res[res.length - 1 - i], base);
      let val = digit * Math.pow(base, i);
      rs.push({ digit, base, exp: i, val });
    }
    setReverseSteps(rs);
  }, [num, base]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            IT Passport Prep Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 mb-2">
            Bí kíp Hệ Cơ Số
          </h1>
          <p className="text-slate-500 font-medium italic">"Ghi chú mẹo nhớ – Vượt qua kỳ thi"</p>
        </header>

        <main className="space-y-6">
          <div className="bg-white/70 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide uppercase">Số thập phân đầu vào</label>
                <input 
                  type="number" value={num} onChange={(e) => setNum(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 font-semibold text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide uppercase">Hệ cơ số đích</label>
                <select value={base} onChange={(e) => setBase(parseInt(e.target.value))}
                  className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 font-semibold text-lg">
                  <option value={2}>Nhị phân (Cơ số 2)</option>
                  <option value={8}>Bát phân (Cơ số 8)</option>
                  <option value={16}>Thập lục (Cơ số 16)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 text-center py-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-200">
              <span className="text-blue-100 text-xs font-bold uppercase tracking-widest">Kết quả hệ {base}</span>
              <div className="text-6xl font-mono font-black text-white mt-2 tracking-tighter">{result}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Chia lấy dư
              </h2>
              <div className="space-y-2 font-mono text-sm max-h-[300px] overflow-y-auto">
                {steps.map((st, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-600">{st.dividend} ÷ {st.div}</span>
                    <span className="font-bold text-blue-600">Dư {st.rem}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-purple-500 rounded-full"></span> Nhân lũy thừa
              </h2>
              <div className="space-y-2 font-mono text-sm max-h-[300px] overflow-y-auto">
                {reverseSteps.map((st, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-600">{st.digit} × {st.base}<sup className="font-sans">{st.exp}</sup></span>
                    <span className="font-bold text-purple-600">= {st.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ghi chú cá nhân */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-500 rounded-full"></span> Ghi chú ôn thi của bạn
              <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">✓ Tự động lưu</span>
            </h2>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Nhập mẹo nhớ hoặc công thức khó vào đây..."
              className="w-full h-32 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
            />
          </div>
        </main>
      </div>
    </div>
  );
}