exports.seed = function (knex, Promise) {
    return knex('feedback').del()
        .then(function () {
            return knex('feedback').insert([
                {
                    name: 'Василий Васильевич',
                    email: 'vv@example.com',
                    phone: '+79876543321',
                    message: 'Хорошее место, в выходные была насыщенная развлекательная программа и отличная караоке вечеринка. Приедем сюда еще.'
                },
                {
                    name: 'Тимур',
                    email: 'timur@example.com',
                    phone: '+79876543333',
                    message: 'Спасибо, за замечательный отдых! Природа, воздух, ласкающие взор виды… Приветливые, отзывчивые сотрудники. Молодцы все от администраторов до официантов. Приятно порадовало и удивило поздравление с Днем рождения. Надеемся до встречи.'
                },
                {
                    name: 'Оксана',
                    email: 'xoxo@example.com',
                    phone: '+79876543333',
                    message: 'Очень понравилось, были в августе 2019. Цена обслуживание, сервис и обстановка отлично! Выложу в сториз, следом друзья остановятся. И мы вернемся!!!!'
                },
                {
                    name: 'Светлана',
                    email: 'sveta@example.com',
                    phone: '+79876543344',
                    message: 'Большое СПАСИБО за прекрасный отдых! Сказочные домики, идеальная чистота и порядок произвели неизгладимое впечатление! Мы с мужем отдыхали 19 дней, во время отдыха ни на минуту не пожалели, что приехали. Выражаю огромную благодарность персоналу гостиницы, работникам «зелёного хозяйства», бассейна, работникам ресторана за их гостеприимство, дружелюбие, радушие, вежливость.'
                },
                {
                    name: 'Ольга',
                    email: 'olya@example.com',
                    phone: '+79876553666',
                    message: 'Посетили Базу отдыха в феврале месяце с 23.02 по 26.02.17 и остались очень довольны: дружественный персонал, вкусная еда, природа и кристально свежий воздух. Успели пройти ряд медицинских процедур: массаж и лечебные ванны, покатались на горке с подьемником на ватрушках, правда погода чуть подвела, но ничего, зато получили массу положительных эмоций, поели шашлык, угостились глинтвейном.'
                }
            ]);
        });
};
