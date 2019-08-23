exports.seed = function (knex, Promise) {
    return knex('news').del()
        .then(function () {
            return knex('news').insert([
                {
                    title: 'День поселка на базе отдыха Хуторок!',
                    description: 'Акция в день поселка Мостовской на нашей базе отдыха',
                    content: 'Только в эти выходные скидка на все виды услуг на нашей базе отдыха! Приходи сам и приводи друзей!',
                    main_image: 'https://penza-online.ru/upload/articles/2019/5d5a9b803fba7.jpeg',
                    content_images: [
                        'https://waterpark.by/images/s09.jpg',
                        'https://img.tyt.by/p/0e/8/5mt19092016.jpg'
                    ]
                },
                {
                    title: 'Скидка на массаж',
                    description: '',
                    content: 'Уважаемые пенсионеры! Спешим сообщить, что в течение всего сентября на базе отдыха Хуторок при предъявлении пенсионного удостоверения действует скидка в размере 40% на массаж!',
                    main_image: 'https://st.depositphotos.com/1003556/4243/i/450/depositphotos_42439963-stock-photo-an-old-woman-is-having.jpg',
                    content_images:[
                        'https://ab-spa.ru/assets/images/products/62/1024x768/2.-ozdorovitelnyij-massazh-spinyi.jpg-430-330-crop.jpg',
                        'https://cross.expert/wp-content/uploads/2018/02/Sportivnyj-massazh-posle-trenirovki.jpg'
                    ]
                },
                {
                    title: 'День Краснодарского края на базе отдыха Хуторок!',
                    description: 'Акция в день Краснодарского края на нашей базе отдыха',
                    content: 'Только в эти выходные скидка на все виды услуг на нашей базе отдыха! Приходи сам и приводи друзей!',
                    main_image: 'https://penza-online.ru/upload/articles/2019/5d5a9b803fba7.jpeg',
                    content_images: [
                        'https://waterpark.by/images/s09.jpg',
                        'https://img.tyt.by/p/0e/8/5mt19092016.jpg'
                    ]
                },
                {
                    title: 'Скидка на прокат велосипедов',
                    description: '',
                    content: 'Уважаемые посетители! Всем скидку! Катайтесь на здоровье!',
                    main_image: 'https://legkopolezno.ru/wp-content/uploads/2016/08/katanie-na-velosipede_5.jpg',
                    content_images:[
                        'https://st2.depositphotos.com/3541157/10822/i/950/depositphotos_108222310-stock-photo-biking-a-romantic-walk.jpg',
                        'https://dietadvice.ru/wp-content/uploads/2015/07/dietadvice_65750311-360x216.jpg'
                    ]
                },
                {
                    title: 'Не придумал',
                    description: 'Сложно писать описание к тому, что не придумал',
                    content: 'И содержимое этой новости меня крайне озадачило. Пусть здесь будет пара предложений о том, что я не смог придумать, чем заполнить это поле.',
                    main_image: '',
                    content_images: []
                }
            ]);
        });
};
