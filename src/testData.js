const testUser = {
   id: '12312412',
   firstName: 'Никита',
   lastName: 'Чертолин',
   login: 'nchertolin',
   email: 'nchertolin@gmail.com',
   location: 'Екатеринбург',
   cardsViewed: 6723,
   score: 7012,
   cardsCreatedCount: 107,
   hours: 325,
}

const statistics = [
   { userId: Math.random().toString(24).slice(-6), login: 'ivanzolo2003', score: 8000 },
   { userId: Math.random().toString(24).slice(-6), login: 'nurminsiy', score: 9000 },
   { userId: Math.random().toString(24).slice(-6), login: 'anya_mirnaya', score: 10000 },
];
const author = {
   firstName: 'Никита',
   lastName: 'Чертолин',
}
const description = `Многие программы электронной вёрстки и редакторы HTML используют 
Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem 
ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. 
За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке,
 некоторые - намеренно (например, юмористические варианты`;

const cards = [
   { id: Math.random().toString(24).slice(-6), frontSide: 'Первый вопрос карточки', backSide: 'Первый ответ карточки' },
   { id: Math.random().toString(24).slice(-6), frontSide: 'Второй вопрос карточки', backSide: 'Второй ответ карточки' },
   { id: Math.random().toString(24).slice(-6), frontSide: 'Третий вопрос карточки', backSide: 'Третий ответ карточки' },
];

const decksNames = [
   { name: 'Алгебра', deckId: 'alg' },
   { name: 'Геометрия', deckId: 'geom' },
   { name: 'Информатика и ИКТ', deckId: 'inf' },
   { name: 'География', deckId: 'geog' },
   { name: 'Русский', deckId: 'rus' },
   { name: 'Английский', deckId: 'eng' },
   { name: 'HTML теги', deckId: 'html' },
   { name: 'Клоужеры в swift', deckId: 'swift' },
   { name: 'Медицина', deckId: 'medical' },
   { name: 'Компьютерные сети', deckId: 'computer-webs' },
   { name: 'Статистика', deckId: 'stat' },
   { name: 'Психология', deckId: 'psiholog' },
   { name: 'Право', deckId: 'rule' },
   { name: 'Бизнес', deckId: 'bussines' },
   { name: 'Экономика', deckId: 'econom' },
   { name: 'Китайский', deckId: 'china' },
   { name: 'Японский', deckId: 'japan' },
   { name: 'Латинский', deckId: 'lat' },
   { name: 'Python', deckId: 'py' },
   { name: 'Алгоритмы', deckId: 'algor' },
   { name: 'Робототехника', deckId: 'robots' },
   { name: 'Основы маркетинга', deckId: 'market' },
   { name: 'Личная эффективность', deckId: 'effect' },
   { name: 'Экология', deckId: 'ecolog' },
   { name: 'Основы астрономии', deckId: 'astro' },
   { name: 'HR', deckId: 'hr' },
   { name: 'Валеология', deckId: 'valeo' },
   { name: 'Деловая переписка', deckId: 'delovaya-perepiska' },
   { name: 'Здоровье', deckId: 'zdorovie' },
   { name: 'Интернет вещей', deckId: 'internet' },
   { name: 'Мода', deckId: 'moda' },
   { name: 'Безопасность', deckId: 'safety' },
   { name: 'Методы оптимизации', deckId: 'optimization' },
   { name: 'Здоровье', deckId: 'zdorovie' },
   { name: 'Менеджмент', deckId: 'menage' },
   { name: 'Налогооблажение', deckId: 'nalog' },
   { name: 'Фотографии', deckId: 'photo' },
   { name: 'Мировая художественная культура', deckId: 'mhk' },
   { name: 'Физкультура', deckId: 'fiz' },
];

const generateDecks = () => decksNames.map(info => ({
   ...info,
   isOwner: Math.random() < 0.5,
   isPrivate: Math.random() < 0.5,
   password: Math.random().toString(10).slice(-6),
   statistics,
   description,
   author,
   cardsCount: cards.length,
   cards
}));



const testData = {
   ...testUser,
   decks: generateDecks()
};

export { testUser, testData };