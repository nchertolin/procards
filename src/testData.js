const testUser = {
   id: '12312412',
   firstName: 'Никита',
   lastName: 'Чертолин',
   login: 'nchertolin',
   email: 'nchertolin@gmail.com',
   location: 'Екатеринбург',
   cardsViewed: 6723,
   score: 7012,
   cardsCreated: 107,
   hours: 325,
};

const testGlobalStatictics = [
   {
      userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      login: 'steve',
      score: 10000
   },
   {
      userId: '907fa85345345-345',
      login: 'alex',
      score: 9000
   },
   {
      userId: '568a85f64-5717-4562-b3fc-2c963f66afa6',
      login: 'victor',
      score: 8000
   },
   {
      userId: '667fa85f64-5717-4562-b3fc-2c963f66afa6',
      login: 'anna',
      score: 7000
   },
   {
      userId: '4364536fa85f64-5717-4562-b3fc-2c963f66afa6',
      login: 'olya',
      score: 6000
   }
];

const statistics = [
   { userId: 'isdf-o123sd', login: 'ivanzolo2003', score: 10000 },
   { userId: 'fgd-sdfw213123', login: 'nurminsiy', score: 9000 },
   { userId: 'dgdfgsdhksf', login: 'anya_mirnaya', score: 8000 },
];
const description = `Многие программы электронной вёрстки и редакторы HTML используют 
Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem 
ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. 
За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке,
некоторые - намеренно (например, юмористические варианты`;

const cards = [
   { id: Math.random().toString(24).slice(-6), frontSide: 'Первый вопрос карточки', backSide: 'Первый ответ карточки', hasFrontImage: true, hasBackImage: false },
   { id: Math.random().toString(24).slice(-6), frontSide: 'Третий вопрос карточки', backSide: 'Третий ответ карточки', hasFrontImage: true, hasBackImage: false },
   { id: Math.random().toString(24).slice(-6), frontSide: 'Второй вопрос карточки', backSide: 'Второй ответ карточки', hasFrontImage: true, hasBackImage: false },
];

const decksNames = [
   { deckName: 'Алгебра', deckId: 'alg' },
   { deckName: 'Геометрия', deckId: 'geom' },
   { deckName: 'Информатика и ИКТ', deckId: 'inf' },
   { deckName: 'География', deckId: 'geog' },
   { deckName: 'Русский', deckId: 'rus' },
   { deckName: 'Английский', deckId: 'eng' },
   { deckName: 'HTML теги', deckId: 'html' },
   { deckName: 'Клоужеры в swift', deckId: 'swift' },
   { deckName: 'Медицина', deckId: 'medical' },
   { deckName: 'Компьютерные сети', deckId: 'computer-webs' },
   { deckName: 'Статистика', deckId: 'stat' },
   { deckName: 'Психология', deckId: 'psiholog' },
   { deckName: 'Право', deckId: 'rule' },
   { deckName: 'Бизнес', deckId: 'bussines' },
   { deckName: 'Экономика', deckId: 'econom' },
   { deckName: 'Китайский', deckId: 'china' },
   { deckName: 'Японский', deckId: 'japan' },
   { deckName: 'Латинский', deckId: 'lat' },
   { deckName: 'Python', deckId: 'py' },
   { deckName: 'Алгоритмы', deckId: 'algor' },
   { deckName: 'Робототехника', deckId: 'robots' },
   { deckName: 'Основы маркетинга', deckId: 'market' },
   { deckName: 'Личная эффективность', deckId: 'effect' },
   { deckName: 'Экология', deckId: 'ecolog' },
   { deckName: 'Основы астрономии', deckId: 'astro' },
   { deckName: 'HR', deckId: 'hr' },
   { deckName: 'Валеология', deckId: 'valeo' },
   { deckName: 'Деловая переписка', deckId: 'delovaya-perepiska' },
   { deckName: 'Здоровье', deckId: 'zdorovie' },
   { deckName: 'Интернет вещей', deckId: 'internet' },
   { deckName: 'Мода', deckId: 'moda' },
   { deckName: 'Безопасность', deckId: 'safety' },
   { deckName: 'Методы оптимизации', deckId: 'optimization' },
   { deckName: 'Здоровье', deckId: 'zdorovie' },
   { deckName: 'Менеджмент', deckId: 'menage' },
   { deckName: 'Налогооблажение', deckId: 'nalog' },
   { deckName: 'Фотографии', deckId: 'photo' },
   { deckName: 'Мировая художественная культура', deckId: 'mhk' },
   { deckName: 'Физкультура', deckId: 'fiz' },
];

const generateDecks = () => decksNames.map(info => ({
   ...info,
   isOwner: Math.random() < 0.5,
   isPrivate: Math.random() < 0.5,
   statistics,
   description,
   ownerId: 'test-owner-id',
   ownerLogin: 'nchertolin',
   cardsCount: cards.length,
   cards
}));



const testData = {
   ...testUser,
   decks: generateDecks()
};

export { testUser, testData, testGlobalStatictics };