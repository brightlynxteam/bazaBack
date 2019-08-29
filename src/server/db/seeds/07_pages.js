exports.seed = function (knex, Promise) {
    return knex('pages').del()
        .then(function () {
            return knex('pages').insert([
                {
                    text_id: 'quadro_rides',
                    type: 'SERVICE',
                    title: 'Прогулки на квадроциклах',
                    description: 'Прогулки на квадроциклах по живописнейшим видам горных массивов',
                    content: 'Один из самых популярных видов активного отдыха сегодня – это катание на квадроциклах. Такое активное времяпровождение добавит Вам энергии, драйва, адреналина и бурю эмоций.',
                    main_image: 'https://ek-sochi.ru/wp-content/uploads/2016/06/Progulki-na-kvadrotsiklah-V-SOCHI.jpg',
                    content_images: [
                        'https://ek-sochi.ru/wp-content/uploads/2016/06/Progulki-na-kvadrotsiklah-3-V-SOCHI.jpg',
                        'https://ek-sochi.ru/wp-content/uploads/2016/06/Progulki-na-kvadrotsiklah-2-V-SOCHI.jpg',
                        'https://ek-sochi.ru/wp-content/uploads/2016/06/Progulki-na-kvadrotsiklah-1-V-SOCHI.jpg'
                    ],
                },
                {
                    text_id: 'contact_zoo',
                    type: 'SERVICE',
                    title: 'Контактный зоопарк',
                    description: 'Контактный зоопарк — это отличное место для отдыха и получения позитивных эмоций как детям, так и взрослым',
                    content: 'В отличие от обычных зоопарков, где на животных можно смотреть только через клетки и ограждения, здесь зверюшек разрешают кормить, гладить и даже брать в руки.',
                    main_image: 'https://kudago.com/media/thumbs/xl/images/list/13/b9/13b9d055303c816fb0e78b7a6ce56a2b.jpg',
                    content_images: [
                        'https://kudago.com/media/thumbs/xl/images/list/9d/b3/9db37d712288c96bcca122766228062e.jpg',
                        'https://kudago.com/media/thumbs/xl/images/list/2b/da/2bda8a0fbb8b312263c7c9561a9eb87e.jpg',
                        'https://kudago.com/media/thumbs/xl/images/list/68/90/6890d0bdc790aabbc0053c5aff6a8560.jpg'
                    ]
                },
                {
                    text_id: 'about_rest',
                    type: 'INFO',
                    title: 'О базе отдыха',
                    description: 'Информация о базе отдыха',
                    content: 'На протяжении многих лет радует своих отдыхающих бассейнами с геотермальной водой и отличным сервисом.\n' +
                        '  На территории базы отдыха находятся 6 бассейнов, 3 из которых с гидромассажем, с разной глубиной и температурой. Помимо огромной пользы для здоровья, отдых на термальных источниках базы отдыха «Хуторок», это сказочный отдых независимо от времени года.\n' +
                        '  База отдыха «Хуторок» подойдет для семейного и корпоративного отдыха. А детям понравятся яркая игровая комната, детская площадка, купание в горячих источниках.\n' +
                        ' Наша база предоставляет просторные, хорошо освещаемые залы для проведения мероприятий, семинаров, тренингов, конференций. А если ваш отдых или мероприятие запланировано на несколько дней, вас разместят в комфортабельных номерах.\n' +
                        '   Для своих гостей база отдыха предлагает комфортабельные номера категории 2 и 3 звезды, теплые и открытые беседки, оборудованные мангальные зоны для приготовления барбекю. Бильярд, настольный теннис, аэрохоккей, парилка – все это украсит ваше пребывание на базе отдыха «Хуторок».\n' +
                        '  На территории базы отдыха «Хуторок» ежедневно работает закусочная «Харчевня», в которой вы сможете перекусить и восстановить силы для дальнейшего приятного отдыха. Вам предложат на выбор блюда из меню приготовленные заботливыми руками наших поваров.\n' +
                        '  Семейный отдых подарит возможность насладится свежайшим лесным воздухом. База просто утопает в зеленых насаждениях, повсюду клумбы, усаженные в разнообразных цветах, ели, кустарники, и все это великолепие подчеркивает разнообразными статуэтками и скульптурами.\n' +
                        '   Побывав однажды, вам захочется посетить нашу базу снова.\n' +
                        'Уют, комфорт и здоровый отдых на любой вкус по доступным ценам – это то, что предлагает база отдыха «Хуторок»',
                    main_image: 'https://static.wixstatic.com/media/874ff7_f5deb7fa7a4a4f59be4fd1ce53207ba6~mv2.png/v1/fill/w_350,h_125,al_c,lg_1,q_80/874ff7_f5deb7fa7a4a4f59be4fd1ce53207ba6~mv2.webp',
                    content_images: [
                        'https://otdih.nakubani.ru/m/roomBookingBig/522729a775139e9a5f654c43/',
                        'https://turbaza.ru/images/bases/3185/187252c6b2679fe8fe2fad1492109802.jpg'
                    ]
                },
                {
                    text_id: 'about_termal',
                    type: 'INFO',
                    title: 'Термальные источники',
                    description: 'Информация о термальных источниках',
                    content: 'Горячие источники, бьющие из-под земли, славятся своим химическим составом. Теплая вода вообще благоприятно влияет на самочувствие, и эффект сильнее, если источник содержит бром, йод, натрий, кальций, магний, хлор, криптон, вольфрам и другие биологические активные и минеральные вещества.            Вдоволь понежась в бассейне с бурлящей водой, вы расслабитесь и отдохнете.\n' +
                        '\n' +
                        '   Йодобромная терапия способствует снижению давления, в итоге вы лучше спите и работаете. Термальная вода – продукт уникальный и по происхождению, и по составу, и по косметическим свойствам. Сегодня ее уже используют не только для увлажнения.\n' +
                        '\n' +
                        '    Первопроходцами в применении термальных вод стали дерматологи. Они и прописали эту поистине живительную влагу для ухода за чувствительной кожей (в том числе детской) и для профилактики кожных воспалений и дерматитов. За ними обратили внимание на этот концентрат минералов и косметологи. И сейчас, благодаря им, спектр применения термальных вод значительно расширился. Воду из термальных источников применяют для гигиенического ухода, ею опрыскивают утром перед нанесением дневного крема или вместо тоника лицо. А для того, чтобы снять усталость в течение дня, ее используют даже прямо на макияж.\n' +
                        '\n' +
                        '    Кожа после термальной воды моментально становится более свежей, упругой, гладкой и сияющей. Ведь эта чудо – водичка выполняет освежающую функцию и насыщает кожу минералами.\n' +
                        '\n' +
                        '     Термальная вода словно создана для наружного применения: концентрат полезных веществ прекрасно проникает через кожу, насыщая ее минералами и микроэлементами.\n' +
                        '\n' +
                        'Термальные воды — это самое настоящее питье для вашей кожи!',
                    main_image: 'https://c1.momondo.net/content/articles/26/2691d87c-e9ca-341d-aaf9-5ecf4ddcc8c5.jpg',
                    content_images: [
                        'https://im30.club/wp-content/uploads/2019/01/2019-01-04_19-57-59_521195-1170x600.jpg'
                    ]
                },
                {
                    text_id: 'about_tavern',
                    type: 'INFO',
                    title: 'Харчевня',
                    description: 'Информация о харчевне',
                    content: 'Питание должно приносить пользу нашему организму,  поэтому очень  важно,  что  мы едим.\n' +
                        '\n' +
                        '​\n' +
                        '\n' +
                        '   На территории базы отдыха «Хуторок», ежедневно работает закусочная «Харчевня», в которой вы сможете как перекусить, так и полноценно пообедать.\n' +
                        '\n' +
                        '   Разнообразный ассортимент блюд не оставит вас равнодушными. Всё очень вкусно по - домашнему!\n' +
                        '\n' +
                        '   А любителям фаст-фуда нам тоже есть, что предложить. Например, бургеры с хрустящей картошечкой фри и соусом.\n' +
                        '\n' +
                        '   А для наших проживающих, за дополнительную плату, мы можем предложить воспользоваться услугой – «меню рум сервис». Также мы предлагаем комплексные завтраки: деревенский, лёгкий, сытный, континентальный.\n' +
                        '\n' +
                        '   Время завтраков с 8-00 до 11-00.\n' +
                        '\n' +
                        '   Мы принимаем заказы на торжества, банкеты, корпоративы, дни рождения и просто приглашаем вас с семьёй или дружной компанией.\n' +
                        '\n' +
                        '   Ваш отдых получится просто незабываемый!\n' +
                        '\n' +
                        '   Приятного аппетита!',
                    main_image: 'https://static.wixstatic.com/media/874ff7_310e0717d8ec4bc0912cc2499e622b15~mv2.jpg/v1/fill/w_1024,h_768,al_c,q_90/file.jpg',
                    content_images: [
                        'https://static.wixstatic.com/media/874ff7_94cdcd4c47b9433d945f608eef173510~mv2.jpg/v1/fill/w_1232,h_813,al_c,q_90/file.jpg',
                        'https://static.wixstatic.com/media/874ff7_6ad668c16e744b6ab0668dcc00d224e4~mv2_d_1920_1285_s_2.jpg/v1/fill/w_1600,h_1070,al_c,q_90/file.jpg'
                    ]
                },
                {
                    text_id: 'booking',
                    type: 'INFO',
                    title: 'Информация о бронировании',
                    description: 'Вся необходимая информация о бронировании',
                    content: 'Бронируйте просто и быстро - с нашей уникальной системой бронирования свободных номеров!',
                    main_image: 'http://gostinica.su/wp-content/uploads/2017/10/booking-online.jpg',
                    content_images: [
                        'http://anapka.ru/f/2012/03/12/1203120022yr.jpg',
                        'http://rukodelnicam.ru/wp-content/uploads/2014/06/vybor-gostinic.jpg'
                    ],
                },
                {
                    text_id: 'payment',
                    type: 'INFO',
                    title: 'Информация об оплате',
                    description: 'Вся необходимая информация об оплате',
                    content: 'Мы идем навстречу всем своим гостям, поэтому поддерживаем огромное количество систем оплаты - от бартера на домашнюю птицу до криптовалют!',
                    main_image: 'http://upts.vorkuta.com/images/credit_card.png',
                    content_images: [
                        'http://upts.vorkuta.com/images/credit_card.png',
                        'https://cs6.livemaster.ru/storage/b1/80/6e1f208548e3dabaf5c7e031e07r.jpg'
                    ],
                },
                {
                    text_id: 'skolko_chelovek_vmeschaet_v_sebya_odin_odnoetajnyiy_domik',
                    type: 'FAQ',
                    title: 'Сколько человек вмещает в себя один одноэтажный домик?',
                    description: 'Вопросы о размещении',
                    content: 'Один стандартный одноэтажный домик содержит либо две односпальные кровати, либо одну двухспальную, соответственно, может вместить двух человек.'
                },
                {
                    text_id: 'mojno_li_zaselitsya_v_dvuhmestnyiy_nomer_dvum_lyudyam_s_grudnyim_rebenkom',
                    type: 'FAQ',
                    title: 'Можно ли заселиться в двухместный номер двум людям с грудным ребенком?',
                    description: 'Вопросы о размещении',
                    content: 'Мы идем навстречу всем своим гостям, поэтому при необходимости бесплатно можем предоставить дополнительную кроватку для ребенка.'
                },
                {
                    text_id: 'za_kakoe_vremya_nujno_bronirovat_nomera',
                    type: 'FAQ',
                    title: 'За какое время нужно бронировать номера?',
                    description: 'Вопросы о бронировании',
                    content: 'В любое удобное для Вас время, в высокий сезон желательно заранее.'
                },
                {
                    text_id: 'predostavlyaetsya_li_gostyam_utyug',
                    type: 'FAQ',
                    title: 'Предоставляется ли гостям утюг?',
                    description: 'Вопросы об услугах',
                    content: 'На базе отдыха есть прачечные и гладильни, в которых Вы можете привести в порядок свою одежду.'
                },
                {
                    text_id: 'kakoe_oborudovanie_baza_otdyiha_mojet_predostavit_dlya_provedeniya_seminara',
                    type: 'FAQ',
                    title: 'Какое оборудование база отдыха может предоставить для проведения семинара?',
                    description: 'Вопросы об услугах',
                    content: 'Мы можем предоставить любое оборудование по предварительному запросу.'
                }
            ]);
        });
};
