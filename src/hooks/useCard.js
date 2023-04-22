import {useMutation, useQuery} from '@tanstack/react-query';
import {LearningCardsService} from '../services/learningCardsService';
import {EditorCardsService} from '../services/editorCardsService';
import {onError} from './useUser'

const useGrade = nextCard => {
    const {isLoading, mutate: postGrade} = useMutation(
        async data => await LearningCardsService.postGrade(data),
        {
            onSuccess: () => nextCard(),
            onError: error => {
                //FIXME remove nextCard call on deploy
                nextCard();
                onError(error);
            }
        }
    );

    return {isLoading, postGrade};
};

const useImages = (deckId, card) => {
    const {isLoading, data: front} = useQuery(
        ['front', deckId, card],
        async () => await EditorCardsService.getImage({deckId, cardId: card.id, side: true})
    );

    const {isLoading: isLoading1, data: back} = useQuery(
        ['back', deckId, card],
        async () => await EditorCardsService.getImage({deckId, cardId: card.id, side: false})
    );

    return {isLoading: isLoading || isLoading1, images: [front, back]}
}

export {useGrade, useImages};