'use client';
import { useEffect, useRef, useState } from 'react';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CookieIcon from '@mui/icons-material/Cookie';
import StarIcon from '@mui/icons-material/Star';

const dish = {
  id: '1',
  name: 'Панкейки с клубничным джемом',
  price: 2950,
  rating: 4.5,
  reviewsCount: 2,
  weight: 360,
  kcal: 325,
  imageUrl:
    'https://yumchief.com/wp-content/uploads/2023/01/oat-pancakes-with-fresh-strawberry-sauce-main-min.jpg',
  description:
    'Плов — это не просто еда, это душа Востока в одной кастрюле. Насыщенный, ароматный и невероятно сытный.',
  composition: 'Молоко, яйца, мука, клубника, масло.',
  reviews: [
    {
      id: 1,
      rating: 4.5,
      text: 'Было очень вкусно спасибо большое!',
      date: '01.02.2024'
    },
    {
      id: 2,
      rating: 4.5,
      text: 'Было очень вкусно спасибо большое!',
      date: '01.02.2024'
    }
  ]
};

const fallbackImg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">image</text></svg>`
  );

/* ---------------- BottomSheet (адаптивная высота) ---------------- */
function BottomSheet({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  // Закрытие по ESC + блок скролла страницы
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => void (document.body.style.overflow = prev);
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Детали'}
        className={`fixed inset-x-0 bottom-0 z-50 w-full max-w-md mx-auto
          max-h-[90vh] min-h-[80vh] rounded-t-3xl bg-white shadow-2xl
          transition-transform duration-300 ease-out
          ${open ? 'translate-y-0' : 'translate-y-full'}
          overflow-hidden flex flex-col bottom-sheet
          sm:max-w-lg md:max-w-xl
        `}
        style={{ willChange: 'transform' }}
      >
        {/* Drag handle */}
        <div className="pt-3 pb-2 flex-shrink-0">
          <div className="mx-auto h-1 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto bottom-sheet-content">
          {children}
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [addon, setAddon] = useState('jam');
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <main className="mx-auto max-w-md min-h-screen bg-white">
      <div className="px-4 pt-8 pb-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Добро пожаловать!</div>
            <div className="text-xl font-semibold">Ваш стол №9</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-800">
              <button className="p-4 rounded-full shadow-md bg-white">
                <RecordVoiceOverIcon />
              </button>
              <button className="p-4 rounded-full shadow-md bg-white ">
                <LanguageIcon /> Ру
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <span className="text-gray-400">
              <SearchIcon />
            </span>
            <input
              placeholder="Поиск по вашим предпочтениям"
              className="w-full bg-transparent outline-none text-sm py-2"
            />
          </div>
        </div>
      </div>

      {/* Categories and dishes grid */}
      <div className="grid grid-cols-[30%_70%] px-4 gap-2">
        <div>
          <h1 className="text-lg">Категории</h1>
          <ul className="mt-4 flex flex-col gap-4 text-gray-400">
            <li>Завтраки</li>
            <li>Горячие блюда</li>
            <li>Салаты</li>
          </ul>
        </div>

        <div className="pt-8 px-4">
          <h1>Завтраки</h1>

          {/* Dish card */}
          <div
            onClick={() => setOpen(true)}
            className="w-full bg-white rounded-2xl py-2 flex items-center gap-3 cursor-pointer active:scale-[0.995] transition"
          >
            <div className="relative w-[100px] h-[82px] shrink-0 overflow-hidden rounded-xl">
              <img
                src={dish.imageUrl}
                onError={(e) => ((e.target as HTMLImageElement).src = fallbackImg)}
                alt="Панкейки с клубничным джемом"
                className="w-full h-full object-cover"
              />
              <div className="absolute left-1.5 bottom-1.5 flex items-center gap-1.5 rounded-full px-1.5 py-[2px] bg-white/55 backdrop-blur-md text-white text-xs ring-1 ring-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-md">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                      fill="#f5f3eeff"
                    />
                  </svg>
                </span>
                {dish.rating}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-xs mb-4">{dish.name}</h1>
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">{dish.price} ₸</span>
                <button className="text-md px-2 rounded-full border-gray-100 border shadow-xl">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet open={open} onClose={() => setOpen(false)} title={dish.name}>
        <div className="px-4 pb-6">
          {/* Hero image */}
          <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-2xl mb-4">
            <img
              src={dish.imageUrl}
              onError={(e) => ((e.target as HTMLImageElement).src = fallbackImg)}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute left-3 bottom-3 flex items-center gap-1 rounded-full bg-black/50 text-white text-xs px-2.5 py-1.5 backdrop-blur-sm">
              <StarIcon sx={{ fontSize: 12 }} />
              <span>{dish.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold mb-3 leading-tight">{dish.name}</h1>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{dish.description}</p>

          {/* Nutrition info */}
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <LocalFireDepartmentIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
              <span>{dish.kcal}ккал</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <CookieIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
              <span>{dish.weight}гр</span>
            </div>
          </div>

          {/* Composition */}
          <div className="mb-6">
            <span className="text-sm text-gray-700 font-medium">Состав: </span>
            <span className="text-sm text-gray-600">{dish.composition}</span>
          </div>

          {/* Add-ons section */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 text-gray-900">Добавить</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="addon"
                  className="hidden"
                  checked={addon === 'jam'}
                  onChange={() => setAddon('jam')}
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  addon === 'jam' ? 'border-black' : 'border-gray-300'
                }`}>
                  {addon === 'jam' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                </div>
                <span className="text-sm text-gray-800">+1 порция джема</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="addon"
                  className="hidden"
                  checked={addon === 'pancakes'}
                  onChange={() => setAddon('pancakes')}
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  addon === 'pancakes' ? 'border-black' : 'border-gray-300'
                }`}>
                  {addon === 'pancakes' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                </div>
                <span className="text-sm text-gray-800">+1 порция панкейков</span>
              </label>
            </div>
          </div>

          {/* Reviews section */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3 text-gray-900">Отзывы</h3>
            
            <div className="space-y-4">
              {dish.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <StarIcon sx={{ fontSize: 14, color: '#FCD34D' }} />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed bottom section */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={quantity <= 1}
              >
                –
              </button>
              <span className="text-base font-medium min-w-[20px] text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button 
              onClick={() => {
                // Handle add to cart logic here
                setOpen(false);
              }}
              className="flex-1 h-12 rounded-full bg-black text-white font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              Добавить • {(dish.price * quantity).toLocaleString()} ₸
            </button>
          </div>
        </div>
      </BottomSheet>
    </main>
  );
}