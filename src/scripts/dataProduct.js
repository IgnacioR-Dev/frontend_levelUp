const productos = [
    // Consolas
    {
        id: 1,
        nombre: "PlayStation 5",
        categoria: "Consolas",
        precio: 549990,
        imagen: "../assets/img/ps5.jpg",
        descripcion: "Consola PlayStation 5 con soporte para juegos en 4K.",
        imagenesAdicionales: [
            "../assets/img/ps5.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 2,
        nombre: "Xbox Series X",
        categoria: "Consolas",
        precio: 499990,
        imagen: "https://www.adslzone.net/app/uploads-adslzone.net/2020/03/xbox-series-x-delantera-trasera.jpg?x=480&quality=80",
        descripcion: "Consola Xbox Series X, la más potente de Microsoft.",
        imagenesAdicionales: [
            "https://www.adslzone.net/app/uploads-adslzone.net/2020/03/xbox-series-x-delantera-trasera.jpg?x=480&quality=80",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 3,
        nombre: "Nintendo Switch",
        categoria: "Consolas",
        precio: 329990,
        imagen: "https://media.falabella.com/falabellaCL/123426431_01/w=800,h=800,fit=pad",
        descripcion: "Consola híbrida Nintendo Switch con dock incluido.",
        imagenesAdicionales: [
            "https://media.falabella.com/falabellaCL/123426431_01/w=800,h=800,fit=pad",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // PC Gamer
    {
        id: 4,
        nombre: "PC Gamer ASUS ROG Strix",
        categoria: "PC Gamer",
        precio: 1299990,
        imagen: "https://sipoonline.cl/wp-content/uploads/2024/05/Pc-Gamer-Asus-Strix_Intel-Core-i9-14900KF-64GB-DDR5-5600mhz-RTX-4090-24GB.png",
        descripcion: "PC Gamer ASUS ROG Strix con RTX 4090 y 64GB RAM.",
        imagenesAdicionales: [
            "https://sipoonline.cl/wp-content/uploads/2024/05/Pc-Gamer-Asus-Strix_Intel-Core-i9-14900KF-64GB-DDR5-5600mhz-RTX-4090-24GB.png",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 5,
        nombre: "PC Gamer MSI",
        categoria: "PC Gamer",
        precio: 1099990,
        imagen: "https://sipoonline.cl/wp-content/uploads/2025/04/Gabinete-Gamer-Msi-Pano-100R-PZ-2.webp",
        descripcion: "PC Gamer MSI con alto rendimiento para juegos.",
        imagenesAdicionales: [
            "https://sipoonline.cl/wp-content/uploads/2025/04/Gabinete-Gamer-Msi-Pano-100R-PZ-2.webp",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 6,
        nombre: "PC Gamer Gigabyte",
        categoria: "PC Gamer",
        precio: 1199990,
        imagen: "https://www.gizcomputer.com/wp-content/uploads/2019/03/Gigabyte-AC300W.png",
        descripcion: "PC Gamer Gigabyte equilibrado para streaming y gaming.",
        imagenesAdicionales: [
            "https://www.gizcomputer.com/wp-content/uploads/2019/03/Gigabyte-AC300W.png",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // Sillas Gamer
    {
        id: 7,
        nombre: "Silla Gamer Secretlab Titan",
        categoria: "Sillas Gamer",
        precio: 349990,
        imagen: "https://secretlab.eu/cdn/shop/products/TITAN-2020-STEALTH-1_grande.jpg?v=1626092669",
        descripcion: "Silla ergonómica Secretlab Titan para largas sesiones.",
        imagenesAdicionales: [
            "https://secretlab.eu/cdn/shop/products/TITAN-2020-STEALTH-1_grande.jpg?v=1626092669",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 8,
        nombre: "Silla Gamer Cougar Armor",
        categoria: "Sillas Gamer",
        precio: 289990,
        imagen: "https://abacomp.cl/wp-content/uploads/2021/10/ARMOR-CHAIR.jpg",
        descripcion: "Silla gamer Cougar Armor con diseño deportivo.",
        imagenesAdicionales: [
            "https://abacomp.cl/wp-content/uploads/2021/10/ARMOR-CHAIR.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 9,
        nombre: "Silla Gamer DXRacer",
        categoria: "Sillas Gamer",
        precio: 399990,
        imagen: "https://cloud.corferias.co/service/vitrina_virtual/product_image.cfm?id=72893&shop_id=10&type=2",
        descripcion: "Silla gamer DXRacer de alta gama.",
        imagenesAdicionales: [
            "https://cloud.corferias.co/service/vitrina_virtual/product_image.cfm?id=72893&shop_id=10&type=2",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // Accesorios
    {
        id: 10,
        nombre: "Controlador Xbox Series X",
        categoria: "Accesorios",
        precio: 59990,
        imagen: "../assets/img/accesorio.webp",
        descripcion: "Control inalámbrico oficial Xbox Series X.",
        imagenesAdicionales: [
            "./assets/img/accesorio.webp",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 11,
        nombre: "Auriculares HyperX Cloud II",
        categoria: "Accesorios",
        precio: 79990,
        imagen: "https://media.solotodo.com/media/products/1372884_picture_1618867656.jpg",
        descripcion: "Auriculares HyperX con sonido envolvente 7.1.",
        imagenesAdicionales: [
            "https://media.solotodo.com/media/products/1372884_picture_1618867656.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 12,
        nombre: "Teclado Mecánico Razer",
        categoria: "Accesorios",
        precio: 119990,
        imagen: "https://media.spdigital.cl/thumbnails/products/qvi2wbnv_cb436cd5_thumbnail_4096.jpg",
        descripcion: "Teclado mecánico Razer RGB premium.",
        imagenesAdicionales: [
            "https://media.spdigital.cl/thumbnails/products/qvi2wbnv_cb436cd5_thumbnail_4096.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // Mouse
    {
        id: 13,
        nombre: "Logitech G502 HERO",
        categoria: "Mouse",
        precio: 49990,
        imagen: "../assets/img/mouse.webp",
        descripcion: "Mouse Logitech G502 HERO con sensor HERO 25K.",
        imagenesAdicionales: [
            "../assets/img/mouse.webp",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 14,
        nombre: "Razer DeathAdder Elite",
        categoria: "Mouse",
        precio: 59990,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_761962-MLC31212811380_062019-O-mouse-razer-deathadder-elite.webp",
        descripcion: "Mouse gamer Razer DeathAdder Elite.",
        imagenesAdicionales: [
            "https://http2.mlstatic.com/D_NQ_NP_761962-MLC31212811380_062019-O-mouse-razer-deathadder-elite.webp",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 15,
        nombre: "SteelSeries Rival 600",
        categoria: "Mouse",
        precio: 69990,
        imagen: "https://m.media-amazon.com/images/I/51UnFzpQ-RL._UF894,1000_QL80_.jpg",
        descripcion: "Mouse SteelSeries Rival 600 con doble sensor.",
        imagenesAdicionales: [
            "https://m.media-amazon.com/images/I/51UnFzpQ-RL._UF894,1000_QL80_.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // MousePad
    {
        id: 16,
        nombre: "Razer Goliathus Extended",
        categoria: "MousePad",
        precio: 29990,
        imagen: "https://cdn.gameplanet.com/wp-content/uploads/2022/10/31165335/811659039842-mousepad-halo-goliathus.jpg",
        descripcion: "Mousepad Razer Goliathus Extended para gamers.",
        imagenesAdicionales: [
            "https://cdn.gameplanet.com/wp-content/uploads/2022/10/31165335/811659039842-mousepad-halo-goliathus.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 17,
        nombre: "Logitech Powerplay",
        categoria: "MousePad",
        precio: 99990,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_699110-MLA84539763144_052025-O.webp",
        descripcion: "Mousepad Logitech Powerplay con carga inalámbrica.",
        imagenesAdicionales: [
            "https://http2.mlstatic.com/D_NQ_NP_699110-MLA84539763144_052025-O.webp",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 18,
        nombre: "Corsair MM300 Pro",
        categoria: "MousePad",
        precio: 39990,
        imagen: "https://assets.pcfactory.cl/public/foto/50696/1_500.jpg?t=1752516451467",
        descripcion: "Mousepad Corsair MM300 Pro antideslizante.",
        imagenesAdicionales: [
            "https://assets.pcfactory.cl/public/foto/50696/1_500.jpg?t=1752516451467",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // Juegos de Mesa
    {
        id: 19,
        nombre: "Catan",
        categoria: "Juegos de Mesa",
        precio: 29990,
        imagen: "../assets/img/juegosmesa.jpg",
        descripcion: "Juego de mesa Catan para 3 a 4 jugadores.",
        imagenesAdicionales: [
            "../assets/img/juegosmesa.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 20,
        nombre: "Monopoly",
        categoria: "Juegos de Mesa",
        precio: 24990,
        imagen: "https://hasbrostore.cl/28348-large_default/juego-de-mesa-monopoly-clasico.jpg",
        descripcion: "Monopoly clásico, el juego de bienes raíces.",
        imagenesAdicionales: [
            "https://hasbrostore.cl/28348-large_default/juego-de-mesa-monopoly-clasico.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 21,
        nombre: "UNO",
        categoria: "Juegos de Mesa",
        precio: 9990,
        imagen: "https://dojiw2m9tvv09.cloudfront.net/10102/product/unoclasico-14328.jpg",
        descripcion: "Juego de cartas UNO clásico.",
        imagenesAdicionales: [
            "https://dojiw2m9tvv09.cloudfront.net/10102/product/unoclasico-14328.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },

    // Poleras
    {
        id: 22,
        nombre: "Polera Gamer 'Level-Up'",
        categoria: "Poleras Personalizadas",
        precio: 14990,
        imagen: "../assets/img/poleras.webp",
        descripcion: "Polera personalizada con diseño gamer Level-Up.",
        imagenesAdicionales: [
            "../assets/img/poleras.webp",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 23,
        nombre: "Polera Mario Bros",
        categoria: "Poleras Personalizadas",
        precio: 16990,
        imagen: "https://home.ripley.cl/store/Attachment/WOP/D397/2000400124366/2000400124366_2.jpg",
        descripcion: "Polera estampada con diseño de Mario Bros.",
        imagenesAdicionales: [
            "https://home.ripley.cl/store/Attachment/WOP/D397/2000400124366/2000400124366_2.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    },
    {
        id: 24,
        nombre: "Polera Zelda Ocarina",
        categoria: "Poleras Personalizadas",
        precio: 17990,
        imagen: "https://i.redd.it/ukwbv3vi4er51.jpg",
        descripcion: "Polera de Zelda Ocarina of Time.",
        imagenesAdicionales: [
            "https://i.redd.it/ukwbv3vi4er51.jpg",
            "../assets/img/pcplaceholder.jpg",
            "../assets/img/pcplaceholder.jpg"
        ]
    }
];
