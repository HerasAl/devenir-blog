// app.js
class Card {
    constructor(data) {
        this.data = data;
        this.element = this.crearElemento();
    }

    crearElemento() {
        const cardContainer = $('<a>', { href: this.data.link, target: '_blank' });

        const card = $('<div>', { class: 'uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid', 'uk-grid': '' });
        cardContainer.append(card);

        const mediaLeft = $('<div>', { class: 'uk-card-media-left uk-cover-container uk-first-column' });
        card.append(mediaLeft);

        const img = $('<img>', { src: this.data.imagen, alt: '', 'uk-cover': '', style: 'height: 368px; width: 368px;' });
        mediaLeft.append(img);
        mediaLeft.append($('<canvas width="600" height="400">'));

        const cardBody = $('<div>', { class: 'uk-card-body' });
        card.append(cardBody);

        cardBody.append($('<h3>', { class: 'uk-card-title' }).text(this.data.titulo));
        cardBody.append($('<p>').text(this.data.descripcion));

        return cardContainer;
    }
}

// Datos de prueba
const jsonArray = [
    {
        id: 'article_0',
        link: 'article/0',
        imagen: 'assets/dalle/roboto_model.png',
        titulo: 'La Inteligencia Artificial, no es Inteligencia Artificial.',
        descripcion: 'Mucho se habla del uso de la Inteligencia Artificial (IA) para realizar diversas tareas, como calcular la temperatura, generar imágenes a partir de una descripción, hasta escribir un artículo completo de algún tema (casi sin errores), el caso del famoso ‘Chat GPT’ desarrollado por la empresa OpenAI.'
    },
    {
        id: 'article_1',
        link: 'article/1',
        imagen: 'assets/bing/5G_Portada.jpeg',
        titulo: 'Tecnología 5G',
        descripcion: 'Hemos escuchado mucho desde el 2015 que la nueva tecnología 5G revolucionará el mundo de las comunicaciones, con una carga más rápida de un video en tu smartphone hasta los autos de conducción autónoma.'
    },
    {
        id: 'article_2',
        link: 'article/2',
        imagen: 'assets/bing/Hacking_Portada.jpeg',
        titulo: 'Hacking Ético',
        descripcion: 'Recuerda que la seguridad en línea es un esfuerzo conjunto. Al adoptar estas prácticas de seguridad y estar consciente de los riesgos, puedes reducir la exposición de tu información personal y contribuir a un entorno digital más seguro.'
    }
];


// Crear una instancia de la clase Card y agregarla al contenedor
const cards = jsonArray.map(data => new Card(data));
cards.forEach(card => $('#wel').append(card.element));