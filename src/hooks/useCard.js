import {useMutation, useQuery} from '@tanstack/react-query';
import {LearningCardsService} from '../services/learningCardsService';
import {ImagesService} from "../services/imagesService";


const useGrade = nextCard => {
    const {isLoading, mutate: postGrade} = useMutation(
        async data => await LearningCardsService.postGrade(data),
        {
            onSuccess: nextCard,
        }
    );

    return {isLoading, postGrade};
};

const useImages = (deckId, card) => {
    const {isLoading, data: front} = useQuery(
        ['front', deckId, card],
        async () => await ImagesService.getImage({deckId, cardId: card.id, side: true}),
        {
            onError: () => console.clear()
        }
    );

    const {isLoading: isLoading1, data: back} = useQuery(
        ['back', deckId, card],
        async () => await ImagesService.getImage({deckId, cardId: card.id, side: false}),
        {
            onError: () => console.clear()
        }
    );

    return {isLoading: isLoading || isLoading1, images: [front, back]}
}

export {useGrade, useImages};
