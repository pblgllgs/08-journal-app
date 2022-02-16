import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: 'pblgllgs',
    api_key: '831823878865517',
    api_secret: 'eK0pws_QG65SQmNAgDBKnXMolYM',
    secure: true,
});

describe('Pruebas en fileUpload', () => {
    test('debe de cargar un archivo y retornar el  url', async () => {
        const resp = await fetch(
            'https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1'
        );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        //solo el id, el done lo borre, no deja ejecutarse y no borra el recurso 
        cloudinary.v2.api.delete_resources(imageId);
    });

    test('debe de retornar un error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
