'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { SendHorizontal, Flower2, Sparkles } from 'lucide-react'
import { getRandomCards } from '@/lib/tarotData'

export default function ChatPage() {
  const [question, setQuestion] = useState("")
  const [cardCount, setCardCount] = useState(3)
  const [cards, setCards] = useState<any[]>([])
  const [prediction, setPrediction] = useState("")
  const [loading, setLoading] = useState(false)
  const MAX_CHARS = 500

  const handleFortune = async () => {
    if (!question || loading) return
    setLoading(true)
    setPrediction("")  // ✅ reset คำทำนายเก่าก่อนทุกครั้ง
    setCards([])       // ✅ reset ไพ่เก่าก่อนทุกครั้ง

    const selectedCards = getRandomCards(cardCount)

    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, cards: selectedCards })
      })

      const data = await res.json()
      if (data.fortune) {
        setCards(selectedCards)    // ✅ โชว์ไพ่พร้อมกับคำทำนาย ไม่ใช่ก่อน
        setPrediction(data.fortune)
      } else {
        // ✅ handle error message จาก API
        setPrediction("ขออภัย ไม่สามารถติดต่อจิตวิญญาณได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง")
      }
    } catch (error) {
      console.error("AI Error:", error)
      setPrediction("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans">
      <Navbar />

      <main className="max-w-3xl mx-auto pt-28 pb-10 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 italic">วันนี้ท่านอยากให้ข้าช่วยดูเรื่องใด?</h2>
          <p className="text-zinc-500">พิมพ์เรื่องที่ท่านกังวลใจลงไป (ไม่เกิน 500 ตัวอักษร)</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-purple-500/5 animate-pulse pointer-events-none" />
          )}

          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={MAX_CHARS}
                disabled={loading}
                placeholder="เช่น... ความรักช่วงนี้จะเป็นอย่างไร, การงานเดือนหน้าดีไหม?"
                className="w-full h-44 bg-transparent text-xl leading-relaxed resize-none outline-none placeholder:text-zinc-700 disabled:opacity-50"
              />
              <div className="absolute bottom-0 right-0 text-xs text-zinc-600 font-mono">
                {question.length}/{MAX_CHARS}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <p className="text-sm font-medium text-zinc-400 mb-4 flex items-center gap-2">
                <Flower2 className="w-4 h-4" /> เลือกจำนวนไพ่ที่ต้องการจั่ว
              </p>
              <div className="flex flex-wrap gap-3">
                {[1, 3, 5].map((num) => (
                  <button
                    key={num}
                    disabled={loading}
                    onClick={() => setCardCount(num)}
                    className={`flex-1 min-w-[60px] py-3 rounded-2xl border transition-all font-bold ${
                      cardCount === num
                        ? "bg-emerald-500 border-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                    }`}
                  >
                    {num} ใบ
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleFortune}
              disabled={!question || question.length < 5 || loading}
              className="w-full mt-4 bg-zinc-100 text-black h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-white active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  กำลังติดต่อจิตวิญญาณ AI...
                </>
              ) : (
                <>
                  เริ่มเปิดไพ่พยากรณ์
                  <SendHorizontal className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ✅ ย้ายไพ่ + คำทำนายมาอยู่ใน main ด้วยกัน */}
        {cards.length > 0 && (
          <div className="flex justify-center gap-4 mt-12 flex-wrap animate-in fade-in zoom-in duration-500">
            {cards.map((card, index) => (
              <div key={index} className="text-center w-32 group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 transition-all">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                  {card.nameEn}
                </p>
              </div>
            ))}
          </div>
        )}

        {prediction && (
          <div className="mt-8 p-8 bg-zinc-900/30 border border-emerald-900/20 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-emerald-500 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
              <Sparkles className="w-4 h-4" /> คำทำนายจาก MysticAI
            </h3>
            <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg italic">
              "{prediction}"
            </div>
          </div>
        )}
      </main>
    </div>
  )
}