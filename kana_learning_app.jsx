// =============================
// index.html (for GitHub Pages)
// =============================
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kana Learning App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body class="bg-gray-100">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useRef, useEffect } = React;

    const hiragana = [
      { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
      { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" }
    ];

    const katakana = [
      { kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" },
      { kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" }
    ];

    function DrawingCanvas() {
      const canvasRef = useRef(null);
      const [drawing, setDrawing] = useState(false);

      useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
      }, []);

      const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      };

      const startDraw = (e) => {
        setDrawing(true);
        draw(e);
      };

      const endDraw = () => setDrawing(false);

      const draw = (e) => {
        if (!drawing) return;
        const ctx = canvasRef.current.getContext("2d");
        const { x, y } = getPos(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      };

      const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      return (
        <div className="mt-4">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border rounded-2xl bg-white touch-none"
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
            onTouchStart={startDraw}
            onTouchEnd={endDraw}
            onTouchMove={draw}
          />
          <button onClick={clear} className="mt-2 px-4 py-2 bg-black text-white rounded-2xl">
            Clear
          </button>
        </div>
      );
    }

    function KanaApp() {
      const [mode, setMode] = useState("hiragana");
      const [index, setIndex] = useState(0);
      const [showAnswer, setShowAnswer] = useState(false);

      const data = mode === "hiragana" ? hiragana : katakana;

      const next = () => {
        setIndex((index + 1) % data.length);
        setShowAnswer(false);
      };

      return (
        <div className="p-4 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Kana Learning App</h1>

          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setMode("hiragana")}
              className={`px-3 py-2 rounded-2xl ${mode === "hiragana" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Hiragana
            </button>
            <button
              onClick={() => setMode("katakana")}
              className={`px-3 py-2 rounded-2xl ${mode === "katakana" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Katakana
            </button>
          </div>

          <div className="text-6xl mb-2">{data[index].kana}</div>

          {showAnswer && (
            <div className="text-xl text-gray-600 mb-4">{data[index].romaji}</div>
          )}

          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-4 py-2 bg-blue-500 text-white rounded-2xl"
            >
              Show Answer
            </button>
            <button
              onClick={next}
              className="px-4 py-2 bg-green-500 text-white rounded-2xl"
            >
              Next
            </button>
          </div>

          <h2 className="text-lg font-semibold">Writing Practice</h2>
          <DrawingCanvas />
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<KanaApp />);
  </script>
</body>
</html>