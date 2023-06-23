import $url from "../api/api";
import {userId} from "../utils";


const END_POINT = 'images';

const ImagesService = {
    async getImage({deckId, cardId, side}) {
        const response = await $url.get(END_POINT, {
            params: {
                userId,
                deckId,
                cardId,
                side: side ? 'Front' : 'Back',
            },
            responseType: 'blob'
        });

        return URL.createObjectURL(response?.data)
    },

    async addImage({cardId, formData, side}) {
        return await $url.post(END_POINT, formData, {
            params: {
                userId,
                cardId,
                side: side ? 'Front' : 'Back',
            }
        })
    },

    async deleteImage({cardId, side}) {
        await $url.delete(
            END_POINT,
            {data: {userId, cardId, side: side ? 'Front' : 'Back'}}
        );

        return side;
    },
};

export {ImagesService}
